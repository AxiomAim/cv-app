import { AppService } from 'src/app/app.service';
import { Events } from 'src/app/core/services/events.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserDataService } from '../data-services/user-data.service';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import firebase from '@firebase/app-compat';

export class AuthInfo {
    constructor(public $uid: string) {}

    isLoggedIn() {
        return !!this.$uid;
    }
}

@Injectable()
export class AuthenticationService {
    static UNKNOWN_USER = new AuthInfo(null);
    public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthenticationService.UNKNOWN_USER);

    constructor(
        private angularFireAuth: AngularFireAuth,
        public appService: AppService,
        private userDataService: UserDataService,
        public events: Events,
        ) {
        this.angularFireAuth.authState.pipe(
            take(1)
        ).subscribe(user => {
            if (user) {
                this.authInfo$.next(new AuthInfo(user.uid));
            }
        });
    }

    public forgotPassoword1(email:string) {
        this.angularFireAuth.sendPasswordResetEmail(email).then(() => {
            this.appService.openSnackbar('Email Sent')     
        }).catch(err => {
            this.appService.openSnackbar(`${err}`)     
        })
    }


      
    public sendEmailVerification(): Promise<any> {
        return new Promise<any>((resolve, reject) => {            
            this.angularFireAuth.authState.pipe(
                take(1)
            ).subscribe(user => {
                if (user) {
                    user.sendEmailVerification().then(res => {
                        console.log(`sendEmailVerification`);
                        resolve(user);
                    });
                }
            });
        });
    }


    public createAccount(user: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    if (res.user) {
                        this.authInfo$.next(new AuthInfo(res.user.uid));
                        const userDto: UserDto = UserModel.emptyDto();
                        userDto.id = res.user.uid;
                        userDto.email = user.email;
                        userDto.userName = user.firstName + ' '  + user.lastName;
                        userDto.firstName = user.firstName;
                        userDto.lastName = user.lastName;
                        this.userDataService.create(userDto).then(user => {
                            this.events.publish('user:signup', {userDto});
                            resolve(res.user);    
                        });
                    }
                })
                .catch(err => {
                    this.authInfo$.next(AuthenticationService.UNKNOWN_USER);
                    reject(`creation failed ${err}`);
                });
        });
    }

    public login(email: string, password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.angularFireAuth.signInWithEmailAndPassword(email, password)
                .then(res => {
                    if (res.user) {
                        this.authInfo$.next(new AuthInfo(res.user.uid));
                        this.events.publish('user:login', {userId: res.user.uid});
                        resolve(res.user);
                    }
                })
                .catch(err => {
                    this.authInfo$.next(AuthenticationService.UNKNOWN_USER);
                    reject(`login failed ${err}`);
                });
        });
    }

    public logout(): Promise<void> {
        this.authInfo$.next(AuthenticationService.UNKNOWN_USER);
        this.events.publish('user:logout', {});
        return this.angularFireAuth.signOut();
    }

    public checkAuth() {
        return new Promise((resolve) => {
            this.angularFireAuth.onAuthStateChanged(user => {
                resolve(user);
             });
        });
    }

    public emailVerified() {
        return new Promise((resolve) => {
            this.angularFireAuth.authState.subscribe(user => {
                resolve(user.emailVerified);
            });
        });
    }

    async loginGoogle() {
        const user = await this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        // TODO sign into offline app
        this.userDataService.getByEmail(user.user.email).subscribe((userDto: UserDto[]) => {
            if(userDto[0]) {
                userDto[0].id = user.user.uid;
                userDto[0].userName = user.user.displayName;
                userDto[0].email = user.user.email;
                userDto[0].imageUrl = user.user.photoURL;
                this.userDataService.create(userDto[0]).then(() => {
                    this.events.publish('user:login', {userId: user.user.uid});
                });            
            } else {
                this.appService.openAlertDialog('There is no valid user. Please contact Administrator');
            }
        })
      }



    // public loginWithFacebook(accessToken) {
    //     const credential = firebase.FacebookAuthProvider
    //         .credential(accessToken);
    //     return this.fireAuth.auth.signInWithCredential(credential);
    // }

    // public fbLogin(): Promise<any> {
    //     return this.fireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    // }

    // public loginWithTwitter(accessToken, accessSecret) {
    //     const credential = firebase.auth.TwitterAuthProvider
    //         .credential(accessToken, accessSecret);
    //     return this.fireAuth.auth.signInWithCredential(credential);
    // }

    // public twitterLogin(): Promise<any> {
    //     return this.fireAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    // }

    // public loginWithGoogle(accessToken, accessSecret) {
    //     const credential = accessSecret ? firebase.auth.GoogleAuthProvider
    //         .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
    //         .credential(accessToken);
    //     return this.fireAuth.auth.signInWithCredential(credential);
    // }

    // public googleLogin(): Promise<any> {
    //     return this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // }

    // public createSocialLoginUser(user): Promise<any> {
    //     this.authInfo$.next(new AuthInfo(user.uid));
    //     const userDto: UserDto = UserModel.emptyDto();
    //     userDto.id = user.uid;
    //     userDto.email = user.email;
    //     userDto.username = user.displayName;

    //     return this.userDataService.create(userDto);
    // }
}
