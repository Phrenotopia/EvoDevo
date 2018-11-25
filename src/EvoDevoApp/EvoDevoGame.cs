using EvoDevoApp.Screens;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
//using MonoGame.Extended.Screens.Transitions;
using MonoGame.Extended.Screens;
using MonoGame.Extended.ViewportAdapters;
using System.Diagnostics;

namespace EvoDevoApp
{
    public class EvoDevoGame : Game
    {
        private readonly GraphicsDeviceManager graphics;
        public static SpriteBatch SpriteBatch;
        public static WindowViewportAdapter ViewportAdapter;

        public EvoDevoGame()
        {
            graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";
            IsMouseVisible = true;

            ScreenGameComponent screenGameComponent = new ScreenGameComponent(this);
            Components.Add(screenGameComponent);

            screenGameComponent.Register(new SplashScreen(this));
            screenGameComponent.Register(new MenuScreen(this));
            screenGameComponent.Register(new SinglePlayerMenuScreen(this));
            screenGameComponent.Register(new CreateWorldScreen(this));
            screenGameComponent.Register(new PlayScreen(this));

            
        }

        protected override void Initialize()
        {
            ViewportAdapter = new WindowViewportAdapter(this.Window, GraphicsDevice);

            base.Initialize();
        }

        protected override void LoadContent()
        {
            SpriteBatch = new SpriteBatch(GraphicsDevice);

            base.LoadContent();
        }

        protected override void UnloadContent()
        {
            
        }

        protected override void Update(GameTime gameTime)
        {
            if (Keyboard.GetState().IsKeyDown(Keys.Escape))
                Exit();

            base.Update(gameTime);
        }

        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);

            //Debug.WriteLine(this.ToString());

            


            base.Draw(gameTime);
        }
    }
}
