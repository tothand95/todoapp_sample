using System;
using System.Collections.Generic;
using System.Text;

using TodoApp.Common.Enums;

namespace TodoApp.Bll.Entities
{
    public class Todo
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
        public DateTime? Deadline { get; set; }
        public Priority Priority { get; set; }

        public ApplicationUser User { get; set; }
    }
}
