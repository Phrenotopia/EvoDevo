using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvoDevo.Screens;
using EvoDevo.Screens.Elements;
using EvoDevoCore.Models;

namespace EvoDevo
{
    public class GameState
    {
        public long Id { get; set; } //TODO Guid???
        public World World;
        //public PlayScreen MainScreen;
        public List<GameView> GameViews;
        
        //public Map Map { get; set; }
        
        public GameState(PlayScreen screen, World world)
        {
            this.World = world;
            //this.MainScreen = screen;
            
            //this.MapView.UpdateAreaViews(this.World.GetAreas());
        }

        public void RegisterView(GameView view)
        {
            
        }

        public void UpdateView<T>() where T : GameView
        {
            //TODO: Type-based switchboard?
            GetView<T>().Update(this.World);
            //this.MapView.UpdateAreaViews(this.World.GetAreas());
        }

        public T Register<T>(T view) where T : GameView
        {            
            GameViews.Add(view);            
            return view;
        }

        public T GetView<T>() where T : GameView
        {
            var view = GameViews.OfType<T>().FirstOrDefault();

            if (view == null)
                throw new InvalidOperationException($"{typeof(T).Name} not registered");

            return view;
        }
    }
}
