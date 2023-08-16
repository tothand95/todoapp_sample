using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
  [Route("api")]
  [ApiController]
  public class TodoController : ControllerBase
  {
    private ITodoManager TodoManager { get; set; }

    public TodoController(ITodoManager todoManager)
    {
      TodoManager = todoManager;
    }


    [Authorize]
    [HttpGet, Route("todo/{id:int}")]
    public async Task<IActionResult> GetTodoById(int id)
    {
      var result = await TodoManager.GetTodoAsync(id);
      return Ok(result);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet, Route("user/{userId}/todos")]
    public async Task<IActionResult> GetTodosForUser(string userId)
    {
      var result = await TodoManager.ListTodoForUserAsync(userId, false);
      return Ok(result);
    }

    //[Authorize]
    //[HttpGet, Route("getForCurrentUser")]
    //public async Task<IActionResult> GetTodosForCurrentUser()
    //{
    //    var id = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
    //    var result = await TodoManager.ListTodoForUserAsync(this.User.FindFirstValue(ClaimTypes.NameIdentifier), false);
    //    return Ok(result);
    //}

    [Authorize]
    [HttpPost, Route("todo")]
    public async Task<IActionResult> CreateTodo([FromBody] TodoDto dto)
    {
      await TodoManager.CreateTodoAsync(dto);
      return Ok();
    }


    [Authorize]
    [HttpPut, Route("todo/{id:int}")]
    public async Task<IActionResult> EditTodo(int id, [FromBody] TodoDto dto)
    {
      await TodoManager.UpdateTodoAsync(dto);
      return Ok();
    }


    [Authorize]
    [HttpDelete, Route("todo/{id:int}")]
    public async Task<IActionResult> DeleteTodo(int id)
    {
      await TodoManager.DeleteTodoAsync(id);
      return Ok();
    }
  }
}