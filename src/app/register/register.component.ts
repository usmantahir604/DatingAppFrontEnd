import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model:any={};
// @Input() UserFromHomeComponent:any;
@Output() cancelRegister=new EventEmitter();
  constructor(private accountService:AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  register(){
    this.accountService.register(this.model).subscribe((response)=>{
      console.log(response);
      this.cancel();
    },error=>{
      debugger;
      console.log(error);
      this.toastr.error(error.error.message);
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
