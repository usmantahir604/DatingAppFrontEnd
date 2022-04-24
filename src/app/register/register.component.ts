import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  constructor(private accountService:AccountService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.intializeForm();
  }

  intializeForm(){
    this.registerForm=this.fb.group({
      gender:['male'],
      userName:['',Validators.required],
      knownAs:['',Validators.required],
      dateOfBirth:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(8)]],
      confirmPassword:['',[Validators.required,this.matchValues('password')]]
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
