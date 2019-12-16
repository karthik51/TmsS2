using System.Collections.Generic;
using System.Threading.Tasks;
using Trip.Api.Data;
using Trip.Api.Models;

namespace Trip.Api.Repository
{
    public interface ITripRepository
    {
        Task<IEnumerable<Ride>> GetAllTrips();
        Task<Ride> GetTrip(string id);
        Task Create(Ride ride);
        Task<bool> Update(Ride ride);
        Task<bool> Delete(string id);
    }
}