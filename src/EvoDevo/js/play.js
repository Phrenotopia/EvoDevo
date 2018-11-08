//Player
let currentPlayer;

//Game Control  
let game;
let menulistApis;
let menulistNames;
let currentMap;
let currentView;

//Parent View
let canvas, ctx;

//MapView
let maploaded = false;
let texture = 'alpha';
let tilesheet;
let tileimages;
let tilecount = 16;
let tilecounter = 0;
let selectedArea;
let selectedAreaId;
let gridlines = true;
let height = 512;
let width = 512;
let tilesize = 128;

window.addEventListener('resize', UpdateView, false);
window.addEventListener('orientationchange', UpdateView, false); 
document.addEventListener('DOMContentLoaded', UpdateView, false);

function UpdateView() {
    //game.currentView.
    AdaptViewSize();
    //game.
    currentMap.drawMap(canvas);
}

function Setup() {
    currentPlayer = new Player(parseInt(Util.getCookie('userid'))); 
    if (currentPlayer === null || currentPlayer === undefined)
        window.location.replace("index.html?status=nouser");
    document.getElementById('username').innerHTML = currentPlayer.userName;

    currentMap = new AreaMap(1);

    //----GAME OBJECT-------
    game = new Game();

    //currentMap
    //currentPlayer

    //CONTROLS
    //Apis       = ['player', 'chat', 'species', 'swarms', 'areas'];
    menulistApis = ['player', 'chat', 'species', 'swarms', 'areas'];
    menulistNames = ['My Stuff', 'Chat', 'Species', 'Swarms', 'Areas'];

    //VIEWS
    //Views = ['mapview', 'traitview', 'buildview', 'designview'];
    PrepareCanvas('mapview');
    PrepareCanvas('traitview');
    PrepareCanvas('buildview');
    PrepareCanvas('designview');
    SetView('mapview'); // = Default

    //RESOURCES
    LoadResources(); 

    //PLAYER
    //userstate
    // - Selected Area (+Region)    
    //------------------------


}

//To MapView Class
function MapDataLoaded() {
    console.log('MapDataLoaded');

    console.log({ currentMap });

    let cookie = Util.getCookie('itemlist');
    if (cookie === null || cookie === '') SetItemList('player|My Stuff');
    else SetItemList(cookie);

    GetUserState();
    DrawMap();
}

//To MapView Class
function LoadResources() {
    console.log('LoadResources');

    tilesheet = new Image();
    tilesheet.src = 'img\\maptiles\\' + texture + '\\tilesheet.png';

    tileimages = new Array(tilecount);
    for (let i = 0; i < tilecount; i++) {
        let img = new Image();
        let j = i;
        img.addEventListener('load', function () { imageFound(j, img); });
        img.addEventListener('error', function () { imageNotFound(j, img); });
        img.src = 'img\\maptiles\\' + texture + '\\tile-' + i + '.png';
    }
}

//To MapView Class
function imageFound(i, img) {
    tileimages[i] = img;
    //console.log('tile image nr ' + i + ' found & loaded: ' + img.src);
    tilecounter++;

    if (tilecounter >= tilecount && maploaded) {
        MapDataLoaded();
    }
}

//To MapView Class
function imageNotFound(i, img) {
    //console.log('tile image not found!');
    img.removeEventListener('error', function () { imageNotFound(i, img, true); });
    img.src = 'img\\maptiles\\' + texture + '\\tile-null.png';
    tileimages[i] = img;
}

//To Game Class
function GetUserState() {

    //Selected Area
    selectedAreaId = Util.getCookie('selectedAreaId');
    areadata = currentMap.areas.find(x => x.id.toString() === selectedAreaId);
    selectedArea = new Area(parseInt(selectedAreaId), areadata);

}

//To Game Class
function toggleMenuClass(source) {
    // Setting the active class name expands the menu vertically on small screens.
    let nav = document.getElementById('nav');

    if (nav.className === 'pure-u active') {
        nav.className = 'pure-u';
    }
    else {
        if (source === 'menu-button') nav.className = 'pure-u active';
    }
}

//To Game Class
function ListItemClick(itemid, itemlist) {
    console.log('Clicked listitem: ' + itemid + ' - in item list: ' + itemlist);

    switch (itemlist) {
        case 'xxx':
            console.log('Not yet implemented!');
            break;
        default:
            console.log('Click on ' + itemlist + ' not yet implemented!');
    }
}

