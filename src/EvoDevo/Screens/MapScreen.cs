using System;
using System.Collections.Generic;
using System.Diagnostics;
using EvoDevo.Screens.Elements;
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
        public Texture2D Test;

        public MapView MapView { get; set; }
        //public List<AreaView> AreaViews { get; set; }

        int tilescale = 128;
        private int xoffset = 100;
        private int yoffset = 100;

        public MapScreen(EvoDevoGame game) : base(game)
        {
            this.MapView = new MapView(this);
        }

        public override void LoadWorld(World world)
        {
            base.LoadWorld(world);

            this.GameState.RegisterView(this.MapView);
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

            Test = Content.Load<Texture2D>("images/evodevo-logo");
            UIBackDrop = Content.Load<Texture2D>("images/ui/menu-gradient-bg1");


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

            DrawMap();

            spriteBatch.End();

        }

        private void DrawMap()
        {
            int x = xoffset;
            int y = yoffset;
            foreach (var area in this.GameState.World.Map.Areas)
            {
                spriteBatch.Draw(tileAtlas[area.Tile], new Vector2(x, y), Color.White);
                x = x + tilescale;
                if (x > (tilescale * 3) + xoffset)
                {
                    x = xoffset;
                    y = y + tilescale;
                }
            }
        }
    }
}
