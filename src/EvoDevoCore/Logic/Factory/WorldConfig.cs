using EvoDevoCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvoDevoCore.Logic.Factory
{
    public class WorldConfig : Config
    {
        public Map Map { get; set; }
    }

    public class Config
    {
        DateTime Created { get; set; }
    }
}
