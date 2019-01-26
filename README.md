# xq

A markdown editor built for the decentralized web.

Markdown is parsed to HTML using regular expressions. 

Features include live rendering of your markdown in HTML, a minimal interface, and end-to-end encryption of files.

## Demo

![A GIF demo as the app stands on 10/01/2019](https://github.com/silvia-odwyer/xq/blob/master/screenshots/demo2_10_01_2019.gif)

### Try It Out
You can try it out [here](https://xq-alpha.herokuapp.com). 

### Not Working?
Browser support for Blockstack is still in alpha at the moment, so you may find that the app remains
on the landing page or doesn't log you in successfully. 

**To ensure a successful experience**, make sure you are either: 
- using the latest version of Chrome or Firefox

*or*

-  have installed the [Blockstack browser](https://blockstack.org/install/), which allows you to use the app without browser support issues.

*Alternative Browsers*
Please ensure you're using Chrome, as Blockstack support for Firefox is patchy at the moment (works with an unofficial Blockstack Firefox extension), and non-existent for >IE. 

### WYSIWYG Editor
An additional WYSIWYG editor is also being developed to allow for rich text editing, but it is only available for Firefox currently. This is because it uses the experimental execCommand() method, but I am working on getting it functioning for Chrome also by trying other strategies.

Currently, text can be formatted in bold, italics, and strikethrough, but text is not being saved in its formatted form as of yet.

### Issues or Bugs
This is still in alpha, so bugs or issues may arise. If so, please submit an issue. <3 Thanks!

## Build Setup
If you'd like to run your own instance of xq, whether for dev purposes or personal use, just execute the following:

``` bash
# clone the repo
git clone https://github.com/silvia-odwyer/xq
cd xq

# install dependencies
# yarn install is no longer supported.
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```

*Current State*: alpha