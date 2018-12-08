using System;
using EvoDevoCore.Models;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace EvoDevo.Screens.Elements
{
    public class AreaView : ScreenElement
    {

        public Area Area;

        public AreaView(PlayScreen screen, Area area) : base(screen)
        {

        }

        public void Draw(SpriteBatch s, int x, int y)
        {
            
            
            var position = new Vector2(x, y);
            s.Draw(Screen.UIBackDrop, position, Color.White);


        }
    }
}
