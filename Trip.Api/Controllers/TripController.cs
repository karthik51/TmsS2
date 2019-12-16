using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Trip.Api.Models;
using Trip.Api.Repository;

namespace Trip.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Trip")]
    public class TripController : Controller
    {
        private readonly ITripRepository _tripRepository;

        public TripController(ITripRepository tripRepository)
        {
            _tripRepository = tripRepository;
        }

        // GET: api/Trip
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return new ObjectResult(await _tripRepository.GetAllTrips());
        }

        // GET: api/Trip/id
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(string id)
        {
            var trip = await _tripRepository.GetTrip(id);

            if (trip == null)
                return new NotFoundResult();

            return new ObjectResult(trip);
        }

        // POST: api/Trip
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Ride ride)
        {
            await _tripRepository.Create(ride);
            return new OkObjectResult(ride);
        }

        // PUT: api/Trip/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]Ride ride)
        {
            var tripFromDb = await _tripRepository.GetTrip(id);

            if (tripFromDb == null)
                return new NotFoundResult();

            ride.Id = tripFromDb.Id;

            await _tripRepository.Update(ride);

            return new OkObjectResult(ride);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var tripFromDb = await _tripRepository.GetTrip(id);

            if (tripFromDb == null)
                return new NotFoundResult();

            await _tripRepository.Delete(id);

            return new OkResult();
        }
    }
}
