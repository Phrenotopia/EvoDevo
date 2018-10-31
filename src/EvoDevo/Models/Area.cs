using System.Collections.Generic;

namespace EvoDevo.Models
{
    public class Area
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int PrimaryProduction { get; set; }
        public List<Swarm> Swarms { get; set; }

        public Area()
        {
            Swarms = new List<Swarm>();
        }
    }
}