using EvoDevo.Models;
using EvoDevo.Properties;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;

namespace EvoDevo.Logic.Factory
{
    public static class WorldFactory
    {
        public static World Create()
        {
            //AbilityHolder.Initialize();

            return CreateWorld();// new MapFactory().Create("mapname"));//args map name? id?  
        }

        private static World CreateWorld() //Map map)
        {
            var path = HttpContext.Current.Server.MapPath(@"~\Server\worlds\alpha\map.json");
            var json = File.ReadAllText(path);
            //var areas = JsonConvert.DeserializeObject<List<Area>>(json);
            //Map map = new Map() { Id = 1, Name = "Alpha", Areas = areas, Columns = 4, Rows = 4 };
            var map = JsonConvert.DeserializeObject<Map>(json);
                        
            World world = new World();
            world.Map = map;
            world.Species = CreateSpecies();
            world.Swarms = CreateSwarms(world);
            PopulateWorld(world);
            WorldHolder.Worlds.Add(world);

            return world;
        }

        private static bool SaveMap(Map map)
        {
            var envpath = Settings.Default.path;
            var path = HttpContext.Current.Server.MapPath(@envpath + @"\worlds\alpha\map.json");

            try
            {
                using (StreamWriter file = File.CreateText(@path))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    serializer.Serialize(file, map);
                }
            }
            catch(Exception e)
            {
                Debug.WriteLine(e.Message);
                return false;
            }

            return true;
        }

        private static List<Species> CreateSpecies()
        {
            var species = new List<Species>();
            species.Add(new Species { Id = 1, Name = "Megasloth", BodySize = 24 });
            species.Add(new Species { Id = 2, Name = "Vagriantis", BodySize = 8 });
            species.Add(new Species { Id = 3, Name = "Slatherus", BodySize = 4 });
            species.Add(new Species { Id = 4, Name = "Oocunia", BodySize = 3 });
            species.Add(new Species { Id = 5, Name = "Haradix", BodySize = 7 });
            species.Add(new Species { Id = 6, Name = "Kawaichi", BodySize = 16 });
            species.Add(new Species { Id = 7, Name = "Spiccelite", BodySize = 4 });
            species.Add(new Species { Id = 8, Name = "Tribolite", BodySize = 2 });
            species.Add(new Species { Id = 9, Name = "Trispots", BodySize = 6 });

            return species;
        }

        private static List<Swarm> CreateSwarms(World world)
        {             
            var s = world.Species.ToArray();
            var len = 128;
            var swarms = new Swarm[len];
            var sizeRnd = new Random();
            var specRnd = new Random();
            for (int i = 1; i < len; i++)
            {
                var size = sizeRnd.Next(48) + 1;
                var n = specRnd.Next(s.Length);
                var species = s.ElementAt(n);
                var swarm = new Swarm { Id = i, Size = size, Species = species, AreaId = 0 };
                Console.WriteLine("New swarm: " + swarm.ToString());
                swarms[i] = swarm;
            }
            return swarms.ToList();
        }

        private static void PopulateWorld(World world)
        {
            var areas = world.GetAreas();
            var swarms = world.Swarms.ToArray();

            int i = 1;
            var sizeRnd = new Random();
            foreach (var area in areas)
            {
                var n = sizeRnd.Next(2, 12);
                for (int j = 0; j < n; j++)
                {
                    i++;
                    if (i < (swarms.Length - 1))
                    {
                        var swarm = swarms[i];
                        swarm.AreaId = area.Id;
                        area.AddSwarm(swarm);
                    }
                }
            }
        }
    }
}