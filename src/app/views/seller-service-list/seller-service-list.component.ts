import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { SelectionModel } from '@angular/cdk/collections';

import { MatTableDataSource } from '@angular/material/table';
declare var $;

@Component({
	selector: 'app-seller-service-list',
	templateUrl: './seller-service-list.component.html',
	styleUrls: ['./seller-service-list.component.scss']
})
export class SellerServiceListComponent implements OnInit {
	userData
	image_path
	services_list
	selectedServices
	selection
	selectedUsers = []
	dataSource
	responseData = []
	filter_by
	filter_value
	sort_by
	sort_value
	filerList = []
	ServiceSubCat
	sort_by_price
	sort_by_duration
	reqData
	length
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public _formBuilder: FormBuilder,
		public CustomerService: CustomerService,
		private toastr: ToastrService,
	) {
		this.userData = JSON.parse(localStorage['userData']);
		this.getProfessionalServices()
		this.selection = new SelectionModel(true, []);
		this.dataSource = new MatTableDataSource(this.responseData);

	}
	displayedColumns: string[] = ['select', 'sno', 'image', 'service_name', 'price', 'duration', 'status', 'action'];
	// 'service_category'

	ngOnInit(): void {
		this.dataSource = new MatTableDataSource(this.responseData);
		
		$(document).ready(function () {
			$("#filterContent").hide();
			$("#filterBtn").click(function () {
				$("#filterContent").slideToggle(function () {
					$("#btn-receitamob i").toggleClass("fa-chevron-right fa-chevron-down");
				});
				$(this).find("i").toggleClass("fa-caret-down fa-caret-up");
			});
		});
		this.reqData = {}
		this.reqData.offset = 0
		this.reqData.limit = 10
		this.image_path = environment.image_path + "ProfessionalServices/"
	}

	getservice(id) {
		console.log("serevice ifd", id)
		console.log("hgjkh", this.selectedServices)
	}
	getProfessionalServices() {
		var obj = {
			limit:10,
			offset:0
		}
		this.CustomerService.getProfessionalServicesNew(obj).subscribe(async data => {
			console.log('service list data new',data);
			// if (data.code == 200) {
				this.services_list = data.records
				console.log("service list --====--=-==-=-",this.services_list)
				this.responseData = data.data
				this.dataSource = new MatTableDataSource(data.records);
				this.length=data.main_count
				// this.dataSource.sort = this.sort;
			// 	// this.dataSource.paginator = this.paginator;
			// 	// this.datamodel = {}
			// }
		})
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		// console.log(this.selection)
		return numSelected === numRows;
	}
	masterToggle() {
		console.log(this.selection)
		this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
	}
	checkboxLabel(row): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
	}

	changeStatus(element, status) {
		var obj = {
			service_id: element._id,
			status: status
		}
		this.CustomerService.changeServiceStatus(obj).subscribe(async data => {
			console.log(data);
			this.getProfessionalServices()
		})
	}

	deleteService(id) {
		Swal.fire({
			title: 'Are you sure?',
			text: 'You will not be able to recover this service!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it'
		}).then((result) => {
			if (result.value) {
				Swal.fire(
					'Deleted!',
					'Your Service has been deleted.',
					'success'
				).then(delete_service => {
					var obj = {
						service_id: id
					}
					this.CustomerService.deleteSellerService(obj).subscribe(data => {
						console.log(data);
						this.getProfessionalServices()
						this.toastr.success("Service deleted sucessfully")
					})
				})
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				Swal.fire(
					'Cancelled',
					'Your Service is safe :)',
					'error'
				)
			}
		})
	}

	searchServices(value) {
		var obj = {
			search: value,
			professional_id: this.userData._id
		}
		this.CustomerService.searchSellerServices(obj).subscribe(data => {
			console.log(data);
			this.services_list = data.data
			this.responseData = data.data
			this.dataSource = new MatTableDataSource(data.data);
			// this.ngOnInit()
			// this.toastr.success("Service deleted sucessfully")
		})
	}

	getProfile() {
		this.ServiceSubCat = []
		var arr = []
		var obj = {
			id: this.userData._id
		}
		this.CustomerService.getUserDetails().subscribe(async data => {
			console.log(data);
			if (data.code == 200) {
				await data.user_services.forEach(async (element, ind) => {
					this.ServiceSubCat.push(element.service_id)
					arr.push(element.service_id.service_category_id)
					if (data.user_services.length - 1 == ind) {
						await this.getServiceCat(arr)
					}
				});
			}
		})
	}

	getServiceCat(ids) {
		var obj = {
			ids: ids
		}
		this.CustomerService.getCatFromSubCat(obj).subscribe(data => {
			console.log(data);
			if (data.code == 200) {
				this.filerList = data.data
			}
		})
	}

	filterBy(value) {
		this.filter_value = ""
		if (value == "category") {
			this.getProfile()
		} else if (value == "type") {
			this.filerList = [{ name: "Professional", _id: "professional" }, { name: "customer", _id: "customer" }]
		} else if (value == 'status') {
			this.filerList = [{ name: "Active", _id: "active" }, { name: "Inactive", _id: "inactive" }]
		}
	}

	filterSubmit() {
		var obj = {
			user_id: this.userData._id,
			filter_by: "",
			filter_value: '',
			sortByPrice: '',
			sortByDuration: ''
		}
		if (this.filter_by) {
			obj.filter_by = this.filter_by,
				obj.filter_value = this.filter_value
		}

		if (this.sort_by_price) {
			obj.sortByPrice = this.sort_by_price
		}
		if (this.sort_by_duration) {
			obj.sortByDuration = this.sort_by_duration
		}
		if (this.filter_by && !this.filter_value) {
			this.toastr.error("Please select filter value")
		} else {
			console.log('hh', obj)
			console.log("filter obj ==>", obj)
			this.CustomerService.filterSellerServices(obj).subscribe(async data => {
				console.log(data);
				if (data.code == 200) {
					this.services_list = data.data
					this.responseData = data.data
					this.dataSource = new MatTableDataSource(data.data);
					// this.dataSource.sort = this.sort;
					// this.dataSource.paginator = this.paginator;
					// this.datamodel = {}
				}
			})
		}
	}
	filterReset() {
		this.filter_by = ''
		this.filter_value = ''
		this.sort_by_price = ''
		this.sort_by_duration = ''
		this.getProfessionalServices()
	}
	getPageSizeOptions() {
		return [10, 20, 30];
	  }
	  paginationOptionChange(evt) {
		console.log(evt)
		this.reqData.offset = (evt.pageIndex * evt.pageSize)
		this.reqData.limit = evt.pageSize
		let d = {
		  limit: this.reqData.limit,
		  offset: this.reqData.offset
		}
		// console.log('ffafdfd985df9d9dfdf569df5dadfs9a9dsf',this.reqData)
		this.CustomerService.getProfessionalServicesNew(d).subscribe(res => {
			console.log('res of pagination',res)
		//   this.listArr = res.result
		//   this.length=res.total_counts
	
		}, err => {
		  console.log(err)
		  if (err.status >= 400) {
			// this.toastr.error('Internal Error', 'Error')
		  } else {
			// this.toastr.error('Internet Connection Error', 'Error')
			console.log('Internet Connection Error')
		  }
		})
	  }
}
