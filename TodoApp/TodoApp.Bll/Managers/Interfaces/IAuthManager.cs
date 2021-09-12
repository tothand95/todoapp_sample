using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;

using TodoApp.Bll.Dtos;
using TodoApp.Bll.Entities;

namespace TodoApp.Bll.Managers
{
    public interface IAuthManager
    {
        Task<SignInResult> LoginAsync(string username, string password);
        Task<IdentityResult> AddUserAsync(RegisterUserDto dto);
        Task<IdentityResult> ChangePasswordAsync(string username, string currentPassword, string newPassword);
        Task<List<string>> GetRolesForUserAsync(string username);
        Task<bool> HasRoleAsync(string username, string role);
        Task<List<ApplicationUser>> ListUsersAsync();
        Task<byte[]> GetProfilePicture(string userId);
    }
}
