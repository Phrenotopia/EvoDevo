////play.js////

let game;
let userid;
let usertoken;
let initIntervalId;
let adaptIntervalId;

window.addEventListener('resize', AdaptView, false);
window.addEventListener('orientationchange', AdaptView, false); 
document.addEventListener('DOMContentLoaded', AdaptView, false);

function Setup() {
    document.getElementById('layout').hidden = true;
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
    if (player.loaded === true && map.loaded === true) {
        clearInterval(initIntervalId);
        game = new Game(player, map);
        adaptIntervalId = setInterval(AdaptView, 1000);
    }
}

function AdaptView() {
    console.log('Play.AdaptView()');
    if (game !== undefined)
        if (game.currentView !== undefined)
            if (game.currentView.loaded === true) {
                clearInterval(adaptIntervalId);
                game.adaptView();
                game.currentView.update();
                document.getElementById('layout').hidden = false;
            }
}

function CanvasClick(evt) {
    console.log('Play.CanvasClick(' + evt + ')');
    game.currentView.canvasClick(evt);
}

function toggleMenuClass(source) {
    console.log('Play.toggleMenuClass('+ source +')');
    if (game !== undefined)
        game.toggleMenuClass(source);
}