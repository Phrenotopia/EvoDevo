using EvoDevo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace EvoDevo.Controllers
{
    public class ChatController : ApiController
    {
        ChatMessage[] allchatmsgs = new ChatMessage[] {};

        // GET: api/chat
        public IEnumerable<ChatMessage> Get()
        {
            return allchatmsgs;
        }

        // GET: api/chat/5
        public IHttpActionResult Get(int id)
        {
            var chatmsg = allchatmsgs.FirstOrDefault((s) => s.Id == id);
            if (chatmsg == null)
            {
                return NotFound();
            }
            return Ok(chatmsg);
        }

        //// GET: api/chat/name/johndoe
        //public IHttpActionResult GetByName(string name)
        //{
        //    var chatmsg = allchatmsgs.FirstOrDefault((s) => s.UserName.ToLower() == name.ToLower());
        //    if (chatmsg == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(chatmsg);
        //}

        // POST: api/chat
        public void Post([FromBody]string value)
        {
            ChatMessage msg = new ChatMessage();
            msg.Message = value;

            Console.WriteLine(value);
        }

        // PUT: api/chat/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/chat/5
        public void Delete(int id)
        {
        }
    }
}
