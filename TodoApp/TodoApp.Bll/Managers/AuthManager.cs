﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using TodoApp.Bll.DbContext;
using TodoApp.Bll.Dtos;
using TodoApp.Bll.Entities;

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

        public async Task<SignInResult> LoginAsync(string username, string password)
        {
            var signInResult = await SignInManager.PasswordSignInAsync(username, password, true, false);
            var user = await UserManager.Users.SingleAsync(u => u.UserName.ToLower() == username.ToLower());
            return signInResult;
        }

        public async Task<IdentityResult> AddUserAsync(RegisterUserDto dto)
        {
            var user = new ApplicationUser
            {
                Id = dto.Username,
                Email = dto.Email,
                UserName = dto.Username
            };

            var result = await UserManager.CreateAsync(user, string.IsNullOrWhiteSpace(dto.Password) ? $"{dto.Username}" : dto.Password);

            if (result.Succeeded)
            {
                var roleAssignResult = await UserManager.AddToRoleAsync(user, "User");
                if (!roleAssignResult.Succeeded)
                {
                    await UserManager.DeleteAsync(user);
                }
            }
            else
                return result;

            await DbContext.SaveChangesAsync();
            return result;
        }

        public async Task<IdentityResult> ChangePasswordAsync(string username, string currentPassword, string newPassword)
        {
            var user = await UserManager.Users.SingleAsync(u => u.UserName.ToLower() == username.ToLower());
            var result = await UserManager.ChangePasswordAsync(user, currentPassword, newPassword);

            return result;
        }

        public async Task<List<string>> GetRolesForUserAsync(string username)
        {
            var user = await UserManager.Users.SingleAsync(u => u.UserName.ToLower() == username.ToLower());
            var roles = await UserManager.GetRolesAsync(user);

            return roles.ToList();
        }

        public async Task<bool> HasRoleAsync(string username, string role)
        {
            var user = await UserManager.Users.SingleAsync(u => u.UserName.ToLower() == username.ToLower());
            var roleUserHave = (await UserManager.GetRolesAsync(user)).ToList();

            if (roleUserHave.Any(r => r.ToLower() == role.ToLower()))
                return true;
            else
                return false;
        }
    }
}