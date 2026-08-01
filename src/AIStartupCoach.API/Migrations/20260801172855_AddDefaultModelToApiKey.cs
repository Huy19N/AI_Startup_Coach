using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AIStartupCoach.API.Migrations
{
    /// <inheritdoc />
    public partial class AddDefaultModelToApiKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DefaultModel",
                table: "ApiKeys",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DefaultModel",
                table: "ApiKeys");
        }
    }
}
