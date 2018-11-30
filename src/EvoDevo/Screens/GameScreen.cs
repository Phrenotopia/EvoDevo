using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using MonoGame.Extended.Screens;

namespace EvoDevo.Screens
{
    public abstract class GameScreen : Screen
    {
        public EvoDevoGame Game { get; }
        public ContentManager Content => Game.Content;
        public GraphicsDevice GraphicsDevice => Game.GraphicsDevice;
        public GameServiceContainer Services => Game.Services;

        protected GameScreen(EvoDevoGame game)
        {
            Game = game;
        }
    }
}
