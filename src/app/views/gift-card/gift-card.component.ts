import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.scss']
})
export class GiftCardComponent implements OnInit {
  giftCards=[];

  constructor(private service:CustomerService) { }

  ngOnInit(): void {
    this.getGiftCardList()
  }
  getGiftCardList(){
    var ob={
      professional_id:JSON.parse(localStorage.getItem("userData"))._id
    }
    this.service.getAddedGiftCardToCustomers(ob).subscribe(data=>{
      console.log("gift card data is==>",data);
      this.giftCards=data.data
    })
  }

}