//To Game Class
function SetItemList(itemlist) {
    console.log('selected item list: ' + itemlist + '-menu-link');
    //
    let api = itemlist.split('|')[0];
    let name = itemlist.split('|')[1];
    Util.setCookie('itemlist',api);
    Util.setCookie('listname',name);

    let id = api === 'player' ? currentPlayer.id : -1;

    SwitchMenuHighlight(api);
     
    //TODO DisplayData 
    switch (api) {
        case 'swarms':
            if (selectedArea !== undefined)
                PopulateList(selectedArea.habitats[0].swarms);
            else
                console.log('!?');
            break;
        case 'player':
            PopulateList(currentPlayer);
            break;
        default:
            console.log('Function not yet fully implemented!');
    }
     
}

//To Game Class
function SwitchMenuHighlight(api) {

    for (let i = 0; i < menulistApis.length; i++) {
        let tmp = menulistApis[i] + '-menu-link';
        let link = document.getElementById(tmp);
        link.classList.remove('pure-menu-active');
    }
    let tmp = document.getElementById(api + '-menu-link');
    tmp.classList.add('pure-menu-active');
    toggleMenuClass('view');
}

//To Game->View Class
function CanvasClick(name, evt) {
    let mousePos = Util.getMousePos(canvas, evt);
    let x = Math.floor(mousePos.x);
    let y = Math.floor(mousePos.y);
    console.log('Canvas: ' + name + 'Canvas - click: ' + x + ',' + y);
    
    switch (name) {
        case 'mapview': 
            SelectArea(x, y);
            DrawMap();
            break;
        default:
            console.log('Click on ' + name + ' not yet implemented!');
    }
}

//To Game->View Class
function SetView(name) {
    console.log('selected view: ' + name);
    canvas = document.getElementById(name + 'Canvas');
    ctx = canvas.getContext('2d');

    let views = document.getElementsByClassName("view-port");
    for (let i = 0; i < views.length; i++) {
        //console.log('hiding: ' + views[i].id);
        views[i].hidden = true;
    }
    ////console.log('showing: ' + document.getElementById(name).id);
    document.getElementById(name).hidden = false;

    canvas.focus();
    toggleMenuClass('view');

    //document.getElementById('main-title').innerText = document.getElementById(name + '-menu-item').innerText; 
}

//To View Class
function PrepareCanvas(name) {
    canvas = document.getElementById(name + 'Canvas');
    ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = getCanvasThemeColor(name);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('click', function (evt) { CanvasClick(name, evt); }, false);

    //if(name === 'mapview')
    //    GetData(-1, 'area');
}

//To View Class
function AdaptViewSize() {
    console.log('AdaptViewSize');
    if (canvas === undefined) SetView('mapview');

    let gameArea = document.getElementById('game-area');
    let nav = document.getElementById('nav');
    let list = document.getElementById('list');
    //let header = document.getElementById('main-header');

    let hoffset = nav.offsetWidth + list.offsetWidth;
    //let voffset = header.offsetHeight;

    let cols = currentMap.cols;
    let rows = currentMap.rows;

    let widthToHeight = cols / rows;
    let newWidth = window.innerWidth - hoffset;
    let newHeight = window.innerHeight;// - voffset;

    if (newWidth < 0) newWidth = list.offsetWidth;
    // || newHeight < 0) {

    let newWidthToHeight = newWidth / newHeight;
     
    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameArea.style.height = newHeight + 'px';
        gameArea.style.width = newWidth + 'px';
    }
    else {
        newHeight = newWidth / widthToHeight;
        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight + 'px';
    }

    canvas.width = newWidth;
    canvas.height = newHeight;
    tilesize = Math.floor(newWidth / cols);
}

//To View Class
function getCanvasThemeColor(name) {
    //TODO make a more centrally controlled / css redo of this... 
    switch (name) {
        case 'mapview':
            return '#40c365';
        case 'traitview':
            return '#41ccb4';
        case 'buildview':
            return '#9543ff';
        case 'designview':
            return '#ffc94c';
        default:
            return '#ccc';
    }
}

//To View Class
function Update() {
    currentMap.drawMap(canvas);
}

