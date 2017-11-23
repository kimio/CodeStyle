# README

Hello, some times code review is not much cool :( especially when takes a long time or your IDE not help.
Then, What I do? Cry? nop..

This Extension help us to create a simple code review and code style, but how? Take a look.

- Clang Format
Clang is a compiler front end for the programming languages C, C++, Objective-C, Objective-C++, OpenMP,[5] OpenCL, and CUDA. It uses LLVM as its back end and has been part of the LLVM release cycle since LLVM 2.6.

It is designed to be able to replace the full GNU Compiler Collection (GCC). Its contributors include Apple, Microsoft, Google, ARM, Sony, Intel and Advanced Micro Devices (AMD). It is open-source software,[6] with source code released under the University of Illinois/NCSA License, a permissive free software licence.

The Clang project includes the Clang front end and the Clang static analyzer and several code analysis tools
[Wikipedia](https://en.wikipedia.org/wiki/Clang)

Test my Clang Format configuration http://cf.monofraps.net


## Features
Clang Format
- Install Clang Format on Mac
- Format Source File

Code Review
- Check how many lines in function
- Check how many function in class
- Check limit os conditions in function

## Requirements

1 - MacOs

2 - Install Visual Studio Code \o\

3 - Check if you have code command on Mac [Microsoft Visual Code](https://code.visualstudio.com/docs/setup/mac)
- Launch VS Code.
- Open the Command Palette (⇧⌘P) and type 'shell command' to find the Shell Command: Install 'code' command in PATH command.

4 - Homebrew
To Install homebrew on Mac:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

5 - NodeJs
```
brew install node
```

## How to debug the code?

1 - Clone the project
```
cd ~
git clone https://github.com/kimio/CodeStyle.git
```

2 - Access the folder project
```
cd CodeStyle/
```

3 - Install the dependencies
```
npm install
cd report
npm install
```

4 - Open the folder project using visual code
```
cd ..
code .
```

5 - Let's debug the project, press F5 \o/, possibile errors that may ocurr like this message
![erroronrunningdebug](https://user-images.githubusercontent.com/4916789/33186757-44651f96-d073-11e7-808e-7b45337b2aff.png)
Click on Debug Anyway :)

## How to use?

Follow the debug steps above

### Config Clang format 
1 - Press (⇧⌘P), write Code Style: and select "Code Style: Config"
2 - Open the clang format file ".clang-format" and update the language value, for example:

Language:        ObjC

-----------------------------------------------------------------------------------------------------------

### Format Current File
1 - Open the file that you needs to format
2 - Press (⇧⌘P), write Code Style: and select "Code Style: Format Current File"

-----------------------------------------------------------------------------------------------------------

### Code Review
#### Debug mode
1 - Open the file that you needs to format
2 - Press (⇧⌘P), write Code Style: and select "Code Style: Code Review"
3 - You will see the report, possibile errors that may ocurr like:
  - Doesn't open anything :(
  Probally you don't install the angular cli, run this script on terminal
```
  npm install -g @angular/cli
```
  and try again :)

#### Only running 
1 - Open the file that you needs to format
2 - Press (⇧⌘P), write Code Style: and select "Code Style: Code Review"
4 - Open the report file
```
cd ~
open CodeStyle/report/dist/index.html
```
5 - You will see the report, possibile errors that may ocurr like:
  5.1 Google Chrome open, but without any information :(
  - Close All Google Chrome instance and run this script on Terminal 
  ``` - open -a "Google Chrome" --args --allow-file-access-from-files 
  cd ~
  open CodeStyle/report/dist/index.html
  ```
  5.2 Safari open, but without any information :(
  - Close All Safari instance and set this config on Safari
  ![corserrorsafari](https://user-images.githubusercontent.com/4916789/33188005-5209cc78-d07d-11e7-8aa1-da1072d0c387.png)

  
