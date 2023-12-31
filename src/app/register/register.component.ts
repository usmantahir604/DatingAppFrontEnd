import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm: FormGroup;
// @Input() UserFromHomeComponent:any;
@Output() cancelRegister=new EventEmitter();
maxDate:Date;
validationErrors: string[]=[];
  constructor(private accountService:AccountService, private toastr: ToastrService, private fb: FormBuilder
    ,private router:Router) { }

  ngOnInit(): void {
    this.intializeForm();
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
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
    this.accountService.register(this.registerForm.value).subscribe((response)=>{
      
      this.router.navigateByUrl('/members');
    },error=>{
      this.validationErrors=error;
      this.toastr.error(error.error.message);
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
