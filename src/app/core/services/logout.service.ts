
// import { Injectable } from '@angular/core';
// import { LoadingService } from './loading.service';
// import firebase from 'firebase/compat/app';

// @Injectable({
//   providedIn: 'root'
// })
// export class LogoutService {
//   userId

//   constructor(
//     public loading: LoadingService,
//   ) {

//   }


//   logOut() {
//     var promise = new Promise((resolve, reject) => {
//       this.loading.show();
//       // Sign the user out on Firebase
//       firebase.auth().signOut().then((success) => {
//         this.loading.hide();
//         // Clear navigation stacks
//         resolve(true);
//       }).catch((err) => {
//         reject(err)
//       })
//     })
//     return promise
//   }



// }

