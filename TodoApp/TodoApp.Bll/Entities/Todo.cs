using System;
using System.Collections.Generic;
using System.Text;

using TodoApp.Common.Enums;

namespace TodoApp.Bll.Entities
{
    public class Todo
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Description { get; set; }
        public DateTime? Deadline { get; set; }
        public TodoPriority Priority { get; set; }
        public TodoStatus Status { get; set; }

        public ApplicationUser User { get; set; }
    }
}
