using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace TodoApp.Bll.DbContext
{
    public static class DbSeed
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole("Admin"));
            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole("User"));
        }
    }
}
