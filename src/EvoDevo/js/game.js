//import Player from './models/player';

//UI
var canvas, ctx;
var menulistApis  = ['player', 'chat', 'species', 'swarms', 'areas'];
var menulistNames = ['My Stuff', 'Chat', 'Species', 'Swarms', 'Areas'];

//Player
var currentPlayer;
var username;
var userid = -1;

//Map & areas
var map;
var currentMap;
var region;
var areas;
var cols = 4;
var rows = 4;
var imgcols = 4;
var maploaded = false;
var texture = 'alpha';
var tilesheet;
var tileimages;
var tilecount = 16;
var tilecounter = 0;
var mapAreas;
var selectedArea;
var selectedAreaId;

//Map rendering
let gridlines = true;
var height = 512;
var width = 512;
var tilesize = 128;

//Swarms
var selectedSwarms;


window.addEventListener('resize', AdaptViewSize, false);
window.addEventListener('resize', DrawMap, false);
window.addEventListener('orientationchange', AdaptViewSize, false);
window.addEventListener('orientationchange', DrawMap, false);
document.addEventListener('DOMContentLoaded', AdaptViewSize, false);
document.addEventListener('DOMContentLoaded', DrawMap, false); 

function CheckUser() {
    username = GetUserName();
    userid = GetCookie('userid');
    if (username === "")
        window.location.replace("index.html?status=nouser");
    SetUp();
}

function SetUp() {
    document.getElementById('username').innerHTML = username;

    currentMap = new AreaMap(1);

    PrepareCanvas('mapview');
    PrepareCanvas('traitview');
    PrepareCanvas('buildview');
    PrepareCanvas('designview');
    SetView('mapview');

    LoadResources(); 
    GetMapData();
    //GetSpeciesData();
    
    currentPlayer = new Player(userid);

}

function GetUserState() {

    //Selected Area
    selectedAreaId = GetCookie('selectedAreaId');
    selectedArea = areas.find(x => x.id.toString() === selectedAreaId); //
    console.log(selectedArea);
    GetData(selectedAreaId, 'area');



}

function AdaptViewSize() {
    console.log('AdaptViewSize');
    if (canvas === undefined) SetView('mapview');

    var gameArea = document.getElementById('game-area');
    var nav = document.getElementById('nav');
    var list = document.getElementById('list');
    //var header = document.getElementById('main-header');

    var hoffset = nav.offsetWidth + list.offsetWidth;
    //var voffset = header.offsetHeight;

    var widthToHeight = cols / rows;
    var newWidth = window.innerWidth - hoffset;
    var newHeight = window.innerHeight;// - voffset;

    if (newWidth < 0) newWidth = list.offsetWidth;
    // || newHeight < 0) {

    var newWidthToHeight = newWidth / newHeight;
     
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

function MapDataLoaded() {
    console.log('MapDataLoaded');

    console.log({ map });

    let cookie = GetCookie('itemlist');
    if (cookie === null || cookie === '') SetItemList('player|My Stuff');
    else SetItemList(cookie);

    GetUserState();
    DrawMap();
}

function LoadResources() {
    console.log('LoadResources');

    tilesheet = new Image();
    tilesheet.src = 'img\\maptiles\\' + texture + '\\tilesheet.png';

    tileimages = new Array(tilecount);
    for (var i = 0; i < tilecount; i++) {
        let img = new Image();
        let j = i;
        img.addEventListener('load', function () { imageFound(j, img); });
        img.addEventListener('error', function () { imageNotFound(j, img); });
        img.src = 'img\\maptiles\\' + texture + '\\tile-' + i + '.png';
    }
}

function imageFound(i, img) {
    tileimages[i] = img;
    //console.log('tile image nr ' + i + ' found & loaded: ' + img.src);
    tilecounter++;

    if (tilecounter >= tilecount && maploaded) {
        MapDataLoaded();
    }
}

function imageNotFound(i, img) {
    //console.log('tile image not found!');
    img.removeEventListener('error', function () { imageNotFound(i, img, true); });
    img.src = 'img\\maptiles\\' + texture + '\\tile-null.png';
    tileimages[i] = img;
}

function GetMapData() {


    console.log('GetMapData');
    maploaded = false;
    fetch('api/map/-1')
        .then(result => result.json())
        .then(data => {
            map = data;
            areas = Array.from(map.areas);
            cols = map.columns;
            rows = map.rows;
            maploaded = true;
        })
        .catch(error => console.log(error));
    
}

function PrepareCanvas(name) {
    canvas = document.getElementById(name + 'Canvas');
    ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = getCanvasThemeColor(name);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('click', function (evt) { CanvasClick(name, evt); }, false);

    if(name === 'mapview')
        GetData(-1, 'area');
}

function DrawMap() {
    console.log("DrawMap");
    if (areas === undefined) return;

    var height = canvas.height;
    var width = canvas.width;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#00568C";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    let i = 0;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            let area = areas[i++];
            let tile = area.tile;
            let img = tileimages[tile];
            let x = c * tilesize;
            let y = r * tilesize;
            ctx.drawImage(
                img,
                0, 0,
                img.width, img.height,
                x, y,
                tilesize, tilesize
            );
        }
    }

    if (gridlines)
        DrawGridLines();

    if (selectedArea !== undefined) {
        let a = areas.indexOf(selectedArea);
        let col = Math.floor(a%cols); 
        let row = Math.floor(a/cols); 
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        var x = col * tilesize + 2;
        var y = row * tilesize + 2;
        ctx.rect(x, y, tilesize - 3, tilesize - 3);
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.restore();
    }
}

