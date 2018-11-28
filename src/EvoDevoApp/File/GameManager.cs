using System;
using MonoGame.Framework;
using System.Xml.Serialization;
using System.IO;
using EvoDevoCore;
using EvoDevoCore.Logic.Factory;

namespace EvoDevoApp.File
{
    public static class GameManager
    {
        public static void NewGame()
        {
            //string path = 

            WorldFactory.Create("");

            
        }


        public static string SaveGame()
        {
            String test = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

            String test2 = Path.Combine(Environment.ExpandEnvironmentVariables("%userprofile%"), "Documents");

            return test + "****" + test2; 
        }
    }
}
