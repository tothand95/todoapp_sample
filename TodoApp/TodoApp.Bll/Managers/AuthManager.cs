using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using TodoApp.Bll.DbContext;
using TodoApp.Bll.Entities;

namespace TodoApp.Bll.Managers
{
    public class AuthManager : IAuthManager
    {
        public SignInManager<ApplicationUser> SignInManager { get; set; }
        public UserManager<ApplicationUser> UserManager { get; set; }
        public RoleManager<IdentityRole> RoleManager { get; set; }
        public TodoDbContext DbContext { get; set; }


        public AuthManager(SignInManager<ApplicationUser> signInManager, TodoDbContext dbContext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            SignInManager = signInManager;
            DbContext = dbContext;
            UserManager = userManager;
            RoleManager = roleManager;
        }

    }
}
