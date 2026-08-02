using System;
using Microsoft.Data.SqlClient;

class Program {
    static void Main() {
        try {
            using var conn = new SqlConnection("Server=.;Database=AIStartupCoach;Trusted_Connection=True;TrustServerCertificate=True");
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = "UPDATE ApiKeys SET DefaultModel = 'gemini-flash-latest' WHERE Provider = 'gemini' AND (DefaultModel IS NULL OR DefaultModel != 'gemini-flash-latest')";
            int rows = cmd.ExecuteNonQuery();
            Console.WriteLine($"Updated {rows} API keys to use gemini-flash-latest.");
        } catch (Exception ex) {
            Console.WriteLine(ex.Message);
        }
    }
}
