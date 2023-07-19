import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = "";
  email: string = "";
  password: string = "";
  cPassword: string = "";

  constructor(private auth:AuthService, private router:Router){}

  onSubmit() {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.username.trim() == "" || this.email.trim() == "" || this.password.trim() == "" || this.cPassword.trim() == "") {
      alert("Please Enter All The Details!");
      this.password="";
      this.cPassword="";
    }
    else if (!this.email.trim().match(mailformat)) {
      alert("Please Enter a Valid Email ID!");
      this.password="";
      this.cPassword="";
    }
    else if (this.password.trim() != this.cPassword.trim()) {
      alert("Password And Confirm Password Doesn't Match!");
      this.password="";
      this.cPassword="";
    }
    else {
      console.log(this.username + " " + this.email + " " + this.password + " " + this.cPassword);
      this.auth.signup({
        username: this.username.trim(),
        email: this.email.trim(),
        password: this.password.trim()
      }).subscribe({
        next:(res)=>{
          this.username="";
          this.email="";
          this.password="";
          this.cPassword="";
          // alert(res.message);
          this.router.navigate(['signin']);
        },
        error:(err)=>{
          alert(err?.error.message);
          this.password="";
          this.cPassword="";
        }
      });


    }
  }
}
