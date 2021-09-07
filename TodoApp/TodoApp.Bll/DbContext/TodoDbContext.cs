using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using TodoApp.Bll.Entities;
using TodoApp.Bll.DbContext.Configuration;

namespace TodoApp.Bll.DbContext
{
    public class TodoDbContext : IdentityDbContext<ApplicationUser>
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ApplicationUserConfig());
            modelBuilder.ApplyConfiguration(new TodoConfig());

            DbSeed.Seed(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }

        public virtual DbSet<Todo> Todos { get; set; }
    }
}
