import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService
{
    httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor ( private httpClient: HttpClient ) { }
  
  sendOtp(formData: FormData): Observable<any> {
    let reqUrl = 'http://apps.thinkoverit.com/api/getOTP.php';
    return this.httpClient.post<Response>(reqUrl, formData)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
  }

  verifyOtp(formData:  any): Observable<any>
  {
    let reData = {
      "mobile": formData.mobile,
      "otp": formData.OTP
    }
      let reqUrl = 'http://apps.thinkoverit.com/api/verifyOTP.php';
      return this.httpClient.post<Response>(reqUrl, reData)
      .pipe(
        catchError((error) => {
        return throwError(error);
        })
      )
    }
}