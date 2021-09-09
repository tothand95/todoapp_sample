using System;
using System.Collections.Generic;
using System.Text;

namespace TodoApp.Bll.Dtos
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public bool NeedNewPassword{ get; set; }
    }
}
