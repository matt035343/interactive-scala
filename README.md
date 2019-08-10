# interactive-scala README

Interactive Scala is an extension for Visual Studio Code. Inspired by Ionide F#, this extension lets you select Scala code and execute it in the Scala interpreter REPL by a quick keyboard shortcut.

## Features

The extension will automatically open a new integrated terminal and initialise the Scala interpreter upon opening a `.scala` file.

Once in a `.scala` file, you can select a subset of your Scala code and use the keyboard shortcut `alt+enter` to quickly execute the code in the Scala interpreter.

> Animation!

## Requirements

You must have installed the Scala binaries and added the `scala` command to PATH.
https://www.scala-lang.org/download/

> Image!

## Extension Settings

No configuration is available at this point.

## Known Issues

The default shell for the integrated terminal on Windows (PowerShell) is known to cause problems with manual input to the Scala interpreter. Change the shell to e.g. Git Bash as a workaround.

## Release Notes

### 1.0.0

First stable version.
- Added automatic opening of Scala interpreter
- Added shortcut to execute Scala code in interpreter