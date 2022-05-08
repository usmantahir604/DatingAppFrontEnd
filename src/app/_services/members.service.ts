import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApplicationUserModel } from '../_models/applicationusermodel';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl=environment.apiUrl;
  members:ApplicationUserModel[];
  memberCache=new Map();
  userParams:UserParams;
  user:User;

  constructor(private http:HttpClient, private accountService: AccountService) { 

    this.accountService.currentUser$.pipe(take(1)).subscribe((user)=>{
      this.user=user;
      this.userParams=new UserParams(this.user);
    })
    
  }

  getUserParams(){
    return this.userParams;
  }

  setUserParams(params:UserParams ){
     this.userParams=params;
  }
  resetUserParams(){
    this.userParams=new UserParams(this.user);
    return this.userParams;
  }
  getMembers(userParams: UserParams) {
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<ApplicationUserModel[]>(this.baseUrl + 'users', params)
      .pipe(map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      }))
  }

  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T>=new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params })
      .pipe(map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      }));
  }

  private getPaginationHeaders(page: number, itemsParPage: number) {
    let params = new HttpParams();
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsParPage.toString());
    return params;
  }

  getMember(username: string) {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: ApplicationUserModel) => member.username === username);

    if (member) {
      return of(member);
    }
    return this.http.get<ApplicationUserModel>(this.baseUrl + 'users/' + username);
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
