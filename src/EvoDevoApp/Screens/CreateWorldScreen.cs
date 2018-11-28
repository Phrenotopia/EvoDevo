using System;
using EvoDevoApp.File;
using EvoDevoCore.Logic.Factory;
using EvoDevoCore.Models;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using MonoGame.Extended.Screens;

namespace EvoDevoApp.Screens
{
    public class CreateWorldScreen : MenuScreen
    {
        //private SpriteBatch _spriteBatch;
        private WorldConfig worldConfig;

        public CreateWorldScreen(Game game) : base(game)
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

            this.worldConfig = new WorldConfig { MapName = "alpha" };

            AddMenuItem("Create World ", this.CreateWorld);// Show<PlayScreen>);
            //AddMenuItem("Created Worlds", Show<>);
            AddMenuItem("Back", Show<SinglePlayerMenuScreen>);
        }

        protected void CreateWorld()
        {
            WorldFactory.Create(this.worldConfig);
            Show<PlayScreen>();
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
            GraphicsDevice.Clear(Color.DarkBlue);

            base.Draw(gameTime);
        }
    }
}
