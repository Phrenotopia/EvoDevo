using System;
using EvoDevoCore.Logic.Factory;
using EvoDevoCore.Models;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using MonoGame.Extended.Screens;

namespace EvoDevo.Screens
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

            //TODO AddConfigItem("Name", Type: String, ?);
            //TODO AddConfigItem("Map", Type: List, ?);
            //TODO AddConfigItem("Something", Type: Boolean, ?);

            AddMenuItem("Create World ", this.CreateWorld);
            AddMenuItem("Back", Show<SinglePlayerMenuScreen>);
        }

        protected void CreateWorld()
        {
            var world = WorldFactory.Create(this.worldConfig);
            
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
