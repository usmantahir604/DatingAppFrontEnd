import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
hubUrl=environment.hubUrl;
private hubConnection : HubConnection;
private onlineUsersSource=new BehaviorSubject<string[]>([]);
onlineUses$=this.onlineUsersSource.asObservable();

  constructor(private toastrService: ToastrService) { }

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection
      .start()
      .catch(error => console.log(error));

    this.hubConnection.on('UserIsOnline', username => {
      this.toastrService.warning(username+' has connected');
    })

    this.hubConnection.on('UserIsOffline', username => {
      this.toastrService.warning(username+' has disconnected');
    })

    this.hubConnection.on('GetOnlineUsers',(usernames:string[])=>{
      this.onlineUsersSource.next(usernames);
    })
  }

  stopHubConnection() {
    this.hubConnection.stop().catch(error => console.log(error));
  }
}
