#Setup
- npm install

#Commands
Building:
    "build": "webpack",
    "postbuild": "subfont -i --inline-css dist/index.html",
General for development: serves webserver on localhost:8080
    "start": "webpack-dev-server"