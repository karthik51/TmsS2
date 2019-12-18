using Newtonsoft.Json;
using TMS.Entities.DTO;
using TMS.Vehicle;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace TMS.Tests
{
    public class RegistrationControllerTests : IClassFixture<TestFixture<Startup>>
    {
        private readonly HttpClient _httpClient;

        public RegistrationControllerTests(TestFixture<Startup> fixture)
        {
            _httpClient = fixture.Client;
        }

        [Fact]
        public async Task GetVehicleCategories_All_ReturnsAllVehicleCategories()
        {
            // Arrange
            List<VehicleCategoryDTO> vehicleCategories = null;
            var request = "api/v1/registration/vehicleCategories";

            // Act
            var response = await _httpClient.GetAsync(request);

            // Assert
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                vehicleCategories = JsonConvert.DeserializeObject<List<VehicleCategoryDTO>>(responseContent);
            }

            Assert.True(vehicleCategories != null && vehicleCategories.Count > 0);
        }

        [Fact]
        public async Task GetVehicleCategoryById_PassValidVehicleCategoryId_ReturnsVehicleCategory()
        {
            // Arrange
            VehicleCategoryDTO vehicleCategory = null;
            var request = "api/v1/registration/vehicleCategory/1";

            // Act
            var response = await _httpClient.GetAsync(request);

            // Assert
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                vehicleCategory = JsonConvert.DeserializeObject<VehicleCategoryDTO>(responseContent);
            }

            Assert.True(vehicleCategory != null && vehicleCategory.VehicleCategoryType.ToLower() == "auto");
        }
    }
}
