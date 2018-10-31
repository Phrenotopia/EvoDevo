var canvas; 
var ctx;
var username;
var userid = -1;
var areas;
var popcount;
var menulistApis  = ['player', 'chat', 'species', 'swarms', 'areas'];
var menulistNames = ['Profile', 'Chat', 'Species', 'Swarms', 'Areas'];

var currentPlayer;
var selectedArea;
var mapAreas = new Map();

function CheckUser() {
    username = GetUserName();
    userid = GetCookie('userid');
    if (username === "")
        window.location.replace("index.html?status=nouser");
    SetUp();
}

function SetUp() {
    document.getElementById('username').innerHTML = username;

    PrepareCanvas('mapview');
    PrepareCanvas('traitview');
    PrepareCanvas('buildview');
    PrepareCanvas('designview');

    SetView('mapview');
    GetMapData();
    //GetSpeciesData();
}

function MapDataLoaded() {
    console.log('map loaded with ' + areas.length + ' areas');
    let cookie = GetCookie('itemlist');
    if (cookie === null || cookie === '') SetItemList('player|Profile');
    else SetItemList(cookie);
}

function GetMapData() {
    
    fetch('api/area' + '')
        .then(result => result.json())
        .then(data => {
            areas = data;
            MapDataLoaded();
        })
        .catch(error => console.log(error));
    
}

function PrepareCanvas(name) {
    canvas = document.getElementById(name + 'Canvas');
    ctx = canvas.getContext('2d');

    ctx.fillStyle = getCanvasThemeColor(name);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('click', function (evt) { CanvasClick(name, evt); }, false);

    if(name === 'mapview')
        GetListData(-1, 'area');
}

function DrawMap(areas) {
    console.log("DrawMap with " + data);
    console.log("Not yet implemented!");

    for (let i = 0; i < areas.length; i++) {
        console.log(area[i]);
    }
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
    console.log('Canvas: ' + name + 'Canvas - click: ' + mousePos.x + ',' + mousePos.y);
    let r = Math.floor(Math.random()*12) + 1; //TODO tmp

    switch (name) {
        case 'mapview':
            GetListData(r, 'area'); 
            break;
        default:
            console.log('Click on ' + name + ' not yet implemented!');
    }
}

function ListItemClick(itemid, itemlist) {
    console.log('Clicked listitem: ' + itemid + ' - in item list: ' + itemlist);

    switch (itemlist) {
        case 'xxx':
            GetListData(-1, 'yyy');
            break;
        default:
            console.log('Click on ' + itemlist + ' not yet implemented!');
    }


}

function SetView(name) {
    console.log('selected: ' + name);
    canvas = document.getElementById(name + 'Canvas');
    ctx = canvas.getContext('2d');

    var views = document.getElementsByClassName("view-port");
    for (let i = 0; i < views.length; i++) {
        console.log('hiding: ' + views[i].id);
        views[i].hidden = true;
    }
    console.log('showing: ' + document.getElementById(name).id);
    document.getElementById(name).hidden = false;

    canvas.focus();
    toggleMenuClass('view');

    document.getElementById('main-title').innerText =
        document.getElementById(name + '-menu-item').innerText; 
}

