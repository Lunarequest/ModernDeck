/*
	Handles Keyboard shortcuts

	Ctrl+Shift+A -> Toggle outline accessibility option
	Ctrl+Shift+C -> Disable custom CSS (in case something went wrong and the user is unable to return to settings to clear it)
	Ctrl+Shift+M -> SilvaGunner music easter egg
	Ctrl+Alt+D -> Enter diagnostic menu (for helping developers)
	Q -> Toggle navigation drawer (except Left Classic view)
*/

import { settingsData } from "./DataSettings.js";
import { getPref } from "./StoragePreferences.js";
import { make, handleErrors } from "./Utils.js";
import { disableStylesheetExtension } from "./StylesheetExtensions.js";
import { diag } from "./UIDiag.js";

export function keyboardShortcutHandler(e) {

	if (e.ctrlKey && e.shiftKey) {
		switch(e.key.toUpperCase()) {
			case "M":
				body.append(make("iframe").attr("src","https://www.youtube.com/embed/videoseries?list=PLK4w_iipaN0g5LOTOeUK5xFeheKmzGtfB&autoplay=true").attr("style","display:none"));
				break;
			case "A":
				if ($("#accoutline").length > 0) {
					$("#accoutline").click();
				} else {
					settingsData.accessibility.options.accoutline.activate.func();
				}
				break;
			case "C":
				console.info("User disabled custom CSS!");

				disableStylesheetExtension("customcss");
				break;
			case "H":
				console.info("User has pressed the proper key combination to toggle high contrast!");

				if ($("#highcont").length > 0) {
					$("#highcont").click();
				} else {
					if (getPref("mtd_highcontrast") === true) {
						settingsData.accessibility.options.highcont.deactivate.func();
					} else {
						settingsData.accessibility.options.highcont.activate.func();
					}
				}
				break;
		}
	}
	if (e.key.toUpperCase() === "D" && (e.ctrlKey) && e.altKey) { //pressing Ctrl+Shift+C disabled user CSS
		console.info("Triggering diag!");


		handleErrors(diag, "An error occurred while creating the diagnostic report");

	}

	// Q opens nav drawer

	if (e.key.toUpperCase() === "Q" && document.querySelector("input:focus,textarea:focus") === null) {
		if (getPref("mtd_headposition") !== "classic") {
			if ($(mtd_nav_drawer).hasClass("hidden")) {
				$("#mtd-navigation-drawer-button").click();
			} else {
				$(mtd_nav_drawer_background).click();
			}
		}
	}

}