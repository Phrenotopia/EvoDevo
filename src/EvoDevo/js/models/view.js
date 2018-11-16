
class GameView {

    //name;
    //canvas;
    //themeColor;
    //loaded = false;
    //parent;

    constructor(canvas, parent, data) {
        this.name = "default";
        this.canvas = canvas;
        this.themeColor = '#ccc';
        this.loaded = false;
        this.parent = parent;

        //resources
        this.imgcount = 1;//?
        this.images = new Array(this.imgcount);
        this.imgcounter = 0;

        this.prepareCanvas();
    }

    prepareCanvas() {
        console.log('GameView.prepareCanvas');
        let ctx = this.canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        ctx.fillStyle = this.getCanvasThemeColor(name);
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.canvas.addEventListener('click', this.canvasClick.bind(this), false);
    }

    update() {
        console.log('GameView.update');

    }

    setCanvasThemeColor(color) {
        console.log('GameView.setCanvasThemeColor');
        this.themeColor = color;
    }

    getCanvasThemeColor() {
        console.log('GameView.getCanvasThemeColor');
        return this.themeColor;
    }

    canvasClick(evt) {
        console.log('GameView.canvasClick');

    }

    adaptViewSize(container, newWidth, newHeight) {
        console.log('GameView.adaptViewSize(' + container + ',' + newWidth + ',' + newHeight + ')');

    }

    loadResources() {
        console.log('GameView.loadResources');

    }

    imageFound(i, img) {
        console.log('GameView.imageFound()');

        //this.images[i] = img;
        //console.log('image nr ' + i + ' found & loaded: ' + img.src);
        //this.tilecounter++;

        //if (this.imgcounter >= this.imgcount) {
        //    this.dataLoaded();
        //}
    }

    imageNotFound(i, img) {
        console.log('GameView.imageNotFound');
        console.log('image not found!');

        //let fnImageNotFound = function () { this.imageNotFound(i, img); };
        //img.removeEventListener('error', fnImageNotFound); //function () { this.imageNotFound(i, img); }

        //img.src = 'img\\xxxxxx\\' + this.yyyyy + '\\zzzzz-null.png';
        //this.images[i] = img;
    }

    dataLoaded() {
        console.log('GameView.dataLoaded');
        this.loaded = true;
        this.update();
    }

    mouseClick(x, y) {
        console.log('GameView.mouseClick(' + x + ',' + y + ')');
    }

    show() {
        console.log('GameView.show()');
        this.canvas.hidden = false;
        this.canvas.focus();

    }

    hide() {
        console.log('GameView.hide()');
        this.canvas.hidden = true;
    }

    getUserState() {
        console.log('Game View.getUserState');

    }
}

///////////////////////////////////////////////////////////////////////////////////

class MapView extends GameView {

    //currentMap;
    //selectedArea;
    //selectedAreaId;
    //texture;
    //tileimages;
    //tilecount;
    //tilecounter;
    //gridlines;
    //height;
    //width;
    //tilesize;

    constructor(canvas, parent, data) {
        console.log('MapView.constructor');

        super(canvas, parent, data);
        this.themeColor = '#40c365';
        this.name = "mapview";

        this.parent = parent; 

        this.currentMap = data;
        this.selectedArea = undefined;
        //this.loaded = false;
        this.texture = 'alpha';
        this.tilecount = this.currentMap.tilecount;
        this.tileimages = new Array(this.tilecount);
        this.tilecounter = 0;
        this.gridlines = true;
        this.height = 512;
        this.width = 512;
        this.tilesize = 128;

        this.loadResources();
        this.getUserState();
    }

    drawMap() {
        console.log("MapView.drawMap()");
        if (this.currentMap.areas === undefined) return;

        let height = this.canvas.height;
        let width = this.canvas.width;
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#00568C";
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        let i = 0;
        for (let r = 0; r < this.currentMap.rows; r++) {
            for (let c = 0; c < this.currentMap.columns; c++) {
                let x = c * this.tilesize;  
                let y = r * this.tilesize;  
                let area = this.currentMap.areas[i++];
                let tile = area.tile;
                let img = this.tileimages[tile];
                if (img !== undefined) {
                    ctx.drawImage(
                        img,
                        0, 0,
                        img.width, img.height,
                        x, y,
                        this.tilesize, this.tilesize
                    );
                }
            }
        }

        if (this.gridlines)
            this.drawGridLines();

        if (this.selectedArea !== undefined)
            this.drawAreaSelection();
    }

    drawAreaSelection() {
        console.log('MapView.drawAreaSelection()');
        let ctx = this.canvas.getContext('2d');
        let a = this.currentMap.areas.indexOf(this.selectedArea);
        let col = Math.floor(a % this.currentMap.columns);
        let row = Math.floor(a / this.currentMap.columns);
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        let x = col * this.tilesize + 2;
        let y = row * this.tilesize + 2;
        ctx.rect(x, y, this.tilesize - 3, this.tilesize - 3);
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.restore();
    }

