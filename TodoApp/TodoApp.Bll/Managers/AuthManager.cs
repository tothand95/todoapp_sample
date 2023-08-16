using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using TodoApp.Bll.DbContext;
using TodoApp.Bll.Dtos;
using TodoApp.Bll.Entities;
using TodoApp.Bll.Managers.Interfaces;
using TodoApp.Common.Exceptions;
using TodoApp.Common.Validation;

namespace TodoApp.Bll.Managers
{
    public class AuthManager : IAuthManager
    {
        public SignInManager<ApplicationUser> SignInManager { get; set; }
        public UserManager<ApplicationUser> UserManager { get; set; }
        public RoleManager<IdentityRole> RoleManager { get; set; }
        public TodoDbContext DbContext { get; set; }


        public AuthManager(SignInManager<ApplicationUser> signInManager, TodoDbContext dbContext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            SignInManager = signInManager;
            DbContext = dbContext;
            UserManager = userManager;
            RoleManager = roleManager;
        }

        /// <summary>
        /// Log in a user with the given password
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<SignInResult> LoginAsync(string username, string password)
        {
            var signInResult = await SignInManager.PasswordSignInAsync(username, password, true, false);
            return signInResult;
        }

        /// <summary>
        /// Create a new user with the given data
        /// </summary>
        /// <param name="dto">data of the new user</param>
        /// <returns></returns>
        public async Task<IdentityResult> AddUserAsync(RegisterUserDto dto)
        {
            var user = new ApplicationUser
            {
                Id = dto.Username,
                Email = dto.Email,
                UserName = dto.Username
            };

            if (dto.Picture != null)
            {
                using (var ms = new MemoryStream())
                {
                    string[] permittedExtensions = { ".jpg" };
                    var ext = Path.GetExtension(dto.Picture.FileName).ToLowerInvariant();

                    if (string.IsNullOrEmpty(ext) || !permittedExtensions.Contains(ext))
                        throw new ValidationException(new List<ValidationMessage>() { new ValidationMessage { Message = "File extension is not supported. Must be .jpg" } });
                    if (ms.Length > 2097152)
                        throw new ValidationException(new List<ValidationMessage>() { new ValidationMessage { Message = "File size is larger than 2MB." } });

                    dto.Picture.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    user.ProfilePicture = fileBytes;
                }
            }

            var result = await UserManager.CreateAsync(user, string.IsNullOrWhiteSpace(dto.Password) ? $"{dto.Username}" : dto.Password);

            if (result.Succeeded)
            {
                try
                {
                    var roleAssignResult = await UserManager.AddToRoleAsync(user, "User");
                    if (!roleAssignResult.Succeeded)
                        throw new ValidationException(new List<ValidationMessage>() { new ValidationMessage { Message = "Registration failed." } });
                }
                catch (Exception e)
                {
                    await UserManager.DeleteAsync(user);
                    throw e;
                }
            }
            else
                return result;

            await DbContext.SaveChangesAsync();
            return result;
        }


        /// <summary>
        /// Edit user data
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public async Task<bool> EditUserAsync(UserDto dto)
        {
            var user = DbContext.Users.SingleOrDefault(u => u.Id == dto.Id);
            if (user == null)
                throw new ValidationException(new List<ValidationMessage>() { new ValidationMessage { Message = "Requested user does not exist." } });

            user.Email = dto.Email;

            if (dto.Picture != null)
            {
                using (var ms = new MemoryStream())
                {
                    string[] permittedExtensions = { ".jpg" };
                    var ext = Path.GetExtension(dto.Picture.FileName).ToLowerInvariant();

                    if (string.IsNullOrEmpty(ext) || !permittedExtensions.Contains(ext))
                        throw new ValidationException(new List<ValidationMessage>() { new ValidationMessage { Message = "File extension is not supported. Must be .jpg" } });
                    if (ms.Length > 2097152)
                        throw new ValidationException(new List<ValidationMessage>() { new ValidationMessage { Message = "File size is larger than 2MB." } });

                    dto.Picture.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    user.ProfilePicture = fileBytes;
                }
            }

            await DbContext.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// Changes password for the given user
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="currentPassword"></param>
        /// <param name="newPassword"></param>
        /// <returns></returns>
        public async Task<IdentityResult> ChangePasswordAsync(string userid, string currentPassword, string newPassword)
        {
            var user = await UserManager.Users.SingleOrDefaultAsync(u => u.Id == userid);
            if (user == null)
                throw new ValidationException(new List<ValidationMessage>() { new ValidationMessage { Message = "Requested user does not exist." } });

            var result = await UserManager.ChangePasswordAsync(user, currentPassword, newPassword);

            return result;
        }

        /// <summary>
        /// Returns all of the roles a user have
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public async Task<List<string>> GetRolesForUserAsync(string username)
        {
            var user = await UserManager.Users.SingleAsync(u => u.UserName.ToLower() == username.ToLower());
            var roles = await UserManager.GetRolesAsync(user);

            return roles.ToList();
        }

        /// <summary>
        /// Checks if a user has a specific role
        /// </summary>
        /// <param name="username"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        public async Task<bool> HasRoleAsync(string username, string role)
        {
            var user = await UserManager.Users.SingleAsync(u => u.UserName.ToLower() == username.ToLower());
            var roleUserHave = (await UserManager.GetRolesAsync(user)).ToList();

            if (roleUserHave.Any(r => r.ToLower() == role.ToLower()))
                return true;
            else
                return false;
        }

        /// <summary>
        /// List all of the users in the application
        /// </summary>
        /// <returns></returns>
        public async Task<List<ApplicationUser>> ListUsersAsync()
        {
            var users = await DbContext.Users.ToListAsync();
            return users;
        }


        /// <summary>
        /// Delete user
        /// </summary>
        /// <returns></returns>
        public async Task DeleteUserAsync(string userId)
        {
            var user = await DbContext.Users.SingleOrDefaultAsync(u => u.Id == userId);
            if (user == null)
                throw new ValidationException(new List<ValidationMessage>() { new ValidationMessage { Message = "Requested user does not exist." } });

            var todos = await DbContext.Todos.Where(u => u.UserId == userId).ToListAsync();
            DbContext.Todos.RemoveRange(todos);
            await UserManager.DeleteAsync(user);
        }

        /// <summary>
        /// Get profile picture for username
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public async Task<byte[]> GetProfilePicture(string username)
        {
            var user = await DbContext.Users.SingleOrDefaultAsync(u => username.ToUpper() == u.NormalizedUserName);
            if (user == null)
                throw new ValidationException(new List<ValidationMessage>() { new ValidationMessage { Message = "Requested user does not exist." } });

            return user.ProfilePicture != null ? user.ProfilePicture : new byte[] { };
        }
    }
}
