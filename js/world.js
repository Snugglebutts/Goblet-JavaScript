/* 
    GOBLET - World Creator
    Created By Cody Coulter
*/

// Variable Instantiation
var realms = [],
    levels = [],
    map = [],
    mapTiles =[],
    timers = [];

timers.push({ delay: 100, nextFireTime: 0, doFunction: doTimers, counter: 0 });

function timerLoop(currentTime) {
  requestAnimationFrame(timerLoop);
  for(var i = 0; i < timers.length; i++) {
    if(currentTime > timers[i].nextFireTime) {
      var t = timers[i];
      t.nextFireTime = currentTime + t.delay;
      t.doFunction(t, i);
    }
  }
}

function doTimers(t, i) {
// if(t == timers[0])  
//   if((t.counter) / 10 % 1 == 0) {
//     document.getElementById("label1").innerHTML = 'Timer: ' + precisionRound((t.counter)/10, 1) + '.0 (' + t.delay + 'ms)';
//   } else {
//     document.getElementById("label1").innerHTML = 'Timer: ' + precisionRound((t.counter)/10, 1) + ' (' + t.delay + 'ms)';
//   }
//   t.counter++;
}

function createMap(mapArray) {
    // use array of numbers for map generation
    map.push(['resources/Referenecs/Dungeon Reference 1.gif', 9, 16, 32, 32]);
    var mapInfo = {};
    mapInfo.context = gameArea.context,
    mapInfo.src = map[0][0],
    mapInfo.tileX = map[0][1],
    mapInfo.tileY = map[0][2],
    mapInfo.width = map[0][3],
    mapInfo.height = map[0][4];

    var tiles = new Tiles({
        width: 32,
        height: 32,
        tiles: [
            { name: 'brick-wall', x: 0, y: 11}, 
            { name: 'brick-wall-empty-window', x: 0, y: 1},
            { name: 'brick-wall-bar-window', x: 0, y: 8},
            ]
    });
    var ctx = gameArea.context;
    var img = new Image();

    img.onload = function() {
        setInterval(function() {
            var frame = Tiles.getSprite
        })
    }

    // for(x = 0; x < mapInfo.tileX; x++)
    //     for(y = 0; y < mapInfo.tileY; y++) {
    //         var tempImg = new Image();
    //         tempImg.src = mapInfo.src;

    //         mapTiles.push()
    //     }
}
var Tiles = function(data) {
    this.load(data);
};
Tiles.prototype = {
    _tiles: [],
    _width: 0,
    _height: 0,

    load: function(data) {
        this._height = data.height;
        this._width = data.width;
        this._sprites = data.tiles;
    },
};
function addTile() {

}
function startGame() {
    map.push()
    requestAnimationFrame(timerLoop);
    gameArea.interval = setInterval(updateGameArea, 20);
    gameArea.start();
}
var gameArea = {
  canvas : document.getElementById("goblet"),
  
  start : function() {
    // Game Area is full width of window - 20px to allow 10px margin on each side for centering
    this.canvas.width = window.innerWidth - 30;
    // Game Area is 2/3 height of window
    this.canvas.height = (window.innerHeight / 3) * 2; 
    // Establish canvas 2d graphics
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    // Instantiate frame number
    this.frameNo = 0;
    // Update graphics
    updateGameArea();
  },
  // Stop game
  stop : function() {
    clearInterval(this.interval);
  }, 
  
  // Clear graphics
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function updateGameArea() {
    createMap(map);
}