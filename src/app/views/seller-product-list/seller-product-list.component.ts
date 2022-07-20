import { Component, OnInit ,ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { CustomerService } from '../../shared/customer.service';
import { HttpClient } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';
declare var $;

export interface table{
	type: string;
	product_name: string;
	category_name: string;
	vendor: string;
	price: string;
	order:number;
	quantity:string;
	imageUrl:any;
	
	
  }
  
@Component({
  selector: 'app-seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrls: ['./seller-product-list.component.scss']
})
export class SellerProductListComponent implements OnInit {
	post:any;
	reqData;
	currentPage=10;
	currentIndex=0;
	responseData = [] ;
	length;
	filterValue;
	getData;
	product_title;
	offset=0;
	limit=10;
	imgpath=environment.prodImg;
	//dataSource = new MatTableDataSource<table>(ELEMENT_DATA);
	displayedColumns: string[] = ['select','product_media', 'product_title','weight','shipping','variant','pricing','status','action'];
	//dataSource = new MatTableDataSource<table>(this.post);
	
	selection = new SelectionModel<table>(true, []);
	//dataSource: MatTableDataSource<table>;
	dataSource=[];
	id: any;
  constructor(private httpClient: HttpClient,
	public CustomerService: CustomerService) { 
	
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
	//this.dataSource = new MatTableDataSource(this.responseData);
  }

  ngOnInit(): void {

	this.reqData = {} 
	this.reqData.offset = 0
    this.reqData.limit = 10
	this.currentPage=10
    this.currentIndex=0
	this.length
	//this.dataSource = new MatTableDataSource(this.responseData);
	var list={
		 limit_val:this.reqData.limit,
		 offset_val:this.reqData.offset
	}
	this.CustomerService.getAllProduct(list).subscribe(res => {
		console.log('paginator limit',res)
		this.dataSource = res.data;
		console.log(this.dataSource)
		this.length=res.data.length;
	})

  	$(document).ready(function(){
  		$("#filterContent").hide();
  		$( "#filterBtn" ).click(function() {
  			$("#filterContent").slideToggle(function () {
  				$("#btn-receitamob i").toggleClass("fa-chevron-right fa-chevron-down");
  			});
  			$(this).find("i").toggleClass("fa-caret-down fa-caret-up");});
  	});
  }

  Search(){
	  if (this.product_title == "")
	  {
		  this.ngOnInit();
	  }else{
		  this.dataSource = this.dataSource.filter(res => {
			  return res.product_title.toLocaleLowerCase().match(this.product_title.toLocaleLowerCase());
		  });
	  }
  }
  deleteService(_id) {
	console.log("delete di iddd>>>>",_id);
	
	this.id=_id
	Swal.fire({
		title: 'Are you sure?',
		text: 'You will not be able to recover this Product!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'No, keep it'
	}) .then((result) => {
		if (result.value) {
			Swal.fire(
				'Deleted!',
				'Your Product has been deleted.',
				'success'
			).then(delete_service => {
				var obj = {
					product_id: this.id
				}
				 this.CustomerService.deleteProductService(obj).subscribe(data => {
					console.log(data);
					this.ngOnInit()
				}) 
			
			})
		}  else if (result.dismiss === Swal.DismissReason.cancel) {
			Swal.fire(
				'Cancelled',
				'Your Product is safe :)',
				'error'
			)
		} 
	}) 
}

  getPageSizeOptions() {
    return [1, 2, 10];
    }

  paginationOptionChange(evt) {
	console.log("evthrm",evt)
	this.reqData.offset = (evt.pageIndex * evt.pageSize).toString()
	this.reqData.limit = evt.pageSize
	this.currentPage=evt.pageSize
	this.currentIndex=evt.pageIndex
	console.log('checking  page Index', this.currentPage)
	console.log('checking current page',evt.pageSize)

	var list={ 
		limit_val:this.reqData.limit,
		 offset_val:this.reqData.offset
  	}

	this.CustomerService.getAllProduct(list).subscribe(res => {
  	console.log('paginator limit',res)
  
  	if(res){	  
		this.length = res.data.count;
		this.dataSource = res.data;
	}
});
}

  

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }

  
}
