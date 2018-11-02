using EvoDevo.Logic;
using System;
using System.Collections.Generic;

namespace EvoDevo.Models
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
            throw new NotImplementedException();
        }

        //public static AreaHolder AreaHolder;
        //public static SpeciesHolder SpeciesHolder;
        //public static SwarmHolder SwarmHolder;



    }
}