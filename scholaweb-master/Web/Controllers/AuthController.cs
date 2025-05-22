using Business.services;
using Entity.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using Utilities.Exeptions;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly ILogger<AuthController> _logger;
        public AuthController(AuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            try
            {
                var token = await _authService.CreateToken(login);
                if (token == null)
                    return Unauthorized("Credenciales Invalidas");
                return Ok(new { token = token });
            }
            catch (ValidationException ex)
            {
                _logger.LogWarning(ex, "Validación fallida para el inicio de sesión");
                return BadRequest(new { message = ex.Message });
            }
            catch (ExternalServiceException ex)
            {
                _logger.LogError(ex, "Error al crear el token");
                return StatusCode(500, new { message = ex.Message });
            }
        }


    }
}
