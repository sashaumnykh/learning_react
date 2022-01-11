using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SC_ReactProject.Core.EmployeeModule
{
    public interface IRepository<T>
    {
        void Create(T entity);
        T Get(int id);
        IEnumerable<T> GetAll();
        void Delete(int id);
        void Update(T entity);
    }
}
