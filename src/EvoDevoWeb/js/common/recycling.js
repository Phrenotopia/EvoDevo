
////To Game Class
//function SetItemList(itemlist) {
//    console.log('selected item list: ' + itemlist + '-menu-link');
//    //
//    let api = itemlist.split('|')[0];
//    let name = itemlist.split('|')[1];
//    Util.setCookie('itemlist',api);
//    Util.setCookie('listname',name);

//    let id = api === 'player' ? currentPlayer.id : -1;

//    SwitchMenuHighlight(api);
     
//    //TODO DisplayData 
//    switch (api) {
//        case 'swarms':
//            if (selectedArea !== undefined)
//                PopulateList(selectedArea.habitats[0].swarms);
//            else
//                console.log('!?');
//            break;
//        case 'player':
//            PopulateList(currentPlayer);
//            break;
//        default:
//            console.log('Function not yet fully implemented!');
//    }
     
//}

////To Game Class
//function SwitchMenuHighlight(api) {

//    for (let i = 0; i < menulistApis.length; i++) {
//        let tmp = menulistApis[i] + '-menu-link';
//        let link = document.getElementById(tmp);
//        link.classList.remove('pure-menu-active');
//    }
//    let tmp = document.getElementById(api + '-menu-link');
//    tmp.classList.add('pure-menu-active');
//    toggleMenuClass('view');
//}

////To Game->View Class
//function CanvasClick(name, evt) {
//    let mousePos = Util.getMousePos(canvas, evt);
//    let x = Math.floor(mousePos.x);
//    let y = Math.floor(mousePos.y);
//    console.log('Canvas: ' + name + 'Canvas - click: ' + x + ',' + y);
    
//    switch (name) {
//        case 'mapview': 
//            SelectArea(x, y);
//            DrawMap();
//            break;
//        default:
//            console.log('Click on ' + name + ' not yet implemented!');
//    }
//}

////To Game Class
//function SetView(name) {
//    console.log('selected view: ' + name);
//    canvas = document.getElementById(name + 'Canvas');
//    ctx = canvas.getContext('2d');

//    let views = document.getElementsByClassName("view-port");
//    for (let i = 0; i < views.length; i++) {
//        //console.log('hiding: ' + views[i].id);
//        views[i].hidden = true;
//    }
//    ////console.log('showing: ' + document.getElementById(name).id);
//    document.getElementById(name).hidden = false;

//    canvas.focus();
//    toggleMenuClass('view');

//    //document.getElementById('main-title').innerText = document.getElementById(name + '-menu-item').innerText; 
//}

//To View Class
//function PrepareCanvas(name) {
//    canvas = document.getElementById(name + 'Canvas');
//    ctx = canvas.getContext('2d');
//    ctx.imageSmoothingEnabled = false;

//    ctx.fillStyle = getCanvasThemeColor(name);
//    ctx.fillRect(0, 0, canvas.width, canvas.height);

//    canvas.addEventListener('click', function (evt) { CanvasClick(name, evt); }, false);

//    //if(name === 'mapview')
//    //    GetData(-1, 'area');
//}

////To View Class
//function AdaptViewSize() {
//    console.log('AdaptViewSize');
//    if (canvas === undefined) SetView('mapview');

//    let gameArea = document.getElementById('game-area');
//    let nav = document.getElementById('nav');
//    let list = document.getElementById('list');
//    //let header = document.getElementById('main-header');

//    let hoffset = nav.offsetWidth + list.offsetWidth;
//    //let voffset = header.offsetHeight;

//    let cols = currentMap.cols;
//    let rows = currentMap.rows;

//    let widthToHeight = cols / rows;
//    let newWidth = window.innerWidth - hoffset;
//    let newHeight = window.innerHeight;// - voffset;

//    if (newWidth < 0) newWidth = list.offsetWidth;
//    // || newHeight < 0) {

//    let newWidthToHeight = newWidth / newHeight;
     
