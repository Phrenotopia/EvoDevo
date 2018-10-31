using EvoDevo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace EvoDevo.Controllers
{
    public class PlayerController : ApiController
    {
        Player[] allplayers = new Player[]
        {
            new Player { Id = 1, FullName = "Fedor Steeman", UserName = "Fedor" },
            new Player { Id = 2, FullName = "Liam Steeman", UserName = "Cave" },
            new Player { Id = 2, FullName = "Mette Steeman", UserName = "Mette" }
        };

        // GET: api/Player
        public IEnumerable<Player> Get()
        {
            return allplayers;
        }

        // GET: api/Player/5
        public IHttpActionResult Get(int id)
        {
            var player = allplayers.FirstOrDefault((s) => s.Id == id);
            if (player == null)
            {
                return NotFound();
            }
            return Ok(player);
        }

        // GET: api/Player/name/johndoe
        public IHttpActionResult GetByName(string name)
        {
            var player = allplayers.FirstOrDefault((s) => s.UserName.ToLower() == name.ToLower());
            if (player == null)
            {
                return NotFound();
            }
            return Ok(player);
        }

        // POST: api/Player
        public void Post([FromBody]string value)
        {
            
        }

        // PUT: api/Player/5
        public String Put(int id, [FromBody]string value)
        {
            Console.WriteLine("test:" + id);
            return "OK";
        }

        // DELETE: api/Player/5
        public void Delete(int id)
        {
        }
    }
}
