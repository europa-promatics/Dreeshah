import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {
  user: any;

  constructor() { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("userData"))
  }

}
