using System;
using AspNetCore.Identity.Mongo;

namespace Auth.Api.Models.Identity
{
    //Add any custom field for a user
    public class ApplicationUser : MongoIdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }               

        public string RoleId { get; set; }

        
    }
}
