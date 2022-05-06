import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl,FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/customer.service';

export class MyErrorStateMatcher extends MatInputModule implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})


export class ResetPasswordComponent implements OnInit {
  resetForm:FormGroup
  matcher = new MyErrorStateMatcher();
  submitted = false;
  queryMail;
  constructor(
    private fb:FormBuilder,
    private service:CustomerService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr:ToastrService
    ) {
      this.resetForm = this.fb.group({
        new_pass:[null,[Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@('@')$!%*#?&{}[\]<>()^+=;:'&quot;/\\|-])[A-Za-z\d$@('@')$!%*#?&{}[\]<>()^+=;:'&quot;/\\|-]{8,20}$/)]],
        con_pass:['']
      },{ validator:this.checkPasswords })
      // this.createForm();
    }

    // createForm(){
    // }

  ngOnInit(): void {
    this.queryMail = this.route.snapshot.queryParamMap.get('email')
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('new_pass').value;
    let confirmPass = group.get('con_pass').value
    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit(){
    console.log('this.resetForm.valid: ', this.resetForm);
    console.log('----CONN PASS--------------',this.resetForm.controls.con_pass)
    if(!this.resetForm.valid){
      this.resetForm.markAllAsTouched()
      return
    }
    console.log(this.resetForm.value)
    var obj = {
      email:this.queryMail,
      password:this.resetForm.value.new_pass
    }
    this.service.resetPassword(obj).subscribe(data=>{
      console.log(data)
      if(data.code==200 || data.code=='200'){
        this.toastr.success(data.msg)
        this.router.navigate(['/login']);
      }
    })
  }

}
