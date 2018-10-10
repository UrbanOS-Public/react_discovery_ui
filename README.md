## Install Dependencies
`npm install`

## Run Unit Tests
`npm run test`

## Run Unit Tests in Watch Mode
`npm run test-watch`

Unit tests will output warnings relate to accessibility. Configurations
are found in `test-start-point.js`

## Lint the Code
`npm run lint`

## Start the UI Locally
`npm run start`

## Build Docker Image
`docker build . -t <image name>:<tag>`

## Running the Docker Image
`docker run -d --rm -p <port>:80 <image name>:<tag>`

## Deploying to minikube
```bash
# build to local Docker environment
eval $(minikube docker-env)
docker build -t discovery-ui:wip .

# create namespace
kubectl create ns discovery

# deploy with helm
helm upgrade --install discovery-ui ./chart \
  --namespace=discovery \
  --set image.name=discovery-ui \
  --set image.tag=wip
  
# open browser to ui
minikube service discovery-ui -n discovery
```
