import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/message';
import { getPaginatedResult, getPaginationHeaders } from './paginationhelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }

  getMessages(pageNumber,pageSize,conatiner){
    let params=getPaginationHeaders(pageNumber,pageSize)
    params=params.append('container',conatiner);
    return getPaginatedResult<[Message]>(this.baseUrl,pageNumber,this.http);
      }
}
