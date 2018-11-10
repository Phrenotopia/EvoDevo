//itemlist.js
class ItemList {

    docItemList;
    data;

    constructor(data) {
        this.docItemList = document.getElementById('item-list');
        //this.populateList(data);
    }

    populateList(data) {
        this.data = data;

    }

    listItemClick(itemid, itemlist) {
        console.log('ItemList.listItemClick(' + itemid + ',' + itemlist + ')');
        console.log('Not yet implemented!');

    }
}

class SwarmsList extends ItemList {

    swarms;

    constructor(data) {
        super(data);
    }

    populateList(data) {
        this.swarms = data;

        for (let i = 0; i < this.swarms.length; i++) {
            let swarm = this.swarms[i];
            let t = this.docListTemplate.content.cloneNode(true);

            t.querySelector('.list-item-icon').src = 'img/creatures/' + swarm.species.name + '-icon.png';
            t.querySelector('.list-item-name').innerText = swarm.species.name;
            t.querySelector('.list-item-info').innerText = 'size: ' + swarm.size;
            t.querySelector('.list-item-description').innerText = 'Description';

            t.querySelector('.list-item').id = 'swarm-' + swarm.id;
            t.querySelector('.list-item').addEventListener('click', () => this.listItemClick(swarm.id, 'test'));

            super.docItemList.appendChild(t);
        }
    }

    listItemClick(itemid, itemlist) {
        console.log('SwarmsList.listItemClick(' + itemid + ',' + itemlist + ')');
        console.log('Not yet implemented!');

    }
}

class SpeciesList extends ItemList {

    species;

    constructor(data) {
        super(data);
    }

    populateList(data) {
        this.species = data;
        console.log('Not yet implemented!');
    }
}

class ProfileList extends ItemList {

    profile;

    constructor(data) {
        super(data);
    }

    populateList(data) {
        this.profile = data;
        let t = this.docListTemplate.content.cloneNode(true);

        t.querySelector('.list-item-name').innerText = 'Full name';
        t.querySelector('.list-item-info').innerText = this.profile.fullname;
        itemlist.appendChild(t);

        t = document.getElementById('list-item-template').content.cloneNode(true);
        t.querySelector('.list-item-name').innerText = 'Username';
        t.querySelector('.list-item-info').innerText = this.profile.username;
        itemlist.appendChild(t);

        t = document.getElementById('list-item-template').content.cloneNode(true);
        t.querySelector('.list-item-name').innerText = 'Last seen';
        t.querySelector('.list-item-info').innerText = this.profile.lastSeenDateTime;

        super.docItemList.appendChild(t);
    }

}

class ChatList extends ItemList {

    chatmessages;

    constructor() {
        super();
        this.docListTemplate = document.getElementById('list-item-template');
    }

    populateList(data) {
        this.chatmessages = data;
        console.log('Not yet implemented!');
    }

}

class AreaDataList extends ItemList {

    areadata;

    constructor() {
        super();
    }

    populateList(data) {
        this.areadata = data;
        console.log('Not yet implemented!');
    }

}

class AreaList extends ItemList {

    areas;

    constructor() {
        super();
    }

    populateList(data) {
        this.areas = data;
        console.log('Not yet implemented!');
    }

}