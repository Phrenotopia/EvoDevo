////play.js////

let game;
let userid;
let usertoken;
let initIntervalId;

window.addEventListener('resize', AdaptView, false);
window.addEventListener('orientationchange', AdaptView, false); 
document.addEventListener('DOMContentLoaded', AdaptView, false);

function Setup() {
    console.log('Play.Setup()');

    userid = parseInt(Util.getCookie('userid'));
    if (userid === null || userid === undefined)
        window.location.replace("index.html?status=nouser");

    player = new Player(userid); 
    map = new AreaMap(1); 

    initIntervalId = setInterval(InitGame, 1000);
}

function InitGame() {
    console.log('Play.InitGame()');
    console.log('player loaded: ' + player.loaded);
    console.log('map loaded: ' + map.loaded);
    console.log('view loaded: ' + currentView.loaded);
    if (player.loaded === true && map.loaded === true) {
        clearInterval(initIntervalId);
        game = new Game(player, map);
        console.log('initializing game');

        game.adaptView();
        game.currentView.update();
    }
}


function AdaptView() {
    console.log('Play.AdaptView()');
    if (game !== undefined && game !== null)
        game.adaptView();
}

function CanvasClick(evt) {
    console.log('Play.CanvasClick(evt)');
    game.currentView.canvasClick(evt);
}