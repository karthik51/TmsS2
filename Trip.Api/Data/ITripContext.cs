using MongoDB.Driver;
using Trip.Api.Models;

namespace Trip.Api.Data
{
    public interface ITripContext
    {
        IMongoCollection<Game> Games { get; }
        IMongoCollection<Ride> Rides { get; }
    }
}