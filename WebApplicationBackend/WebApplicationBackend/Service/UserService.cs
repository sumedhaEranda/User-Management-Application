
using Microsoft.EntityFrameworkCore;
using WebApplicationBackend.Data;
using WebApplicationBackend.Model;

namespace WebApplicationBackend.Service
{
    public class UserService
    {
        // Retrieves a user with the specified username and password from the database.
        // Returns null if no matching user is found.
        public async Task<User> GetUser(DataContext dataContext ,string username, string password)
        {
            return await dataContext.Users.FirstOrDefaultAsync(u => u.UserName == username && u.Password == password);
        }
    }
}
