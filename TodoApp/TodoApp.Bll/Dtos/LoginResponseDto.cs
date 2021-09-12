using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System.Text;

namespace TodoApp.Bll.Dtos
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public string Username { get; set; }
        public bool NeedNewPassword { get; set; }
    }
}
