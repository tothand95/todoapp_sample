using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using TodoApp.Bll.Entities;

namespace TodoApp.Bll.DbContext
{
    public static class DbSeed
    {
        static private string _adminRoleName = "Admin";
        static private string _userRoleName = "User";

        static private string _adminUserName = "Admin";

        public static void Seed(ModelBuilder modelBuilder)
        {
            IdentityRole adminRole = new IdentityRole() { Name = _adminRoleName,  NormalizedName = _adminRoleName.ToUpper() };
            IdentityRole userRole = new IdentityRole() { Name = _userRoleName, NormalizedName = _userRoleName.ToUpper() };

            modelBuilder.Entity<IdentityRole>().HasData(adminRole);
            modelBuilder.Entity<IdentityRole>().HasData(userRole);

            var hasher = new PasswordHasher<IdentityUser>();
            var adminUser = new ApplicationUser(_adminUserName);
            adminUser.PasswordHash = hasher.HashPassword(adminUser, "Password01");

            modelBuilder.Entity<ApplicationUser>().HasData(adminUser);

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = adminRole.Id, UserId = adminUser.Id });
        }

    }
}
