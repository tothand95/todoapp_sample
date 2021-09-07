using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using TodoApp.Bll.Entities;

namespace TodoApp.Bll.DbContext.Configuration
{
    public class TodoConfig : IEntityTypeConfiguration<Todo>
    {
        public void Configure(EntityTypeBuilder<Todo> builder)
        {
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Priority).IsRequired();
            builder.Property(t => t.Description).IsRequired();
            builder.Property(t => t.UserId).IsRequired();
        }
    }
}
