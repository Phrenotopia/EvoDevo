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
        public long Id { get; set; } 
        public World World;
        public List<GameView> GameViews;
        
        public GameState(PlayScreen screen, World world)
        {
            this.World = world;
            GameViews = new List<GameView>();
        }

        public void UpdateView<T>() where T : GameView
        {
            GetView<T>().Update(this);
        }

        public T RegisterView<T>(T view) where T : GameView
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

        internal void LoadView<T>() where T : GameView
        {
            GetView<T>().Load(this);
        }
    }
}
