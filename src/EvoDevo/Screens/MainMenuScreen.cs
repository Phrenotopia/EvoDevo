using Microsoft.Xna.Framework;

namespace EvoDevo.Screens
{
    public class MainMenuScreen : MenuScreen
    {
        public MainMenuScreen(EvoDevoGame game) : base(game)
        {

        }
        
        public override void LoadContent()
        {
            base.LoadContent();

            //AddMenuItem("Options", Show<LoginScreen>);
            AddMenuItem("Singleplayer Game", Show<SinglePlayerMenuScreen>);
            //AddMenuItem("Multiplayer Game", Show<MultiPlayerMenuScreen>);
            //AddMenuItem("About", Show<AboutScreen>);
            //AddMenuItem("Options", Show<OptionsScreen>);
            AddMenuItem("Exit", Game.Exit);
        }

        public override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);

            base.Draw(gameTime);
        }
    }
}
