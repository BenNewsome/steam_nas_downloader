// tests/download-game-test.js
//
// This tests if we can download a game.
//


var chai = require('chai');
var expect = chai.expect;
var SteamWrapper = require('./../src/steam-wrapper')

// Download a game using the steam commands and ensure the game is downloaded.
describe('DownloadAdventureCapatalist', function() {
    it('downloadGame should download a game if working args are passed in', function() {
        var game_args = {
            "platform":"linux",
            "app_id": "346900",
        };
        var steamWrapper = new SteamWrapper();
        steamWrapper.downloadGame(game_args);
        // Confirm the file exists.
    });
});



