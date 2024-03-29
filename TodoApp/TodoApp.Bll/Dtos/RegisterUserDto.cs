﻿using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.AspNetCore.Http;

namespace TodoApp.Bll.Dtos
{
    public class RegisterUserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public IFormFile Picture { get; set; }
    }
}
