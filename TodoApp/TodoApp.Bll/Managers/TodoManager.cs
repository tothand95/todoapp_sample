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
        public async Task DeleteTodoAsync(int id)
        {
            var entity = await DbContext.Todos.SingleOrDefaultAsync(t => t.Id == id);
            entity.Deleted = true;
            await DbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Update basic data of the todo entity
        /// </summary>
        /// <param name="id"></param>
        public async Task UpdateTodoAsync(TodoDto dto)
        {
            await DbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Update status of the todo entity
        /// </summary>
        /// <param name="id"></param>
        public async Task UpdateTodoStatusAsync(int id, TodoStatus status)
        {
            var entity = DbContext.Todos.SingleOrDefault(t => t.Id == id);
            entity.Status = status;
            await DbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Update priority of the todo entity
        /// </summary>
        /// <param name="id"></param>
        public async Task UpdateTodoPriorityAsync(int id, TodoPriority priority)
        {
            var entity = DbContext.Todos.SingleOrDefault(t => t.Id == id);
            entity.Priority = priority;
            await DbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Get todo entity with the given id
        /// </summary>
        /// <param name="id"></param>
        public async Task<Todo> GetTodoAsync(int id)
        {
            var entity = await DbContext.Todos
                .Include(t => t.User)
                .SingleOrDefaultAsync(t => t.Id == id);
            return entity;
        }

        /// <summary>
        /// Get todo entity with the given id
        /// </summary>
        /// <param name="id"></param>
        public async Task<List<Todo>> ListTodoForUserAsync(string userId, bool includeArchieved)
        {
            var result = await DbContext.Todos
                .Where(t => t.UserId == userId && (t.Deleted == false || t.Deleted == includeArchieved))
                .ToListAsync();
            return result;
        }
    }
}
