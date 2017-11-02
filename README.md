# MAHRIO-HEADER
Shared Header Component

Development version: **1.0.0** [![Build Status](https://travis-ci.org/JRGEMCP/MAHRIO-HEADER.svg?branch=master)](https://travis-ci.org/JRGEMCP/MAHRIO-HEADER)

## Get Started
Download this repo using `git` and install its dependencies using `npm`.
1. `git clone https://github.com/JRGEMCP/mahrio-header.git`
2. `npm install`
### Development
Watch files for changes then automatically rebuild assets
* `npm start`
### Production
Tree-shake, minify & optimize code to reduce its size.
* `npm run build`
### Test Server
All paths (routes) fallback to single-page application (SPA).

## Modify / Extend / Customize
### Navigation Component
1. Add new folder in `src/app/components/` called `navigation`
2. Inside add three files.
    * navigation.component.js
    * navigation.template.html
    * navigation.style.scss
3. Setup component and link to it the template and style
4. Add component to `src/app/components/index.js`
5. Add component to `src/app/components/main/main.template.html`

### New Path
