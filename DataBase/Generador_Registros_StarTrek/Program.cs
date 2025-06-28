using Microsoft.Extensions.Configuration;
using StarTrekDataGenerator.Services;
using System;
using System.IO;
using System.Threading.Tasks;

namespace StarTrekDataGenerator
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Star Trek Data Generator Started!");

            // Prueba rápida del nuevo cliente DataTrek
            var stapiClient = new StapiClient();
            Console.WriteLine("\nObteniendo los primeros 5 títulos de páginas de DataTrek...");
            var pages = await stapiClient.GetAllPagesAsync(5);
            foreach (var title in pages)
            {
                Console.WriteLine($"- {title}");
            }
            if (pages.Count > 0)
            {
                Console.WriteLine($"\nExtracto de la primera página ({pages[0]}):");
                var extract = await stapiClient.GetPageExtractAsync(pages[0]);
                Console.WriteLine(extract);
            }
            Console.WriteLine("\nFin de la prueba de DataTrek.\n");

            // 1. Build configuration (to read connection string from appsettings.json)
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();

            string? connectionString = configuration.GetConnectionString("DefaultConnection");
            if (string.IsNullOrEmpty(connectionString))
            {
                Console.WriteLine("Error: Connection string 'DefaultConnection' not found in appsettings.json.");
                return;
            }

            // Extract database name from connection string for CREATE DATABASE statement
            var dbNameBuilder = new MySql.Data.MySqlClient.MySqlConnectionStringBuilder(connectionString);
            string databaseName = dbNameBuilder.Database;

            // 2. Initialize Services
            var dataGenerator = new DataGenerator(stapiClient);
            var sqlGenerator = new SqlScriptGenerator(databaseName);
            var mysqlService = new MySqlService(connectionString);

            // 3. Generate Data
            Console.WriteLine("Starting data generation process...");
            var generatedData = dataGenerator.GenerateStarTrekData(targetTotalRecords: 700);

            Console.WriteLine($"Total records generated across all tables: {generatedData.TotalRecords}");

            // 4. Generate SQL Script
            Console.WriteLine("Generating SQL CREATE TABLE script...");
            string createTableScript = sqlGenerator.GenerateCreateTablesScript();
            string createTableFilePath = "StarTrek_CreateTables.sql";
            await File.WriteAllTextAsync(createTableFilePath, createTableScript);
            Console.WriteLine($"CREATE TABLE script saved to: {createTableFilePath}");

            Console.WriteLine("Generating SQL INSERT INTO script...");
            string insertDataScript = sqlGenerator.GenerateInsertStatements(generatedData);
            string insertDataFilePath = "StarTrek_InsertData.sql";
            await File.WriteAllTextAsync(insertDataFilePath, insertDataScript);
            Console.WriteLine($"INSERT INTO script saved to: {insertDataFilePath}");

            // 5. Optional: Connect and Execute SQL
            Console.WriteLine("\nAttempting to connect to MySQL and execute scripts...");
            Console.WriteLine($"Ensuring database '{databaseName}' exists...");
            await mysqlService.CreateDatabaseIfNotExistsAsync(databaseName);

            Console.WriteLine("Executing CREATE TABLE script directly...");
            await mysqlService.ExecuteScriptAsync(createTableScript);

            Console.WriteLine("Executing INSERT INTO script directly...");
            await mysqlService.ExecuteScriptAsync(insertDataScript);

            Console.WriteLine("\nStar Trek Data Generation Completed!");
            Console.WriteLine("Press any key to exit.");
            Console.ReadKey();
        }
    }
}