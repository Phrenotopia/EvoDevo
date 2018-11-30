using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace EvoDevo.Screens
{
    public class SinglePlayerMenuScreen : MenuScreen
    {
        public SinglePlayerMenuScreen(EvoDevoGame game) : base(game)
        {

        }

        public override void LoadContent()
        {
            base.LoadContent();

            AddMenuItem("New World", Show<CreateWorldScreen>);
            //AddMenuItem("Created Worlds", Show<MultiPlayerMenuScreen>);
            AddMenuItem("Back", Show<MainMenuScreen>);
        }

        public override void Draw(GameTime gameTime)
        {   
            GraphicsDevice.Clear(Color.Blue);
            
            base.Draw(gameTime); 
        }
    }
}
