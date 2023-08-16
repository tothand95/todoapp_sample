using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using TodoApp.Bll.DbContext;
using TodoApp.Bll.Managers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using TodoApp.Bll.Entities;
using TodoApp.Web.Middlewares;
using Microsoft.Extensions.Logging;
using TodoApp.Bll.Managers.Interfaces;

namespace TodoApp.Web
{
  public class Startup
  {
    private IConfiguration Configuration { get; }
    private static string CorsPolicyName => "EnableCORS";

    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }


    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllersWithViews();
      services.AddLogging(builder => builder.AddConsole());
      services.AddScoped<IAuthManager, AuthManager>();
      services.AddScoped<ITodoManager, TodoManager>();
      services.AddDbContext<TodoDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DbContext")));
      services.AddAuthentication(x =>
        {
          x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
          x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(x =>
        {
          x.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey123123123")),
            ValidIssuer = "https://localhost:44353",
            ValidAudience = "https://localhost:4200"
          };
        });

      services.Configure<IdentityOptions>(options =>
      {
        // Password settings.
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = true;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        options.Password.RequiredLength = 5;
        options.Password.RequiredUniqueChars = 0;

        // Lockout settings.
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.AllowedForNewUsers = true;

        // User settings.
        options.User.AllowedUserNameCharacters =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
        options.User.RequireUniqueEmail = true;
      });

      services.AddIdentity<ApplicationUser, IdentityRole>()
        .AddRoleManager<RoleManager<IdentityRole>>()
        .AddDefaultTokenProviders()
        .AddEntityFrameworkStores<TodoDbContext>();

      // In production, the Angular files will be served from this directory
      services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/dist"; });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
      {
        var context = serviceScope.ServiceProvider.GetRequiredService<TodoDbContext>();
        context.Database.Migrate();
      }

      //if (env.IsDevelopment())
      //{
      //    app.UseDeveloperExceptionPage();
      //}
      //else
      //{
      //    app.UseExceptionHandler("/Error");
      //    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
      //    app.UseHsts();
      //}
      app.UseMiddleware<ExceptionHandlingMiddleware>();
      app.UseRouting();

      app.UseHttpsRedirection();
      app.UseStaticFiles();

      if (!env.IsDevelopment())
      {
        app.UseSpaStaticFiles();
      }
      else
      {
        app.UseCors(builder => { builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod(); });
      }


      app.UseAuthentication();
      app.UseAuthorization();
      app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
      // app.UseSpa(spa =>
      // {
      //   // To learn more about options for serving an Angular SPA from ASP.NET Core,
      //   // see https://go.microsoft.com/fwlink/?linkid=864501
      //
      //   spa.Options.SourcePath = "ClientApp";
      //
      //   if (env.IsDevelopment())
      //   {
      //     spa.UseAngularCliServer(npmScript: "start");
      //   }
      // });
    }
  }
}