using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvoDevo.Screens.Elements
{
    public class ScreenElement 
    {
        public PlayScreen Screen { get; }

        public ScreenElement(PlayScreen screen)
        {
            Screen = screen;
        }

        public virtual void Load(GameState state)
        {
            
        }
        
        public virtual void Update(GameState state)
        {

        }
        
        public virtual void Draw(SpriteBatch s)
        {

        }
    }
}
