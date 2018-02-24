"""
Python wrapper to download steam with arguments, or a CLI
Plans to make this interactable from a web client.

-----------------
Requirements
steamcmd installed and working (Probably needs the 32 bit libraries.
see:
    https://developer.valvesoftware.com/wiki/SteamCMD#Linux.2FOS_X


"""

import logging
import pprint
import subprocess
import os
import json

logger = logging.getLogger("SteamDownloader")
logger.setLevel(logging.DEBUG)
console = logging.StreamHandler()
console.setLevel(logging.DEBUG)
logger.addHandler(console)

def main():

    logger.info("Starting the main programme")
    
    args = get_arguments()

    runscript_location = create_steam_runscript(args)

    run_steamcmd(runscript_location)

    cleanup(runscript_location)

    logger.info("programme complete")


def get_arguments():
    """
    Get the arguments from the command line or a CLI
    Set defaults here also
    """
    logger.info("Getting the arguments")

    with open("credentials.json", "r") as credential_file:
        credentials = json.load(credential_file)
#    credentials = json.loads("credentials.json")

    args = {
        "app_id": "271590",
        "install_location": "/mnt/nfs3/steam/SteamLibrary/",
        "platform": "windows",
        "username": credentials["username"],
        "password": credentials["password"]
                
    }

    logger.info("logger arguments got")
    logger.debug(pprint.pformat(args))
    return args


def create_steam_runscript(args):
    """ Create the runscript.txt file that steamcmd uses. """
    logger.info("Creating the steam runscript file")

    runscript_location = "/tmp/test.txt"

    script_template = (
            "@ShutdownOnFailedCommand 1\n" +
            "@NoPromptForPassword 1\n" +
            "@sSteamCmdForcePlatformType {platform}\n" +
            "login {username} {password}\n" +
            "force_install_dir {install_location}\n"
            "app_update {app_id} validate\n" +
            "quit"
            )

    script = script_template.format(**args)

    logger.debug("\n" + script + "\n")

    script_loc = "/tmp/{app_id}.txt".format(**args)

    with open(script_loc, "w") as script_file:
        script_file.write(script)
    logger.debug("script writen to " + script_loc)



    logger.info("Steam runscript compelte")
    return runscript_location

def run_steamcmd(script_location):
    """ Call the steam command """
    logger.info("Calling the steam command program")

    logger.info("Steam command complete")
    return


def cleanup(script_location):
    """ Cleanup after the script """
    logger.info("Cleaning up after the run")

    logger.info("Cleanup complete")
    return


if __name__ == "__main__":
    main()


