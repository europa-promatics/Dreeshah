import { Component, OnInit } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'
import { Location } from '@angular/common'
import { environment } from 'src/environments/environment';
const Webreg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  formGroup: FormGroup

  projects = []
  items = ['item1'];
  files: File[] = [];
  userData
  ServiceSubCat
  userDetails
  ServiceCat
  styles = []
  submit_button = false
  select_project = "new"
  project_id = ""
  image_path
  project_details

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  removeProjectImage(index) {
    this.project_details.project_images.splice(index, 1)
  }
  ngOnInit(): void {
    this.image_path = environment.image_path + "ProfessionalProject/"
    this.userData = JSON.parse(localStorage['userData']);
    this.getStyleListing()
    this.getProfile()
    this.getProject()
    this.formGroup = new FormGroup({
      project_name: new FormControl('', [
        Validators.required,
      ]),
      project_address: new FormControl('', [
        Validators.required,
      ]),
      project_category: new FormControl('', [
        Validators.required,
      ]),
      project_style: new FormControl('', [
        Validators.required,
      ]),
      project_website: new FormControl('', [
        Validators.required,
        Validators.pattern(Webreg)
      ]),
      project_keyword: new FormControl([], [
        Validators.required,
      ]),
      project_publish_product: new FormControl(false, [
        // Validators.required,
      ]),
      project_publish_professional: new FormControl(false, [
        // Validators.required,
      ]),
      project_publish_services: new FormControl(false, [
        // Validators.required,
      ]),
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
        this.userDetails = await data
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

  getProject() {
    var obj = {
      user_id: this.userData._id
    }
    this.CustomerService.getProfessionalProjects(obj).subscribe(async data => {
      console.log("its here", data);
      if (data.code == 200) {
        this.projects = data.data
      }
    })
  }

  getServiceCat(ids) {
    var obj = {
      ids: ids
    }
    console.log("oiiooihh----", obj)
    this.CustomerService.getCatFromSubCat(obj).subscribe(data => {
      console.log(data);
      if (data.code == 200) {
        this.ServiceCat = data.data
      }
    })
  }

  getStyleListing() {
    this.CustomerService.getStyleListing().subscribe(data => {
      console.log(data);
      if (data.code == 200) {
        this.styles = data.data
      }
    })
  }

  changeProjectType(value) {
    if (value == "new") {
      this.formGroup.reset();
      this.project_id = ""
    }
  }

  getProjectById(id) {
    var obj = {
      project_id: id
    }
    this.CustomerService.getProjectById(obj).subscribe(data => {
      console.log("project details here===>", data);
      if (data.code == 200) {
        this.project_details = data.data
        this.formGroup.controls['project_name'].setValue(data.data.project_name);
        this.formGroup.controls['project_address'].setValue(data.data.project_address);
        this.formGroup.controls['project_category'].setValue(data.data.project_category);
        this.formGroup.controls['project_style'].setValue(data.data.project_style);
        this.formGroup.controls['project_website'].setValue(data.data.project_website);
        this.formGroup.controls['project_keyword'].setValue(data.data.project_keyword);
        this.formGroup.controls['project_publish_product'].setValue(data.data.project_publish_product);
        this.formGroup.controls['project_publish_professional'].setValue(data.data.project_publish_professional);
        this.formGroup.controls['project_publish_services'].setValue(data.data.project_publish_services);
      }
    })
  }

  submit() {
    this.submit_button = true
    console.log(this.formGroup.valid)
    console.log(this.formGroup.value)
    console.log(this.files)
    console.log("CONDTIONSS====", this.select_project == "existing" && this.project_details && this.project_details.project_images.length == 0 && this.files.length == 0)
    // return
    if (!this.formGroup.value) {
      this.toastr.error("Please fill required feilds")
    } else if ((this.files.length == 0 && this.select_project == "new") || (this.select_project == "existing" && this.project_details && this.project_details.project_images.length == 0 && this.files.length == 0)) {
      this.toastr.error("Please upload Content images")
    } else if (!this.formGroup.value.project_publish_product && !this.formGroup.value.project_publish_professional && !this.formGroup.value.project_publish_services) {
      this.toastr.error("Please select Where Do You want to Publish")
    } else {
      var formdata: FormData = new FormData();
      if (this.select_project == 'new') {
        formdata.append('project_type', this.select_project)
      } else if (this.select_project == 'existing' && this.project_id) {
        formdata.append('project_type', this.select_project)
        formdata.append('project_id', this.project_id)
        formdata.append('project_images', JSON.stringify(this.project_details.project_images))
      } else {
        formdata.append('project_type', "new")
      }
      formdata.append('professional_id', this.userData._id)
      formdata.append('project_name', this.formGroup.value.project_name)
      formdata.append('project_address', this.formGroup.value.project_address)
      formdata.append('project_category', this.formGroup.value.project_category)
      formdata.append('project_style', this.formGroup.value.project_style)
      formdata.append('project_website', this.formGroup.value.project_website)
      formdata.append('project_publish_product', this.formGroup.value.project_publish_product)
      formdata.append('project_publish_professional', this.formGroup.value.project_publish_professional)
      formdata.append('project_publish_services', this.formGroup.value.project_publish_services)
      if (this.files.length > 0) {
        this.files.forEach(element => {
          formdata.append('project_images', element)
        });
      }
      this.formGroup.value.project_keyword.forEach(element => {
        formdata.append('project_keyword', element.value ? element.value : element)
      });

      console.log("form =====>", this.formGroup.value)
      this.CustomerService.addProfessionalProject(formdata).subscribe(data => {
        console.log(data);
        this.formGroup.reset();
        this.submit_button = false
        if (data.code == 200) {
          this.location.back();
          if (this.select_project == 'new') {
            this.toastr.success("Project addded sucessfully")
          } else {
            this.toastr.success("Project edited sucessfully")
          }
          // this.styles = data.data

        }
      })
    }
  }
  cancel() {
    this.location.back();
  }
}
