using Microsoft.EntityFrameworkCore;
using ProyectoBinas.Infrastructure.Data;
using ProyectoBinas.Core.Interfaces;
using ProyectoBinas.Infrastructure.Repositories;
using ProyectoBinas.Application.Services;
using Microsoft.OpenApi.Models;
using System.Reflection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Configure Entity Framework with MySQL
builder.Services.AddDbContext<PalindromoDbContext>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection") ?? ""));

// Dependency Injection - Repository Pattern
builder.Services.AddScoped<IPalindromoRepository, PalindromoRepository>();
builder.Services.AddScoped<PalindromoService>();

// Dependency Injection - Números
builder.Services.AddScoped<INumeroRepository, NumeroRepository>();
builder.Services.AddScoped<INumeroService, NumeroService>();

// Configurar CORS para permitir solo la IP 187.155.101.200
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy => policy.WithOrigins("http://187.155.101.200", "https://187.155.101.200")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// Configuración de clave secreta para JWT
var jwtSecretKey = "SuperSecretKeyForJwtToken1234567890!@#"; // 32+ caracteres
var key = Encoding.ASCII.GetBytes(jwtSecretKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero // Sin tolerancia extra
    };
});

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Proyecto Binas API",
        Version = "v1",
        Description = "API para gestión y verificación de palíndromos y números pares/impares",
        Contact = new OpenApiContact
        {
            Name = "Desarrollador",
            Email = "desarrollador@ejemplo.com"
        },
        License = new OpenApiLicense
        {
            Name = "MIT",
            Url = new Uri("https://opensource.org/licenses/MIT")
        }
    });

    // Incluir comentarios XML para documentación
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

    // Verificar que el archivo XML existe antes de incluirlo
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }

    // Configuración de autenticación JWT para Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Ingrese el token JWT como: Bearer {token}",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Proyecto Binas API V1");
        c.RoutePrefix = "swagger"; // Swagger UI estará disponible en /swagger
        c.DocumentTitle = "Proyecto Binas API - Documentación";
        c.DefaultModelsExpandDepth(-1); // Ocultar modelos por defecto
        c.DisplayRequestDuration(); // Mostrar duración de requests
    });

app.UseRouting();

// Endpoint raíz
app.MapGet("/", () => "¡API de Proyecto Binas funcionando! Visita /swagger para la documentación");

// Usar CORS
app.UseCors("AllowSpecificOrigin");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
