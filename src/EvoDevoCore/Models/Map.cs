using System;
using System.Collections.Generic;

namespace EvoDevoCore.Models
{
    public class Map
    {
        public long Id { get; set; }

        public String Name { get; set; }

        public int Columns { get; set; }

        public int Rows { get; set; }

        public List<Area> Areas { get; set; }


    }
}