import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../shared/customer.service';
import { environment } from '../../../environments/environment.prod';
declare var $;
@Component({
  selector: 'app-photographer-branch-listing',
  templateUrl: './photographer-branch-listing.component.html',
  styleUrls: ['./photographer-branch-listing.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class PhotographerBranchListingComponent implements OnInit {

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
    this.getPhotographerBranchList()
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
  getPhotographerBranchList() {
    this.CustomerService.getPhotographerBranchList().subscribe(res => {

      this.listingArr = res.data
      this.length=res.data
      console.log('response of getPhotographerBranchList', this.listingArr)
    })
  }
}
