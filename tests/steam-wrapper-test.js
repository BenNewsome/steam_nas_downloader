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

describe('CreateSteamRunScriptText', function() {
    it('createSteamRunScriptText(args) should return a string if all the correct args are passed in', function() {
        var script_args = {"user": "user", 'password': 'password', 'platform': 'linux', 'install_location': '~/steam_temp', 'app_id': '271590'};
        var expected_output = 
            "@ShutdownOnFailedCommand 1\n" +
            "@NoPromptForPassword 1\n" +
            "@sSteamCmdForcePlatformType linux\n" +
            "login user password\n" +
            "force_install_dir ~/steam_temp\n";
        var steamWrapper = new SteamWrapper();
        steamRunScriptText = steamWrapper.createSteamRunScriptText(script_args);
        expect(steamRunScriptText).to.eql(expected_output);
    });
});


describe('CreateSteamRunScriptText', function() {
    it('createSteamRunScriptText(args) should fail if missing a required arg', function() {
        var script_args = {"user": "user"};
        var steamWrapper = new SteamWrapper();
        expect(() => steamWrapper.createSteamRunScriptText(script_args) ).to.throw( Error );
    });
});
