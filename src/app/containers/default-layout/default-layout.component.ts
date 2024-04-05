import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
//import { navItemsAdmin, navItemsCtcbAdmin, navItemsCtcbAgent, navItemsSuper_Admin, navItemsUser,navItemsVCCustomer } from './_nav';
import {  navItemsUser,navItemsVCCustomer } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  public navItems = navItemsUser;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private tokenStorage: TokenStorageService) {
    var token = this.tokenStorage.getToken();
    if (token === undefined || token == null || token == '') {
      console.log(':location:' + window.location.href);
      //window.location.href = 'http://localhost:4200/#/login';
      window.location.href = window.location.href.replace('sms-data', 'login');
      console.log('dashobard:location2:' + window.location.href);
      return;
    } else {
      var user = this.tokenStorage.getUser();
      /*if (user.roles == 'admin') {
        this.navItems = navItemsAdmin;
      }else if (user.roles == 'user') {
        this.navItems = navItemsUser;
      }else if (user.roles == 'super_admin') {
        this.navItems = navItemsSuper_Admin;
      }else if (user.roles == 'ctcb_agent') {
        this.navItems = navItemsCtcbAgent;
      }else if (user.roles == 'ctcb_admin') {
        this.navItems = navItemsCtcbAdmin;
      }else*/ if (user.roles == 'customer') {
        this.navItems = navItemsVCCustomer;
      } else {
        this.navItems = [];
      }
    }
  }
}
