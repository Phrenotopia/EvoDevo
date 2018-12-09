using System;
using System.Diagnostics;
using EvoDevo.Screens.Elements;
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

        public Texture2D UIBackDrop;

        public PlayScreen(EvoDevoGame game) : base(game)
        {
            //GameState = new GameState(this);
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

        public virtual void LoadWorld(World world)
        {
            this.GameState = new GameState(this, world);
        }

        internal void LoadGameState(GameState state)
        {
            this.GameState = state;
        }
        
        public virtual void LoadView<T>() where T : GameView
        {
            this.GameState.LoadView<T>();
        }
    }
}
