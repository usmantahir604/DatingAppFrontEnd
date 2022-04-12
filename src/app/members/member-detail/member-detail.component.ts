import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationUserModel } from 'src/app/_models/applicationusermodel';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member:ApplicationUserModel;
  constructor(private memberService: MembersService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.loadMember();
  }

  loadMember(){
    debugger;
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member=>{
      this.member=member;
    });
  }

}
