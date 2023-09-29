using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApplicationBackend.Data;
using WebApplicationBackend.Model;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace WebApplicationBackend.Controllers
{
    [Authorize]// Restrict access to authorized users
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly DataContext dataContext; // Injects the application configuration
        public IConfiguration _configuration;    // Injects the DataContext for database access

        public UserController(IConfiguration config, DataContext Context)
        {
            _configuration = config;
            dataContext = Context;
        }


        // Get User List
        [HttpGet("GetAllUser")]
        public async Task<ActionResult<List<User>>> GetAllUserList()
        {
            try {
                var user = await dataContext.Users.ToListAsync();
                if (user != null)
                {
                    // Access and set session data if needed
                    return user;
                }
                else {
                    return BadRequest("Users Are Not Found");
                }
            }
            catch (Exception ex)
            {
                return Ok($"{ex.Message}");
                ex.StackTrace.ToString();
            }
        }

        // New action to get the count of all users
        [HttpGet("GetAllUserCount")]
        public async Task<ActionResult<int>> GetAllUserCount()
        {
            try
            {
                var userCount = await dataContext.Users.CountAsync();
                return userCount;
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }
        }


        // Update User Information
        [HttpPut("{userId}")]
        public async Task<ActionResult<List<User>>> UpdateUserInfo(int UserId, User userinfo)
        {
            try {
                var DbUser = await dataContext.Users.FindAsync(UserId);
                if (DbUser == null)
                    return NotFound("User Not Found");

                // set the user information
                DbUser.UserName = userinfo.UserName;
                DbUser.Password = userinfo.Password;

                await dataContext.SaveChangesAsync();
                return await dataContext.Users.ToListAsync();
            }
            catch (Exception ex)
            {

                return NotFound($"{ex.Message}");
                ex.StackTrace.ToString();
            }

        }

        // Delete User
        [HttpDelete("{userID}")]
        public async Task<ActionResult<User>> DeleteUser(int userID)
        {
            try
            {
                var DbUser = await dataContext.Users.FindAsync(userID);
                if (DbUser == null)
                    return NotFound("User Not Found");

                dataContext.Users.Remove(DbUser);

                await dataContext.SaveChangesAsync();

                return DbUser;
            }
            catch (Exception ex)
            {

                return NotFound($"{ex.Message}");
                ex.StackTrace.ToString();
            }
        }




    }
}
