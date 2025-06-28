using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
// Asegúrate de tener la clase Manga definida en tu proyecto

public static class MySQLSaver
{
    public static void GuardarMangas(List<Manga> mangas)
    {
        string connectionString = "server=localhost;database=MangasDB;uid=root;pwd=Pirixito@27;";

        try
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                Console.WriteLine("✅ Conexión exitosa a MySQL.");

                string query = @"INSERT INTO mangas (Nombre, Autor, Fecha_Publicacion, Fecha_Emision) 
                                VALUES (@nombre, @autor, @fpub, @femi)";

                using (MySqlCommand cmd = new MySqlCommand(query, conn))
                {
                    foreach (var m in mangas)
                    {
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@nombre", m.Nombre);
                        cmd.Parameters.AddWithValue("@autor", m.Autor);
                        cmd.Parameters.AddWithValue("@fpub", m.Fecha_Publicacion ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@femi", m.Fecha_Emision ?? (object)DBNull.Value);
                        cmd.ExecuteNonQuery();
                    }
                }

                Console.WriteLine("✅ Inserción completada con éxito.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("❌ Error al insertar en MySQL: " + ex.Message);
        }
    }
}
