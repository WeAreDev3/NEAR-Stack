var DataController = (function () {
    var data = {};
    this.update = function (newData) {
        for (var val in newData) {
            if (data.hasOwnProperty(val) && data[val].length > 0) {
                this.broadcast(val);
            }
            data[val] = [newData[val]];
        }
    };

    window.addEventListener('load', function () {
        document.head.innerHTML = parseData(document.head.innerHTML);
        document.body.innerHTML = parseData(document.body.innerHTML);
        var i, el;
        for (i = data.assets[0].js.length - 1; i >= 0; i--) {
            el = document.createElement('script');
            el.src = data.assets[0].js[i];
            document.body.appendChild(el);
        }

        for (i = data.assets[0].css.length - 1; i >= 0; i--) {
            el = document.createElement('link');
            el.rel = 'stylesheet';
            el.href = data.assets[0].css[i];
            document.body.appendChild(el);
        }
    });

    function parseData (raw) {
        return raw.replace(/{{.*}}/g, function (key) {
            var val = data[key.slice(2, -2).trim()][0];
            if (!val) throw new Error(val + ' is not a known variable');
            return val;
        });
    }

    this.broadcast = function () {
        console.log('hello');
    };

    return this;
})();
