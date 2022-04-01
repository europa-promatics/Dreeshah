import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-appointments',
  templateUrl: './customer-appointments.component.html',
  styleUrls: ['./customer-appointments.component.scss']
})
export class CustomerAppointmentsComponent implements OnInit {

  details = []
  completedDetails = []
  approvedDetails = []
  pendingDetails = []
  rejectedDetails = []
  profile_image_path
  detailsLen = 0
  completedLen = 0
  approvedLen = 0
  pendingLen = 0
  rejectedLen = 0
  constructor(
    public CustomerService: CustomerService,
  ) { }

  ngOnInit(): void {

    this.profile_image_path = environment.image_path + "userProfile/"
    //   var obj={
    //     limit:10,
    //     offset : 0,
    //     status : "all"
    //   }
    //   this.CustomerService.getBookingList(obj).subscribe(res => {
    //     console.log("Booking List Response=========",res)
    //     this.details=res.result
    //     console.log("Booking List Response======>>>>",this.details)

    //  })
    this.allAppointment()
    this.pending()
    this.approved()
    this.completed()
    this.rejected()
  }


  allAppointment() {
    var obj = {
      limit: 10,
      offset: 0,
      status: "all",
      search: "",
      filter: ""
    }
    this.CustomerService.getBookingList(obj).subscribe(res => {
      console.log("Booking List Response=========", res)
      this.details = res.result
      this.detailsLen = this.details.length
      console.log("Booking List Response======>>>>", this.details)

    })
  }

  pending() {
    var obj = {
      limit: 10,
      offset: 0,
      status: "pending",
      search: "",
      filter: ""
    }
    this.CustomerService.getBookingList(obj).subscribe(res => {
      console.log("pending List Response=========", res)
      this.pendingDetails = res.result
      this.pendingLen = this.pendingDetails.length
      console.log("pending List Response======>>>>", this.pendingDetails)

    })
  }

  approved() {
    var obj = {
      limit: 10,
      offset: 0,
      status: "approved",
      search: "",
      filter: ""
    }
    this.CustomerService.getBookingList(obj).subscribe(res => {
      console.log("approved List Response=========", res)
      this.approvedDetails = res.result
      this.approvedLen = this.approvedDetails.length
      console.log("approved List Response======>>>>", this.approvedDetails)

    })
  }

  completed() {
    var obj = {
      limit: 10,
      offset: 0,
      status: "completed",
      search: "",
      filter: ""
    }
    this.CustomerService.getBookingList(obj).subscribe(res => {
      console.log("Completed List Response=========", res)
      this.completedDetails = res.result
      this.completedLen = this.completedDetails.length
      console.log("Completed List Response======>>>>", this.completedDetails)

    })
  }

  rejected() {
    var obj = {
      limit: 10,
      offset: 0,
      status: "rejected",
      search: "",
      filter: ""
    }
    this.CustomerService.getBookingList(obj).subscribe(res => {
      console.log("Rejected List Response=========", res)
      this.rejectedDetails = res.result
      this.rejectedLen = this.rejectedDetails.length
      console.log("Rejected List Response======>>>>", this.rejectedDetails)

    })
  }

  filterByServiceName(value, statusQuo) {
    console.log("Value for the search>>>", value)
    console.log("Value for the status>>>>", statusQuo)
    if (value) {
      console.log("uuuuuu===", value)
      //this.service_name = value
      var obj = {
        search: value,
        filter: "subject",
        limit: 10,
        offset: 0,
        status: statusQuo
      }


      this.CustomerService.getBookingList(obj).subscribe(res => {
        console.log("Result of the search====>>>", res)
        if (res.code == '200' || res.code == 200) {
          this.details = res.result
          this.completedDetails = res.result
          this.approvedDetails = res.result
          this.pendingDetails = res.result
          this.rejectedDetails = res.result
          this.detailsLen = res.total_bookings
          this.completedLen = res.total_bookings
          this.approvedLen = res.total_bookings
          this.pendingLen = res.total_bookings
          this.rejectedLen = res.total_bookings
        }
        else {
          console.log("In the Else condition>>>>>>>>")
          this.detailsLen = 0
          //this.allQuotations.length = 0
        }

      }, (err) => {
        this.detailsLen = 0
        this.completedLen = 0
        this.approvedLen = 0
        this.pendingLen = 0
        this.rejectedLen = 0
        console.log("Error occured>>>>><<<<<<<", err)

      }
      )


      //this.getServiceListing()
    } else {
      this.ngOnInit()
    }
  }

}
