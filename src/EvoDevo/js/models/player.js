
export default class Player {

    constructor(id) {
        this.id = id;
    }

    loadData() {
        if (this.id !== null) {
            console.log('!?');
            fetch('api/player/' + this.id)
                .then(result => result.json())
                .then(user => {
                    console.log('initialized player: ' + this.id);
                    this.id = user.id;
                    this.username = user.userName;
                    this.fullname = user.fullName;
                    this.lastSeenDateTime = user.lastSeenDateTime;

                    this.swarms = user.swarms;
                    this.species = user.species;
                })
                .catch(error => console.log(error));
        }
    }
}