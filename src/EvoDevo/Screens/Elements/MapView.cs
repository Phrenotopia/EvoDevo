using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System.Collections.Generic;
using System.Diagnostics;

namespace EvoDevo.Screens.Elements
{
    public class MapView : GameView
    {
        public List<AreaView> AreaViews { get; set; }

        public MapView(PlayScreen screen) : base(screen)
        {
            AreaViews = new List<AreaView>();
        }

        public MapView(PlayScreen screen, List<AreaView> areaViews) : base(screen)
        {
            AreaViews = areaViews;
        }

        public override void Load(GameState state)
        {
            base.Load(state);

            var areas = state.World.GetAreas();
            AreaViews = new List<AreaView>();
            foreach (var area in areas)
            {
                AreaViews.Add(new AreaView(this.Screen, area));
            }
        }

        public override void Update(GameState state)
        {
            base.Update(state);
        }

        public override void Draw(SpriteBatch s)
        {
            var screen = (MapScreen)this.Screen;
            int x = screen.xoffset;
            int y = screen.yoffset;
            var atlas = screen.TileAtlas;
            var scale = screen.tilescale;

            foreach (var area in this.AreaViews)
            {
                s.Draw(atlas[area.Area.Tile], new Vector2(x, y), Color.White);
                x = x + scale;
                if (x > (scale * 3) + screen.xoffset)
                {
                    x = screen.xoffset;
                    y = y + scale;
                }
            }
        }    
    }
}
