using EvoDevoApp.File;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using MonoGame.Extended.Screens;
using System;
using System.Diagnostics;

namespace EvoDevoApp.Screens
{ 
    public class PlayScreen : GameScreen
    {
        //TODO: GameState

        public PlayScreen(EvoDevoGame game) : base(game)
        {

        }

        public override void Update(GameTime gameTime)
        {
            if (Keyboard.GetState().IsKeyDown(Keys.Escape)) ExitPlay();

            base.Update(gameTime);
        }

        private void ExitPlay()
        {
            //TODO: Save Game State 

            Show<SinglePlayerMenuScreen>();
        }
    }
}
