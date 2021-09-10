using Microsoft.EntityFrameworkCore.Migrations;

namespace TodoApp.Bll.Migrations
{
    public partial class todotitle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
    
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Todos",
                nullable: true);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
         
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Todos");

        
        }
    }
}
