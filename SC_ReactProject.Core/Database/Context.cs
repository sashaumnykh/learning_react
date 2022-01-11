using SC_ReactProject.Core.EmployeeModule;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SC_ReactProject.Core.Database
{
    public class Context : DbContext
    {
        public DbSet<Employee> Employees { get; set; }

        static Context()
        {
            //Database.SetInitializer<Context>(new StoreDbInitializer());
        }

        public Context(string connectionString) : base(connectionString)
        {
        }
    }

    public class StoreDbInitializer : DropCreateDatabaseIfModelChanges<Context>
    {
        protected override void Seed(Context db)
        {
            db.Employees.Add(new Employee { Name = "Sasha" });
        }
    }
}
