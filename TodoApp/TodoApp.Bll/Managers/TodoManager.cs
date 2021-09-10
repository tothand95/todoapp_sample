using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using TodoApp.Bll.DbContext;
using TodoApp.Bll.Dtos;
using TodoApp.Bll.Entities;
using TodoApp.Common.Enums;

namespace TodoApp.Bll.Managers
{
    public class TodoManager : ITodoManager
    {
        public TodoDbContext DbContext { get; set; }
        public UserManager<ApplicationUser> UserManager { get; set; }

        public TodoManager(TodoDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            DbContext = dbContext;
            UserManager = userManager;
        }

        /// <summary>
        /// Create a ToDo entity from the given data
        /// </summary>
        /// <param name="dto"></param>
        public void CreateTodo(TodoDto dto)
        {

        }

        /// <summary>
        /// Delete todo entity with the given id
        /// </summary>
        /// <param name="id"></param>
        public void DeleteTodo(int id)
        {

        }

        /// <summary>
        /// Update basic data of the todo entity
        /// </summary>
        /// <param name="id"></param>
        public void UpdateTodo(TodoDto dto)
        {

        }

        /// <summary>
        /// Update status of the todo entity
        /// </summary>
        /// <param name="id"></param>
        public async Task UpdateTodoStatusAsync(int id, TodoStatus status)
        {
            var result = DbContext.Todos
                .SingleOrDefault(t => t.Id == id);
            result.Status = status;
            await DbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Update priority of the todo entity
        /// </summary>
        /// <param name="id"></param>
        public async Task UpdateTodoPriorityAsync(int id, TodoPriority priority)
        {
            var result = DbContext.Todos
               .SingleOrDefault(t => t.Id == id);
            result.Priority = priority;
            await DbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Get todo entity with the given id
        /// </summary>
        /// <param name="id"></param>
        public async Task<Todo> GetTodoAsync(int id)
        {
            var result = await DbContext.Todos
                .Include(t => t.User)
                .SingleOrDefaultAsync(t => t.Id == id);
            return result;
        }

        /// <summary>
        /// Get todo entity with the given id
        /// </summary>
        /// <param name="id"></param>
        public async Task<List<Todo>> ListTodoForUserAsync(string userId)
        {
            var result = await DbContext.Users
                .Include(t => t.Todos)
                .SingleOrDefaultAsync(t => t.Id == userId);
            return result.Todos;
        }
    }
}
