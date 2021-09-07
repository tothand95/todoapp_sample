using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.AspNetCore.Identity;

namespace TodoApp.Bll.Entities
{
    public class ApplicationUser: IdentityUser
    {
        public byte[] ProfilePicture { get; set; }

        public List<Todo> Todos { get; set; }
    }
}
