import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApplicationUserModel } from '../_models/applicationusermodel';
import { PaginatedResult } from '../_models/pagination';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl=environment.apiUrl;
  members:ApplicationUserModel[];
  paginatedResult: PaginatedResult<ApplicationUserModel[]>=new PaginatedResult<ApplicationUserModel[]>();
  constructor(private http:HttpClient) { }

  getMembers(page?: number,itemsParPage?:number){

    let params=new HttpParams();
    if(page!=null && itemsParPage!=null){
      params=params.append('pageNumber',page.toString());
      params=params.append('pageSize',itemsParPage.toString());
    }
    return this.http.get<ApplicationUserModel[]>(this.baseUrl+'Users',{observe:'response',params})
    .pipe(map(response=>{
      this.paginatedResult.result=response.body;
      if(response.headers.get('Pagination')!=null){
        this.paginatedResult.pagination=JSON.parse(response.headers.get('Pagination'));
      }
      return this.paginatedResult
      // this.members=members;
      // return members;
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

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
