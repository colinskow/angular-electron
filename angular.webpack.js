/**
 * Custom angular webpack configuration
 */
const nodeExternals = require('webpack-node-externals');

module.exports = (config, options) => {
    let webBuild = false;

    // Check if we are buliding for the web target or Electron renderer
    if (options.fileReplacements) {
        for(let fileReplacement of options.fileReplacements) {
            if (fileReplacement.replace !== 'src/renderer/environments/environment.ts') {
                continue;
            }

            let fileReplacementParts = fileReplacement['with'].split('.');
            if (fileReplacementParts.length > 1 && ['web'].indexOf(fileReplacementParts[1]) >= 0) {
                webBuild = true;
            }
            break;
        }
    }

    if(webBuild) {
        config.target = 'web';
    } else {
        config.target = 'electron-renderer';
        config.externals = [nodeExternals({
            modulesFromFile: { excludeFromBundle: ['dependencies'] },
        })];
    }

    return config;
}
