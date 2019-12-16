using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Trip.Api.Models;

namespace Trip.Api.Data
{
    public class TripContext : ITripContext
    {
        private readonly IMongoDatabase _db;

        public TripContext(IOptions<Settings> options, IMongoClient client)
        {
            _db = client.GetDatabase(options.Value.Database);
        }

        public IMongoCollection<Ride> Rides => _db.GetCollection<Ride>("Rides");
        public IMongoCollection<Game> Games => _db.GetCollection<Game>("Games");
    }
}