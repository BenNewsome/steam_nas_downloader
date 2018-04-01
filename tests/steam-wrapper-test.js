// tests/steam-wrapper-test.js

var chai = require('chai');
var expect = chai.expect;
var SteamWrapper = require('./../src/steam-wrapper')

describe('ReadUserCredentials', function() {
    it('getUserConfig(example) should return {"user"="user", "password"="password"} if example_config.yaml is passed in', function() {
        var steamWrapper = new SteamWrapper();
        testCredentials = steamWrapper.getConfig('example_config.yaml');
        expect(testCredentials).to.eql({"user":"user", "password":"password"});
    });
});

describe('CreateSteamRunScriptText', function() {
    it('createSteamRunScriptText(args) should return a string if all the correct args are passed in', function() {
        var script_args = {"user": "user", 'password': 'password', 'platform': 'linux', 'install_location': '~/steam_temp', 'app_id': '346900'};
        var expected_output =
            "steamcmd +@NoPromptForPassword 1 +@sSteamCmdForcePlatformType linux +login user password " + 
            "+force_install_dir ~/steam_temp +app_update 346900 validate +quit"
        var steamWrapper = new SteamWrapper();
        steamRunScriptText = steamWrapper.getSteamCommand(script_args);
        expect(steamRunScriptText).to.eql(expected_output);
    });
    it('createSteamRunScriptText(args) should fail if missing a required arg', function() {
        var script_args = {"user": "user"};
        var steamWrapper = new SteamWrapper();
        expect(() => steamWrapper.createSteamRunScriptText(script_args) ).to.throw( Error );
    });
});



// A good small free to play test game
// Name: Adventure Cpaitalist
// ID: 346900



