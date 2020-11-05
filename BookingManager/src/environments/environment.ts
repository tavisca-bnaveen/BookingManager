// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ApiUri:"https://localhost:44389"
};

export const AuthConfig ={
  
  DomainId:"dev-v-ngyyfa.us.auth0.com",
  ClientId:"N7XVAjoPzdW9SKrb4kU3aj6bvUDIssp3",
  Response_Type:{
    "token":"token",
    "code":"code"
  },
  Api:{
    "login":"/authorize",
    "profile":"/userinfo"
  },
  connection:{
    "gmail":"google-oauth2"
  },
  redirect_uri: {
    "success":"http://localhost:4200/PostBooking"
  },
  scope:"openid%20profile%20email"
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
