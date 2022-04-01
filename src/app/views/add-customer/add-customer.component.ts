import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  items = ['Pizza', 'Pasta', 'Parmesan'];
  addForm: FormGroup;
  countries=[];

  constructor(private service:CustomerService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.addForm=new FormGroup({
      firstName: new FormControl("",Validators.compose([Validators.required, Validators.pattern('^[A-Za-z]*')])),
      lastName:  new FormControl("",Validators.compose([Validators.required, Validators.pattern('^[A-Za-z]*')])),
      email: new FormControl("",Validators.compose([Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")])),
      phone: new FormControl("",Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(20),Validators.pattern('^[0-9+]*')])),
      company: new FormControl("",Validators.required),
      address: new FormControl("",Validators.required),
      apartments: new FormControl("",Validators.compose([Validators.required, Validators.maxLength(20)])),
      city: new FormControl("",Validators.required),
      country: new FormControl("",Validators.required),
      cphone: new FormControl("",Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(20),Validators.pattern('^[0-9+]*')])),
      note: new FormControl("",Validators.required),
      taxes: new FormControl("",Validators.required),
      tags: new FormControl("",Validators.required),
    })
    this.getCountries()
  }
  addCustomer(){
    var obj={
      first_name:this.addForm.value.firstName,
      last_name:this.addForm.value.lastName,
      professional_id:JSON.parse(localStorage.getItem("userData"))._id,
      email:this.addForm.value.email,
      phone_number:this.addForm.value.phone,
      company:this.addForm.value.company,
      company_phone_number:this.addForm.value.cphone,
      address:this.addForm.value.address,
      apartment:this.addForm.value.apartments,
      city:this.addForm.value.city,
      country:this.addForm.value.country,
      notes:this.addForm.value.notes,
      collect_tax:this.addForm.value.taxes,
      tags:this.addForm.value.tags

    }
    this.service.addCustomerByProfessionalForGifts(obj).subscribe(res=>{
      console.log(res);
      if(res.code==201){
        this.toastr.success("Customer added successfully")
        this.router.navigate(["/customers-list-orders"])
      }
      else if(res.code>=400){
        this.toastr.error("Some Error Occured")
      }
      
    })
  }
  getCountries() {
		this.service.getCountries().subscribe(data => {
			console.log("main data is ====", data)
			if (data.code == '200' || data.code == 200) {
        this.countries = data.data
        // console.log('countries issued in',this.countries)
			}
		}, err => {
			console.log(err.status)
			if (err.status >= 404) {
				console.log('Some error occured')
			} else {
				this.toastr.error('Some error occured, please try again!!', 'Error')
				console.log('Internet Connection Error')
			}
		})
  }

}
