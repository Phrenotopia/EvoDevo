using System;
using System.Collections.Generic;

namespace EvoDevoCore.Models
{
    public class Player
    {
        public long Id { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public DateTime LastSeen { get; set; }

        public string LastSeenDateTime => LastSeen.ToShortDateString() + " " + LastSeen.ToShortTimeString();
        
        public List<Species> Species { get; set; }

        public List<Swarm> Swarms { get; set; }



    }
}