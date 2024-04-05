
import { VGCommonModule } from '../../CommonModule'
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDetails, UserDetailsUpdate, error_response } from '../../../material/ICampaignData';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder} from '@angular/forms';
import { MessagesService } from 'src/app/_service/messages.service';



@Component({
  selector: 'app-pwd-change',
  templateUrl: './user-details-create.component.html',
  styleUrls: ['./user-details-create.component.scss']
})
export class UserDetailsCreateComponent extends VGCommonModule implements OnInit {
  override error_message = '';
  override isError = false;
  form1: FormGroup;
  form!: FormGroup;
  submitted: boolean = false;
  error_code: number = 10;
  userDetailsUpdate = {} as UserDetailsUpdate;
  confirmPwd!:string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort!: MatSort;

  constructor(public fb: FormBuilder,
  
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService,
    private dialog: MatDialog
  ) {
    super(tokenStorage,messagesService);
    // this.dataSource = new MatTableDataSource();
    //this.sort = new MatSort();
    this.form1 = fb.group({
      'name': '',
      'email': '',
      'mobileno': '',
      'userid': '',
      'oldpwd': '',
      'password': '',
      'confpwd': '',
      'enable': '',
    });
  }
  reload() {
    this.ngOnInit();
  }
  getUserDetails() {
    var user = this.tokenStorage.getUser();
    //console.log("getUserDetails: uid :"+JSON.stringify(user));
    this.messagesService.getUserDetails(user.userid).subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('change-password');
          this.error_message = 'not authorized:no session,please login';
          return;
        }
        let resp: UserDetails;
        resp = response;
        //"error: 'sortby', 'order' sizes mismatch or 'order' size is not 1"
        //"error: unused 'order' fields";
        if (resp.error_response.error_code != 0) {
          this.isError = true;
          this.error_message = resp.error_response.error_message;
          console.log('errir:' + resp);
          return;
        }
        console.log('ok:232');
        //if (response.error_code == 0) {
        this.isError = false;
        this.userDetailsUpdate.email = resp.email
        this.userDetailsUpdate.enable = resp.enable
        this.userDetailsUpdate.mobileno = resp.mobileno
        this.userDetailsUpdate.name = resp.name
        this.userDetailsUpdate.old_password = ""
        this.userDetailsUpdate.password = resp.password = ""
        this.userDetailsUpdate.userid = resp.userid
      },
      (error) => {
        this.isError = false;
        console.log(error);
        if (error.status == 0) {
          this.error_message = 'error code:';
          console.log('net work error:' + this.error_message);
        } else {
          this.error_message = ' error message:' + error.message;
        }
        this.isError = true;
        console.log(error);
        if (error.message == 0) {
          this.error_message = 'net work error:';
          console.log('net work error:' + this.error_message);
        } else if (error.error_code == 1100) {
          this.error_message = 'net work error:';
        } else {
          this.error_message = 'net work error:' + error;
        }
      }
    );
  }
  updatePassword() {
    this.isError=false
    console.log("updatePassword " + JSON.stringify(this.userDetailsUpdate))
    if(this.confirmPwd!=this.userDetailsUpdate.password){
      console.log("confirmPws != password ",this.confirmPwd,this.userDetailsUpdate.password);
      this.isError=true
      this.error_message="new password and confirm password should be same"
      return
    }
    this.messagesService.updateUserDetails(this.userDetailsUpdate).subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('change-password');
          this.error_message = 'not authorized:no session,please login';
          return;
        }
        let resp: error_response;
        resp = response;
        if (resp.error_code != 0) {
          this.isError = true;
          this.error_message = resp.error_message;
          console.log('errir:' + JSON.stringify(resp));
          return;
        }
        console.log('ok:232');
        this.isError = false;

      },
      (error) => {
        this.isError = false;
        console.log(error);
        if (error.status == 0) {
          this.error_message = 'error code:';
          console.log('net work error:' + this.error_message);
        } else {
          this.error_message = ' error message:' + error.message;
        }
        this.isError = true;
        console.log(error);
        if (error.message == 0) {
          this.error_message = 'net work error:';
          console.log('net work error:' + this.error_message);
        } else if (error.error_code == 1100) {
          this.error_message = 'net work error:';
        } else {
          this.error_message = 'net work error:' + error;
        }
      }
    );
   
  }
  ngOnInit(): void {
    console.log('change password:location:' + window.location.href);
    if (this.checkToken('change password') == false) {
      return;
    }
    this.getUserDetails()
  }

}
