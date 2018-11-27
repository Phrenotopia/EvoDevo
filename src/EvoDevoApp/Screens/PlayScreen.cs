using EvoDevoApp.File;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using MonoGame.Extended.Screens;
using System;
using System.Diagnostics;

namespace EvoDevoApp.Screens
{
    public class PlayScreen : GameScreen
    {
        //private SpriteBatch _spriteBatch;

        public PlayScreen(Game game) : base(game)
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


            //string test = GameManager.SaveGame();
            //Debug.WriteLine(test);


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

        }

        //public override Show()
        //{


        //}
    }
}
