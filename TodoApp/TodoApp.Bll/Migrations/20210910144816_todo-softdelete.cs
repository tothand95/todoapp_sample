using Microsoft.EntityFrameworkCore.Migrations;

namespace TodoApp.Bll.Migrations
{
    public partial class todosoftdelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
 
            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "Todos",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Todos",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
       
            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Todos");

         
        }
    }
}
