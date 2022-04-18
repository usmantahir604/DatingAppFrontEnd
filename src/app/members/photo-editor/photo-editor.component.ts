import { Component, Input, OnInit } from '@angular/core';
import { ApplicationUserModel } from 'src/app/_models/applicationusermodel';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
@Input() member:ApplicationUserModel;
  constructor() { }

  ngOnInit(): void {
  }

}
