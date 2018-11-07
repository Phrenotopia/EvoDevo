using EvoDevo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web;
using EvoDevo.Logic;
using EvoDevo.Server.Controllers;

namespace EvoDevo.Controllers
{
    public class MapController : ApiController
    {
        private List<Map> maps;
        private Map map;

        public MapController()
        {
            map = WorldHolder.GetMap();
            maps = MapHolder.Maps;
        }
        
        // GET: api/Map
        public IEnumerable<Map> Get()
        {
            return maps;
        }

        // GET: api/Map/5
        public IHttpActionResult Get(int id)
        {
            if(id > 0)
            {
                var map = maps.FirstOrDefault((s) => s.Id == id);
            }
            if (map == null)
            {
                return NotFound();
            }
            return Ok(map);
        }

        // GetByBagApi
        //GET: api/Map/bag/'region'/0
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

        // POST: api/Map
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Map/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Map/5
        public void Delete(int id)
        {
        }
    }
}
