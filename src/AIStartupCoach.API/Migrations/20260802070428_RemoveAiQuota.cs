using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AIStartupCoach.API.Migrations
{
    /// <inheritdoc />
    public partial class RemoveAiQuota : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AiQuota",
                table: "AspNetUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AiQuota",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
