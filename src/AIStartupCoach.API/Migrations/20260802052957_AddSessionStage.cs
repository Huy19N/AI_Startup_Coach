using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AIStartupCoach.API.Migrations
{
    /// <inheritdoc />
    public partial class AddSessionStage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Stage",
                table: "ChatSessions",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Stage",
                table: "ChatSessions");
        }
    }
}
