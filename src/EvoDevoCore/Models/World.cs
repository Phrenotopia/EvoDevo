using EvoDevoCore.Logic;
using System;
using System.Collections.Generic;

namespace EvoDevoCore.Models
{
    public class World
    {
        public Map Map { get; set; }
        public List<Swarm> Swarms { get; set; }
        public List<Species> Species { get; set; }
        
        public List<Area> GetAreas()
        {
            return Map.Areas;
        }

        internal Map GetMap()
        {
            return Map;
        }

        //public static AreaHolder AreaHolder;
        //public static SpeciesHolder SpeciesHolder;
        //public static SwarmHolder SwarmHolder;



    }
}