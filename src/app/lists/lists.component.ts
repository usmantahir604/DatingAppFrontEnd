import { Component, OnInit } from '@angular/core';
import { ApplicationUserModel } from '../_models/applicationusermodel';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Partial<ApplicationUserModel[]>;
  predicate = 'liked';
  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
  }
  loadLikes() {
    this.memberService.getLikes(this.predicate).subscribe(response => {
      this.members = response;
    })
  }
}
