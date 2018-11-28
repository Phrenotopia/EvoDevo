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
        public Map Map { get; set; }

        public string GetPath()
        {
            string location = @Util.GetExecutingDirectoryName();
            string maplocations = @"\Data\Maps\";

            return location + maplocations;
        }
    }

    public class Config
    {
        DateTime Created { get; set; }
    }
}
