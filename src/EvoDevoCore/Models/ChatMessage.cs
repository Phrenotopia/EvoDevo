using System;

namespace EvoDevoCore.Models
{
    public class ChatMessage
    {
        public long Id { get; set; }
        public Player Player { get; set; }
        public string Message { get; set; }
        public DateTime Posted { get; set; }
    }
}