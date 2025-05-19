using Entity.DTOs;
using Entity.Model;

namespace Utilities.Extensions
{
    public static class UserExtensions
    {
        public static User ToEntity(this UserDto dto)
        {
            return new User
            {
                Id = dto.Id,
                UserName = dto.UserName,
                Password = dto.Password,
                Status = dto.Status,
                PersonId = dto.PersonId
            };
        }

        public static UserDto ToDto(this User user)
        {
            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Password = user.Password,
                Status = user.Status,
                PersonId = user.PersonId
            };
        }
    }
}
