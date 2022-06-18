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
  offset_val: any = 0 ;
  limit_val: any = 10;
  length: any;
  limit_pen: any = 10 ;
  offset_pen: any = 0;
  offset_appr: number = 0;
  limit_appr: any = 10;
  offset_comp: number = 0;
  limit_comp: any = 10;
  offset_rej: number = 0;
  limit_rej: any = 10;
  length2: any;
  length3: any;
  length4: any;
  length5: any;
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

  paginationOptionChange(evt) {
    console.log("evthrm",evt)
    this.offset_val = (evt.pageIndex * evt.pageSize)
    this.limit_val = evt.pageSize
    console.log("Offset Value>>>",this.offset_val)
    console.log("Limit Value>>>>",this.limit_val)
    this.allAppointment();
}

  allAppointment() {
    var obj = {
      limit:this.limit_val,
      offset:this.offset_val,
      status: "all",
      search: "",
      filter: ""
    }
    this.CustomerService.getBookingList(obj).subscribe(res => {
      console.log("Booking List Response========= aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", res)
      this.details = res.result
      this.detailsLen = this.details.length
      console.log("Booking List Response======>>>>", this.details)
      this.length= res.total_bookings
    })
  }

  paginationOptionChange2(evt) {
    console.log("evthrm",evt)
    this.offset_pen = (evt.pageIndex * evt.pageSize)
    this.limit_pen = evt.pageSize
    console.log("Offset Value>>>",this.offset_val)
    console.log("Limit Value>>>>",this.limit_val)
    this.pending()
}

  pending() {
    var obj = {
      limit: this.limit_pen,
      offset: this.offset_pen,
      status: "pending",
      search: "",
      filter: ""
    }
    this.CustomerService.getBookingList(obj).subscribe(res => {
      console.log("pending List Response=========", res)
      this.pendingDetails = res.result
      this.pendingLen = this.pendingDetails.length
      console.log("pending List Response======>>>>", this.pendingDetails)
      this.length2= res.total_bookings
    })
  }

  paginationOptionChange3(evt) {
    console.log("evthrm",evt)
    this.offset_appr = (evt.pageIndex * evt.pageSize)
    this.limit_appr = evt.pageSize
    console.log("Offset Value>>>",this.offset_val)
    console.log("Limit Value>>>>",this.limit_val)
    this.approved()
}


  approved() {
    var obj = {
      limit: this.limit_appr,
      offset: this.offset_appr,
      status: "approved",
      search: "",
      filter: ""
    }
    this.CustomerService.getBookingList(obj).subscribe(res => {
      console.log("approved List Response=========", res)
      this.approvedDetails = res.result
      this.approvedLen = this.approvedDetails.length
      console.log("approved List Response======>>>>", this.approvedDetails)
      this.length3= res.total_bookings
    })
  }
 
  paginationOptionChange4(evt) {
    console.log("evthrm",evt)
    this.offset_comp = (evt.pageIndex * evt.pageSize)
    this.limit_comp = evt.pageSize
    console.log("Offset Value>>>",this.offset_val)
    console.log("Limit Value>>>>",this.limit_val)
    this.completed()
}

  completed() {
    var obj = {
      limit:  this.limit_comp,
      offset: this.offset_comp,
      status: "completed",
      search: "",
      filter: ""
    }
    this.CustomerService.getBookingList(obj).subscribe(res => {
      console.log("Completed List Response=========", res)
      this.completedDetails = res.result
      this.completedLen = this.completedDetails.length
      console.log("Completed List Response======>>>>", this.completedDetails)
      this.length4= res.total_bookings
    })
  }

  paginationOptionChange5(evt) {
    console.log("evthrm",evt)
    this.offset_rej = (evt.pageIndex * evt.pageSize)
    this.limit_rej = evt.pageSize
    console.log("Offset Value>>>",this.offset_val)
    console.log("Limit Value>>>>",this.limit_val)
    this.pending()
}


  rejected() {
    var obj = {
      limit: this.limit_rej,
      offset: this.offset_rej ,
      status: "rejected",
      search: "",
      filter: ""
    }
    this.CustomerService.getBookingList(obj).subscribe(res => {
      console.log("Rejected List Response=========", res)
      this.rejectedDetails = res.result
      this.rejectedLen = this.rejectedDetails.length
      console.log("Rejected List Response======>>>>", this.rejectedDetails)
      this.length5= res.total_bookings
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
