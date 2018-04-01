//src/steam-wrapper.js
// This module is designed to be the main wrapper to the steam cli.
//
//


const yaml = require('js-yaml');
const fs = require('fs')


function SteamWrapper() {}

// Get a set of plain text credentials from a yaml file.
//
// Arguments:
//   configFile: The location of the credentials file
// Returns:
//   {user:###, password:####} The username and password in a data object. 
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

// Create a steam run script for the steam cli.
//
// Arguments:
//   args: A object containing [platform, install_location, app_id, user, password]
// Returns
//   A string of the script
//
SteamWrapper.prototype.createSteamRunScriptText = function(args) {

    // Ensure all args are defined.
    var args_ = ["user", "password", "platform", "install_location", "app_id"];
    function isDefined(value) {
        if (value in args) {
            return true;
        } else {
            throw Error('Missing ' + value + ' from the args list to create the steam run script.');
            return false;
        };
    };
    if (!args_.every(isDefined)) {
        throw Error('Missing a required parameter for the createSteamRunScriptText');
    };



    var username = args["user"];
    var password = args["password"];
    var platform = args["platform"];
    var install_location = args["install_location"];
    var app_id = args["app_id"];

    var script_template =
        "@ShutdownOnFailedCommand 1\n" +
        "@NoPromptForPassword 1\n" +
        "@sSteamCmdForcePlatformType " + platform + "\n" +
        "login " + username +" " + password + "\n" +
        "force_install_dir " + install_location + "\n"
        "app_update " + app_id + " validate\n" +
        "quit";

    console.log(script_template)
    return script_template;
};



module.exports=SteamWrapper;


