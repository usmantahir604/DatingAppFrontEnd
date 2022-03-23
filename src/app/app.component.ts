import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'The Dating App';
  users:any;

  constructor(private http: HttpClient, private accountService: AccountService){

  }
  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user=JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
  getUsers(){
    this.http.get('http://localhost:23470/api/Users').subscribe(response=>{
    this.users=response;
    },error=>{
      console.log(error);
    });
  }

}
