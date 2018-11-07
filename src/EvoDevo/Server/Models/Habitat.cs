using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EvoDevo.Models
{
    public class Habitat
    {
        public long Id { get; set; }

        public Biotope Biotope { get; set; }

        public int PrimaryProduction { get; set; }

        public List<Swarm> Swarms { get; set; }

        public Habitat()
        {
            Biotope = Biotope.Undefined;
            Swarms = new List<Swarm>();
            PrimaryProduction = 32;
        }
    }

    public enum Biotope
    {
        Undefined = 0,
        Intertidal = 1,   //Floodplain, Wetland, Mudflat, Marsh, Mangrove ...
        Shallows = 2, //Benthic, Reef, Platform ...
        OpenWater = 3, //Pelagic
        Land = 4, 
    }
}