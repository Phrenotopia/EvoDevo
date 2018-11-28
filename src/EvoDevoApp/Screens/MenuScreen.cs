using System;
using System.Collections.Generic;
using EvoDevoCore.Logic.Factory;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using MonoGame.Extended;
using MonoGame.Extended.BitmapFonts; 

namespace EvoDevoApp.Screens
{
    public class MenuScreen : GameScreen
    {
        private SpriteBatch spriteBatch;

        public List<MenuItem> MenuItems { get; set; }
        protected BitmapFont Font { get; private set; }
        //protected ContentManager Content { get; private set; }
        private MouseState _previousState;

        public MenuScreen(Game game) : base(game)
        {
            MenuItems = new List<MenuItem>();
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

            spriteBatch = new SpriteBatch(GraphicsDevice);
            Font = Content.Load<BitmapFont>("Fonts/montserrat-32");
        }

        public override void UnloadContent()
        {
            Content.Unload();
            Content.Dispose();

            base.UnloadContent();
        }

        public override void Update(GameTime gameTime)
        {

            base.Update(gameTime);

            var mouseState = Mouse.GetState();
            var isPressed = mouseState.LeftButton == ButtonState.Released && _previousState.LeftButton == ButtonState.Pressed;

            foreach (var menuItem in MenuItems)
            {
                var isHovered = menuItem.BoundingRectangle.Contains(new Point2(mouseState.X, mouseState.Y));

                menuItem.Color = isHovered ? Color.Yellow : Color.White;

                if (isHovered && isPressed)
                {
                    menuItem.Action?.Invoke();
                    break;
                }
            }

            _previousState = mouseState;
        }

        public override void Draw(GameTime gameTime)
        {
            base.Draw(gameTime);

            //GraphicsDevice.Clear(Color.White);

            spriteBatch.Begin();

            foreach (var menuItem in MenuItems)
                menuItem.Draw(spriteBatch);

            spriteBatch.End();
        }

        protected void AddMenuItem(string text, Action action)
        {
            AddMenuItem(text, action, null);
        }

        protected void AddMenuItem(string text, Action action, Config options)
        {
            var menuItem = new MenuItem(Font, text)
            {
                Position = new Vector2(300, 200 + 32 * MenuItems.Count),
                Action = action
            };

            MenuItems.Add(menuItem);
        }
    }
}
