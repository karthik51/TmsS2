using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using Trip.Api.Data;
using Trip.Api.Models;

namespace Trip.Api.Repository
{
    public class TripRepository : ITripRepository
    {
        private readonly ITripContext _context;

        public TripRepository(ITripContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Ride>> GetAllTrips()
        {
            return await _context
                            .Rides
                            .Find(_ => true)
                            .ToListAsync();
        }

        public Task<Ride> GetTrip(string id)
        {
            FilterDefinition<Ride> filter = Builders<Ride>.Filter.Eq(m => m.Id, id);

            return _context
                    .Rides
                    .Find(filter)
                    .FirstOrDefaultAsync();
        }

        public async Task Create(Ride ride)
        {
            await _context.Rides.InsertOneAsync(ride);
        }

        public async Task<bool> Update(Ride ride)
        {
            ReplaceOneResult updateResult =
                await _context
                        .Rides
                        .ReplaceOneAsync(
                            filter: g => g.Id == ride.Id,
                            replacement: ride);

            return updateResult.IsAcknowledged
                    && updateResult.ModifiedCount > 0;
        }

        public async Task<bool> Delete(string id)
        {
            FilterDefinition<Ride> filter = Builders<Ride>.Filter.Eq(m => m.Id, id);

            DeleteResult deleteResult = await _context
                                                .Rides
                                                .DeleteOneAsync(filter);

            return deleteResult.IsAcknowledged
                && deleteResult.DeletedCount > 0;
        }
    }
}