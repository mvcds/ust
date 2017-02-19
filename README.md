# Use Samples as Templates

[![Build Status](https://travis-ci.org/mvcds/ust.svg?branch=setup-travis)](https://travis-ci.org/mvcds/ust)

In a node project is common to have a folder structure where files follow some naming convention, to avoid copying and pasting on the folder's name and files you could type `ust` to use samples as templates

    $ yarn global add ust

Test it by checking the version

    $ ust --version

You can also install it on the current project, for developers only.

    $ yarn add ust --dev

In this case you'll need to refer to the bin folder

    $ node_modules/.bin/ust --version

## WIP

This project is a work in progess, therefore, it only worries about happy scenarios, so there aren't any exception handling and somethings will change for sure.

We welcome suggestions as issues on github.

## How to start using it

On your project's `package.json` file create an object `ust`, its keys will be considered as 'the name of your samples', and the value the sample itself.

      "ust": {
        "sampleA": "path\to\file.js",
        "sampleB": path\to\directory
      }

## Commands

To duplicate a sample use:

    ust use [sample] [name]

You can list all commands from the command line with:

    ust list

### Planned

    ust create [sample]
    ust delete [sample]
