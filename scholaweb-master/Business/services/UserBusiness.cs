using AutoMapper;
using Data.factories;
using Entity.DTOs;
using Entity.Model;
using Microsoft.Extensions.Logging;
using Utilities.Exeptions;

namespace Business.services
{
    public class UserBusiness : GenericBusiness<User, UserDto>
    {
        public UserBusiness(IDataFactoryGlobal factory, ILogger<User> logger, IMapper mapper) : base(factory.CreateUserData(), logger, mapper)
        {

        }

        protected override void Validate(UserDto user)
        {
            if (user == null)
                throw new ValidationException("El formulario no puede ser nulo.");

            if (string.IsNullOrWhiteSpace(user.UserName))
                throw new ValidationException("El título del formulario es obligatorio.");

            // Agrega más validaciones si necesitas
        }

    }
}
