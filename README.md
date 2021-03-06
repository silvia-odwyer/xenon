# xenon

A markdown editor built for the decentralized web.

View the [official website](https://silvia-odwyer.github.io/xenon/).

Features include:
- live rendering of your markdown in HTML using regular expressions
- a lightweight, minimal interface
- end-to-end encryption of files.

## Demo

![A GIF demo as the app stands on 10/01/2019](https://github.com/silvia-odwyer/xenon/blob/master/screenshots/demo2_10_01_2019.gif)

### Dark Theme Demo
The app also includes a dark theme for those late-night editing sessions. 

![A GIF demo of the app with a dark theme on 27/02/2019](https://github.com/silvia-odwyer/xenon/blob/master/screenshots/dark_theme_demo.gif)

### Try It Out
You can try it out [here](https://xq-alpha.herokuapp.com). 

### Official Website
Xenon now has its [own official website](https://silvia-odwyer.github.io/xenon/), which is available (for now) via GitHub Pages.

### Not Working?
Browser support for Blockstack is still in alpha at the moment, so you may find that the app remains
on the landing page or doesn't log you in successfully. 

**To ensure a successful experience**, make sure you are either: 
- using the latest version of Chrome or Firefox

*or*

-  have installed the [Blockstack browser](https://blockstack.org/install/), which allows you to use the app without browser support issues.

*Alternative Browsers*
Please ensure you're using Chrome, as Blockstack support for Firefox is patchy at the moment (works with an unofficial Blockstack Firefox extension), and non-existent for >IE. 

### Issues or Bugs
This is still in alpha, so bugs or issues may arise. If so, please submit an issue. <3 Thanks!

## Build Setup
If you'd like to run your own instance of xenon, whether for dev purposes or personal use, just execute the following:

``` bash
# clone the repo
git clone https://github.com/silvia-odwyer/xenon
cd xenon

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

## Near-Future Plans
Several features will be implemented in the following weeks, preceding the March 2019 release:
- Auto-saving of notes. 
- Full customization of the editor's appearance and UI. 
- Dark mode 
- Mobile responsiveness
- Move the official website to a component which will be rendered from the xenon-alpha site. 

*Current State*: alpha