using EvoDevoCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvoDevo.Screens.Elements
{
    public class MapView : GameView
    {
        public List<AreaView> AreaViews { get; set; }

        public MapView(PlayScreen screen) : base(screen)
        {
            AreaViews = new List<AreaView>();
        }

        public MapView(PlayScreen screen, List<AreaView> areaViews) : base(screen)
        {
            AreaViews = areaViews;
        }        

        public override void Update(World world)
        {
            var areas = world.GetAreas();
            AreaViews = new List<AreaView>();
            foreach (var area in areas)
            {
                AreaViews.Add(new AreaView(this.Screen, area));
            }
        }
    }
}
