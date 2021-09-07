using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;

namespace TodoApp.Bll.Managers
{
    public interface IAuthManager
    {
        Task<SignInResult> LoginAsync(string username, string password);
    }
}
