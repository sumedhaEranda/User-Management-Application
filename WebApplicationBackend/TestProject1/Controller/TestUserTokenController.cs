using Xunit;
using WebApplicationBackend.Controllers;
using Microsoft.Extensions.Configuration;
using LinqToDB;
using DataContext = WebApplicationBackend.Data.DataContext;
using WebApplicationBackend.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TestProject1.Controller
{
    public class TestUserTokenController
    {
        private readonly IConfiguration _configuration;
        private static readonly string connection = "server=localhost\\sqlexpress;database=companydb;trusted_connection=true;Encrypt=False;";
        private static readonly User InputUserData = new User { UserName = "sumeada", Password = "789" };

        // Constructor: Initializes the configuration.
        public TestUserTokenController()
        {
            var configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");
            // Build the configuration
            _configuration = configuration.Build();
        }

        // Test method to validate user login.
        [Fact]
        public async Task TestUserLogin()
        {
            var options = new DbContextOptionsBuilder<DataContext>().UseSqlServer(connection).Options;
            var dataContext = new DataContext(options);
            UserTokenController userTokenController = new UserTokenController(_configuration, dataContext);

            if (InputUserData != null && InputUserData.UserName != null && InputUserData.Password != null)
            {
                User getuserdata = await userTokenController.userService.GetUser(dataContext, InputUserData.UserName, InputUserData.Password);

                if (getuserdata != null)
                {
                    try
                    {
                        var claims = new[] {
                            new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                            new Claim("UserId", getuserdata.UserId.ToString()),
                            new Claim("UserName", getuserdata.UserName),
                            new Claim("Password", getuserdata.Password),
                        };

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                        var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                        var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddMinutes(10), signingCredentials: signIn);

                        Assert.NotNull(token);
                    }
                    catch (Exception)
                    {
                        Assert.False(false);
                        throw;
                    }
                }
                else
                {
                    Assert.False(false);
                }
            }
            else
            {
                Assert.False(false);
            }
        }

        // Test method to validate user registration.
        [Fact]
        public async Task TestUserRejister()
        {
            var options = new DbContextOptionsBuilder<DataContext>().UseSqlServer(connection).Options;
            var dataContext = new DataContext(options);
            UserTokenController userTokenController = new UserTokenController(_configuration, dataContext);

            // Define your test user data
            var testUserData = new User { UserName = "Kasun", Password = "1234567891" };

            // Act: Register the user
            var result = await userTokenController.UserRegisteration(testUserData);

            // Assert: Verify the result
            if (result.Value != null)
            {
                Assert.True(true);
            }
            else
            {
                Assert.False(false);
            }
        }
    }
}
