import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  orderProdDetail
  orderProdId
  imgpath=environment.prodImg;
  constructor(public CustomerService: CustomerService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.orderProdId=this.route.snapshot.paramMap.get('id')
    console.log("ID of the ordered product======>>>>",this.orderProdId)

    var obj1={
      order_item_id: this.orderProdId
    }

     this.CustomerService.getOrderDetail(obj1).subscribe(res => {
      //console.log("My Order Detail Response======",res)
      this.orderProdDetail=res.result
      console.log("My Order Detail List are Response======",this.orderProdDetail)
      //this.toastr.success("Order Placed Successfull")   
    }) 
  }
 /* public counts = [
    'Recieved',
    'In Progress',
    'Ready for Billing',
    'Billed',
    'Order Closed'
  ];
  public orderStatus = 'Recieved';*/
}
