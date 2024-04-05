import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../_service/auth.service';
import { TokenStorageService } from '../../../_service/token-storage.service';
import { DatePipe } from '@angular/common';
import * as bcrypt from 'bcryptjs';
import { Validators, FormControl } from '@angular/forms';
import { sha1 } from 'sha.js';

import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],  
})
export class LoginComponent implements OnInit {
  visible = false;
  error_message = '';
  isLoggedIn = false;
  isLoginFailed = false;
  isError: boolean = false;
  roles: string[] = [];
  returnUrl: string = '';
  username: string = '';
  password: string = '';

  userTypeFormControl = new FormControl('customer', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  pipe = new DatePipe('en-IN'); // Use your own locale
  //const pwdSha = new sha1();

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router //private dialog: MatDialog
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.tokenStorage.signOut();
    this.isLoggedIn = !!this.tokenStorage.getToken();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.isLoggedIn) {
      console.log('user:' + this.isLoggedIn);
      const user = this.tokenStorage.getUser();
    }
    console.log('roles:' + this.roles);
    this.roles = this.tokenStorage.getUser().roles;
  }

  onSubmit() {
    if (this.username == '') {
      this.isLoggedIn = false;
      this.error_message = 'Error: please enter user name';
      this.visible = true;
    }
    if (this.password == '') {
      this.isLoggedIn = false;
      this.error_message = 'Error:please enter password';
      this.visible = true;
    }

    var now =new Date;    
      var year = now.getUTCFullYear();
      var month = (now.getUTCMonth() + 1)+"";
      var day = now.getUTCDate()+"";
      var hour = now.getUTCHours()+"";
      if (month.toString().length == 1) {
        month = "0" + month;
      }
      if (day.toString().length == 1) {
        day = "0" + day;
      }
      if (hour.toString().length == 1) {
        hour = "0" + hour;
      }
    const myFormattedDate = year + "" + month + "" + day + "" + hour + "";//this.pipe.transform(now, 'yyyyMMddHH');

    //console.log(myFormattedDate);
    //var pwdSha = shajs('sha1')
    const pwdSha = new sha1()
      .update(this.username + this.password)
      .digest('hex'); //.digest('hex')
    //console.log(pwdSha + myFormattedDate);
    const salt = bcrypt.genSaltSync(10);
    var pass = bcrypt.hashSync(pwdSha + myFormattedDate, 10);

    this.visible = false;
    //this.userid.nativeElement.value;
    //console.log('onsubmit:' + this.username + ':' + this.password);

    this.authService
      .login(
        this.username,
        pass,
        this.userTypeFormControl.value
          ? this.userTypeFormControl.value.toString()
          : ''
      )
      .subscribe(
        (data) => {
          console.log(data);
          if (data.error_code === 0) {
            this.reloadPage();
            this.isError = false;
            this.tokenStorage.saveToken(data.token);
            if (data.type == '1') {
              this.tokenStorage.saveUser({
                roles: ['admin'],
                userid: this.username,
              });
              this.reloadPage();
            } else if (data.type == '2') {
              this.tokenStorage.saveUser({
                roles: ['user'],
                userid: this.username,
              });
              this.reloadPage();
            } else if (data.type == '5') {
              this.tokenStorage.saveUser({
                roles: ['ctcb_agent'],
                userid: this.username,
              });
              this.reloadPage();
            } else if (data.type == '6') {
              this.tokenStorage.saveUser({
                roles: ['ctcb_admin'],
                userid: this.username,
              });
              this.reloadPage();
            } else if (data.type == '7') {
              this.tokenStorage.saveUser({
                roles: ['customer'],
                userid: this.username,
              });
              this.reloadPage();
            } else if (data.type == '0') {
              this.tokenStorage.saveUser({
                roles: ['super_admin'],
                userid: this.username,
              });
              this.reloadPage();
            } else {
              this.isError = true;
              this.isLoginFailed = true;
              this.isLoggedIn = false;
              this.error_message = 'Error: unknow user type';
              this.visible = true;
              return;
            }
            this.isLoginFailed = false;
            this.isLoggedIn = true;
          } else {
            this.isError = true;
            this.isLoginFailed = true;
            this.isLoggedIn = false;
            this.error_message = 'Error:' + data.error_message;
            this.visible = true;
          }
        },
        (err) => {
          console.log(err);
          this.isLoginFailed = true;
          this.isLoggedIn = false;
          this.isError = true;
          if (err.status === 0) {
            this.error_message = 'net work error';
          }else if (err.status === 404) {
              this.error_message = 'Page not found';
          } else {
            this.error_message = 'net work error:' + err.status;
            console.log('error' + this.error_message);
          }
          this.visible = true;
        }
      );
  }
  reloadPage(): void {
    window.location.href = window.location.href + '/../dashboard';
  }
}