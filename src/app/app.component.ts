import { Component,OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from './app-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validations } from './validations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PersonalLoan';
  loanRegistrationForm: FormGroup;
  isShowSendOtp: boolean = false;
  isShowResendOtp: boolean = false;
  otpId: any;
  isShowVerifyOtp: boolean = false;

 
  constructor(
    private appService: AppServiceService,
    private _formBuilder: FormBuilder,
    private snack: MatSnackBar
   ) { 
     
    this.loanRegistrationForm = this._formBuilder.group({
      fullname: ['', [Validators.required]],
      city: ['', [Validators.required]],
      email: ['', [Validators.required]],
      panNumber: ['',  [Validators.required, Validators.pattern(Validations.panNumber)]],
      mobile: ['', [Validators.required]],
      OTP: ['', [Validators.required]],
    })
  
   }  

sendOtpClick(otpdata:any) {
    console.log( "otpdata=" + JSON.stringify( otpdata ) );
    this.appService.sendOtp(otpdata).subscribe(res => {
      if (res.status === 'Success') {
        this.otpId = res.data;
        this.isShowSendOtp = true;
        this.isShowVerifyOtp = true;
      } else
      {
        this.isShowResendOtp = false;
        this.isShowVerifyOtp = false;
      }
    })
  }

  verifyOtp(otp:any) {
    console.log( "otpdata=" + JSON.stringify( otp ) );
    this.appService.verifyOtp(otp).subscribe(res => {
      if (res.status === 'Success') {
        this.otpId = res.data;
        this.isShowResendOtp = false;
        this.isShowVerifyOtp = false;
          this.snack.open('Thank you for verification ' + otp.fullname ),null,
          { duration: 500, verticalPosition: 'top', horizontalPosition: 'center' };
      
      }
      else
      {
          this.isShowResendOtp = true;

      }
    })
  }
}
