import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

// import { version } from "./package.json";

export default {
	input: "./src/Gryphon/ModernDeckInit.js",
	preserveModules: false,
	output: {
		file: "./common/sources/release_gryphon.js",
		format: "es",
		sourcemap: true,
		banner: `/**\n* ModernDeck\n* @license MIT\n* https://github.com/dangeredwolf/ModernDeck\n**/`,
		hoistTransitiveImports: true
	},
	plugins: [
		resolve(),
		json(),
		babel({configFile:"./build/babel.json"}),
		terser({mangle:false})
	]
};
