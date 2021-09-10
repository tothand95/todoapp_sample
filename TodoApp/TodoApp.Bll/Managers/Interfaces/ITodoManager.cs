using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

using TodoApp.Bll.Dtos;
using TodoApp.Bll.Entities;
using TodoApp.Common.Enums;

namespace TodoApp.Bll.Managers
{
    public interface ITodoManager
    {
        void CreateTodo(TodoDto dto);
        void DeleteTodo(int id);
        void UpdateTodo(TodoDto dto);
        Task UpdateTodoStatusAsync(int id, TodoStatus status);
        Task UpdateTodoPriorityAsync(int id, TodoPriority priority);
        Task<Todo> GetTodoAsync(int id);
        Task<List<Todo>> ListTodoForUserAsync(string userId);
    }
}
