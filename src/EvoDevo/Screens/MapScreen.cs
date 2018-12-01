using System;
using System.Diagnostics;
using EvoDevoCore.Models;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using MonoGame.Extended.Screens;

namespace EvoDevo.Screens
{ 
    public class MapScreen : PlayScreen
    {
        private SpriteBatch spriteBatch;
        private Texture2D[] tileAtlas;
        int tilescale = 128;
        private int xoffset = 100;
        private int yoffset = 100;

        public MapScreen(EvoDevoGame game) : base(game)
        {

        }

        public override void Initialize()
        {
            base.Initialize();
        }

        public override void Dispose()
        {
            base.Dispose();
        }

        public override void LoadContent()
        {
            base.LoadContent();

            this.spriteBatch = new SpriteBatch(this.GraphicsDevice);

            int atlaslength = 16;
            string atlasname = "alpha"; //TODO make dynamic/selectable?
            tileAtlas = new Texture2D[atlaslength];
            for(int i = 0; i < atlaslength; i++)
            {
                tileAtlas[i] = Content.Load<Texture2D>("images/maptiles/" + atlasname + "/tile-" + i);                
            }
        }

        public override void UnloadContent()
        {            
            base.UnloadContent();
        }

        public override void Update(GameTime gameTime)
        {
            base.Update(gameTime);

            int height = this.Game.GraphicsDevice.Viewport.Height;
            int width = this.Game.GraphicsDevice.Viewport.Width;
            //TODO adapt scale and offsets to window size ,
            int mapsize = tilescale * 4;
            xoffset = (width - mapsize) / 2;
            yoffset = (height - mapsize) / 2;
        }

        public override void Draw(GameTime gameTime)
        {
             base.Draw(gameTime);

            GraphicsDevice.Clear(Color.Black);

            spriteBatch.Begin();
            int x = xoffset; 
            int y = yoffset;
            foreach (var area in this.GameState.Map.Areas)
            {
                spriteBatch.Draw(tileAtlas[area.Tile], new Vector2(x, y), Color.White);
                x = x + tilescale;
                if (x > (tilescale * 3) + xoffset)
                {
                    x = xoffset;
                    y = y + tilescale;
                }
            }
            spriteBatch.End();

        }
    }
}
