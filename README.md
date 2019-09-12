# Interactive Scala

Interactive Scala is an extension for Visual Studio Code. Inspired by Ionide F#, this extension lets you select Scala code and execute it in the Scala interpreter REPL by a quick keyboard shortcut.

## Features

The extension will automatically open a new integrated terminal and initialise the Scala interpreter upon opening a `.scala` file.

Once in a `.scala` file, you can select a subset of your Scala code and use the keyboard shortcut `alt+enter` to quickly execute the code in the Scala interpreter. 
The shortcut can be changed in your VS Code settings.

If you are to send single line to the interpreter, there's no need for selection at all! Just place the caret on the line and press the shortcut.

Shortcuts are not your style? You can now use the context menu as well! Just select some code and right click to send it to the interpreter.

![How it works](img/animation.gif "How it works")

## Extension Settings

The used REPL Scala interpreter can be changed through the VS Code preferences. You can currently choose between `scala` (default) and `sbt console`. 
The first of which is using the system-wide Scala installation through the `scala` command. `sbt console` uses the Scala Build Tool thourgh the `sbt`command and will use the local project installation. Please note, that SBT will instantiate a new project, if none is found in the working directory. 

Using `sbt console` is a bit slower initially, as SBT will compile and check for updates before entering the interpreter.

## Requirements

Different requirements are applicable for the interpreter options.

### scala
If you are using the system-wide Scala installation, you must have installed the Scala binaries and added the `scala` command to PATH.
https://www.scala-lang.org/download/

![Where to get binaries](img/install.png "Where to get binaries")

### sbt console
If you are using the project installation, you must have SBT installed. You should also have a Scala project in your working directory, otherise SBT will automatically instantiate it when you are using this extension.
https://www.scala-sbt.org/download.html

## Known Issues

The default shell for the integrated terminal on Windows (PowerShell) is known to cause problems with manual input to the Scala interpreter. 
Change the shell to e.g. Git Bash as a workaround.

The extension has not been tested on MacOS and Linux.

## Release Notes

### 1.2.1
Changed:
- The input is now wrapped in `:paste` and `Ctrl+D` to support bigger code pieces better.
- The terminal now shows itself when code is sent to the terminal.

### 1.2.0

Changed:
- The Interactive Scala terminal can be reopened by using the shortcut on some Scala code.

Added:
- Option to change interpreter to SBT through VS Code configuration. Default is Scala system binaries.
- Context menu option. Select some text, right click and click "Execute selected code in Interactive Scala".

### 1.1.0

Added:
- Single-line execution. Place the caret on a code line and execute it without selecting any text.

### 1.0.0

First stable version.

Added:
- Automatic opening of Scala interpreter.
- Shortcut to execute Scala code in interpreter.