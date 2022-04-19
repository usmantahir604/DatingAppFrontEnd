import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { ApplicationUserModel } from 'src/app/_models/applicationusermodel';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
@Input() member:ApplicationUserModel;
uploader:FileUploader;
hasBaseDropZoneOver=false;
baseUrl=environment.apiUrl;
user:User;
  constructor(private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>this.user=user);
   }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(event:any){
    this.hasBaseDropZoneOver=event;
  }
  initializeUploader(){
    this.uploader =new FileUploader({
      url:this.baseUrl+'users/add-photo',
      authToken:`Bearer ${this.user.token}`,
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize: 10*1024*1024
    });
    this.uploader.onAfterAddingFile=(file)=>{
      file.withCredentials=false
    };
    this.uploader.onSuccessItem=(item,response,status,header)=>{
      if(response){
        const photo=JSON.parse(response);
        this.member.photos.push(photo);
      }
    }
  }
  
}