//To Game (List?) Class
function PopulateList(data) { 
    console.log('PopulateList');
    console.log('Function not yet fully implemented!');

    let itemlist = Util.getCookie('itemlist');
    let listname = Util.getCookie('listname');
    document.getElementById('item-list').innerHTML = "";
    document.getElementById('chat-form').hidden = 'true';
    document.getElementById('itemlist-title').innerText = listname;// + "  for: " + api + "";
    
    console.log('Received ' + itemlist + ' - data ');

    switch (itemlist) {
        case 'swarms':
            if (data !== undefined)
                PopulateSwarmlist(data);//TODO if area, but what if species? 
            else
                console.log('no data');
            break;
        case 'species':
            PopulateSpeciesList(data.habitats[0].swarms);
            break;
        //    case 'areas':
        //        break;
        case 'player':
            PopulateProfileList(data);
            break;
        default:
            console.log('Function not yet implemented for: ' + itemlist);
    }    
}

//To Game (List?) Class
function PopulateSwarmlist(swarms) {
    console.log('Populate Swarms List');
    let itemlist = document.getElementById('item-list');
    for (let i = 0; i < swarms.length; i++) {
        let swarm = swarms[i];
        let t = document.getElementById('list-item-template').content.cloneNode(true);
        t.querySelector('.list-item-icon').src = 'img/creatures/' + swarm.species.name + '-icon.png';
        t.querySelector('.list-item-name').innerText = swarm.species.name;
        t.querySelector('.list-item-info').innerText = 'size: ' + swarm.size;
        t.querySelector('.list-item-description').innerText = 'Description';

        t.querySelector('.list-item').id = 'swarm-' + swarm.id;
        t.querySelector('.list-item').addEventListener('click', () => ListItemClick(swarm.id, 'test'));

        itemlist.appendChild(t);
    }
    document.getElementById('list-throbber').hidden = true;
}

//To Game (List?) Class
function PopulateSpeciesList(swarms) {
    console.log('Populate Species List');
    let species;
    for (let i = 0; i < swarms.length; i++) {
        let swarm = swarms[i];
        let sp = swarm.species;

        //TODO 
    }


    console.log('Function not implemented!');
}

//To Game (List?) Class
function PopulateProfileList(profile) {
    console.log('Populate Profile List');
    console.log('Function not completely implemented!');
    //console.log(profile);
    let itemlist = document.getElementById('item-list');

    let t = undefined;
    t = document.getElementById('list-item-template').content.cloneNode(true);
    t.querySelector('.list-item-name').innerText = 'Full name';
    t.querySelector('.list-item-info').innerText = profile.fullname;
    itemlist.appendChild(t);

    t = document.getElementById('list-item-template').content.cloneNode(true);
    t.querySelector('.list-item-name').innerText = 'Username';
    t.querySelector('.list-item-info').innerText = profile.username;
    itemlist.appendChild(t);

    t = document.getElementById('list-item-template').content.cloneNode(true);
    t.querySelector('.list-item-name').innerText = 'Last seen';
    t.querySelector('.list-item-info').innerText = profile.lastSeenDateTime;
    itemlist.appendChild(t);




    //    //t.querySelector('.list-item-icon').src = 'img/creatures/' + swarm.species.name + '-icon.png';
    //    t.querySelector('.list-item-description').innerText = 'Description';
    //    t.querySelector('.list-item').id = 'swarm-' + swarm.id;
    //    t.querySelector('.list-item').addEventListener('click', () => ListItemClick(swarm.id, 'test'));

    document.getElementById('list-throbber').hidden = true;

}

//To Game (List?) Class
function PopulateChatList() {
    console.log('Populate Chat List');
    console.log('Function not implemented!');

    document.getElementById('chat-form').hidden = 'false';
}

//To Game (List?) Class
function PopulateAreaList() {
    console.log('Populate Area List');
    console.log('Function not implemented!');
}

//To Game (List?) Class
function PopulateAreaDataList(areaid) {
    console.log('Getting data for area: ' + areaid);

    fetch('api/area/' + areaid)
        .then((result) => result.json())
        .then((area) => {
            //console.log(area);
            //
        });
}

//To MapView Class
function SelectArea(x, y) {
    let col = Math.floor(x / tilesize);
    let row = Math.floor(y / tilesize);
    selectedArea = currentMap.selectArea(col, row);
    Util.setCookie('selectedAreaId', selectedArea.id);
    return said;
}
