using LinqToDB;
using Microsoft.EntityFrameworkCore;
using WebApplicationBackend.Model;

namespace WebApplicationBackend.Data
{
    public class DataContext : DbContext
    {
        // Constructor: Initializes the DataContext with DbContextOptions
        public DataContext(DbContextOptions<DataContext> options) : base(options){ }

        // DbSet: Represents the 'Users' table in the database
        public DbSet<User> Users { get; set; }
    }

  
}
