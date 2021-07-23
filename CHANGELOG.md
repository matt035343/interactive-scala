# Change Log
## 1.4.0

Changed:
- Now requires Scala Syntax (official) extension.
- Fixed that the shortcuts were available outside Scala files.

Added:
- Execute a whole file by opening it in the editor and press `ctrl+alt+enter` or by selecting it from the context menu in the file.
- Reset Interactive Scala by pressing `ctrl+alt+r` or by selecting it from the context menu in the file.
  
## 1.3.0

Changed:
- Free choice of the interpreter, you are no longer limited to `scala` and `sbt console`.
- The cursor now moves to the next line when you execute a single line.
- The focus is now maintained on the selected code instead of transferring focus to the terminal when executing code.

Added:
- Setting to require jar-files upon initialisation of the REPL.

## 1.2.1

Changed:
- The input is now wrapped in `:paste` and `Ctrl+D` to support bigger code pieces better.
- The terminal now shows itself when code is sent to the terminal.

## 1.2.0

Changed:
- The Interactive Scala terminal can be reopened by using the shortcut on some Scala code.

Added:
- Option to change interpreter to SBT through VS Code configuration. Default is Scala system binaries.
- Context menu option. Select some text, right click and click "Execute selected code in Interactive Scala".

## 1.1.0

Added:
- Single-line execution. Place the caret on a code line and execute it without selecting any text.

## 1.0.0

First stable version.

Added:
- Automatic opening of Scala interpreter.
- Shortcut to execute Scala code in interpreter.