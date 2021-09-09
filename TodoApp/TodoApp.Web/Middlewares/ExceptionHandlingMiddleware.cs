using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using TodoApp.Common.Exceptions;

namespace TodoApp.Web.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private RequestDelegate Next { get; }
        public IHostEnvironment Environment { get; }
        public ILogger<ExceptionHandlingMiddleware> Logger { get; }

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger, IHostEnvironment environment)
        {
            Next = next;
            Environment = environment;
            Logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await Next(context);
            }
            catch (ValidationException ex)
            {
                var validationMessages = ex.ValidationMessages.ToList();
                var result = validationMessages.GroupBy(m => m.PropertyName).ToDictionary(g => g.Key, g => g.Select(m => m.Message).ToArray());

                Logger.LogWarning(ex, "Validációs hiba történt a szerveren.");
                await SendResponse(context, (int)HttpStatusCode.BadRequest, result);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "Nem várt hiba történt a szerveren.");
                await SendResponse(context, (int)HttpStatusCode.InternalServerError, Environment.IsDevelopment() ? ex.Message : "Nem várt hiba történt a szerveren.");
            }
        }

        private async Task SendResponse(HttpContext context, int? statusCode, object messages = null)
        {
            context.Response.Clear();
            context.Response.StatusCode = statusCode ?? (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";

            await context.Response.WriteAsync(JsonSerializer.Serialize(messages ?? new[] { "Nem várt hiba történt a szerveren." })?.ToString());
        }
    }
}
