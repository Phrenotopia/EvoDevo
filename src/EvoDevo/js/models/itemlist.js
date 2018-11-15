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

        this.docItemList = document.getElementById('item-list');
        this.docListTemplate = document.getElementById('list-item-template');
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

        //this.docItemList = document.getElementById('item-list');
        //this.docListTemplate = document.getElementById('list-item-template');
        
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
        //this.profile = data;
        //this.docItemList = document.getElementById('item-list');
        //this.docListTemplate = document.getElementById('list-item-template');
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
        console.log('AreaList.constructor()');
        super(itemlist, parent, data);
    }

    populateList(data) {
        console.log('AreaList.populateList()');
        this.areas = data;
        console.log('Work in progress...');

        if (data !== undefined) {
            let areas = data;

            for (let i = 0; i < areas.count; i++) {
                let area = areas[i];
                let t = this.docListTemplate.content.cloneNode(true);

                //t.querySelector('.list-item-icon').src = 'img/creatures/' + swarm.species.name + '-icon.png';
                t.querySelector('.list-item-name').innerText = area.name;
                //t.querySelector('.list-item-info').innerText = 'size: ' + swarm.size;
                //t.querySelector('.list-item-description').innerText = 'Description';

                t.querySelector('.list-item').id = 'swarm-' + area.id;
                t.querySelector('.list-item').addEventListener('click', () => this.listItemClick(area.id, 'test'));

                this.docItemList.appendChild(t);
            }
        }
    }

    getData() {
        console.log('AreaList.getData()');

        return undefined;
    }
}

class AreaDataList extends ItemList {

    //areadata;


    constructor(itemlist, parent, data) {
        console.log('AreaDataList.constructor()');
        super(itemlist, parent, data);
        //this.profile = data;
        //this.docItemList = document.getElementById('item-list');
        //this.docListTemplate = document.getElementById('list-item-template');
    }

    populateList(data) {
        console.log('AreaDataList.populateList()');
        if (data !== undefined)
            this.areadata = data;
        let t = this.docListTemplate.content.cloneNode(true);

        try {
            t.querySelector('.list-item-name').innerText = 'Area name';
            t.querySelector('.list-item-info').innerText = this.areadata.name;
            this.docItemList.appendChild(t);

            t = document.getElementById('list-item-template').content.cloneNode(true);
            t.querySelector('.list-item-name').innerText = 'Main Habitat';
            t.querySelector('.list-item-info').innerText = 'biotope' + this.areadata.habitats[0].biotope;
            this.docItemList.appendChild(t);

            //t = document.getElementById('list-item-template').content.cloneNode(true);
            //t.querySelector('.list-item-name').innerText = 'Last seen';
            //t.querySelector('.list-item-info').innerText = this.profile.lastSeenDateTime;
            //this.docItemList.appendChild(t);

            //this.docItemList.appendChild(document.createElement('br'));

            t = document.createElement('p');
            t.innerText = 'Area swarms';
            t.setAttribute('style', 'display:block;margin:auto;width:50%');
            t.setAttribute('class', 'pure-button pure-button-active');
            t.setAttribute('onclick', 'GetSwarms(\'player\',' + this.areadata.id + ')');
            this.docItemList.appendChild(t);

            this.docItemList.appendChild(document.createElement('br'));

            t = document.createElement('p');
            t.innerText = 'Area species';
            t.setAttribute('style', 'display:block;margin:auto;width:50%');
            t.setAttribute('class', 'pure-button pure-button-active');
            t.setAttribute('onclick', 'GetSpecies(\'player\',' + this.areadata.id + ')');
            this.docItemList.appendChild(t);
        } catch (ex) {
            let t = document.createElement('p');
            t.innerText = 'Error: ' + ex.message;
            t.setAttribute('style', 'color:red');
            this.docItemList.appendChild(t);
            console.log(ex.stack);
        }
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
