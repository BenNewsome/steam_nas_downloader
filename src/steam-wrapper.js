//src/steam-wrapper.js
// This module is designed to be the main wrapper to the steam cli.
//
//


const yaml = require('js-yaml');
const fs = require('fs')


function SteamWrapper() {}

SteamWrapper.prototype.getPlainTextCredentials = function(configFile) {
    try {
        const config = yaml.safeLoad(fs.readFileSync(configFile, 'utf8'));
        const indentedJson = JSON.stringify(config, null, 4);
        console.log(indentedJson);
        return config;
    } catch (e) {
        console.log(e)
    }
};

module.exports=SteamWrapper;


