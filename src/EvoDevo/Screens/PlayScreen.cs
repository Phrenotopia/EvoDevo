using System;
using System.Diagnostics;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using MonoGame.Extended.Screens;

namespace EvoDevo.Screens
{ 
    public class PlayScreen : GameScreen
    {
        public GameState gameState { get; set; }

        public PlayScreen(EvoDevoGame game) : base(game)
        {
            //TODO GameState
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
