import { Component, Input } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { TokenStorageService } from 'src/app/_service/token-storage.service';


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  userid: string = '';
  usertype: string = '';
  constructor(
    private classToggler: ClassToggleService,
    private tokenStorage: TokenStorageService
  ) {
    super();
    var token = this.tokenStorage.getToken();
    if (token === undefined || token == null || token == '') {
      console.log('sms-data:location:' + window.location.href);
      //window.location.href = 'http://localhost:4200/#/login';
      window.location.href = window.location.href.replace('dashboard', 'login');
      console.log('dashobard:location2:' + window.location.href);
      return;
    }
    this.userid = tokenStorage.getUser().userid;
    this.usertype = tokenStorage.getUser().roles[0]; 
  }
}
  