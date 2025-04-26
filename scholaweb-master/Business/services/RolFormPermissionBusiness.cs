using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Data.factories;
using Data.repositories.Global;
using Entity.DTOs;
using Entity.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Utilities.Exeptions;
using static Dapper.SqlMapper;

namespace Business.services
{
    public class RolFormPermissionBusiness : GenericBusiness<RolFormPermission, RolFormPermissionDto>
    {
        public RolFormPermissionBusiness
            (IDataFactoryGlobal factory, ILogger<RolFormPermission> logger, IMapper mapper) : base(factory.CreateRolFormPermissionData(), logger, mapper)
        {

        }

        protected override void Validate(RolFormPermissionDto rolFormPermissionDto)
        {
            if (rolFormPermissionDto == null)
                throw new ValidationException("El formulario no puede ser nulo.");

            //if (string.IsNullOrWhiteSpace(rolFormPermissionDto.Name))
            //    throw new ValidationException("El título del formulario es obligatorio.");

            // Agrega más validaciones si necesitas
        }

        protected void Validate(RolFormPermissionCreateDto rolFormPermissionDto)
        {
            if (rolFormPermissionDto == null)
                throw new ValidationException("El formulario no puede ser nulo.");

            //if (string.IsNullOrWhiteSpace(rolFormPermissionDto.Name))
            //    throw new ValidationException("El título del formulario es obligatorio.");

            // Agrega más validaciones si necesitas
        }

        public async Task<RolFormPermissionCreateDto> CreateAsyncNew(RolFormPermissionCreateDto dtoExp)
        {
            try
            {
                Validate(dtoExp);
                var entity = _mapper.Map<RolFormPermission>(dtoExp);
                var created = await _data.CreateAsyncLinq(entity);
                return _mapper.Map<RolFormPermissionCreateDto>(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al crear el RolFormPermission {dtoExp.Id}");
                throw new ExternalServiceException("Base de datos", $"Error al crear {dtoExp.Id}", ex);
            }
        }

        public async Task<RolFormPermissionCreateDto> UpdateNew(RolFormPermissionCreateDto dtoExp)
        {
            if (dtoExp == null)
                throw new ValidationException("Entidad", $"{dtoExp.Id} no puede ser nulo");

            try
            {
                Validate(dtoExp);


                if (dtoExp.Id == null || dtoExp.Id <= 0)
                    throw new ValidationException("Id", "El ID debe ser mayor que cero");

                var entity = _mapper.Map<RolFormPermission>(dtoExp);
                var updated = await _data.UpdateAsyncLinq(entity);

                if (!updated)
                    throw new ExternalServiceException("Base de datos", $"No se pudo actualizar {dtoExp.Id}");

                return dtoExp;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al actualizar {dtoExp.Id}");
                throw new ExternalServiceException("Base de datos", $"Error al actualizar {dtoExp.Id}", ex);
            }
        }


    }
}
