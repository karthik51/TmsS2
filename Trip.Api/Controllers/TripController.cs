using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Trip.Api.Helpers;
using Trip.Api.Repository;

namespace Trip.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/v1/Trip")]
    public class TripController : Controller
    {
        private readonly ITripRepository _tripRepository;

        public TripController(ITripRepository tripRepository)
        {
            _tripRepository = tripRepository;
        }

        // GET: api/Trip
        [HttpGet]
        //[Authorize(Roles = Constants.RoleNames.ADMIN)]
        public async Task<IActionResult> Get()
        {
            return new ObjectResult(await _tripRepository.GetAllTrips());
        }

        // GET: api/Trip/username
        [HttpGet("TripsForEmployee")]
       // [Authorize(Roles = Constants.RoleNames.EMPLOYEE)]
        public async Task<IActionResult> GetTripsForEmployee(string username)
        {
            var trip = await _tripRepository.GetTripDriver(username);

            if (trip == null)
                return new NotFoundResult();

            return new ObjectResult(trip);
        }

        // GET: api/Trip/name
        [HttpGet("TripsByCustomer")]
       // [Authorize(Roles = Constants.RoleNames.CUSTOMER)]
        public async Task<IActionResult> GetTripsByCustomer(string name)
        {
            var trip = await _tripRepository.GetTripCustomer(name);

            if (trip == null)
                return new NotFoundResult();

            return new ObjectResult(trip);
        }       
    }
}
