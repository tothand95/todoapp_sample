using System;
using System.Collections.Generic;
using System.Text;

namespace TodoApp.Bll.Dtos
{
    public class ChangePasswordDto
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
