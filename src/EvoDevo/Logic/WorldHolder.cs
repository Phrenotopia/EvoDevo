using EvoDevo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EvoDevo.Logic
{
    public static class WorldHolder
    {
        public static List<World> Worlds = new List<World>();

        public static World GetCurrentWorld()
        {
            //var world = (World) HttpContext.Current.Session["World"];
            var world = Worlds.FirstOrDefault();
            return world;
        }

        public static List<Area> GetAreas()
        {
            return GetCurrentWorld().Areas;
        }

        public static List<Species> GetSpecies()
        {
            return GetCurrentWorld().Species;
        }

        public static List<Swarm> GetSwarms()
        {
            return GetCurrentWorld().Swarms;
        }
    }
}
