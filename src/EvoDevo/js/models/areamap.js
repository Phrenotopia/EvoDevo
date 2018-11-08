//RegionMap? WorldMap? 
class AreaMap {

    constructor(id, region, data) {
        this.id = id;
        this.region = region;
        if (data !== undefined && data !== null)
            this.initialize(data);
        else
            this.loadData();
    }

    initialize(map) {
        this.id = map.id;
        this.areas = map.areas;
        this.columns = map.columns;
        this.rows = map.rows;
        this.name = map.name;
    }

    loadData() {
        if (this.id !== null) {
            fetch('api/map/' + this.id)
                .then(result => result.json())
                .then(mapdata => this.initialize(mapdata))
                .catch(error => console.log(error));
        }
    }

    selectArea(col, row) {
        let a = col + row * this.columns;
        selectedAreaIndex = a;
        return this.areas[a];
    } 

    drawMap(canvas) {
        console.log("drawMap");
        if (this.areas === undefined) return;

        let height = canvas.height;
        let width = canvas.width;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#00568C";
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        let i = 0;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                let area = areas[i++];
                let tile = area.tile;
                let img = tileimages[tile];
                let x = c * tilesize;
                let y = r * tilesize;
                ctx.drawImage(
                    img,
                    0, 0,
                    img.width, img.height,
                    x, y,
                    tilesize, tilesize
                );
            }
        }

        if (gridlines)
            this.drawGridLines(canvas);

        if (selectedArea !== undefined)
            this.drawAreaSelection(ctx);
    }

    drawAreaSelection(ctx) {
        let a = areas.indexOf(selectedArea);
        let col = Math.floor(a % this.columns);
        let row = Math.floor(a / this.columns);
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        let x = col * tilesize + 2;
        let y = row * tilesize + 2;
        ctx.rect(x, y, tilesize - 3, tilesize - 3);
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.restore();
    }

    drawGridLines(canvas) {
        console.log('DrawGridLines');
        let height = canvas.height;
        let width = canvas.width;
        let ctx = canvas.getContext('2d');

        ctx.save();
        let strokeWidth = 1;
        let translate = strokeWidth % 2 / 2;
        ctx.strokeStyle = "black";
        ctx.lineWidth = strokeWidth;
        ctx.setLineDash([2, 2]);
        for (let x = 0; x < width; x += tilesize) {
            for (let y = 0; y < height; y += tilesize) {
                ctx.translate(translate, translate);
                ctx.beginPath();
                ctx.moveTo(x + tilesize, y);
                ctx.lineTo(x + tilesize, y + tilesize);
                ctx.lineTo(x, y + tilesize);
                ctx.stroke();
                ctx.translate(-translate, -translate);
                i++;
            }
        }
        ctx.restore();
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
        if (this.id !== null) {
            fetch('api/area/' + this.id)
                .then(result => result.json())
                .then(areadata => this.initialize(areadata))
                .catch(error => console.log(error));
        }
    }
}

