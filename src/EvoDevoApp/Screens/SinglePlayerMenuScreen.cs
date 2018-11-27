using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace EvoDevoApp.Screens
{
    public class SinglePlayerMenuScreen : MenuScreen
    {
        public SinglePlayerMenuScreen(Game game) : base(game)
        {

        }

        public override void LoadContent()
        {
            base.LoadContent();

            AddMenuItem("New World", Show<CreateWorldScreen>);
            //AddMenuItem("Created Worlds", Show<MultiPlayerMenuScreen>);
            AddMenuItem("Back to Main Menu", Show<MainMenuScreen>);
        }

        public override void Draw(GameTime gameTime)
        {   
            GraphicsDevice.Clear(Color.Navy);
            
            base.Draw(gameTime); 
        }
    }
}
