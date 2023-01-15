// import { Injectable } from '@angular/core';
// import { AngularFireMessaging } from '@angular/fire/compat/messaging';
// import { UserDataService } from './data-services/user-data.service';
// import { AuthenticationService } from './firestore/firebase-authentication.service';
// // import {
// //   ActionPerformed,
// //   PushNotificationSchema,
// //   PushNotifications,
// //   Token,
// // } from '@capacitor/push-notifications';
// import { trace } from '@angular/fire/compat/performance';
// import { mergeMapTo, mergeMap, tap } from 'rxjs/operators';
// import { Observable } from 'rxjs'; 
// import { UserDto, UserModel } from '../models/user.model';
// import { Toast } from '@capacitor/toast';

// @Injectable({
//   providedIn: 'root'
// })
// export class NotificationService {
//   token$: Observable<any>;
//   message$: Observable<any>;
//   userId: any;
//   user: UserDto = UserModel.emptyDto();

//   constructor(
//     private userDataService: UserDataService, 
//     private angularFireMessaging: AngularFireMessaging,
//     private authenticationService: AuthenticationService
//   ) { 
//     this.authenticationService.checkAuth().then((userAuth: any) => {
//       if(userAuth) {
//         this.userDataService.getOne(userAuth.uid).subscribe((data) => {
//           this.user = data;
//           this.userId = this.user.id;
//         });
//       }
//     });
//   }
// //////// PWA Push Notifications ////////////////////////////////////////  

//   web_requestPermission() {
//     let date: any = new Date().toISOString(); 
//     if(this.user.id) {
//       this.angularFireMessaging.requestPermission
//         .pipe(mergeMapTo(this.angularFireMessaging.tokenChanges))
//         .subscribe(
//           (web_token) => { 
//             console.log('Permission granted! Save to the server!', web_token); 
//             if(web_token) {
//               this.user.web_token = web_token;
//               this.user.tokenDate = date;
//               this.userDataService.update(this.user).then(res => {
//                 return web_token;
//               }); 
//             } else {
//               return null;
//             }
//           },
//           (error) => { 
//             console.error(error); 
//             this.toastAlert(error);
//           },  
//         );
//     }

//   }

//   web_getToken() {
//     let date: any = new Date().toISOString(); 
//     if(this.user.id) {
//       this.angularFireMessaging.requestToken
//       .subscribe(
//         (web_token) => { 
//           if(web_token) {
//             this.user.web_token = web_token;
//             this.user.tokenDate = date;
//             this.userDataService.update(this.user).then(res => {
//               return web_token;
//             }); 
//           } else {
//             return null;
//           }
//       },
//         (error) => { console.error(error); },  
//       );
//     }
//   }

//   web_deleteToken() {
//     let date: any = new Date().toISOString(); 
//     if(this.user.id) {
//       // if(window.origin.includes('capacitor://')) {
//         this.angularFireMessaging.getToken
//           .pipe(mergeMap(token => this.angularFireMessaging.deleteToken(token)))
//           .subscribe(
//             (res) => { 
//               console.log('Token deleted!'); 
//                 this.user.web_token = null;
//                 this.user.tokenDate = date;
//                 this.userDataService.update(this.user).then(res => {
//                   return res;
//                 }); 
//             },
//           );
//       // }
//     }
//   }

//   web_listenMessages() {
//     let date: any = new Date().toISOString(); 
//     if(this.user.id) {
//       this.angularFireMessaging.requestPermission
//       .pipe(mergeMapTo(this.angularFireMessaging.tokenChanges))
//       .subscribe(
//         (web_token) => { 
//           console.log('Permission granted! Save to the server!', web_token); 
//             if(web_token) {
//               this.user.web_token = web_token;
//               this.user.tokenDate = date;
//               this.userDataService.update(this.user).then(res => {
//                 this.angularFireMessaging.messages
//                 .subscribe((message) => { 
//                   console.log(`message: ${JSON.stringify(message, null, 2)}`);
//                   return web_token;
//                 });  
//               }); 
//             } else {
//               return null;
//             }
//         },
//         (error) => { console.error(error); },  
//       );
//     }
//   }

//   web_requestToken() {    
//     let date: any = new Date().toISOString(); 
//     if(this.user.id) {
//       this.angularFireMessaging.requestToken
//         .subscribe(
//           (web_token) => { 
//             if(web_token) {
//               this.user.web_token = web_token;
//               this.user.tokenDate = date;
//               this.userDataService.update(this.user).then(res => {
//                 return web_token;
//               }); 
//             } else {
//               return null;
//             }  
//           },
//           (error) => { console.error(error); },  
//       );
//     }
//   }

//   async toastAlert(msg: any) {
//     const showHelloToast = async () => {
//       await Toast.show({
//         text: msg,
//       });
//     };
//   }
// }

