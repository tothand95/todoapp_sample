using Microsoft.EntityFrameworkCore.Migrations;

namespace TodoApp.Bll.Migrations
{
    public partial class seed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "33fd90c8-5902-4c9b-8e29-bbd634709777", "0b917915-3a30-46c9-9a8e-44688ee32e7f", "Admin", null });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "eafa49c3-edaf-4985-aa36-03dd3a73ebbe", "29ea4ee3-c32d-4b03-9c57-bdbebef4f1b1", "User", null });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "ProfilePicture", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "56186f3e-b359-4484-9a9f-4da36afc9e09", 0, "a44cb7a4-9571-41f0-99a0-4a7231b12abe", null, false, false, null, null, null, "AQAAAAEAACcQAAAAEFAO039H6ONoHiuHDZX/PWjO36SmQUA45jgCOQ/y0Rzw+YbtCf9tT92ftl5AQEsKxw==", null, false, null, "df12a013-c04b-4110-80cc-85510d067dbb", false, "Admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId" },
                values: new object[] { "56186f3e-b359-4484-9a9f-4da36afc9e09", "33fd90c8-5902-4c9b-8e29-bbd634709777" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eafa49c3-edaf-4985-aa36-03dd3a73ebbe");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "56186f3e-b359-4484-9a9f-4da36afc9e09", "33fd90c8-5902-4c9b-8e29-bbd634709777" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "33fd90c8-5902-4c9b-8e29-bbd634709777");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "56186f3e-b359-4484-9a9f-4da36afc9e09");
        }
    }
}
