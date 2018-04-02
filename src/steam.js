//src/steam-wrapper.js
// This module is designed to be the main wrapper to the steam cli.
//
//


const yaml = require('js-yaml');
const fs = require('fs')


function SteamWrapper() {
    console.log("Creating a new steam wrapper instance")
};

// Get a set of plain text credentials from a yaml file.
//
// Arguments:
//   configFile: The location of the credentials file
// Returns:
//   {user:###, password:####} The username and password in a data object. 
SteamWrapper.prototype.getConfig = function(configFile) {
    try {
        const config = yaml.safeLoad(fs.readFileSync(configFile, 'utf8'));
        const indentedJson = JSON.stringify(config, null, 4);
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
SteamWrapper.prototype.getSteamCommand = function(args) {

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
        "steamcmd " +
        "+@NoPromptForPassword 1 " +
        "+@sSteamCmdForcePlatformType " + platform + " " +
        "+login " + username +" " + password + " " +
        "+force_install_dir " + install_location + " " +
        "+app_update " + app_id + " validate " +
        "+quit";

    return script_template;
};

const child_process = require('child_process');

String.prototype.format = function() {
      a = this;
      for (k in arguments) {
              a = a.replace("{" + k + "}", arguments[k])
            }
      return a
}


// Call the steamCMD from the program and pass back updates.
SteamWrapper.prototype.downloadGame = function(game_args) {
    args = {};
    args["user"] = "user";
    args["password"] = "password";
    args["platform"] = game_args["linux"];
    args["install_location"] = "steamApps";
    args["app_id"] = game_args["app_id"];

    if (! typeof args["app_id"] == 'number') {
        throw Error('Recieved a app_id that is not a number. This is probably a code injection attempt.')
    };

    console.log("something");
    console.log("Starting download of {0} for {1}".format(args["app_id"], args["platform"]));

    var steamCommand = this.getSteamCommand(args);

    child_process.execSync(
        steamCommand, {stdio: [0, 1, 2]}
    );
};



module.exports=SteamWrapper;


