using System;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using MonoGame.Extended;
using MonoGame.Extended.BitmapFonts;

namespace EvoDevoApp.Screens
{
    public class MenuItem
    {
        public BitmapFont Font { get; }
        public string Text { get; set; }
        public Vector2 Position { get; set; }
        public Color Color { get; set; }
        public RectangleF BoundingRectangle => new RectangleF(Position, Font.MeasureString(Text));
        public Action Action { get; set; }

        public MenuItem(BitmapFont font, string text, Object options)
        {
            Text = text;
            Font = font;
            Color = Color.White;
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