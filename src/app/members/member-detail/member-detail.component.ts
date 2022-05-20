import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { ApplicationUserModel } from 'src/app/_models/applicationusermodel';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', {static:true}) memberTabs: TabsetComponent;
  member:ApplicationUserModel;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab:TabDirective;
  messages:Message[]=[];

  constructor(private memberService: MembersService, private messageService: MessageService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data.subscribe(data=>{
      this.member=data.member;
    })
    this.route.queryParams.subscribe(params=>{
      params.tab?this.selectTab(3):this.selectTab(0);
    })
    this.galleryOptions=[
      {
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Slide,
        preview:false
      }
    ];
    this.galleryImages=this.getImages();
  }
  getImages(): NgxGalleryImage[] {
    const imageUrls=[];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }
  
  loadMessages(){
    this.messageService.getMessageThread(this.member.username).subscribe(messages=>{
      this.messages=messages;
    })
  }

  selectTab(tabId:number){
    this.memberTabs.tabs[tabId].active=true;
  }

  onTabActivated(data:TabDirective){
    this.activeTab=data;
    if(this.activeTab.heading==='Messages' && this.messages.length==0){
      this.loadMessages();
    }
  }

}
