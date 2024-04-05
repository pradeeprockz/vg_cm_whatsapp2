import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot, Router } from '@angular/router';


const TOKEN_KEY = 'auth-token';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'any',
})
export class AuthService implements CanActivate {
  login_url = environment.api_url + '/user/login';
  constructor(
    private http: HttpClient,
    private router: Router,
   
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('canActive:');
    if (window.sessionStorage.getItem(TOKEN_KEY)) {
      // logged in so return true
      console.log('canActive:get token');
      return true;
    }

    console.log('canActive:get token fails');
    //this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    this.router.navigate(['login']);
    return false;
  }
 
 login(Userid: string, Password: string,userType:string): Observable<any> {
    if(userType===""){
      return this.login_sms(Userid,Password);
    }else if(userType==="agent"){
      return this.ctcb_agent_login(Userid,Password);
    }else if(userType==="admin"){
      return this.ctcb_admin_login(Userid,Password);
    }else if(userType==="customer"){
      return this.vc_customer_login(Userid,Password);
    }
    return Object();
  }
  vc_customer_login(Userid: string, Password: string): Observable<any> {
    console.log('user:' + Userid + ':' + Password);
    return this.http.post(
      environment.api_url+'/customer/login',
      '{ "UserId": "' + Userid + '","Password": "' + Password + '"  }',
      httpOptions
    );
  }
  login_sms(Userid: string, Password: string): Observable<any> {
    console.log('user:' + Userid + ':' + Password);
    return this.http.post(
      this.login_url,
      '{ "UserId": "' + Userid + '","Password": "' + Password + '"  }',
      httpOptions
    );
  }

  ctcb_agent_login(Userid: string, Password: string): Observable<any> {
    console.log('user:' + Userid + ':' + Password);
    return this.http.post(
      environment.api_url+'/ctcb_agent/login',
      '{ "UserId": "' + Userid + '","Password": "' + Password + '"  }',
      httpOptions
    );
  }
  ctcb_admin_login(Userid: string, Password: string): Observable<any> {
    console.log('user:' + Userid + ':' + Password);
    return this.http.post(
      environment.api_url+'/ctcb_admin/login',
      '{ "UserId": "' + Userid + '","Password": "' + Password + '"  }',
      httpOptions
    );
  }

 
}
