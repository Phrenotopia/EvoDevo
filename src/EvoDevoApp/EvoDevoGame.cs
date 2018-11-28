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
        public ScreenGameComponent ScreenManager;

        public EvoDevoGame()
        {
            graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";
            IsMouseVisible = true;

            ScreenManager = new ScreenGameComponent(this);
            Components.Add(ScreenManager);

            ScreenManager.Register(new SplashScreen(this));
            ScreenManager.Register(new MainMenuScreen(this));
            ScreenManager.Register(new SinglePlayerMenuScreen(this));
            ScreenManager.Register(new CreateWorldScreen(this));

            ScreenManager.Register(new MapScreen(this));


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
            
            //Debug.WriteLine(this.ToString());

            


            base.Draw(gameTime);
        }
    }
}
