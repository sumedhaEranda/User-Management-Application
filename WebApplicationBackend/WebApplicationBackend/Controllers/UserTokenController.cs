using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApplicationBackend.Data;
using WebApplicationBackend.Model;
using WebApplicationBackend.Service;

namespace WebApplicationBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTokenController : ControllerBase
    {
        public readonly DataContext dataContext;
        public readonly UserService userService = new UserService();
        public IConfiguration _configuration;

        // Constructor: Initializes the controller with IConfiguration and DataContext
        public UserTokenController(IConfiguration config, DataContext Context)
        {
            _configuration = config; // Injects the application configuration
            dataContext = Context;   // Injects the DataContext for database access
        }

        // POST: api/UserToken/gettoken
        // Endpoint for user authentication and token generation
        [HttpPost("gettoken")]
        public async Task<IActionResult> userLogin([FromForm] User _userData)
        {
            // Check if user data is provided
            if (_userData != null && _userData.UserName != null && _userData.Password != null)
            {
                // Attempt to retrieve user from the database
                var user = await userService.GetUser(dataContext, _userData.UserName, _userData.Password);

                if (user != null)
                {
                   
                    try
                    {  //create claims details based on the user information
                        var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.UserId.ToString()),
                        new Claim("UserName", user.UserName),
                        new Claim("Password", user.Password),

                    };
                        // Generate a JWT token with claims
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                        var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                        var token = new JwtSecurityToken(
                            _configuration["Jwt:Issuer"],
                            _configuration["Jwt:Audience"],
                            claims,
                            expires: DateTime.Now.AddMinutes(1),
                            signingCredentials: signIn);

                        // Return the generated token
                        return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                    }
                    catch (Exception)
                    {

                        throw;
                    }
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

        // POST: api/UserToken/UserRejister
        // Endpoint for user registration
        [HttpPost("UserRejister")]
        public async Task<ActionResult<User>> UserRegisteration([FromForm] User userinfo)
        {
            try
            {
                // Check if a user with the same email already exists
                var existingUser = await dataContext.Users.FirstOrDefaultAsync(u => u.UserName == userinfo.UserName);
                
               

                if (existingUser != null)
                {
                    return BadRequest("A user with this email already exists.");
                }
               
                // Add the new user to the database
                dataContext.Users.Add(userinfo);
                var user = await dataContext.SaveChangesAsync();

                if (user > 0)
                {
                    return userinfo;
                }
                else
                {
                    return BadRequest("User registration failed.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

       
    }
}
