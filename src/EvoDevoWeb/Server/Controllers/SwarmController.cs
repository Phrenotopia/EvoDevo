using EvoDevoCore.Logic;
using EvoDevoCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace EvoDevoWeb.Controllers
{
    public class SwarmController : ApiController
    {
        private List<Swarm> allswarms;
        
        public SwarmController()
        {
            allswarms = WorldHolder.GetSwarms();
        }

        // GET: api/Swarm
        public IEnumerable<Swarm> Get()
        {
            return allswarms;
        }

        // GET: api/Swarm/5
        public IHttpActionResult Get(int id)
        {
            var swarm = allswarms.FirstOrDefault((s) => s.Id == id);
            if (swarm == null)
            {
                return NotFound();
            }
            return Ok(swarm);
        }

        // GET: api/Swarm/bag/area/1
        public IHttpActionResult GetByBag(string bagtype, string bagid)
        {
            //var player = allplayers.FirstOrDefault((s) => s.UserName.ToLower() == name.ToLower());
            //if (player == null)
            //{
            //    return NotFound();
            //}
            //return Ok(player);
            return null;
        }

        // POST: api/Swarm
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Swarm/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Swarm/5
        public void Delete(int id)
        {
        }
    }
}