function DrawGridLines() {
    console.log('DrawGridLines');
    var height = canvas.height;
    var width = canvas.width;
    let i = 0;

    ctx.save();
    var strokeWidth = 1;
    var translate = strokeWidth % 2 / 2;
    ctx.strokeStyle = "black";
    ctx.lineWidth = strokeWidth;
    ctx.setLineDash([2, 2]);
    for (var x = 0; x < width; x += tilesize ) {
        for (var y = 0; y < height; y += tilesize) {
            ctx.translate(translate, translate);
            ctx.beginPath();
            ctx.moveTo(x + tilesize, y);
            ctx.lineTo(x + tilesize, y + tilesize);
            ctx.lineTo(x, y + tilesize);
            ctx.stroke();
            ctx.translate(-translate, -translate);
            i++;
        }
    }
    ctx.restore();
}

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

function CanvasClick(name, evt) {
    var mousePos = getMousePos(canvas, evt);
    let x = Math.floor(mousePos.x);
    let y = Math.floor(mousePos.y);
    console.log('Canvas: ' + name + 'Canvas - click: ' + x + ',' + y);
    
    switch (name) {
        case 'mapview': 
            GetData(SelectArea(x, y), 'area');
            DrawMap();
            break;
        default:
            console.log('Click on ' + name + ' not yet implemented!');
    }
}

function SelectArea(x, y) {
    let col = Math.floor(x / tilesize);
    let row = Math.floor(y / tilesize);
    let a = col + row * 4;
    selectedAreaIndex = a;
    selectedArea = areas[a];
    let said = selectedArea.id;
    SetCookie('selectedAreaId', said);
    return said;
}

function ListItemClick(itemid, itemlist) {
    console.log('Clicked listitem: ' + itemid + ' - in item list: ' + itemlist);

    switch (itemlist) {
        case 'xxx':
            GetData(-1, 'yyy');
            break;
        default:
            console.log('Click on ' + itemlist + ' not yet implemented!');
    }
}

