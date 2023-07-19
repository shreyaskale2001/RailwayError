import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string="https://localhost:44348/api/";
  private userPayload:any;

  constructor(private http:HttpClient, private router:Router) {}
  signup(userObj:any){
    return this.http.post<any>(`${this.baseUrl}Authenticate/User_register`, userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}Authenticate/login`, loginObj);
  }

  setToken(token:string){
    localStorage.setItem("token", token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  getAuthorizationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`
    });
  }

  isLoggedIn():boolean{
    return (!!localStorage.getItem("token")); // 2 exclamation marks to convert string to boolean
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['signin']);
  }

  search(searchObj:any){
    return this.http.post<any[]>(`${this.baseUrl}Search/Search`, searchObj);
  }

  getTrainById(id:number){
    return this.http.get(`${this.baseUrl}TrainDetail/id?id=${id}`);
  }

  bookTicket(bookObj:any){
    const headers = this.getAuthorizationHeaders();
    return this.http.post<any>(`${this.baseUrl}Ticket`, bookObj, {headers});
  }

  addAdmin (adminObj:any){
    return this.http.post<any>(`${this.baseUrl}Authenticate/register_Admin`, adminObj);
  }

  GetAllTrains(){
    return this.http.get(`${this.baseUrl}TrainDetail/GetAllTrains`);
  }

  deleteTrain(id: number){
    return this.http.delete(`${this.baseUrl}TrainDetail/${id}`);
  }

  addTrain(trainObj:any){
    return this.http.post<any>(`${this.baseUrl}TrainDetail`, trainObj);
  }

  updateTrain(trainObj:any){
    return this.http.put(`${this.baseUrl}TrainDetail`, trainObj);
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    return jwtHelper.decodeToken(token!);
  }

  getUserIdFromToken(){
    if(this.userPayload){
      return this.userPayload["jti"];
    }
  }

  getUsernameFromToken(){
    if(this.userPayload){
      return this.userPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    }
  }

  getEmailFromToken(){
    if(this.userPayload){
      return this.userPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    }
  }

  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
  }
  getAllTickets(userIdObj:any){
    return this.http.post<any[]>(`${this.baseUrl}Ticket/Bookings`, userIdObj);
  }

  cancelTicket(id: number){
    return this.http.delete(`${this.baseUrl}Ticket/${id}`);
  }

}
