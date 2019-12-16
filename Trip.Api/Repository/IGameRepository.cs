using System.Collections.Generic;
using System.Threading.Tasks;
using Trip.Api.Data;
using Trip.Api.Models;

namespace Trip.Api.Repository
{
    public interface IGameRepository
    {
        Task<IEnumerable<Game>> GetAllGames();
        Task<Game> GetGame(string name);
        Task Create(Game game);
        Task<bool> Update(Game game);
        Task<bool> Delete(string name);
    }
}