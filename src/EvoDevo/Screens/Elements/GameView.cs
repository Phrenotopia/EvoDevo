using System;
using EvoDevoCore.Models;

namespace EvoDevo.Screens.Elements
{
    public class GameView : ScreenElement
    {
        public GameView(PlayScreen screen) : base(screen)
        {
        }

        public virtual void Update(World world) { }
    }
}