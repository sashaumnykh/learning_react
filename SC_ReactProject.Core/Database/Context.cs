using SC_ReactProject.Core.EmployeeModule;
using System;
using System.Collections.Generic;
//using System.Data.Entity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SC_ReactProject.Core.Database
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
            : base(options)
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            GetEmployees(modelBuilder);
        }

        public void GetEmployees(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().HasData(new
            {
                employeeId = 1,
                name = "Kurt Vonnegut",
                email = "vonnegut@yahoo.com",
                salary = "1000"
            });
            modelBuilder.Entity<Employee>().HasData(new
            {
                employeeId = 2,
                name = "Ernest Hemingway",
                email = "ernest@yahoo.com",
                salary = "2000"
            });
            Console.WriteLine("objects have been created");
        }
    }

    //public class StoreDbInitializer : DropCreateDatabaseIfModelChanges<Context>
    //{
    //    protected override void Seed(Context db)
    //    {
    //        db.Employees.Add(new Employee { Name = "Sasha" });
    //    }
    //}
}
