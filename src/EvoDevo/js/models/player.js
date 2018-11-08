// models/player.js
//export default
class Player {

    constructor(id, data) {
        try {
            this.id = id;
            if (data !== undefined && data !== null)
                this.initialize(data);
            else
                this.loadData();
        }
        catch (err) {
            console.log(err.message);
            return null;
        }
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

    SetSelectedArea(id, area) {
        this.selectedArea = new Area(id, area);
        if(area === undefined && id !== null)
        selectedAreaId = Util.getCookie('selectedAreaId');
        selectedArea = areas.find(x => x.id.toString() === selectedAreaId); 
        GetData(selectedAreaId, 'area');
    }

    loadData() {
        if (this.id !== null) {
            fetch('api/player/' + this.id)
                .then(result => result.json())
                .then(user => {
                    console.log('initialized player: ' + this.id);
                    this.initialize(user);
                })
                .catch(error => console.log(error));
        }
    }

    saveData() {
        TODO
        this.lastSeenDateTime = Date.now();
        if (this.id !== null) {
            fetch('api/player/' + this.id)
                .then(result => result.json())
                .then(user => {
                    console.log('saving player: ' + this.id);
                    console.log('Function not yet implemented!');
                })
                .catch(error => console.log(error));
        }
    }
}
