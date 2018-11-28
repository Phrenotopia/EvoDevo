using System;
using EvoDevoCore.Logic.Factory;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using MonoGame.Extended;
using MonoGame.Extended.BitmapFonts;

namespace EvoDevoApp.Screens
{
    public class MenuItem
    {
        public string Text { get; set; }

        public BitmapFont Font { get; }

        public Color Color { get; set; }

        public Vector2 Position { get; set; }

        public Action Action { get; set; }

        public Config Options { get; set; }

        public RectangleF BoundingRectangle => new RectangleF(Position, Font.MeasureString(Text));

        public MenuItem(BitmapFont font, string text, Config options)
        {
            Text = text;
            Font = font;
            Color = Color.White;
            Options = options;
        }

        public MenuItem(BitmapFont font, string text)
        {
            Text = text;
            Font = font;
            Color = Color.White;
        }
        public void Draw(SpriteBatch spriteBatch)
        {
            spriteBatch.DrawString(Font, Text, Position, Color);
        }
    }
}