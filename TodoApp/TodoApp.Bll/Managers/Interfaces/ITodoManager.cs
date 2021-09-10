using System;
using System.Collections.Generic;
using System.Text;

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
        void UpdateTodoStatus(int id, TodoStatus status);
        void UpdateTodoPriority(int id, TodoPriority priority);
        Todo GetTodo(int id);
        List<Todo> ListTodoForUser(string userId);

    }
}
