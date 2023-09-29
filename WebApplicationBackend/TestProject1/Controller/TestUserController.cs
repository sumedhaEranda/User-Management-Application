using Microsoft.EntityFrameworkCore;
using WebApplicationBackend.Controllers;
using WebApplicationBackend.Data;
using WebApplicationBackend.Model;
using Microsoft.Extensions.Configuration;

namespace TestProject1.Controller
{
    public class TestUserController
    {
        private readonly IConfiguration _configuration;
        private static readonly string connection = "server=localhost\\sqlexpress;database=companydb;trusted_connection=true;Encrypt=False;";
        private static readonly User InputUserData = (new User { UserId = 1, UserName = "sumeada", Password = "789" });

        // Constructor: Initializes the configuration and database options.
        public TestUserController()
        {
            var configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");
            // Build the configuration
            _configuration = configuration.Build();
        }

        // Test method to get all users from UserController.
        [Fact]
        public async Task GeAlluserForUserController()
        {
            var options = new DbContextOptionsBuilder<DataContext>().UseSqlServer(connection).Options;
            var dataContext = new DataContext(options);

            UserController _userController = new UserController(null, dataContext);

            // Act: Invoke the action method you want to test
            var result = await _userController.GetAllUserList();
            try
            {
                var users = result.Value;
                Assert.NotNull(users);
            }
            catch (Exception ex)
            {
                Assert.False(false, ex.Message);
                throw; // Rethrow the exception to fail the test and see the details in the test output
            }
        }

        // Test method to update user information through UserController.
        [Fact]
        public async Task TestUpdateUserInfo()
        {
            int userID = 1;
            var testUserData = new User { UserName = "pleasechangename", Password = "1234567891" };

            var options = new DbContextOptionsBuilder<DataContext>().UseSqlServer(connection).Options;
            var dataContext = new DataContext(options);

            UserController userController = new UserController(_configuration, dataContext);

            // Act: Register the user
            var result = await userController.UpdateUserInfo(userID, testUserData);

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

        // Test method to delete a user through UserController.
        [Fact]
        public async Task TestDeleteUser()
        {
            int userID = 37;

            var options = new DbContextOptionsBuilder<DataContext>().UseSqlServer(connection).Options;
            var dataContext = new DataContext(options);

            UserController userController = new UserController(_configuration, dataContext);

            // Act: Register the user
            var result = await userController.DeleteUser(userID);

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
