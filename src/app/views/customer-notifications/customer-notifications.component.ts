import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';


@Component({
  selector: 'app-customer-notifications',
  templateUrl: './customer-notifications.component.html',
  styleUrls: ['./customer-notifications.component.scss']
})
export class CustomerNotificationsComponent implements OnInit {

  allNotifications = [];
  totalNotification;
  user_image: any;

  constructor(private service: CustomerService) { }

  ngOnInit(): void {
    this.notifications()

  }
  notifications() {
    var obj = {
      user_id: JSON.parse(localStorage.getItem("userData"))._id
    }
    this.service.notifications(obj).subscribe(data => {

      this.allNotifications = data.getAllNotifications
      console.log("all array data", this.allNotifications)
      this.totalNotification = this.allNotifications.length;
    })
  }

}
