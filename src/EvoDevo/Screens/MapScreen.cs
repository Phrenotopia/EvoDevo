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
        internal SpriteBatch spriteBatch;
        internal Texture2D[] TileAtlas;
        internal Texture2D Test;
        internal int tilescale = 128;
        internal int xoffset = 100;
        internal int yoffset = 100;

        public MapView MapView { get; set; }
        public AreaView SelectedAreaView { get; set; }
        
        public MapScreen(EvoDevoGame game) : base(game)
        {
            this.MapView = new MapView(this);
        }

        public override void LoadWorld(World world)
        {
            base.LoadWorld(world);

            this.GameState.RegisterView<MapView>(this.MapView);

            this.GameState.LoadView<MapView>();

            this.SelectedAreaView = GameState.GetView<MapView>().AreaViews[0];
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
            UIBackDrop = Content.Load<Texture2D>("images/ui/menu-gradient-bg2");

             
            int atlaslength = 16;
            string atlasname = "alpha"; //TODO make dynamic/selectable?
            TileAtlas = new Texture2D[atlaslength];
            for(int i = 0; i < atlaslength; i++)
            {
                TileAtlas[i] = Content.Load<Texture2D>("images/maptiles/" + atlasname + "/tile-" + i);                
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

            foreach(var view in GameState.GameViews)
            {
                view.Draw(spriteBatch);
            }

            this.SelectedAreaView.Draw(spriteBatch, xoffset - 256, yoffset);

            spriteBatch.End();

        }
    }
}
