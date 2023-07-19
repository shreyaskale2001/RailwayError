import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserdataService } from 'src/app/Services/userdata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = "";
  password: string = "";
  userRole:string="";

  constructor(private auth:AuthService, private router:Router, private userData:UserdataService){}
  onSubmit() {
    let mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (this.email.trim() == "" || this.password.trim() == "") {
      alert("Please Enter All The Details!");

      this.password="";
    }
    else if (!this.email.trim().match(mailformat)) {
      alert("Please Enter a Valid Email ID!");
      this.password="";
    }
    else {
      console.log(this.email + " " + this.password);
      this.auth.login({email:this.email.trim(), password:this.password.trim()}).subscribe({
        next:(res)=>{
          this.email="";
          this.password="";
          this.auth.setToken(res.token);
          let tokenPayload=this.auth.decodedToken();
          this.userData.setUsernameForStore(tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
          this.userData.setEmailForStore(tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
          this.userData.setRoleForStore(tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
          // alert("Success");
          this.userData.getRoleFromStore().subscribe(val=>{
            let userRoleFromToken=this.auth.getRoleFromToken();
            this.userRole=val || userRoleFromToken;
          });
          alert(this.userRole);
          if(this.userRole=="User"){
            // alert("User logging successful")
            this.router.navigate(['search']);
          }
          else if(this.userRole=="Admin"){
            this.router.navigate(['train-detail']);
          }
        },
        error:(err)=>{
          alert(err?.error.message);
        }
      });
    }
  }
}
