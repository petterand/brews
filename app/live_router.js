const router = require('express').Router();

let render_obj = {
   date: 0,
   SG: 0,
   Temp: 0
}

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 40510 })
let socket = null;

wss.on('connection', function (ws) {
   socket = ws;
});

module.exports = function (app) {

   router.post('/', (req, res) => {
      render_obj = { Temp, SG } = req.body;
      render_obj.date = new Date().getTime();
      if (socket) {
         socket.send(JSON.stringify(render_obj));
      }
      res.sendStatus(200);
   });


   return router;

}