// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  snackDuration: 3000,
  // endPoint: "https://promaticstechnologies.xyz:3017",
  endPoint: "https://developers.promaticstechnologies.com:3001",
  endPointChat:"https://developers.promaticstechnologies.com:3001/create/get",
  endPointAdmin: "https://developers.promaticstechnologies.com:3003",
  image_path: "https://developers.promaticstechnologies.com/dreeshah_apis/public/",
  albumImg:"https://developers.promaticstechnologies.com/dreeshah_apis/public/userAlbum/",
  homeImg : "https://developers.promaticstechnologies.com/dreeshah_apis/public/AllImages/",
  endPointOrder: "https://developers.promaticstechnologies.com:3001/customer",
  profileUrl:"https://developers.promaticstechnologies.com/dreeshah_apis/public/userProfile/",
  firebaseConfig:{
    apiKey: "AIzaSyD7HfEfcZ9FLoaw8R58pg2h7me-gDuIltU",
    authDomain: "dreeshah-93b2e.firebaseapp.com",
    projectId: "dreeshah-93b2e",
    storageBucket: "gs://dreeshah-93b2e.appspot.com",
    messagingSenderId: "865315456867",
    appId: "1:865315456867:web:705d694b98f59a07afb556",
    measurementId: "G-XL3CL040FF",
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
