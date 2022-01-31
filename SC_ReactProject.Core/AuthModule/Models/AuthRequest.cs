using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SC_ReactProject.Core.AuthModule.Models
{
    public class AuthRequest
    {
        [Required]
        public string login { get; set; }

        [Required]
        public string password { get; set; }
    }
}
