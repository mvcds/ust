# Samples As Templates

In a node project is common to have a folder structure where files follow some naming convention, to avoid copying and pasting on the folder's name and files you could type `sat` to use samples as templates

    $ yarn global add @marvinc.silva/sat

Test it by checking the version

    $ sat --version

You can also install it on the current project, for developers only.

    $ yarn add @marvinc.silva/sat --dev

In this case you'll need to refer to the bin folder

    $ node_modules/.bin/sat --version

## WIP

This project is a work in progess, therefore, it only worries about happy scenarios, so there aren't any exception handling and somethings will change for sure.

We welcome suggestions as issues on github.

## How to start using it

On your project's `package.json` file create an object `sat`, its keys will be considered as 'the name of your samples', and the value the sample itself.

      "sat": {
        "sampleA": "path\to\file.js",
        "sampleB": path\to\directory
      }

## Commands

To duplicate a sample use:

    sat use [sample] [location] [name]

You can list all commands from the command line with:

    sat list

### Planned

    sat create [sample]
    sat delete [sample]
