// tests/steam-wrapper-test.js

var chai = require('chai');
var expect = chai.expect;
var SteamWrapper = require('./../src/steam-wrapper')

describe('ReadUserCredentials', function() {
    it('getUserConfig(example) should return {"user"="user", "password"="password"} if example_config.yaml is passed in', function() {
        var steamWrapper = new SteamWrapper();
        testCredentials = steamWrapper.getPlainTextCredentials('example_config.yaml');
        expect(testCredentials).to.eql({"user":"user", "password":"password"});
    });
});

