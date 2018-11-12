
class Game {

    ////STATE
    //currentPlayer;
    //currentMap;
    //currentView;
    //currentItemList;

    ////COLLECTIONS
    //views;
    //itemlists;

    constructor(player, map) { //, region, world)
        console.log('Game.constructor()');
        this.currentPlayer = player;
        this.currentMap = map;

        //// HTML ELEMENT REFS ////
        this.docItemlist = document.getElementById('item-list');
        this.docChatform = document.getElementById('chat-form');
        this.docListTitle = document.getElementById('itemlist-title');
        this.docThrobber = document.getElementById('list-throbber');

        try {


            //// CONTROLS ////
            //menu:  ['My Stuff', 'Chat', 'Species', 'Swarms', 'Areas']
            //views: ['Map', 'Traits', 'Bodyplan', 'Design']

            //// VIEWS //// 
            this.views = new Map();
            this.views.set('mapview', new MapView(document.getElementById('mapviewCanvas'), this, this.currentMap));
            this.views.set('traitview', new TraitView(document.getElementById('traitviewCanvas'), this));
            this.views.set('buildview', new BuildView(document.getElementById('buildviewCanvas'), this));
            this.views.set('designview', new DesignView(document.getElementById('designviewCanvas'), this));
            this.setView('mapview');
            //TODO: Add view click event handlers 

            //// ITEM LISTS ////
            this.itemlists = new Map();
            this.itemlists.set('player-profile', new ProfileList(this.currentPlayer));
            this.itemlists.set('area-swarms', new SwarmsList());
            this.itemlists.set('map-areas', new AreaList(this.currentMap.areas));
            //TODO: Instantiate all remaining initial item lists

            this.currentItemList = this.itemlists.get('player-profile');
            this.populateList(player);
        }
        catch (ex) {
            console.log(ex); 
        }
    }

    toggleMenuClass(source) {
        console.log('Game.toggleMenuClass(' + source + ')');
        // Setting the active class name expands the menu vertically on small screens.
        let nav = document.getElementById('nav');

        if (nav.className === 'pure-u active') {
            nav.className = 'pure-u';
        }
        else {
            if (source === 'menu-button') nav.className = 'pure-u active';
        }
    }
    
    setItemList(itemlist) {
        console.log('selected item list: ' + itemlist + '-menu-link');

        Util.setCookie('itemlist', itemlist);
        
        this.switchMenuHighlight(itemlist);
        ////TODO DisplayData
        this.populateList();

        //switch (api) {
        //    case 'swarms':
        //        if (selectedArea !== undefined)
        //            PopulateList(selectedArea.habitats[0].swarms);
        //        else
        //            console.log('!?');
        //        break;
        //    case 'player':
        //        PopulateList(currentPlayer);
        //        break;
        //    default:
        //        console.log('Function not yet fully implemented!');
        //}

    }

    switchMenuHighlight(itemlist) {
        console.log('Game.switchMenuHighlight(' + itemlist + ')');
        for (let i = 0; i < this.itemlists.length; i++) {
            let tmp = itemlists[i] + '-menu-link';
            let link = document.getElementById(tmp);
            link.classList.remove('pure-menu-active');
        }
        let tmp = document.getElementById(itemlist + '-menu-link');
        tmp.classList.add('pure-menu-active');
        toggleMenuClass('view');
    }

    setView(name) {
        console.log('Game.setView(' + name + ')');

        let view = this.views.get(name);
        view.canvas.hidden = false;        
        this.currentView = view;

        for (let [key, view] of this.views) {
            if(key !== name)
                view.canvas.hidden = true;
        }

        this.toggleMenuClass('view');
    }

    selectMapArea(area) {
        console.log('Game.viewClick(' + area + ')');
        //TODO> Select: areas? swarms? species?
        this.currentItemList = this.itemlists.get('area-swarms');
        this.populateList(area);
    }

    populateList(data) {
        console.log('Game.populateList(' + data + ')');
        this.docItemlist.innerHTML = "";
        this.docChatform.hidden = 'true';
        //this.docListTitle.innerText = this.listname; 
        if (data === undefined) 
            data = this.currentItemList.data;
        
        if (data !== undefined) {
            //switch(listtype) case "area-swarms": 
            this.currentItemList.populateList(data.habitats[0].swarms);
        }

        this.docThrobber.hidden = true;
    }

    adaptView() {
        //if (this.currentView.loaded === true) {
            console.log('Game.adaptView');
            let container = document.getElementById('game-area');
            let nav = document.getElementById('nav');
            let list = document.getElementById('list');
            //let header = document.getElementById('main-header');

            let hoffset = nav.offsetWidth + list.offsetWidth;
            let voffset = 0; // header.offsetHeight;

            let newWidth = window.innerWidth - hoffset;
            let newHeight = window.innerHeight - voffset;
            if (newWidth < 0) newWidth = list.offsetWidth; // || newHeight < 0) {

        //TODO: this points to something else!?
            this.currentView.adaptViewSize(container, newWidth, newHeight); 
        //}
    }

}
