using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using TodoApp.Bll.Entities;

namespace TodoApp.Bll.DbContext
{
    public class TodoDbContext : IdentityDbContext<ApplicationUser>
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.ApplyConfiguration(new ApplicationUserConfig());

            base.OnModelCreating(modelBuilder);
        }

        public virtual DbSet<Todo> Tenants { get; set; }
    }
}
