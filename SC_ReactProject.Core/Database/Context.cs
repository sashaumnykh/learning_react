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
            var today = DateTime.Today.ToString();
            modelBuilder.Entity<Employee>().HasData(new
            {
                employeeId = 1,
                name = "Kurt Vonnegut",
                email = "vonnegut@yahoo.com",
                salary = "1000",
                bday = "1922-11-11",
                lastModified = today
            });
            modelBuilder.Entity<Employee>().HasData(new
            {
                employeeId = 2,
                name = "Ernest Hemingway",
                email = "ernest@yahoo.com",
                salary = "2000",
                bday = "1899-07-21"
            });
            modelBuilder.Entity<Employee>().HasData(new
            {
                employeeId = 3,
                name = "Douglas Adams",
                email = "42@yahoo.com",
                salary = "4200",
                bday = "1952-05-11"
            });
            modelBuilder.Entity<Employee>().HasData(new
            {
                employeeId = 4,
                name = "Donna Tartt",
                email = "tartt@yahoo.com",
                salary = "3000",
                bday = "1963-12-23"
            });
            modelBuilder.Entity<Employee>().HasData(new
            {
                employeeId = 5,
                name = "Fyodor Dostoyevsky",
                email = "dostoyevsky@yahoo.com",
                salary = "1500",
                bday = "1821-11-11"
            });
            modelBuilder.Entity<Employee>().HasData(new
            {
                employeeId = 6,
                name = "Viktor Pelevin",
                email = "generation_pi@yahoo.com",
                salary = "2500",
                bday = "1962-11-22"
            });
            modelBuilder.Entity<Employee>().HasData(new
            {
                employeeId = 7,
                name = "Vladimir Sorokin",
                email = "sorokin@yahoo.com",
                salary = "2500",
                bday = "1955-08-07"
            });
            modelBuilder.Entity<Employee>().HasData(new
            {
                employeeId = 8,
                name = "Vladimir Nabokov",
                email = "sirin@yahoo.com",
                salary = "3000",
                bday = "1899-04-10"
            });
            modelBuilder.Entity<Employee>().HasData(new
            {
                employeeId = 9,
                name = "Jean-Michel Guenassia",
                email = "jean@yahoo.com",
                salary = "2000",
                bday = "1950-01-01"
            });
            modelBuilder.Entity<Employee>().HasData(new
            {
                employeeId = 10,
                name = "Jerome Klapka Jerome",
                email = "klapka@yahoo.com",
                salary = "1000",
                bday = "1859-05-02"
            });
            modelBuilder.Entity<Employee>().HasData(new
            {
                employeeId = 11,
                name = "Alexey Salnikov",
                email = "petrovy@yahoo.com",
                salary = "1500",
                bday = "1978-08-07"
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
