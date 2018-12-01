using System;
using System.Diagnostics;
using EvoDevoCore.Models;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using MonoGame.Extended.Screens;

namespace EvoDevo.Screens
{ 
    public class PlayScreen : GameScreen
    {
        public GameState GameState { get; set; }

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
            SaveGameState(); 

            Show<SinglePlayerMenuScreen>();
        }

        private void SaveGameState()
        {
            throw new NotImplementedException();
        }

        internal void LoadWorld(World world)
        {
            this.GameState = new GameState();
            GameState.Map = world.Map;
        }

        internal void LoadGameState(GameState state)
        {
            this.GameState = state;
        }
    }
}
