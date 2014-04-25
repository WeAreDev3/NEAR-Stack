# NEAR Stack - A node.js Full Stack
## About
This will be a template framework that will allow us to easily create new Node.js servers in the future, simply by cloning the repository. It is tuned to our liking and understanding, so that we can know where everything is and how everything works.

NEAR stands for Node, Express, AngularJS, and RethinkDB. Of course, there are plenty of other packages included in the stack as well, but those form the foundation.
## Goals
- Full Stack - boilerplate content for all aspects of web app development, from the frontend to the backend to the databases.
- Flexible Deployment & Scalability - completely designed from the ground up to be deployed with minimal effort to as many servers as necessary.
- Automation - usage of task runners and scripts as much as possible to allow us to focus on development almost exclusively, and not have to worry about too much other stuff.
- Adaptability - easily be able to adapt the stack for any application involving node.js, from a simple html static server to a complex websocket server/client combo.

## Packages
- **Server Platform: [Node.js](http://nodejs.org/)**. I think we've pretty much decided on this one from the start.
- **Application Framework: [Express](http://expressjs.com/)**. No other options are mature enough to be useful yet.
- **MVW (Model-View-Whatever) Framework: [AngularJS](https://angularjs.org/)**. While Express handles the framework on the server-side, AngularJS takes care of everything on the client-side.
- **Templating Engine: [Swig](http://paularmstrong.github.io/swig/)**. Swig offers everything we need in a rendering (templating) engine while performing very well.
- **Database: [RethinkDB](http://rethinkdb.com/)**. RethinkDB seems to be superior in many ways to MongoDB, and while it's not quite a standard in the node.js world, it may well be one day.
- **Task Runner: [Gulp](http://gulpjs.com/)**. Gulp will automate all tasks during production and development.
- **Client-side Package Manager: [Bower](http://bower.io/)**. Bower is like a client-side npm, in many ways.
- **Test Runner: [Karma](http://karma-runner.github.io/0.12/index.html)**. We will use [Jasmine](http://jasmine.github.io/) in conjunction with Karma.
- **Administration & Authentication: [Passport](http://passportjs.org/)**.
- **Utilities: [Lo-Dash](http://lodash.com/)**.

### Suggested
- **Module Loader: [RequireJS](http://requirejs.org/) or [Browserify](http://browserify.org/)**. Kind of a similar thing to Grunt and Gulp, in that RequireJS is the more mature of the two, but Browserify is a new take on the idea. Browserify uses the node.js `require()` function to include modules, which is definitely an interesting take.

### Other Considerations
- **[Consolidate](https://github.com/visionmedia/consolidate.js/)**.
- **[Bootstrap](http://getbootstrap.com/)**.
