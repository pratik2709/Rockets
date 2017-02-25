var initial = {
    // initialize the canvas
    canvas: document.getElementById("canvas"),
    ctx: this.canvas.getContext("2d"),
    player: {},
    ground: [],
    platformWidth: 32,
    platformHeight: this.canvas.height - this.platformWidth * 4,
    myObjects: []
};