function SetItemList(itemlist) {
    //
    var api = itemlist.split('|')[0];
    var name = itemlist.split('|')[1];
    console.log('selected: ' + itemlist + '-menu-link');
    document.cookie = 'itemlist=' + api;
    document.cookie = 'listname=' + name;
    console.log('cookies: ' + document.cookie);

    var id = api === 'player' ? userid : -1;

    SwitchMenuHighlight(api);
    
    //selectedArea?
    //selected ?????
    //id  ??????????
    //GetListData(id, api);
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


function GetListData(id, api) {
    //id - integer
    //api:      'player', 'chat', 'species', 'swarms', 'areas' 
    //itemlist: 'player', 'chat', 'species', 'swarms', 'areas' 
    //TODO sort out the above conflation... 

    let itemlist = GetCookie('itemlist');
    let strid; 
    console.log('Getting data at "/api/' + api + '" for: ' + itemlist + '[' + id + '];');
    if (id < 0) {
        console.log('no id specified');
        //return;
        strid = "";
    }
    else strid = "/" + id; 

    //TODO First check if data is not already available (id AND iteration nr?)
    //if so: PopulateList(data);

    fetch('api/' + api + strid)
        .then(result => result.json())
        .then(data => {
            console.log(data);

            //selectedArea = data; //TODO: generalize 
            if (strid !== "")
                PopulateList(data);
            else
                DrawMap(data);
            })
            .catch(error => console.log(error));

}

function PopulateList(data) {
    let itemlist = GetCookie('itemlist');
    let listname = GetCookie('listname');
    document.getElementById('item-list').innerHTML = "";
    document.getElementById('chat-form').hidden = 'true';
    document.getElementById('itemlist-title').innerText = listname;// + "  for: " + api + "";

    console.log('Received ' + itemlist + ' - data ');
    console.log('Function not yet fully implemented!');

    switch (itemlist) {
        case 'swarms':
            PopulateSwarmlist(data.swarms);//TODO if area, but what if species? 
            break;
        case 'species':
            PopulateSpeciesList(data.swarms);
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
    console.log('Function not implemented!');
    console.log(profile);
    var itemlist = document.getElementById('item-list');

    let t = undefined;
    t = document.getElementById('list-item-template').content.cloneNode(true);
    t.querySelector('.list-item-name').innerText = 'Full name';
    t.querySelector('.list-item-info').innerText = profile.fullName;
    itemlist.appendChild(t);

    t = document.getElementById('list-item-template').content.cloneNode(true);
    t.querySelector('.list-item-name').innerText = 'Username';
    t.querySelector('.list-item-info').innerText = profile.userName;
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
            console.log(area);
            //
        });
}

//function GetProfileData(args) {
//    var id = args[0];
//    console.log('Getting profile data');
//    console.log('Function not implemented!');
//}

//function GetChatMessages(args) {
//    var id = args[0];
//    console.log('Getting chat messages');
//    console.log('Function not implemented!');

//    var forwhat = args[0]; // 'areas', 'player', ... 

//    switch (forwhat) {
//        case 'areas':
//            console.log('Getting species for area: ' + id);

//            break;

//        case 'player':
//            console.log('Function: *for player* not implemented!');
//            break;

//        default:
//            console.log('Function: *' + forwhat + '* not implemented!');
//    }
//}

//function GetSwarms(args) {
//    var id = args[0];

//    if (id < 0) return;

//    console.log('Getting swarms for area: ' + id);

//    fetch('api/area/' + id)
//        .then((result) => result.json())
//        .then((area) => {
//            console.log(area);
//            selectedArea = area;
//            PopulateSwarmlist(area.swarms);
//        });
//}

//function GetAreaData(args) {
//    var id = args[0];
//    console.log('Getting area data for: ' + id);
//    console.log('Function not implemented!');
//}

//function GetAreas(args) {
//    var id = args[0];
//    console.log('Getting map areas');
//    console.log('Function not implemented!');
//}



//function UpdateItemList(args) {
//    //args: [id, view:name , ...] 
//    let itemlist = GetCookie('itemlist');
//    document.getElementById('item-list').innerHTML = "";
//    document.getElementById('chat-form').hidden = 'true';

//    switch (itemlist) {
//        case 'profile':
//            GetProfileData(args);
//            break;
//        case 'chat':
//            GetChatMessages(args);
//            break;
//        case 'swarms':
//            GetSwarms(args);
//            break;
//        case 'species':
//            GetSpecies(args);
//            break;
//        case 'areas':
//            GetAreaData(args);
//            break;
//        case 'areas':
//            GetAreas(args);
//            break;
//        default:
//            //GetAreas(args);
//            break;
//    }
//}