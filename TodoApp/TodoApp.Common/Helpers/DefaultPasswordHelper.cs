using System;
using System.Collections.Generic;
using System.Text;

namespace TodoApp.Common.Helpers
{
    public static class DefaultPasswordHelper
    {
        public static string GenerateDefaultPasswordForUser(string username)
        {
            return username;
        }
    }
}
