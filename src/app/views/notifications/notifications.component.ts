import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  allNotifications=[];

  constructor(private service:CustomerService) { }

  ngOnInit(): void {
    this.notifications()
  }
  notifications(){
    var ob={
      user_id:JSON.parse(localStorage.getItem("userData"))._id
    }
    this.service.notifications(ob).subscribe(data=>{
      console.log("notifications are",data);
      this.allNotifications=data.getAllNotifications
      
    })
  }

}
