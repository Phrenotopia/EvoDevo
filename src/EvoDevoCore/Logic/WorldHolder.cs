using EvoDevoCore.Models;
using System.Collections.Generic;
using System.Linq;

namespace EvoDevoCore.Logic
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

        internal static List<Map> GetMaps()
        {
            return MapHolder.Maps;
        }

        public static Map GetMap()
        {
            return GetCurrentWorld().GetMap();
        }

        public static List<Area> GetAreas()
        {
            return GetCurrentWorld().GetAreas();
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
