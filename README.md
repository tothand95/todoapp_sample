# TodoApp_SampleProject

Todo managing web application created with ASP.NET Core 3.1 and Angular 8 technologies.

Optional extra tasks completed:
- Register and Login feature with username and password using an enhanced IdentityDbContext. (Users created by admin have a default password.)
- Role based authorization for API calls. There are two roles currently: Admin and User.
- Logging to console.
- Angular frontend with ~90% functionality and minor bugs.
- Database migration on startup
- Database seeding. Application is ready to use after the first launch  without additional database manipulation.

Currently the application is configured to run on a localhost IIS config with MSSQL localdb.

Launching steps:
- Having .NET Core 3.1, npm, angular 8, and node.js (I am currently using v10.22.0 node)
- Full build for all projects with restored packages
- "npm install" for TodoApp.Web/ClientApp
- "ng build" for TodoApp.Web/ClientApp
- Start solution with IIS Express. TodoApp.Web has to be the startup project.
- (Database should be up and working automatically, if not: run the "Update-Database" command with the Package Manager Console on the TodoApp.Bll project. The git repo also has sql scripts for creating the initial database.)
- You can Register a user with the User role, or sign in with the Admin/Password01 credentials
