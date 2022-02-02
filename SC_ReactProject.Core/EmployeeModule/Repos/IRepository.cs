using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SC_ReactProject.Core.Common;

namespace SC_ReactProject.Core.EmployeeModule
{
    public interface IRepository<T>
    {
        int Create(T entity);
        T Get(int id);
        GetAllResponse GetAll(int page = 0, bool sort = false, string sortOrder = "default", string comparer = "name");
        void Delete(int id);
        void Update(T entity);
    }
}
