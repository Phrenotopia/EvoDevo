using System;
using System.Collections.Generic;
using System.Linq;

namespace EvoDevoCore.Models
{
    public class Area
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public int Tile { get; set; }

        public int Region { get; set; }

        public List<Habitat> Habitats { get; set; }

        public Area()
        {
            Habitats = new List<Habitat>();
        }

        public void AddSwarm(Swarm swarm)
        {
            if (Habitats.Count == 0) Habitats.Add(new Habitat());
            Habitats.FirstOrDefault().Swarms.Add(swarm);
        }
    }

    public enum Tile
    {
        Undefined = 0,
        Mudflat = 1, //Foreshore, Seashore, Floodplain, Wetland, Mudflat, Marsh, Mangrove ...
        Platform = 2,    //Benthic, Reef, Platform ...
        Island = 3,  //Pelagic
        Abyss = 4,
        OpenWater = 5, 
        Atol = 14, 
        Seashore = 15
    }
}