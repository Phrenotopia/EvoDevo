using EvoDevo.Controllers;
using EvoDevo.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace EvoDevo.Logic
{
    public class MapHolder
    {
        private List<Map> maps;
        private AreaController areaController = new AreaController();

        public MapHolder()
        {

        }

        internal static List<Map> GetMaps()
        {
            throw new NotImplementedException();
        }
    }
}

//var swarms = swarmController.Get();
//var swarmArray = swarms.ToArray();

//areas = new Map[]
//{
//    new Area { Id = 1, Name = "Ursoup", PrimaryProduction = 32},
//    new Area { Id = 2, Name = "Muddy Waters", PrimaryProduction = 48 },
//    new Area { Id = 3, Name = "Gidebo", PrimaryProduction = 48 },
//    new Area { Id = 4, Name = "Higatl", PrimaryProduction = 16 },
//    new Area { Id = 5, Name = "Capvax", PrimaryProduction = 20 },
//    new Area { Id = 6, Name = "Idoibu", PrimaryProduction = 24 },
//    new Area { Id = 7, Name = "Pnoonoo", PrimaryProduction = 36 },
//    new Area { Id = 8, Name = "Ocho", PrimaryProduction = 12 },
//    new Area { Id = 9, Name = "Sembilan", PrimaryProduction = 18 },
//    new Area { Id = 10, Name = "Sepulu", PrimaryProduction = 64 },
//    new Area { Id = 11, Name = "Mornak", PrimaryProduction = 24 },
//    new Area { Id = 12, Name = "Yksikaksi", PrimaryProduction = 8 }
//};

////JsonSerializer serializer = new JsonSerializer();
////serializer.NullValueHandling = NullValueHandling.Ignore;
////using (StreamWriter sw = new StreamWriter(@"c:\temp\areas.json"))
////using (JsonWriter writer = new JsonTextWriter(sw))
////{
////    serializer.Serialize(writer, areas);
////    // {"ExpiryDate":new Date(1230375600000),"Price":0}
////}

//int i = 1;
//foreach (var area in areas)
//{
//    for (int j = 0; j < new Random().Next(1, 10); j++)
//    {
//        i++;
//        if (i < (swarmArray.Length - 1))
//        {
//            var swarm = swarmArray[i];
//            swarm.AreaId = area.Id;
//            area.Swarms.Add(swarm);
//        }
//    }
//}