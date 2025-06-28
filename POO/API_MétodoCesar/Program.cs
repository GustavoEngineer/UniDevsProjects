using WebAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Agregar controladores
builder.Services.AddControllers();

// Agregar Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registrar servicios
builder.Services.AddScoped<ICesarService, CesarService>();
builder.Services.AddScoped<IDescifrarCesarService, DescifrarCesarService>();

var app = builder.Build();

// Configurar Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API César v1");
    });
}

// Configuración de middleware
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
