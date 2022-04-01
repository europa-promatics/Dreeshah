import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../shared/customer.service';
import { environment } from '../../../environments/environment.prod';
declare var $;
@Component({
  selector: 'app-selller-branch-listing',
  templateUrl: './selller-branch-listing.component.html',
  styleUrls: ['./selller-branch-listing.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class SelllerBranchListingComponent implements OnInit {
  listingArr = []
  length =0
  imgUrl
  profileUrl
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllBranchList()
    this.imgUrl = environment.professionalImg
    this.profileUrl = environment.profileUrl
    $(document).ready(function () {
      $("#seller-new-address").click(function () {
        $(".seller-new-address-form").toggle();
      });
    });

    // stepper
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  getAllBranchList() {
    this.CustomerService.getBranchList().subscribe(res => {

      this.listingArr = res.result
      this.length=res.result.length
      console.log('response of getBranchList', this.listingArr)
    })
  }
}
