import createAuth0Client from '@auth0/auth0-spa-js'
import routes from '../routes'

const auth0Options = {
    domain: window.AUTH0_DOMAIN,
    client_id: window.AUTH0_CLIENT_ID,
    audience: window.AUTH0_AUDIENCE,
    redirect_uri: `${window.location.origin}${routes.oauth}`
  }

class Auth0Client {
    constructor() {
        this.semaphore = false
    }

    // async getClient() {
    //     if (!this.client && !this.semaphore) {
    //         this.semaphore = true
    //         this.client = await createAuth0Client(auth0Options)
    //         this.semaphore = false
    //     } else if (this.semaphore) {
    //         console.log("bad thing")
    //         var myTimer = setInterval(() => {
    //             console.log("in interval")
    //             if (!this.semaphore) {
    //                 clearInterval(myTimer)
    //             }
    //         }, 100);
    //         clearInterval(myTimer);
    //     }
    //     return this.client
    // }
    create() {
        if (this.auth0Promise) return this.auth0Promise
        console.log("initting")
        this.auth0Promise = createAuth0Client(auth0Options)
        return this.auth0Promise
    }
}

const auth0Client = new Auth0Client()

export { auth0Client as Auth0Client }