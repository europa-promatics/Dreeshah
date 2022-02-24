import { Component, OnInit } from '@angular/core';
import { Ng5SliderModule } from 'ng5-slider';
import { CustomerService } from '../../shared/customer.service';
import { Options } from 'ng5-slider';
import { environment } from 'src/environments/environment.prod';
import { LowerCasePipe } from '@angular/common';
//import { privateDecrypt } from 'crypto';
declare var $
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  config:any;
  p: number = 1;
 	value: number = 50;
   reqData;
	currentPage=10;
	currentIndex=0;
	prodData = [] ;
	length;
  data;
  evt;
  val;
	filterValue;
	getData;
	offset=0;
	limit=10;
  count
  imgpath=environment.prodImg;
   options: Options = {
    floor: 0,
    ceil: 100
  };

  constructor(public CustomerService: CustomerService) { }

  ngOnInit(): void {

    $(document).on('click','.showDetailsBtn', function(){
      $(this).closest('.product-info').toggleClass("show");
      console.log("class added");
    });

    this.reqData = {} 
	  this.reqData.offset = 0
    this.reqData.limit = 10
	  this.length
	//this.dataSource = new MatTableDataSource(this.responseData);
	var list={
		limit:this.reqData.limit,
		offset:this.reqData.offset
	}

    this.CustomerService.productList(list).subscribe(res =>{
      console.log(res)
      this.prodData=res.products;
      this.count=res.total_counts;
      console.log(this.prodData)
      console.log(this.count)
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.count
      };
    })
    //console.log(this.count)
   
    
    $(document).ready(function(){
      $(".showDetailsContent").hide();
      $(".showDetailsBtn").click(function(){
        //alert("click");
        $(".showDetailsContent").toggle();
      });
    });

    
    
    $(document).ready(function(){
      $("#filterContent").hide();
      $( "#filterBtn" ).click(function() {
        $("#filterContent").slideToggle(function () {
          $("#btn-receitamob i").toggleClass("fa-chevron-right fa-chevron-down");
        });
        $(this).find("i").toggleClass("fa-caret-down fa-caret-up");});
    });

   
    

  }
  

  search(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    //this.filterValue = filterValue.trim().toLowerCase();
    var obj = {
    search: filterValue,
    //limit:this.reqData.limit,
    //offset:(this.config.currentPage-1)*10
    limit:this.reqData.limit,
    offset:0
    }
    if(obj.search){
      this.CustomerService.productList(obj).subscribe(res => {
        console.log('filterResponse',res)
        if (res) {
          this.prodData=res.products;       
        }
        })
    }else{
      this.ngOnInit();
    }
    
    }


    sortprice(value) {
      //return this.prodData;
      //console.log(value)
      this.evt=value;
      var obj = {
        sort:'price',
        sort_by:value,
        limit:this.reqData.limit,
        offset:(this.config.currentPage-1)*10
        }
      this.val=obj.sort;
        console.log(obj)
        this.CustomerService.productList(obj).subscribe(res => {
          console.log('sortingResponse',res)
            
            this.prodData=res.products;       
           
          })
      
    }
    pageChanged(event){
      console.log(event)
      this.config.currentPage = event;
      this.p=event
      var list={
        sort:this.val,
        sort_by:this.evt,
        limit:this.reqData.limit,
        offset:(event-1)*10
      }
      
        this.CustomerService.productList(list).subscribe(res =>{
          console.log(res)
          this.prodData=res.products;
          console.log(this.prodData)
        })
    }
  

}
