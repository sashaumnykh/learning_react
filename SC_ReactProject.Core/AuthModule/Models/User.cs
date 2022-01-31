using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SC_ReactProject.Core.AuthModule.Models
{
    public class User
    {
        public int id { get; set; }
        public string login { get; set; }
        public string password { get; set; }

        public User(int id, string login, string password)
        {
            this.id = id;
            this.login = login;
            this.password = password;
        }
    }
}
