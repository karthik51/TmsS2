using System;
using System.ComponentModel.DataAnnotations;

namespace Auth.Api.Models.Requests
{
    public class LoginEntity
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
