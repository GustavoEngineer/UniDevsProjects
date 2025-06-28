using MySql.Data.MySqlClient;
using System;
using System.Threading.Tasks;

namespace StarTrekDataGenerator.Services
{
    public class MySqlService
    {
        private readonly string _connectionString;

        public MySqlService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task ExecuteScriptAsync(string script)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                try
                {
                    await connection.OpenAsync();
                    Console.WriteLine("Successfully connected to MySQL database.");

                    using (var command = new MySqlCommand(script, connection))
                    {
                        // Split script into individual commands if needed, but MySqlCommand can often handle multi-statements
                        // However, for CREATE TABLE and INSERT, it's safer to execute separately or ensure no semicolons within data.
                        // For simplicity, we assume the script generator outputs valid multi-statements or we use one query per operation.
                        // MySql.Data's command.ExecuteNonQuery() often handles multiple statements separated by semicolons.
                        await command.ExecuteNonQueryAsync();
                    }
                    Console.WriteLine("SQL script executed successfully.");
                }
                catch (MySqlException ex)
                {
                    Console.WriteLine($"MySQL Error: {ex.Message}");
                    Console.WriteLine($"SQL State: {ex.SqlState}");
                    Console.WriteLine($"Error Code: {ex.ErrorCode}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An unexpected error occurred: {ex.Message}");
                }
                finally
                {
                    if (connection.State == System.Data.ConnectionState.Open)
                    {
                        await connection.CloseAsync();
                    }
                }
            }
        }

        public async Task CreateDatabaseIfNotExistsAsync(string dbName)
        {
            var tempConnectionString = new MySqlConnectionStringBuilder(_connectionString)
            {
                Database = "" // Connect to server, not a specific database
            }.ToString();

            using (var connection = new MySqlConnection(tempConnectionString))
            {
                try
                {
                    await connection.OpenAsync();
                    using (var command = new MySqlCommand($"CREATE DATABASE IF NOT EXISTS `{dbName}`", connection))
                    {
                        await command.ExecuteNonQueryAsync();
                        Console.WriteLine($"Database '{dbName}' ensured to exist.");
                    }
                }
                catch (MySqlException ex)
                {
                    Console.WriteLine($"Error creating database: {ex.Message}");
                }
            }
        }
    }
}