import { Component, Input, OnInit } from '@angular/core';
import { ApplicationUserModel } from 'src/app/_models/applicationusermodel';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() member:ApplicationUserModel;
  constructor() { }

  ngOnInit(): void {
  }

}
