using EvoDevoCore.Models;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace EvoDevoCore.Logic.Factory
{
    public class WorldConfig : Config
    {
        public String MapName { get; set; }

        public Map Map { get; set; }

        public string GetPath()
        {
            string location = @Util.GetExecutingDirectoryName();
            string maplocations = @"\Data\Maps\";
            string mapname = this.MapName;

            return location + maplocations + @"\" + mapname + @"\map.json";
        }
    }

    public class Config
    {
        DateTime Created { get; set; }
    }
}
