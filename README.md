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
### Confirmed
- **Server Platform: [Node.js](http://nodejs.org/)**. I think we've pretty much decided on this one from the start.
- **Application Framework: [Express](http://expressjs.com/)**. No other options are mature enough to be useful yet.
- **MVW (Model-View-Whatever) Framework: [AngularJS](https://angularjs.org/)**. While Express handles the framework on the server-side, AngularJS takes care of everything on the client-side.
- **Database: [RethinkDB](http://rethinkdb.com/)**. RethinkDB seems to be superior in many ways to MongoDB, and while it's not quite a standard in the node.js world, it may well be one day.

### Suggested
- **Task Runner: [Grunt](http://gruntjs.com/) or [Gulp](http://gulpjs.com/)**. There's no question as to whether or not we need a task runner. The question here is whether we want Gulp or Grunt. While Grunt is by far the more mature of the two, and therefore has more plugins, Gulp does have its advantages. See [The Build Wars](http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt) for a comparison of the two.
- **Client-side Package Manager: [Bower](http://bower.io/)**.
- **Test Runner: [Karma](http://karma-runner.github.io/0.12/index.html)**. If we end up using this, we should look into [Jasmine](http://jasmine.github.io/) as well.
- **Administration & Authentication: [Passport](http://passportjs.org/)**.
- **Utilities: [Lo-Dash](http://lodash.com/)**.
- **Server-Side Testing: [Mocha](http://visionmedia.github.io/mocha/)**.

### Other Considerations
- **[Consolidate](https://github.com/visionmedia/consolidate.js/)**.
- **[Bootstrap](http://getbootstrap.com/)**.
