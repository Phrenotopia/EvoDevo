using System;

namespace EvoDevo.Models
{
    public class Player
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public DateTime LastSeen { get; set; }

        public string LastSeenDateTime => LastSeen.ToShortDateString() + " " + LastSeen.ToShortTimeString();
        
    }
}