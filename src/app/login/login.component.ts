import { AuthenticationService } from './../core/services/firestore/firebase-authentication.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router'; 
import { AppSettings, Settings } from 'src/app/app.settings';
import { timer } from 'rxjs';
import { Events } from '../core/services/events.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  public submitForm!: UntypedFormGroup;
  public hide = true;
  public bgImage: any;
  public settings: Settings;
  public view: boolean = false;

  email: string = "";
  password: string = "";
  userId: string = "";

  //Loading Spinner
  color: string = 'primary';


  error_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minLength', message: 'Email length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'Email length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minLength', message: 'password length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'password length must be lower or equal to 30 character.' },
      { type: 'pattern', message: 'Please enter a valid password' }
    ],
  }


  constructor(
    public fb: UntypedFormBuilder, 
    public router:Router, 
    private sanitizer:DomSanitizer, 
    public appSettings:AppSettings,
    private authenticationService: AuthenticationService,
    private events: Events
    ) { 
    this.settings = this.appSettings.settings; 
  }

  ngOnInit(): void {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/cv-app/portfolio.jpg)');
    this.submitForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });

  }

  ngAfterViewInit(): void {
    if(document.getElementById('preloader')){
      document.getElementById('preloader')?.classList.add('hide');
    }     
  }

  public onSubmit() {
    this.events.publish('user:login', {});

    // this.loadingComponent.Open();
    // this.authenticationService.login(this.email, this.password).then(res => {
    //   this.loadingComponent.Hide();
    //   // this.utilService.navigate('tabs', false);
    // })
    // .catch(error => {
    //   this.loadingComponent.Hide();
    //   console.log(`${JSON.stringify(error, null, 2)}`);
    //   this.appService.openSnackbar(error);
    //   // this.presentToast(error, 5000, 'top', 'danger', 'alert');
    // });
  }

  public onLoginFormSubmit():void {
    if (this.submitForm.valid) {
      console.log(this.submitForm.value)
      this.view = !this.view;
      this.observableTimer();

    }
  }

  observableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.view = false;
      this.events.publish('user:login', {});

    });
  }

  tryGoogleLogin(){
    this.authenticationService.loginGoogle()
    .then(res => {

    })
  }


}
