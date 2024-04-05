import { TokenStorageService } from '../_service/token-storage.service';
import { MessagesService } from '../_service/messages.service'

export class VGCommonModule {
  client_number: string = '00919705520520';
  template_wa_namespace: string = '6229e00f_b19c_46a7_ae0d_db6b43fca2e6'
  isAuthenticated = false;
  error_message = '';
  isError: boolean = false;
  constructor(public tokenStorage: TokenStorageService,
    public messagesService: MessagesService) { }
  checkToken(mainUriPram: string): boolean {
    var token = this.tokenStorage.getToken();
    if (token === undefined || token == null || token == '') {
      console.log(mainUriPram + ':location:' + window.location.href);
      //window.location.href = 'http://localhost:4200/#/login';
      window.location.href = window.location.href.replace(mainUriPram, 'login');
      console.log(mainUriPram + ':location2:' + window.location.href);
      return false;
    } else {
      var user = this.tokenStorage.getUser();
      if (user.roles == 'admin') {
        this.isAuthenticated = true;
      } else if (user.roles == 'user') {
        this.isAuthenticated = true;
      } else if (user.roles == 'super_admin') {
        this.isAuthenticated = true;
      } else if (user.roles == 'ctcb_admin') {
        this.isAuthenticated = true;
      } else if (user.roles == 'ctcb_agent') {
        this.isAuthenticated = true;
      } else if (user.roles == 'customer') {
        this.isAuthenticated = true;
      }
    }
    return true;
  }
 
 
  redirectLogin(mainUriPram: string) {
    window.location.href = window.location.href.replace(mainUriPram, 'login');
    console.log(mainUriPram + ':location2:' + window.location.href);
  }

}
