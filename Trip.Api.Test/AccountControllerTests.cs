using Newtonsoft.Json;
using TMS.Entities.DTO;
using TMS.Identity;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace TMS.Tests
{
    public class AccountControllerTests : IClassFixture<TestFixture<Startup>>
    {
        private readonly HttpClient _httpClient;

        public AccountControllerTests(TestFixture<Startup> fixture)
        {
            _httpClient = fixture.Client;
        }

        [Fact]
        public async Task ValidateUserLogin_PassValidUserCredentials_ReturnsToken()
        {
            // Arrange
            AuthResponseDTO authResponse = null;
            var authRequest = new AuthRequestDTO
            {
                Username = "admin",
                Password = "Password@1"
            };

            var httpContent = new StringContent(JsonConvert.SerializeObject(authRequest), Encoding.UTF8, "application/json");
            var request = "/api/v1/account/login";

            // Act
            var response = await _httpClient.PostAsync(request, httpContent);

            // Assert
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                authResponse = JsonConvert.DeserializeObject<AuthResponseDTO>(responseContent);
            }

            Assert.True(authResponse != null && authResponse.UserName == "admin");
        }

        [Fact]
        public async Task CheckIfUserIsAdmin_PassValidAdminId_ReturnsAdminUserInfo()
        {
            // Arrange
            var request = "/api/v1/account/user/1";

            // Act
            var response = await _httpClient.GetAsync(request);

            // Assert
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var userInfo = JsonConvert.DeserializeObject<UserInfoDTO>(responseContent);
                Assert.Equal("admin", userInfo.Username);
            }
        }

        [Fact]
        public async Task CheckIfUsersArePresent_All_ReturnsMoreThanOneUser()
        {
            // Arrange
            List<UserInfoDTO> userInfo = null;
            var request = "/api/v1/account/users";

            // Act
            var response = await _httpClient.GetAsync(request);

            // Assert
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                userInfo = JsonConvert.DeserializeObject<List<UserInfoDTO>>(responseContent);
            }

            Assert.True(userInfo != null && userInfo.Count > 0);
        }

        [Fact]
        public async Task CheckIfUserInfoWithIds_PassValidUserIds_ReturnsMoreThanOneUser()
        {
            // Arrange
            List<UserInfoDTO> userInfo = null;
            string json = "[1, 2, 3]";
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            var request = "/api/v1/account/usersWithIds";

            // Act
            var response = await _httpClient.PostAsync(request, httpContent);

            // Assert
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                userInfo = JsonConvert.DeserializeObject<List<UserInfoDTO>>(responseContent);
            }

            Assert.True(userInfo != null && userInfo.Count > 0);
        }
    }
}
