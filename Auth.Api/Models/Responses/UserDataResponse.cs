﻿using System;
namespace Auth.Api.Models.Responses
{
    public class UserDataResponse
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string RoleId { get; set; }

        public string Email { get; set; }
    }
}
