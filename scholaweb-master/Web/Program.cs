using Web.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCustomServices(builder.Configuration);
builder.Services.AddSwaggerDocumentation();
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddCorsPolicy();
builder.Services.AddDbContextService(builder.Configuration);

var app = builder.Build();




// Inicializar datos
app.InitializeDatabase();

// Middleware
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Web v1"));
app.UseHttpsRedirection();
app.UseCors("AllowAngularOrigin");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.RedirectRootToSwagger();

app.Run();
