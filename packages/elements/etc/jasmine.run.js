const Jasmine = require('jasmine');
const path = require('path');
const jasmine = new Jasmine();

jasmine.loadConfigFile(path.resolve(__dirname + '/jasmine.json'));
jasmine.execute();
