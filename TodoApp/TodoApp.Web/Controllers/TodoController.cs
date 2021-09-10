using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using TodoApp.Bll.Dtos;
using TodoApp.Bll.Managers;

namespace TodoApp.Web.Controllers
{
    [Produces("application/json")]
    [Consumes("application/json")]
    [Route("api/todo")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        public ITodoManager TodoManager { get; set; }

        public TodoController(ITodoManager todoManager)
        {
            TodoManager = todoManager;
        }

        [Authorize]
        [HttpGet, Route("getfromid/{id}")]
        public async Task<IActionResult> GetTodoFromId(int id)
        {
            var result = await TodoManager.GetTodoAsync(id);
            return Ok(result);
        }

        [Authorize]
        [HttpGet, Route("getfromuserid/{userId}")]
        public async Task<IActionResult> GetTodoFromUserId(string userId, bool includeArchieved)
        {
            var result = await TodoManager.ListTodoForUserAsync(userId, includeArchieved);
            return Ok(result);
        }

        [Authorize]
        [HttpPost, Route("create")]
        public async Task<IActionResult> CreateTodo([FromBody] TodoDto dto)
        {
            await TodoManager.CreateTodoAsync(dto);
            return Ok();
        }


        [Authorize]
        [HttpDelete, Route("delete/{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            await TodoManager.DeleteTodoAsync(id);
            return Ok();
        }
    }
}
