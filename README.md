[![Master](https://travis-ci.org/smartcitiesdata/react_discovery_ui.svg?branch=master)](https://travis-ci.org/smartcitiesdata/react_discovery_ui)

# react_discovery_ui

A UI component for consuming the [Discovery API](https://github.com/smartcitiesdata/discovery_api) of the SmartCitiesData platform. It is exported as a React Component, `<ReactDiscoveryUI>`, and can be imported into another site such as seen in [SmartColumbusOS/Discovery_UI](https://github.com/SmartColumbusOS/discovery_ui), or ran standalone if packaged such as in [SmartCitiesData/Discovery_UI](https://github.com/smartcitiesdata/discovery_ui).

## How to Use

```bash
docker run -p 8089:80  \
> -e API_HOST="https://data.smartcolumbusos.com" \
> -e GTM_ID="GTM-EXAMPLE" \
> -e BASE_URL="localhost" \
> -e STREETS_TILE_LAYER_URL="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" \
> -e AUTH_0_DOMAIN="smartcolumbusos-demo.auth0.com" \
> -e AUTH_0_CLIENT_ID="YOUR_AUTH_0_CLIENT_ID" \
> -e AUTH_0_AUDIENCE="discovery_api"
````

### Install Dependencies

`npm install`

### Run Unit Tests

`npm run test`

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

## Build Package

`npm run build:library`

## Using the Package Locally

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