function SetView(name) {
    console.log('selected view: ' + name);
    canvas = document.getElementById(name + 'Canvas');
    ctx = canvas.getContext('2d');

    var views = document.getElementsByClassName("view-port");
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

function SetItemList(itemlist) {
    console.log('selected item list: ' + itemlist + '-menu-link');
    //
    var api = itemlist.split('|')[0];
    var name = itemlist.split('|')[1];
    SetCookie('itemlist',api);
    SetCookie('listname',name);

    var id = api === 'player' ? userid : -1;

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

function GetData(id, api) {
    //id - integer
    //api:      'player', 'chat', 'species', 'swarms', 'areas' 
    //itemlist: 'player', 'chat', 'species', 'swarms', 'areas' 
    //TODO sort out the above conflation... 

    let itemlist = GetCookie('itemlist');
    let strid; 
    console.log('Getting data at "/api/' + api + '" for: ' + itemlist + '[' + id + '];');
    if (id < 0 || id === null || id === undefined) {
        //console.log('no id specified');
        //return;
        strid = "";
    }
    else strid = "/" + id; 

    //TODO First check if data is not already available (id AND iteration nr?)
    //if so: PopulateList(data);

    fetch('api/' + api + strid)
        .then(result => result.json())
        .then(data => {
            //console.log(data);

            //selectedArea = data; //TODO: generalize 
            if (strid !== "")
                PopulateList(data);
            //else
                //DrawMap(data);
            })
            .catch(error => console.log(error));
}

function PopulateList(data) {
    console.log('PopulateList');
    console.log('Function not yet fully implemented!');

    let itemlist = GetCookie('itemlist');
    let listname = GetCookie('listname');
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

function PopulateSwarmlist(swarms) {
    console.log('Populate Swarms List');
    var itemlist = document.getElementById('item-list');
    for (var i = 0; i < swarms.length; i++) {
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

function PopulateSpeciesList(swarms) {
    console.log('Populate Species List');
    var species;
    for (var i = 0; i < swarms.length; i++) {
        let swarm = swarms[i];
        let sp = swarm.species;

        //TODO 
    }


    console.log('Function not implemented!');
}

function PopulateProfileList(profile) {
    console.log('Populate Profile List');
    console.log('Function not completely implemented!');
    //console.log(profile);
    var itemlist = document.getElementById('item-list');

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

function PopulateChatList() {
    console.log('Populate Chat List');
    console.log('Function not implemented!');

    document.getElementById('chat-form').hidden = 'false';
}

function PopulateAreaList() {
    console.log('Populate Area List');
    console.log('Function not implemented!');
}

function PopulateAreaDataList(areaid) {
    console.log('Getting data for area: ' + areaid);

    fetch('api/area/' + areaid)
        .then((result) => result.json())
        .then((area) => {
            //console.log(area);
            //
        });
}



class Player {

    constructor(id, data) {
        this.id = id;
        if (data !== undefined && data !== null)
            this.initialize(data);
        else
            this.loadData();
    }

    initialize(user) {
        this.id = user.id;
        this.username = user.userName;
        this.fullname = user.fullName;
        this.lastSeenDateTime = user.lastSeenDateTime;
        //collections
        this.swarms = user.swarms;
        this.species = user.species; 
    }

    loadData() {
        if (this.id !== null) {
            fetch('api/player/' + this.id)
                .then(result => result.json())
                .then(user => {
                    console.log('initialized player: ' + this.id);
                    initialize(user);
                })
                .catch(error => console.log(error));
        }
    }
    
    saveData() {
        //TODO
        //if (this.id !== null) {
        //    fetch('api/player/' + this.id)
        //        .then(result => result.json())
        //        .then(user => {
                    console.log('saving player: ' + this.id);
                    console.log('Function not yet implemented!');
        //        })
        //        .catch(error => console.log(error));
        //}
    }
}

class AreaMap {

    constructor(id, region, data) {
        this.id = id;
        this.region = region;
        if (data !== undefined && data !== null)
            this.initialize(data);
        else
            this.loadData();
    }

    initialize(map) {
        this.id = map.id;
        this.areas = map.areas;
        this.columns = map.columns;
        this.rows = map.rows;
        this.name = map.name;
    }

    loadData() {
        if (this.id !== null) {
            fetch('api/map/' + this.id)
                .then(result => result.json())
                .then(mapdata => this.initialize(mapdata))
                .catch(error => console.log(error));
        }
    }
}

