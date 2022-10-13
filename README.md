[![Master](https://img.shields.io/npm/v/@smartcitiesdata/react-discovery-ui)](https://www.npmjs.com/package/@smartcitiesdata/react-discovery-ui)
[![Master](https://img.shields.io/github/workflow/status/Datastillery/react_discovery_ui/Node.js%20Build)](https://github.com/Datastillery/react_discovery_ui/actions/workflows/npm-build.yml)

# React Discovery UI

React (also known as React.js or ReactJS) is an open-source, front end, JavaScript library for building user interfaces or UI components.

[react_discovery_ui](https://www.npmjs.com/package/@smartcitiesdata/react-discovery-ui) is a UI component for consuming the [Discovery API](https://github.com/Datastillery/smartcitiesdata/tree/master/apps/discovery_api) of the SmartCitiesData platform. It is exported as a React Component, `<ReactDiscoveryUI>`, and can be imported into another site such as seen in [SmartColumbusOS/Discovery_UI](https://github.com/SmartColumbusOS/discovery_ui).

## What to Install
To run the commands below you will need to install node. For directions on installing both of these tools depending on your system see the [NodeJS website](https://nodejs.org/en/download/).

## How to Use

### Install Dependencies
Npm is a package manger that comes with node. This command creates a nodes_modules folder and installs your dependencies in there and also installs your devDependencies.

`npm install`

### Run All Tests
"test:all" is a script in the package.json file that when run with npm runs all unit and functional tests.

`npm run test:all`

### Run Unit Tests
"test" is a script in the package.json file that when run with npm run all the unit tests. It uses a JavaScript testing framework called [Jest](https://jestjs.io/)

`npm run test`

### Run Functional Tests
"cypress:run" is a script in the package.json file that when run with npm runs all the functional tests. It uses a JavaScript End to End Testing Framework called [Cypress](https://www.cypress.io/)

`npm run cypress:run`

### Run Unit Tests in Watch Mode

`npm run test-watch`

Unit tests will output warnings related to accessibility. Configurations
are found in `test-start-point.js`

### Lint the Code

`npm run lint`

### Configuration

Runtime configuration for running the test app locally is stored in `config/config.js`. The component expects configuration to be on the `window` object i.e: `window.BASE_URL = 'example.com'`

- `API_HOST`
  This application is designed to be used with [discovery-api](https://github.com/smartcitiesdata/discovery_api) as the backend. Set this value to the URL of the local `discovery-api` endpoint. (Note: this can also be set to a known public discovery api endpoint, though certain features, such as user logins, are not guaranteed to work properly.)

- `GTM_ID`
  Set this value to the Google Tag Manager ID to enable analytics.

- `BASE_URL`
  The domain that the site will be hosted on

- `STREETS_TILE_LAYER_URL`
  This is the url source of the mapbox tiles used in Leaflet. Example: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`

- `LOGO_URL`
  The url of an image to be used as the site logo within the react components.

## Start the UI Locally

`npm run start`

This starts a simple React site with the main Discovery UI component as the sole content. You can view the UI in your web browser at `http://localhost:9001`

## Stop All Node processes

`npm run stop`

## Using the Package Locally

- Run `npm run build:library` in the component root directory.
- Run `npm link` in the component root directory.
- Run `npm pack` in the component root directory.
- Run `npm install $COMPONENT_ROOT/$COMPONENT_PACKAGE.tgz` in the consuming application.

Note that any changes to the component will require the package to be rebuilt.

To consume this component in your react app place the <ReactDiscoveryUI> component into your app or other sub-components such as in the below example:

```
import ReactDiscoveryUI from '@smartcitiesdata/react-discovery-ui'


export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ReactDiscoveryUI />
        <Footer />
      </div >
    )
  }
}
```
