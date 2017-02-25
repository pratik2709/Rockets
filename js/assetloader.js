// For loading all assets

var assetLoader = (function () {


    this.images = {
        'bg': 'imgs/bg.png',
        'sky': 'imgs/sky.png',
        'backdrop': 'imgs/backdrop.png',
        'backdrop2': 'imgs/backdrop_ground.png',
        'grass': 'imgs/grass.png',
        'avatar_normal': 'imgs/normal_walk.png',
        'rocket': 'imgs/rocket2.png',
        'bullet': 'imgs/bullet.png'
    };

    var assets_loaded = 0;
    var number_of_images = Object.keys(this.images).length;


    this.totalAssets = number_of_images;

    function assetLoaded(dic, name) {

        if (this[dic][name].status !== 'loading') {
            return;
        }
        this[dic][name].status = "loaded";
        assets_loaded++;
        if (assets_loaded === number_of_images && typeof this.finished === "function") {
            this.finished();
        }
    }

    this.downloadAllAssets = function () {
        var that = this;
        var source;
        //load images
        for (var image in this.images) {

            if (this.images.hasOwnProperty(image)) {
                source = this.images[image];
                (function (that, image) {
                    that.images[image] = new Image();
                    that.images[image].status = "loading";
                    that.images[image].name = image;
                    that.images[image].onload = function () {
                        //wierd passing string
                        assetLoaded.call(that, "images", image)
                    };
                    that.images[image].src = source

                })(that, image);

            }
        }
    };

    return {
        images: this.images,
        totalAssets: this.totalAssets,
        downloadAllAssets: this.downloadAllAssets
    }
})();