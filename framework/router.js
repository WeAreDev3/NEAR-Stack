var Router = function () {

    var content = document.getElementsByClassName('container')[0];

    // Replace all links with AJAX requests
    window.addEventListener('load', function () {
        // Get all of the page's links into an Array object
        var links = [].slice.call(document.links)
                // Filter out the outgoing links
                .filter(function (el) {
                    return el.hostname === location.hostname;
                });
        for (var i = links.length - 1; i >= 0; i--) {
            var el = links[i];
            el.onclick = bindLinks;
        }

        function bindLinks (event) {
            event.preventDefault();
            event.stopPropagation();
            var req = new XMLHttpRequest();
            req.onload = function () {
                var data = req.response;
                console.log(data);
            };
            req.open('get', this.href + '/update', true);
            req.send();
        }
    });

    // Load previous history states when history is navigated
    window.onpopstate = function (event) {
        if (event.state) {
            console.log('time to go to another page');
        } else {
            console.log(window.history);
            throw new Error('That page doesn\'t exist');
        }
    };

    // Add an item to the history stack
    function setURL (data, title, newURL) {
        history.pushState(data, title, newURL);
    }

    // Get the current URL
    function getURL () {
        return location.href;
    }
}();