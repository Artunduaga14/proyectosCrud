using Business.services;
using Data.repositories.Global;
using Entity.DTOs;
using Entity.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using Utilities.Extensions;

[ApiController]
[Route("api/[controller]")]
public class EjemploController : ControllerBase
{
    private readonly UserData _userData;
    private readonly LogBusiness _logBusiness;
    private readonly ILogger<EjemploController> _logger; // Opcional, para depuración

    public EjemploController(
        UserData userData,
        LogBusiness logBusiness,
        ILogger<EjemploController> logger = null)
    {
        _userData = userData;
        _logBusiness = logBusiness;
        _logger = logger;
    }

    [HttpPut("actualizar-usuario")]
    public IActionResult ActualizarUsuario(UserDto dto)
    {
        try
        {
            // Validación básica
            if (dto == null || dto.Id <= 0)
            {
                return BadRequest("Datos de usuario inválidos");
            }

            // Obtener datos originales
            var usuarioAntes = _userData.ObtenerPorId(dto.Id);
            if (usuarioAntes == null)
            {
                return NotFound($"No se encontró el usuario con ID {dto.Id}");
            }

            // Convertir y actualizar
            var user = dto.ToEntity();
            _userData.Actualizar(user);

            // Obtener datos actualizados
            var usuarioDespues = _userData.ObtenerPorId(dto.Id);

            // Registrar en log
            _logBusiness.LogAction(
                userId: dto.UsuarioAccion,
                accion: "UPDATE",
                entidad: "Usuario",
                antes: JsonConvert.SerializeObject(usuarioAntes),
                despues: JsonConvert.SerializeObject(usuarioDespues),
                ip: HttpContext.Connection.RemoteIpAddress?.ToString() ?? "127.0.0.1"
            );

            return Ok(new { message = "Usuario actualizado correctamente" });
        }
        catch (Exception ex)
        {
            // Registrar el error
            _logger?.LogError(ex, "Error al actualizar usuario");

            // También podemos registrar en nuestro log personalizado
            try
            {
                _logBusiness.LogAction(
                    userId: dto?.UsuarioAccion ?? 0,
                    accion: "ERROR",
                    entidad: "Usuario",
                    antes: "",
                    despues: $"Error: {ex.Message}",
                    ip: HttpContext.Connection.RemoteIpAddress?.ToString() ?? "127.0.0.1"
                );
            }
            catch
            {
                // Ignorar errores al registrar errores para evitar loops
            }

            return StatusCode(500, "Error al procesar la solicitud");
        }
    }
}