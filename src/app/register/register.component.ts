import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model:any={};
registerForm: FormGroup;
// @Input() UserFromHomeComponent:any;
@Output() cancelRegister=new EventEmitter();
  constructor(private accountService:AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.intializeForm();
  }

  intializeForm(){
    this.registerForm=new FormGroup({
      userName:new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(8)]),
      confirmPassword: new FormControl('',[Validators.required,this.matchValues('password')])
    });
    this.registerForm.controls.password.valueChanges.subscribe(()=>{
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMatching: true}
    }
  }

  register(){
    console.log(this.registerForm.value);
    // this.accountService.register(this.model).subscribe((response)=>{
    //   console.log(response);
    //   this.cancel();
    // },error=>{
    //   console.log(error);
    //   this.toastr.error(error.error.message);
    // })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
