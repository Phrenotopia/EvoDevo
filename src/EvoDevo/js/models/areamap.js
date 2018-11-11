//RegionMap? WorldMap? 
class AreaMap {

    //id;
    //region;
    //areas;
    //columns;
    //rows;
    //tilecount;
    //name;
    //loaded;

    constructor(id, region, data) {
        console.log('AreaMap.constructor');
        this.id = id;
        this.region = region;
        if (data !== undefined && data !== null)
            this.initialize(data);
        else
            this.loadData();
    }

    initialize(map) {
        console.log('AreaMap.initialize');
        this.id = map.id;
        this.areas = map.areas;
        this.columns = map.columns;
        this.rows = map.rows;
        this.tilecount = this.columns * this.rows;
        this.name = map.name;
        this.loaded = true;
    }

    loadData() {
        console.log('AreaMap.loadData');
        if (this.id !== null) {
            fetch('api/map/' + this.id)
                .then(result => result.json())
                .then(mapdata => this.initialize(mapdata))
                .catch(error => console.log(error));
        }
    }

    selectArea(col, row) {
        console.log('AreaMap.selectArea');
        let a = col + row * this.columns;
        this.selectedAreaIndex = a;
        return this.areas[a];
    }
}

class Area {

    constructor(id, data) {
        this.id = id;
        if (data !== undefined && data !== null)
            this.initialize(data);
        else
            this.loadData();
    }

    initialize(area) {
        this.id = area.id;
        this.name = area.name;
        this.tile = area.tile;
        this.region = area.region;
        this.habitats = area.habitats;
    }

    loadData() {
        if (this.id !== null && this.id !== undefined && !isNaN(this)) {
            fetch('api/area/' + this.id)
                .then(result => result.json())
                .then(areadata => {
                    this.initialize(areadata);
                })
                .catch(error => console.log(error));
        }
    }
}

