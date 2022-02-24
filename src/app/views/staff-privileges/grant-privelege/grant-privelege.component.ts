import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../../shared/customer.service';
import { ThemePalette } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-grant-privelege',
  templateUrl: './grant-privelege.component.html',
  styleUrls: ['./grant-privelege.component.scss']
})


export class GrantPrivelegeComponent implements OnInit {
  showPrivNameArr = []
  privilege = [{
    privilage_id: '',
    read_permission:false,
    write_permission:false,
    completed:false
  }]
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    subtasks: [
     
    ]
  };

  task1: Task = {
    name: 'Indeterminate',
    completed: false,
    subtasks: [
      
    ]
  };

  allComplete: boolean = false;
  allComplete1: boolean=false;
  read_permission: any;
  ngOnInit(): void {
    this.read_permission=JSON.parse(localStorage.getItem('Grant privilege')).Staff_Privilege.privilege
    console.log("privilegeeee detailssssssssssssssssssss",this.read_permission);
    
    this.staffId = this.route.snapshot.params.id
    this.getPrivilegeList()
  }
  getPrivilegeList() {
    this.CustomerService.getPrivilegeList().subscribe(res => {
    
      this.privListArr = res.result
      console.log('privrlrgr response', this.privListArr)
    })
  }
  updateAllComplete() {
    this.allComplete = this.privListArr != null && this.privListArr.every(t => t.completed);
  }
  someComplete(): boolean {
    if (this.privListArr == null) {
      return false;
    }
    return this.privListArr.filter(t => t.completed).length > 0 && !this.allComplete;
  }
  setAll(evt) {
    console.log(evt.checked)
    this.allComplete = evt.checked;
    if (this.privListArr == null) {
      return;
    }
    this.privListArr.forEach(t => t.completed = evt.checked);
    if(evt.checked){
      this.privListArr.forEach(element => {
        console.log('iddddddddd',element._id)
        if(element._id != null){
          var c = {
            privilage_id: element._id,
            read_permission: true,
            write_permission: false,
            completed:false
          }
          this.privilege.push(c)
        }
        
        
      });
      console.log('alllllll selected',this.privilege)
    }else{
      this.privilege=[]
      console.log('privilege',this.privilege)
    }
    
    // var obj={
      // privilage_id: id,
      // read_permission: tru,
      // write_permission: false,
      // completed:false
    // }
    // this.privListArr.push(obj)
  }

  updateAllComplete1() {
    this.allComplete1 = this.privListArr != null && this.privListArr.every(t => t.completed);
  }
  someComplete1(): boolean {
    if (this.privListArr == null) {
      return false;
    }
    return this.privListArr.filter(t => t.completed1).length > 0 && !this.allComplete;
  }
  setAll1(completed: boolean) {
    this.allComplete1 = completed;
    if (this.privListArr == null) {
      return;
    }
    this.privListArr.forEach(t => t.completed1 = completed);
    if(completed){
      this.privListArr.forEach(element => {
        console.log('iddddddddd',element._id)
        if(element._id != null){
          var d = {
            privilage_id: element._id,
            read_permission: true,
            write_permission: true,
            completed:false
          }
          this.privilege.push(d)
        }
        
        
      });
      console.log('alllllll selected',this.privilege)
    }else{
      this.privilege=[]
      console.log('privilege',this.privilege)
    }
    
  }
  selection
  privListArr
  staffId
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
  ) {
    this.selection = new SelectionModel(true, []);
  }


 

  privilageName(name, id, evt) {
    console.log(evt)
    // if(evt.checked){
    var o = {
      name: name,
      prId: id,
      completed: false
    }
    this.task.subtasks.push(o)
    this.task1.subtasks.push(o)
    // }
    // else{
    //   let index = this.task.subtasks.indexOf(evt.source.value)
    //     console.log('remove index', index)
    //     this.task.subtasks.splice(index, 1)

    // }

    console.log('na', this.task.subtasks)
  }
  ReadOnly(id, tru, evt) {
    console.log('privilege id',id)
    if (evt.checked) {
      var c = {
        privilage_id: id,
        read_permission: tru,
        write_permission: false,
        completed:false
      }
      this.privilege.push(c)
    } else {
      for (var i = 0; i < this.privilege.length; i++)
        if (this.privilege[i].privilage_id === id) {
          this.privilege.splice(i, 1);
          console.log('pop a particularindex', this.privilege)
          break;

        }
    }

  }
  readWrite(id, tr,evt) {
    if(evt.checked){
      var d = {
        privilage_id: id,
        write_permission: true,
        read_permission: true,
        completed:false
      }
      this.privilege.push(d)
    }else{
      for (var i = 0; i < this.privilege.length; i++)
        if (this.privilege[i].privilage_id === id) {
          this.privilege.splice(i, 1);
          console.log('pop a particularindex write', this.privilege)
          break;

        }
    }
    
  }

  newPrivArr
  add() {
    console.log('this.privilege',this.privilege)
    this.newPrivArr=[]
    this.privilege.forEach(el=>{
      if(el.privilage_id !=''){
        var e={
          privilege_id:el.privilage_id,
          read_permission:el.read_permission,
          write_permission:el.write_permission
        }
        this.newPrivArr.push(e)
      }
    })
    console.log('this.newPrvvv',this.newPrivArr)
   

    var formdata = new FormData();
    formdata.append('staff_id', this.staffId)
    formdata.append('privilege', JSON.stringify(this.newPrivArr))
    this.CustomerService.addStaffPrivileges(formdata).subscribe(res => {
      console.log('rreess', res)
      this.toastr.success('Privelege added Successfully')
      this.router.navigate(['/sellerStaffPrivileges'])
    })
  }
 
abc(i){
  console.log("irowertgmvcigmbgbdf",i);
  for(let j=0;j<=this.read_permission.length;j++){
    if(i==this.read_permission[j].privilege_id._id){
      console.log("[][][][][][][][][]",this.read_permission[j].read_permission);

      return this.read_permission[j].read_permission
      
    }
    break;
  }
  
}
// abc(){
//   //console.log("irowertgmvcigmbgbdf",i);
//   for(let i=0;i<=this.privListArr.length;i++){
//     for(let j=0;j<=this.read_permission.length;j++){
//       if(this.privListArr[i]._id==this.read_permission[j].privilege_id._id){
//         console.log("checked",this.read_permission[j].read_permission);
//         return this.read_permission[j].read_permission
//        }
//       break;
//     }

//   }
}
