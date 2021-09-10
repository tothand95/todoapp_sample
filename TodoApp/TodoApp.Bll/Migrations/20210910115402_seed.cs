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
                values: new object[] { "88f38ed3-a06c-4abc-9887-ec95d43452ee", "d10e99b1-85e8-4ce6-821a-4560a18d3c54", "Admin", null });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "289ec51e-2292-491c-a3a6-6c59b5ac9396", "926d76dc-f913-43d6-924f-0cc87cfc63bc", "User", null });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "ProfilePicture", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "07ab9ded-9390-44ef-8da6-ae2dc6c22b86", 0, "ac80633e-9f91-4478-91c7-85ccc0c7b300", null, false, false, null, null, "ADMIN", "AQAAAAEAACcQAAAAEBY+kiASOK5mvVL6hTfchK6gSdqDdiqrm/aLX6EJLAar1Ha6o7IsbapdqBwJzF5ZZA==", null, false, null, "64c71dd8-a883-4033-8e26-6ebd9a2ff53d", false, "Admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId" },
                values: new object[] { "07ab9ded-9390-44ef-8da6-ae2dc6c22b86", "88f38ed3-a06c-4abc-9887-ec95d43452ee" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "289ec51e-2292-491c-a3a6-6c59b5ac9396");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "07ab9ded-9390-44ef-8da6-ae2dc6c22b86", "88f38ed3-a06c-4abc-9887-ec95d43452ee" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "88f38ed3-a06c-4abc-9887-ec95d43452ee");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "07ab9ded-9390-44ef-8da6-ae2dc6c22b86");
        }
    }
}