//    if (newWidthToHeight > widthToHeight) {
//        newWidth = newHeight * widthToHeight;
//        gameArea.style.height = newHeight + 'px';
//        gameArea.style.width = newWidth + 'px';
//    }
//    else {
//        newHeight = newWidth / widthToHeight;
//        gameArea.style.width = newWidth + 'px';
//        gameArea.style.height = newHeight + 'px';
//    }

//    canvas.width = newWidth;
//    canvas.height = newHeight;
//    tilesize = Math.floor(newWidth / cols);
//}

////To Game Class
//function PopulateList(data) { 
//    let itemlist = Util.getCookie('itemlist');
//    let listname = Util.getCookie('listname');

//    document.getElementById('item-list').innerHTML = "";
//    document.getElementById('chat-form').hidden = 'true';
//    document.getElementById('itemlist-title').innerText = listname;// + "  for: " + api + "";
    
//    console.log('Received ' + itemlist + ' - data ');

//    switch (itemlist) {
//        case 'swarms':
//            if (data !== undefined)
//                PopulateSwarmlist(data);//TODO if area, but what if species? 
//            else
//                console.log('no data');
//            break;
//        case 'species':
//            PopulateSpeciesList(data.habitats[0].swarms);
//            break;
//        //    case 'areas':
//        //        break;
//        case 'player':
//            PopulateProfileList(data);
//            break;
//        default:
//            console.log('Function not yet implemented for: ' + itemlist);
//    }

//    document.getElementById('list-throbber').hidden = true;
//}


////To ItemList Class
//function PopulateSpeciesList(swarms) {
//    console.log('Populate Species List');
//    let species;
//    for (let i = 0; i < swarms.length; i++) {
//        let swarm = swarms[i];
//        let sp = swarm.species;

//        //TODO 
//    }


//    console.log('Function not implemented!');
//}

////To ItemList Class
//function PopulateProfileList(profile) {
//    console.log('Populate Profile List');
//    console.log('Function not completely implemented!');
//    //console.log(profile);
//    let itemlist = document.getElementById('item-list');

//    let t = undefined;
//    t = document.getElementById('list-item-template').content.cloneNode(true);
//    t.querySelector('.list-item-name').innerText = 'Full name';
//    t.querySelector('.list-item-info').innerText = profile.fullname;
//    itemlist.appendChild(t);

//    t = document.getElementById('list-item-template').content.cloneNode(true);
//    t.querySelector('.list-item-name').innerText = 'Username';
//    t.querySelector('.list-item-info').innerText = profile.username;
//    itemlist.appendChild(t);

//    t = document.getElementById('list-item-template').content.cloneNode(true);
//    t.querySelector('.list-item-name').innerText = 'Last seen';
//    t.querySelector('.list-item-info').innerText = profile.lastSeenDateTime;
//    itemlist.appendChild(t);




//    //    //t.querySelector('.list-item-icon').src = 'img/creatures/' + swarm.species.name + '-icon.png';
//    //    t.querySelector('.list-item-description').innerText = 'Description';
//    //    t.querySelector('.list-item').id = 'swarm-' + swarm.id;
//    //    t.querySelector('.list-item').addEventListener('click', () => ListItemClick(swarm.id, 'test'));

//    document.getElementById('list-throbber').hidden = true;

//}

////To ItemList Class
//function PopulateChatList() {
//    console.log('Populate Chat List');
//    console.log('Function not implemented!');

//    document.getElementById('chat-form').hidden = 'false';
//}

////To ItemList Class
//function PopulateAreaList() {
//    console.log('Populate Area List');
//    console.log('Function not implemented!');
//}

////To ItemList Class
//function PopulateAreaDataList(areaid) {
//    console.log('Getting data for area: ' + areaid);

//    fetch('api/area/' + areaid)
//        .then((result) => result.json())
//        .then((area) => {
//            //console.log(area);
//            //
//        });
//}

////To (Map)View Class
//function SelectArea(x, y) {
//    let col = Math.floor(x / tilesize);
//    let row = Math.floor(y / tilesize);
//    selectedArea = currentMap.selectArea(col, row);
//    Util.setCookie('selectedAreaId', selectedArea.id);
//    return said;
//}
 

