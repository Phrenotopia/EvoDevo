
class Game {

    ////STATE
    //currentPlayer;
    //currentView;
    //currentItemList;

    ////COLLECTIONS
    //views;
    //itemlists;

    constructor(player, map) { //, region, world)
        console.log('Game.constructor()');
        this.currentPlayer = player;

        //// HTML ELEMENT REFS ////
        this.docItemlist = document.getElementById('item-list');
        this.docChatform = document.getElementById('chat-form');
        this.docListTitle = document.getElementById('itemlist-title');
        this.docThrobber = document.getElementById('list-throbber');

        try {
            //// VIEWS //// 
            this.views = new Map();
            this.views.set('mapview', new MapView(document.getElementById('mapviewCanvas'), this, map));
            this.views.set('traitview', new TraitView(document.getElementById('traitviewCanvas'), this));
            this.views.set('buildview', new BuildView(document.getElementById('buildviewCanvas'), this));
            this.views.set('designview', new DesignView(document.getElementById('designviewCanvas'), this));
            this.setView('mapview');
            //TODO: Alternative - Iterate HTML page elements collected on class name? ('view-port')

            //// ITEM LISTS ////
            this.itemlists = new Map();
            this.itemlists.set('player', new ProfileList(document.getElementById('item-list'), this, this.currentPlayer));
            this.itemlists.set('swarms', new SwarmsList(document.getElementById('item-list'), this));
            this.itemlists.set('areas', new AreaList(document.getElementById('item-list'), this, map.areas)); 
            this.itemlists.set('species', new SpeciesList(document.getElementById('item-list'), this));
            this.itemlists.set('chat', new ChatList(document.getElementById('item-list'), this));

            this.currentItemList = this.itemlists.get('player');
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
    
    setView(name) {
        console.log('Game.setView(' + name + ')');

        let view = this.views.get(name);
        view.canvas.hidden = false;        
        this.currentView = view;

        for (let [key, view] of this.views) {
            if(key !== name)
                view.canvas.hidden = true;
        }

        this.toggleMenuClass('game');
    }
        
    setItemList(itemlist) {
        console.log('Game.setItemList(' + itemlist + ')');
        console.log('selected item list: ' + itemlist + '-menu-link');

        Util.setCookie('itemlist', itemlist);

        this.currentItemList = this.itemlists.get(itemlist);

        this.switchMenuHighlight(itemlist);

        let data = this.currentView.getUserState();
        this.populateList(data);

        this.update();
    }

    switchMenuHighlight(itemlist) {
        console.log('Game.switchMenuHighlight(' + itemlist + ')');

        for (let [key, menulink] of this.itemlists) {
            let e = document.getElementById(key + '-menu-link');
            if (e !== undefined)
                e.classList.remove('pure-menu-active');
        }
        
        document.getElementById(itemlist + '-menu-link').classList.add('pure-menu-active');

        this.toggleMenuClass('game');
    }

    populateList(data) { 
        console.log('Game.populateList(' + data + ')');
        this.docItemlist.innerHTML = "";
        this.docChatform.hidden = 'true';

        this.currentItemList.populateList(data);//TODO: context? 
        
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
                
            this.currentView.adaptViewSize(container, newWidth, newHeight); 
        //}
    }

    update() {

        this.currentView.update();
    }
}
