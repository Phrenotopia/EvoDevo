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

            //var texture = new Texture2D(this.GraphicsDevice, 256, 256);
            //texture.  //../../EvoDevoCore/Assets/images/maptiles/alpha/tile-0



        }

        public override void UnloadContent()
        {            
            base.UnloadContent();
        }

        public override void Update(GameTime gameTime)
        {
            base.Update(gameTime);
        }

        public override void Draw(GameTime gameTime)
        {
             base.Draw(gameTime);

            GraphicsDevice.Clear(Color.Black);

            spriteBatch.Begin();
            foreach (var area in this.gameState.Map.Areas)
            {
                var vector = new Vector2(0, 0);
                //spriteBatch.Draw(texture, vector, Color.White);
            }
            spriteBatch.End();

        }
    }
}
