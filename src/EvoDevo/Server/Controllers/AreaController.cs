using EvoDevo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web;
using EvoDevo.Logic;

namespace EvoDevo.Controllers
{
    public class AreaController : ApiController
    {
        private List<Area> areas;
        
        public AreaController()
        {
            areas = WorldHolder.GetAreas();
        }
        
        // GET: api/Area
        public IEnumerable<Area> Get()
        {
            return areas;
        }

        // GET: api/Area/5
        public IHttpActionResult Get(int id)
        {
            var area = areas.FirstOrDefault((s) => s.Id == id);
            if (area == null)
            {
                return NotFound();
            }
            return Ok(area);
        }

        // POST: api/Area
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Area/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Area/5
        public void Delete(int id)
        {
        }
    }
}
