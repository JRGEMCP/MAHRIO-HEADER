# ng2-starter-app
Angular 2 Starter App (Webpack 2 / Babel, Bootstrap 4 CSS, Font Awesome 4 Icons)

## Get Started 
Download this repo using `git` and install its dependencies using `npm`.
1. `git clone https://github.com/ComputerEnchiladas/ng2-starter-app.git`
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
