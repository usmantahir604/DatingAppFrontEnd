import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApplicationUserModel } from '../_models/applicationusermodel';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl=environment.apiUrl;
  members:ApplicationUserModel[];
  constructor(private http:HttpClient) { }

  getMembers(){
    if(this.members?.length>0) return of(this.members);
    return this.http.get<ApplicationUserModel[]>(this.baseUrl+'Users')
    .pipe(map(members=>{
      this.members=members;
      return members;
    }));
  }

  getMember(username:string){
    const member=this.members?.find(x=>x.username==username);
    if(member!==undefined) return of(member);
    return this.http.get<ApplicationUserModel>(this.baseUrl+'Users/'+username);
  }

  updateMember(member:ApplicationUserModel){
    return this.http.put(this.baseUrl+'Users',member).pipe(map(()=>{
      const index=this.members.indexOf(member);
      this.members[index]=member;
    }));
  }
}
