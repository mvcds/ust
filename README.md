# Samples As Templates

In a node project is common to have a folder structure where files follow some naming convention, to avoid copying and pasting on the folder's name and files you could type `sat` to use samples as templates

    $ yarn global add @marvinc.silva/sat

Test it by checking the version

    $ sat --version

You can also install it on the current project, for developers only.

    $ yarn add @marvinc.silva/sat --dev

In this case you'll need to refer to the bin folder

    $ node_modules/.bin/sat --version

## Commands

## WIP

    sat use [sample] [location] [name]

### Planned

    sat list
    sat use [sample] [location] [name] <arguments>
    sat create [sample]
    sat delete [sample]
