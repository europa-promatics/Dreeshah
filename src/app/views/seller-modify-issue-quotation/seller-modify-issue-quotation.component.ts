import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
@Component({
  selector: 'app-seller-modify-issue-quotation',
  templateUrl: './seller-modify-issue-quotation.component.html',
  styleUrls: ['./seller-modify-issue-quotation.component.scss']
})
export class SellerModifyIssueQuotationComponent implements OnInit {

   favoriteSeason: string;
  seasons: string[] = ['One Time Payment', 'Two Installments', 'Three Installments'];
  campaignOne: FormGroup;
  campaignTwo: FormGroup;

  constructor() { 
  	const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });

    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19))
    });
  }
  ckeditorContent

  ngOnInit(): void {
  }

}
