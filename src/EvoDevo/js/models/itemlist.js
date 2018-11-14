//itemlist.js
class ItemList {

    //docListTemplate;
    //docItemList;
    //itemlist
    //parent;
    //data;

    constructor(itemlist, parent, data) {
        console.log('ItemList.constructor()');
        this.parent = parent;
        this.data = data;
        this.itemlist = itemlist;
        //this.docItemList = document.getElementById('item-list');
        //this.docListTemplate = document.getElementById('list-item-template');
        //this.populateList(data);
    }

    populateList(data) {
        console.log('ItemList.populateList()');
        this.data = data;

    }

    listItemClick(itemid, itemlist) {
        console.log('ItemList.listItemClick(' + itemid + ',' + itemlist + ')');
        console.log('Not yet implemented!');

    }

    getData() {
        console.log('ItemList.getData()');

        return undefined;
    }
}

class SwarmsList extends ItemList {

    //swarms;

    constructor(itemlist, parent, data) {
        super(itemlist, parent, data);
        this.swarms = data;

        this.docItemList = document.getElementById('item-list');
        this.docListTemplate = document.getElementById('list-item-template');
        
    }

    populateList(data) {
        console.log('SwarmsList.populateList()');

        //TODO ask view wat area is selected? 
        //TODO: context => player's swarms or area swarms or species swarms? (switch/case)
        //case 'area-swarms'


        if (data !== undefined) {
            this.swarms = data.habitats[0].swarms;

            for (let i = 0; i < this.swarms.length; i++) {
                let swarm = this.swarms[i];
                let t = this.docListTemplate.content.cloneNode(true);

                t.querySelector('.list-item-icon').src = 'img/creatures/' + swarm.species.name + '-icon.png';
                t.querySelector('.list-item-name').innerText = swarm.species.name;
                t.querySelector('.list-item-info').innerText = 'size: ' + swarm.size;
                t.querySelector('.list-item-description').innerText = 'Description';

                t.querySelector('.list-item').id = 'swarm-' + swarm.id;
                t.querySelector('.list-item').addEventListener('click', () => this.listItemClick(swarm.id, 'test'));

                this.docItemList.appendChild(t);
            }
        }
    }

    //getData() {
    //    console.log('SwarmsList.getData()');
    //    let area;
    //    if (this.parent.currentPlayer.selectedArea === undefined) {
    //        area = this.parent.selectMapArea();
    //    }
    //    return area;
    //    //}
    //    //    this.data = this.parent.currentPlayer.selectedArea;
    //    //    this.swarms = this.habitats[0].getSwarms();

    //    //    return data;
    //    //}
    //    //{
    //    //    return this.parent.currentPlayer.selectedArea.swarms;
    //    //    //return this.parent.currentMap.getSwarms();
    //    //}
    //    //return undefined;
    //}

    listItemClick(itemid, itemlist) {
        console.log('SwarmsList.listItemClick(' + itemid + ',' + itemlist + ')');
        console.log('Not yet implemented!');

    }
}

class SpeciesList extends ItemList {

    //species;

    constructor(itemlist, parent, data) {
        console.log('SpeciesList.constructor()');
        super(itemlist, parent, data);
    }

    populateList(data) {
        console.log('SpeciesList.populateList()');
        this.species = data;
        console.log('Not yet implemented!');
    }
}

class ProfileList extends ItemList {

    //profile;

    constructor(itemlist, parent, data) {
        console.log('ProfileList.constructor()');
        super(itemlist, parent, data );
        this.profile = data;
        this.docItemList = document.getElementById('item-list');
        this.docListTemplate = document.getElementById('list-item-template');
    }

    populateList(data) {
        console.log('ProfileList.populateList()');
        if (data !== undefined)
            this.profile = data;
        let t = this.docListTemplate.content.cloneNode(true);

        t.querySelector('.list-item-name').innerText = 'Full name';
        t.querySelector('.list-item-info').innerText = this.profile.fullname;
        this.docItemList.appendChild(t);

        t = document.getElementById('list-item-template').content.cloneNode(true);
        t.querySelector('.list-item-name').innerText = 'Username';
        t.querySelector('.list-item-info').innerText = this.profile.username;
        this.docItemList.appendChild(t);

        t = document.getElementById('list-item-template').content.cloneNode(true);
        t.querySelector('.list-item-name').innerText = 'Last seen';
        t.querySelector('.list-item-info').innerText = this.profile.lastSeenDateTime;
        this.docItemList.appendChild(t);

        this.docItemList.appendChild(document.createElement('br'));

        t = document.createElement('p');
        t.innerText = 'My swarms';
        t.setAttribute('style', 'display:block;margin:auto;width:50%');
        t.setAttribute('class', 'pure-button pure-button-active');
        t.setAttribute('onclick', 'GetSwarms(\'player\',' + this.profile.id + ')');
        this.docItemList.appendChild(t);

        this.docItemList.appendChild(document.createElement('br'));

        t = document.createElement('p');
        t.innerText = 'My species';
        t.setAttribute('style', 'display:block;margin:auto;width:50%');
        t.setAttribute('class', 'pure-button pure-button-active');
        t.setAttribute('onclick', 'GetSpecies(\'player\',' + this.profile.id + ')');
        this.docItemList.appendChild(t);
    }

}

class AreaList extends ItemList {

    //areas;

    constructor(itemlist, parent, data) {
        super(itemlist, parent, data);
    }

    populateList(data) {
        this.areas = data;
        console.log('Not yet implemented!');
    }

}

class AreaDataList extends ItemList {

    //areadata;

    constructor(itemlist, parent, data) {
        super(itemlist, parent, data);
    }

    populateList(data) {
        this.areadata = data;
        console.log('Not yet implemented!');
    }

}

class ChatList extends ItemList {

    //chatmessages;

    constructor(itemlist, parent, data) {
        super(itemlist, parent, data);

    }

    populateList(data) {
        this.chatmessages = data;
        console.log('Not yet implemented!');
    }

}
