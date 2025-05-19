using Business.services;
using Data.repositories.Global;
using Entity.DTOs;
using Entity.Model;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Utilities.Extensions;


[ApiController]
[Route("api/[controller]")]
public class EjemploController : ControllerBase
{
    private readonly UserData _userData;
    private readonly LogBusiness _logBusiness;

    public EjemploController(UserData userData, LogBusiness logBusiness)
    {
        _userData = userData;
        _logBusiness = logBusiness;
    }

    [HttpPut("actualizar-usuario")]
    public IActionResult ActualizarUsuario(UserDto dto)
    {
        var usuarioAntes = _userData.ObtenerPorId(dto.Id);

        var user = dto.ToEntity();

        _userData.Actualizar(user);

        var usuarioDespues = _userData.ObtenerPorId(dto.Id);

        _logBusiness.LogAction(
            userId: dto.UsuarioAccion,
            accion: "UPDATE",
            entidad: "Usuario",
            antes: JsonConvert.SerializeObject(usuarioAntes),
            despues: JsonConvert.SerializeObject(usuarioDespues),
            ip: HttpContext.Connection.RemoteIpAddress?.ToString() ?? ""
        );

        return Ok();
    }

}
