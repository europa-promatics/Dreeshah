import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-seller-book-appointment',
  templateUrl: './seller-book-appointment.component.html',
  styleUrls: ['./seller-book-appointment.component.scss']
})
export class SellerBookAppointmentComponent implements OnInit {

  allAppointment = []
  appointmentCount =0
  pendingAppointment = []
  approvedAppointment = []
  completedAppointment = []
  rejectedAppointment = []
  pendingCount = 0
  approvedCount = 0
  completedCount = 0
  rejectedCount = 0 
  profile_image_path
  offset_val =0
  limit_val =10
  length
  user: any;
  constructor(
    public CustomerService: CustomerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("userData"))
    this.sellerAppointment();
    this.pendingAppointments();
    this.approvedAppointments();
    this.completedAppointments();
    this.rejectedAppointments()
    this.profile_image_path = environment.image_path + "userProfile/"
  }


  sellerAppointment() {
    var obj = {
      limit : this.limit_val,
      offset :this.offset_val,
      status : "all",
      search :"",
      filter :""
    }
    console.log("obj===", obj)
    this.CustomerService.professionalAppointment(obj).subscribe(async data => {
      console.log("Professional Appointment List====>>>>>>",data);
      if (data.code == 200) {
        this.allAppointment = data.result
        this.appointmentCount = data.total_bookings
        this.length = data.total_bookings
      }
    })
  }

  pendingAppointments() {
    var obj = {
      limit : 10,
      offset :0,
      status :"pending",
      search :"",
      filter :""
    }
    console.log("obj===", obj)
    this.CustomerService.professionalAppointment(obj).subscribe(async data => {
      console.log("Professional Appointment Pending List====>>>>>>",data);
      if (data.code == 200) {
        this.pendingAppointment = data.result
        this.pendingCount = data.total_bookings
      }
    },(err)=> {
      this.pendingCount = 0
      console.log("Error occured>>>>><<<<<<<",err)
      
    }
    )
  }

  approvedAppointments() {
    var obj = {
      limit : 10,
      offset :0,
      status : "approved",
      search :"",
      filter :""
    }
    console.log("obj===", obj)
    this.CustomerService.professionalAppointment(obj).subscribe(async data => {
      console.log("Professional Appointment List====>>>>>>",data);
      if (data.code == 200) {
        this.approvedAppointment = data.result
        this.approvedCount = data.total_bookings
        
      }
    })
  }

  completedAppointments() {
    var obj = {
      limit : 10,
      offset :0,
      status : "completed",
      search :"",
      filter :""
    }
    console.log("obj===", obj)
    this.CustomerService.professionalAppointment(obj).subscribe(async data => {
      console.log("Professional Appointment List====>>>>>>",data);
      if (data.code == 200) {
        this.completedAppointment = data.result
        this.completedCount = data.total_bookings
      }
    },(err)=> {
      this.completedCount = 0
      console.log("Error occured>>>>><<<<<<<",err)
      
    }
    )
  }

  rejectedAppointments() {
    var obj = {
      limit : 10,
      offset :0,
      status : "rejected",
      search :"",
      filter :""
    }
    console.log("obj===", obj)
    this.CustomerService.professionalAppointment(obj).subscribe(async data => {
      console.log("Professional Appointment Rejected List====>>>>>>",data);
      if (data.code == 200) {
        this.rejectedAppointment = data.result
        this.rejectedCount = data.total_bookings
      }
    })
  }

  filterByServiceName(value,statusQuo) {
    console.log("Value for the search>>>",value)
    console.log("Value for the status>>>>",statusQuo)
    if(value){
    console.log("uuuuuu===", value)
    //this.service_name = value
    var obj={
      search : value,
      filter : "subject,name",
      limit :10,
      offset :0,
      status : statusQuo
    }
    
    
    this.CustomerService.professionalAppointment(obj).subscribe(res => {
        console.log("Result of the search====>>>",res)
        if (res.code == '200' || res.code == 200) {
          this.allAppointment = res.result
          this.appointmentCount = res.total_bookings
          if(statusQuo=='pending'){
            this.pendingAppointment = res.result
            this.pendingCount = res.total_bookings
          }
          if(statusQuo=='completed'){
            this.completedAppointment = res.result
            this.completedCount = res.total_bookings
          }
          if(statusQuo=='approved'){
            this.approvedAppointment = res.result
            this.approvedCount = res.total_bookings
          }
          if(statusQuo=='rejected'){
            this.rejectedAppointment = res.result
            this.rejectedCount = res.total_bookings
          }
        }
        else {
          console.log("In the Else condition>>>>>>>>")
          this.appointmentCount = 0
          //this.allQuotations.length = 0
        }
        
    },(err)=> {
      this.appointmentCount = 0
      this.pendingCount = 0
      this.completedCount = 0
      this.approvedCount = 0
      this.rejectedCount = 0
      console.log("Error occured>>>>><<<<<<<",err)
      
    }
    )
    
  
    //this.getServiceListing()
    }else{
      this.ngOnInit()
  }
  }


  acceptQuote(dta) {
    //console.log("Data of the quotation to be accepted")
    var obj = {      
      booking_id: dta._id,
      status: 'approved',
    }
    console.log("Accepted obj===", obj)
    this.CustomerService.professionalAppointmentAction(obj).subscribe(data => {
      console.log("Accepted Appointment>>>>",data);
      this.ngOnInit();
      console.log(data);
      this.toastr.success("Quote request accepted sucessfully")
    })
   }


  rejectQuote(dta) {
    //console.log("Data of the quotation to be rejected>>>>>>",dta)
    var obj = {
      booking_id: dta._id,
      status: 'rejected',
    }
    console.log("Rejected obj===", obj)
    this.CustomerService.professionalAppointmentAction(obj).subscribe(data => {
      console.log("Rejected Appointment>>>>",data);
      this.ngOnInit()
      console.log(data);
      this.toastr.success("Quotation request rejected sucessfully")
    })
  }


  paginationOptionChange(evt) {
    console.log("evthrm",evt)
    this.offset_val = (evt.pageIndex * evt.pageSize)
    this.limit_val = evt.pageSize
    console.log("Offset Value>>>",this.offset_val)
    console.log("Limit Value>>>>",this.limit_val)
  var obj={
   
    limit : this.limit_val,
      offset: this.offset_val,
      status : "all",
      search :"",
      filter :""
    
  }
  this.CustomerService.professionalAppointment(obj).subscribe(async data => {
    console.log("Professional Appointment List====>>>>>>",data);
    if (data.code == 200) {
      this.allAppointment = data.result
      
    }
  })


}

}
