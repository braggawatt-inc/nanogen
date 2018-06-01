#!/usr/bin/env node
const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');
const meow = require('meow');
const nanogen = require('./index');

const cli = meow(
  chalk`
    {underline Usage}
      $ nanogen [config-file] [...options]

      The config file parameter defaults to 'site-config.js' if not informed.

    {underline Options}
      --watch, -w     Start local server with auto-reloading
      --port, -p      Port to use for local server (default: 3000)
      
      --help, -h      Display this help text
      --version, -v   Display nanogen version
  `,
  {
    flags: {
      watch: {
        type: 'boolean',
        default: false,
        alias: 'w'
      },
      port: {
        type: 'string',
        default: '3000',
        alias: 'p'
      },
      help: {
        type: 'boolean',
        alias: 'h'
      },
      version: {
        type: 'boolean',
        alias: 'v'
      }
    }
  }
);

// load config file
const configFile = cli.input.length > 0 ? cli.input[0] : 'site.config.js';
const configData = require(path.resolve(configFile));

if (cli.flags.watch) {
  nanogen.serve(configData, cli.flags);
} else {
  nanogen.build(configData);
}