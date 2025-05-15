using Business;
using Business.services;
using Data;
using Data.factories;
using Data.repositories.Global;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Web;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:4200/") // frontend aquí
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


// Add services to the container.
builder.Services.AddControllers();

// db disponibles
//MySQL
//SQLServer
//PgAdmin

builder.Services.AddAuthorization();

builder.Services.AddScoped<IDataFactoryGlobal, GlobalFactory>();

builder.Services.AddDataAccessFactory("SQLServer", builder.Configuration);
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<UserData>();
builder.Services.AddScoped<UserRolData>();
builder.Services.AddScoped<PersonBusiness>();
//builder.Services.AddScoped<UserBusiness>();
builder.Services.AddScoped<RolBusiness>();
builder.Services.AddScoped<FormBusiness>();
builder.Services.AddScoped<ModuleBusiness>();
builder.Services.AddScoped<ModuleFormBusiness>();
builder.Services.AddScoped<UserBusiness>();
builder.Services.AddScoped<UserRolBusiness>();
builder.Services.AddScoped<RolFormPermissionBusiness>();
builder.Services.AddScoped<PermissionBusiness>();




builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(typeof(Helper.MappingProfile));

// Agrega la política CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configuración de JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        //var jwtSettings = builder.Configuration.GetSection("JwtSettings");
        //Console.WriteLine("JWT SecretKey configurada: " + (string.IsNullOrEmpty(jwtSettings["SecretKey"]) ? "NO DISPONIBLE" : "DISPONIBLE"));

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
            IssuerSigningKey = new SymmetricSecurityKey
                (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

builder.Services.AddAuthorization();


var app = builder.Build();
  
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Web v1"));

app.Use(async (context, next) =>
{
    if (context.Request.Path == "/")
    {
        context.Response.Redirect("/swagger");
        return;
    }
    await next();
});


app.UseCors();
app.UseAuthorization();
app.MapControllers();
app.Run();
app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
