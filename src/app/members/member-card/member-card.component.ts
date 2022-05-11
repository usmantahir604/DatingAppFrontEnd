import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApplicationUserModel } from 'src/app/_models/applicationusermodel';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() member:ApplicationUserModel;
  constructor(private memberService: MembersService, private toastrService:ToastrService) { }

  ngOnInit(): void {
  }
  addLike(member:ApplicationUserModel){
    this.memberService.addLike(member.username).subscribe(()=>{
      this.toastrService.success('You have liked '+member.knownAs);
    })
  }

}
