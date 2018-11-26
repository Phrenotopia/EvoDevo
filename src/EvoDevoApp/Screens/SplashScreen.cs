using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using MonoGame.Extended.Screens;
using System.Diagnostics;

namespace EvoDevoApp.Screens
{
    public class SplashScreen : GameScreen
    {
        private SpriteBatch spriteBatch;
        Rectangle logoFrame;
        Vector2 vector;

        private Texture2D monogameLogo;

        private float timePassed = 0f;
        
        public SplashScreen(Game game) : base(game)
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
            var width = GraphicsDevice.Viewport.Width;
            var height = GraphicsDevice.Viewport.Height;

            monogameLogo = Content.Load<Texture2D>("img/logo/MonoGame-SquareLogo_256px");
            var logoHeight = monogameLogo.Height;
            var logoWidth = monogameLogo.Width;

            var x = (width-logoWidth)/2;
            var y = (height-logoHeight)/2;
            logoFrame = new Rectangle(x, y, logoWidth, logoHeight);
            vector = new Vector2(x, y);

            spriteBatch = new SpriteBatch(GraphicsDevice);

            base.LoadContent();
        }

        public override void UnloadContent()
        {
            Content.Unload();
            base.UnloadContent();
        }

        public override void Update(GameTime gameTime)
        {
            timePassed += (float)gameTime.ElapsedGameTime.TotalSeconds;

            if (timePassed > 4f)
                //if (Keyboard.GetState().IsKeyDown(Keys.Space))
                Show<MenuScreen>();

            base.Update(gameTime);
        }

        public override void Draw(GameTime gameTime)
        {
            //Debug.WriteLine(this.ToString());
            GraphicsDevice.Clear(Color.White);

            spriteBatch.Begin();
            spriteBatch.Draw(monogameLogo, logoFrame, Color.White);//, vector, Color.White);//
            spriteBatch.End();

            base.Draw(gameTime);
        }
    }
}
