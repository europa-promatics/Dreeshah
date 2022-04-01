import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { map } from 'rxjs/operators';
declare var $;
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-seller-quotation-detail',
  templateUrl: './seller-quotation-detail.component.html',
  styleUrls: ['./seller-quotation-detail.component.scss']
})
export class SellerQuotationDetailComponent implements OnInit {

	quote_id
	quoteData
  id: any;
  constructor(public gallery: Gallery,
    private route: ActivatedRoute,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

  	this.quote_id = this.route.snapshot.paramMap.get('quote_id');
  	this.quoteDetails(this.quote_id)
  }

  quoteDetails(quote_id) {
    var obj = {
      // offset_val: this.offset,
      quote_id: quote_id,
    }
    console.log("obj===", obj)
    this.CustomerService.quoteDetails(obj).subscribe(async data => {
      console.log(data);
      this.quoteData = data.data.data
      this.id=data.data.data.customer_id
      console.log("sdfswefrewsrfwe",this.id);
        // this.ngOnInit()
    })
  }

}
