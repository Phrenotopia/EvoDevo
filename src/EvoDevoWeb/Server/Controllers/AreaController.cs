using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web;
using EvoDevoCore.Models;
using EvoDevoCore.Logic;

namespace EvoDevoWeb.Controllers
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

        // GetByBagApi
        //GET: api/Area/bag/'region'/0
        public IHttpActionResult GetByBagApi(String bagtype, long bagid)
        {
            //if (bagid >= 0)
            //{
            //    var map = maps.FirstOrDefault((s) => s.Areas.Region.Id == bagid);
            //}
            //if (map == null)
            //{
            //    return NotFound();
            //}
            //return Ok(map);
            throw new NotImplementedException();
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
