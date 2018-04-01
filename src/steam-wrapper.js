//src/steam-wrapper.js
// This module is designed to be the main wrapper to the steam cli.
//
//


function SteamWrapper() {}

SteamWrapper.prototype.getPlainTextCredentials = function(configFile) {
    return {"user":"user", "password":"password"}
};

module.exports=SteamWrapper;


