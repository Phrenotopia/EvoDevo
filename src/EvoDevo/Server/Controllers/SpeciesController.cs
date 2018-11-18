using EvoDevoCore.Logic;
using EvoDevoCore.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace EvoDevo.Controllers
{
    public class SpeciesController : ApiController
    {
        List<Species> allspecies;

        public SpeciesController()
        {
            allspecies = WorldHolder.GetSpecies();
        }

        // GET: api/Species
        public IEnumerable<Species> Get()
        {
            return allspecies;
        }

        // GET: api/Species/5
        public IHttpActionResult Get(int id)
        {
            var species = allspecies.FirstOrDefault((s) => s.Id == id);
            if (species == null)
            {
                return NotFound();
            }
            return Ok(species);
        }

        // POST: api/Species
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Species/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Species/5
        public void Delete(int id)
        {
        }
    }
}
