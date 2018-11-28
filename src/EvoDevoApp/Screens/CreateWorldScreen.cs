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

        public CreateWorldScreen(EvoDevoGame game) : base(game)
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
            
            //this.Game.ScreenManager.Register(new MapScreen(this.Game));
            //this.Game.ScreenManager.Register(new TraitsScreen(this.Game));
            //this.Game.ScreenManager.Register(new BodyplanScreen(this.Game));
            //this.Game.ScreenManager.Register(new DesignScreen(this.Game));

            Show<MapScreen>();
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
