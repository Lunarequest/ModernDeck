/*
	StylesheetExtensions.js

	Copyright (c) 2014-2021 dangered wolf, et al
	Released under the MIT License
*/

import { version } from "../../package.json";
import { make } from "./Utils.js";

/*
	Returns true if specified stylesheet extension is enabled, false otherwise.
	Works with custom stylesheets. (see enableCustomStylesheetExtension for more info)
*/

export function isStylesheetExtensionEnabled(name) {
	if ($("#mtd_custom_css_"+name).length > 0) {
		return true;
	}
	return !!document.querySelector("link.mtd-stylesheet-extension[href=\"" + mtdBaseURL + "sources/cssextensions/" + name + ".css\"\]");
}

/*
	Enables a certain stylesheet extension.
	Stylesheet extensions are loaded from sources/cssextensions/[name].css

	These are the predefined ModernDeck ones including colour themes, default light and dark themes, and various preferences

	For custom or dynamically defined ones, see enableCustomStylesheetExtension
*/

export function enableStylesheetExtension(name) {
	if (name === "default" || $("#mtd_custom_css_"+name).length > 0)
		return;

	// This is where components are located
	let url = mtdBaseURL + "sources/cssextensions/" + name + ".css";

	if (name === "donors") {
		url = "https://api.moderndeck.org/v1/patrons/donors.css?v=" + version;
	}

	if (!isStylesheetExtensionEnabled(name)) {
		head.append(
			make("link")
			.attr("rel","stylesheet")
			.attr("href",url)
			.addClass("mtd-stylesheet-extension")
		)
	} else return;
}

/*
	disableStylesheetExtension(string name)

	Disables stylesheet extension by name. Function also works with custom stylesheet extensions
*/

export function disableStylesheetExtension(name) {
	if (!isStylesheetExtensionEnabled(name))
		return;

	$('head>link[href="' + mtdBaseURL + "sources/cssextensions/" + name + '.css"]').remove();

	if ($("#mtd_custom_css_"+name).length > 0) {
		$("#mtd_custom_css_"+name).remove();
	}
}

// Custom stylesheet extensions are used for custom user CSS and for certain sliders, such as column width

export function enableCustomStylesheetExtension(name,styles) {

	if (isStylesheetExtensionEnabled(name)) {
		$("#mtd_custom_css_"+name).html(styles);
		return;
	}
	head.append(make("style").html(styles).attr("id","mtd_custom_css_"+name))
}
