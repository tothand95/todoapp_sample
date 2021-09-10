using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using TodoApp.Bll.DbContext;
using TodoApp.Bll.Dtos;
using TodoApp.Bll.Entities;
using TodoApp.Common.Enums;
using TodoApp.Common.Exceptions;
using TodoApp.Common.Validation;

namespace TodoApp.Bll.Managers
{
    public class TodoManager : ITodoManager
    {
        public TodoDbContext DbContext { get; set; }

        public TodoManager(TodoDbContext dbContext)
        {
            DbContext = dbContext;
        }

        /// <summary>
        /// Create a ToDo entity from the given data
        /// </summary>
        /// <param name="dto"></param>
        public async Task CreateTodoAsync(TodoDto dto)
        {
            var user = DbContext.Users.Where(u => u.Id == dto.UserId).SingleOrDefault();
            if (user == null)
                throw new ValidationException(new List<ValidationMessage> { new ValidationMessage { PropertyName = "User", Message = "User does not exist", Type = ValidationMessageType.Error } });
            if (dto.TodoId != null)
                throw new ValidationException(new List<ValidationMessage> { new ValidationMessage { PropertyName = "TodoId", Message = "Cannot create todo with an already existing id", Type = ValidationMessageType.Error } });


            Todo entity = new Todo
            {
                UserId = dto.UserId,
                Deadline = dto.Deadline,
                Deleted = false,
                Description = dto.Description,
                Priority = dto.Priority,
                Status = dto.Status,
                Title = dto.Title
            };

            DbContext.Add<Todo>(entity);

            await DbContext.SaveChangesAsync();
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
            var entity = DbContext.Todos.SingleOrDefault(t => t.Id == dto.TodoId);
            if (entity == null)
                throw new ValidationException(new List<ValidationMessage> { new ValidationMessage { PropertyName = "Todo", Message = "Todo does not exist with the requested id", Type = ValidationMessageType.Error } });

            entity.Title = dto.Title;
            entity.Description = dto.Description;
            entity.Deadline = dto.Deadline;

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