    drawGridLines() {
        console.log('MapView.drawGridLines()');
        let ctx = this.canvas.getContext('2d');
        let height = this.canvas.height;
        let width = this.canvas.width;

        ctx.save();
        let strokeWidth = 1;
        let translate = strokeWidth % 2 / 2;
        ctx.strokeStyle = "black";
        ctx.lineWidth = strokeWidth;
        ctx.setLineDash([2, 2]);

        for (let x = 0; x < width; x += this.tilesize) {
            for (let y = 0; y < height; y += this.tilesize) {
                ctx.translate(translate, translate);
                ctx.beginPath();
                ctx.moveTo(x + this.tilesize, y);
                ctx.lineTo(x + this.tilesize, y + this.tilesize);
                ctx.lineTo(x, y + this.tilesize);
                ctx.stroke();
                ctx.translate(-translate, -translate);
            }
        }
        ctx.restore();
    }
        
    selectArea(x, y) {
        console.log('MapView.selectArea');
        let col = Math.floor(x / this.tilesize);
        let row = Math.floor(y / this.tilesize);
        this.selectedArea = this.currentMap.selectArea(col, row);
        this.selectedAreaId = this.selectedArea.id;
        Util.setCookie('selectedAreaId', this.selectedArea.id);
        return this.selectedArea;
    }

    selectMapArea(area) {
        console.log('MapView.selectMapArea(' + area + ')');

        if (area === undefined || area === null) {
            area = this.currentMap.areas[0];
            this.currentView.setSelectedArea(area.id);
        }

        this.parent.viewClick('viewname', 'area', 'id', undefined);

        return area;
    } 
    
    //////////////// OVERRIDES ////////////////
    
    //override
    update() {
        console.log('MapView.update');
        this.drawMap();
    }

    //override
    canvasClick(evt) {
        console.log('MapView.canvasClick');
        let mousePos = Util.getMousePos(this.canvas, evt);
        let x = Math.floor(mousePos.x);
        let y = Math.floor(mousePos.y);
        this.mouseClick(x, y);
    }

    //override
    getUserState() {
        console.log('MapView.getUserState');

        this.selectedAreaId = Util.getCookie('selectedAreaId');
        if (this.selectedAreaId !== null) {
            this.selectedArea = this.currentMap.areas.find(x => x.id.toString() === this.selectedAreaId);
        }
        else {
            this.selectedArea = this.currentMap.areas[0];
        }
        return this.selectedArea;
    }

    //override
    mouseClick(x, y) {
        console.log('MapView.mouseClick(' + x + ',' + y + ')');
        let area = this.selectArea(x, y);
        this.update();

        this.selectMapArea(area);
    }

    //override
    adaptViewSize(container, newWidth, newHeight) {
        console.log('MapView.adaptViewSize(' + container + ',' + newWidth + ',' + newHeight + ')');

        let cols = this.currentMap.columns;
        let rows = this.currentMap.rows;

        let widthToHeight = cols / rows;
        let newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
            container.style.height = newHeight + 'px';
            container.style.width = newWidth + 'px';
        }
        else {
            newHeight = newWidth / widthToHeight;
            container.style.width = newWidth + 'px';
            container.style.height = newHeight + 'px';
        }

        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
        this.tilesize = Math.floor(newWidth / cols);
    }

    //override
    loadResources() {
        console.log('MapView.loadResources');

        //tilesheet = new Image();
        //tilesheet.src = 'img\\maptiles\\' + texture + '\\tilesheet.png';

        this.loaded = false;
        this.tileimages = new Array(this.tilecount);
        for (let i = 0; i < this.tilecount; i++) {
            let img = new Image();
            let j = i;
            let fnImageFound = function () { this.imageFound(i, img); }.bind(this);
            img.addEventListener('load', fnImageFound);
            let fnImageNotFound = function () { this.imageNotFound(j, img); }.bind(this);
            img.addEventListener('error', fnImageNotFound);
            img.src = 'img\\maptiles\\' + this.texture + '\\tile-' + i + '.png';
        }
    }

    //override
    imageFound(i, img) {
        this.tileimages[i] = img;
        console.log('tile image nr ' + i + ' found & loaded: ' + img.src);
        this.tilecounter++;

        if (this.tilecounter >= this.tilecount) {
            this.dataLoaded();
        }
    }

    //override
    imageNotFound(i, img) {
        console.log('tile image not found!');

        let fnImageNotFound = function () { this.imageNotFound(i, img); };
        img.removeEventListener('error', fnImageNotFound); //function () { this.imageNotFound(i, img); }

        img.src = 'img\\maptiles\\' + this.texture + '\\tile-null.png';
        this.tileimages[i] = img;
    }

    //override
    dataLoaded() {
        console.log('MapView.dataLoaded');
        this.loaded = true;
        this.update();
    }
}

class TraitView extends GameView {

    constructor(canvas, data, callbacks) {
        console.log('TraitView.constructor');

        super(canvas);
        this.themeColor = '#41ccb4';
        this.name = "traitview";
    }
}

class BuildView extends GameView {

    constructor(canvas, data, callbacks) {
        console.log('TraitView.constructor');

        super(canvas);
        this.themeColor = '#9543ff';
        this.name = "buildview";
    }

}

class DesignView extends GameView {

    constructor(canvas, data, callbacks) {
        console.log('TraitView.constructor');

        super(canvas);
        this.themeColor = '#ffc94c';
        this.name = "designview";
    }

}


