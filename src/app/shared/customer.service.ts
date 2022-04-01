import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import * as Rx from "rxjs/Rx";
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry, tap, finalize } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  userData
  apiUrl: any = environment.endPoint
  apiUrlAdmin: any = environment.endPointAdmin
  apiChat: any = environment.endPointChat
  apiOrder: any = environment.endPointOrder
  // httpOptions;



  // token = JSON.parse(localStorage.getItem('token'));
  token = localStorage.getItem('token');
  // token = JSON.stringify(localStorage.getItem('token'));

  httpOptions = {
    headers: new HttpHeaders({
      token: this.token
    })
  }

  httpOptions1 = {
    headers: new HttpHeaders({
      token: this.token,
      "content-type": "application/json"
    })
  }

  // uuidv4() {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  //     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  //     return v.toString(16);
  //   });
  // }


  constructor(private loader: NgxUiLoaderService, private route: ActivatedRoute, private router: Router, private httpClient: HttpClient, private toastr: ToastrService) {
    //   this.userData = localStorage['userData'] != null ? JSON.parse(localStorage['userData']) : null
    //   if(this.userData != null){
    //     this.token = JSON.parse(localStorage.getItem('token'));
    //  }

    // console.log("token", this.token)
    this.httpOptions = {
      headers: new HttpHeaders({
        token: this.token
      })
    };

    // console.log("Object ID: ",this.uuidv4());


    //session_id
    // if(localStorage.getItem("session_data")){

    // }
    // else{
    //   localStorage.setItem("session_data",this.uuidv4())
    // }
  }

  getToken() {

    if (localStorage.getItem("remember_me") && localStorage.getItem("remember_me") == "yes") {

      return localStorage.getItem("token")

    } if (localStorage.getItem("remember_me") && localStorage.getItem("remember_me") == "no") {

      return sessionStorage.getItem("token")

    } else {

      return null

    }
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const started = Date.now();
    this.loader.start();
    let ok: string;
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
    return next.handle(request).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        event => ok = event instanceof HttpResponse ? 'succeeded' : '',
        // Operation failed; error is an HttpErrorResponse
        error => ok = error
      ),
      // Log when response observable either completes or errors
      finalize(() => {

        this.loader.stop();
        const elapsed = Date.now() - started;
        if (ok == "succeeded") {
          const msg = `${request.method} "${request.urlWithParams}"
           ${ok} in ${elapsed} ms.`;
          console.log(msg);
        } else {
          if (typeof ok == "object" && ok["status"] == 401) {
            // logout from here
            localStorage.clear()
            sessionStorage.clear()
            this.router.navigate(['/login']);
            console.log(ok["status"]);
          } else {
            this.error(ok)
          }
        }

      })
    );
  }

  commonError(error) {
    var errorMessage = "Something went wrong here";

    if (error.message && error.message.errors) {
      errorMessage = error.message.errors.msg;
    }


    this.toastr.error(errorMessage)
  }


  error(error: any) {
    let errorMessage = '';
    if (error.error) {
      // client-side error and server side
      if (Array.isArray(error.error.errors.msg)) { // validation error message

        if (error.error.errors.msg.length) {
          const ob = error.error.errors.msg[0]
          if (ob.msg == "IS_EMPTY") {
            errorMessage = `${ob.param} missing`
          } else {
            errorMessage = "Parameters missing"

          }
        }

      } else {
        errorMessage = error.error.errors.msg;
      }
    } else {
      // server-side error
      errorMessage = `${error.message}`;
    }
    this.toastr.error("Close")
      ;
    return throwError(errorMessage);
  }

  getHomeSliderData(): Observable<any> {
    let API_URL = `${this.apiUrl}/getHomeSlider`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getHomeSectionTwo(): Observable<any> {
    let API_URL = `${this.apiUrl}/getHomeSectionTwo`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getStylelisting(): Observable<any> {
    let API_URL = `${this.apiUrl}/getStyleListing`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getDurationlisting(): Observable<any> {
    let API_URL = `${this.apiUrl}/get/duration/accToProfessional`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }


  getHomeSectionFour(): Observable<any> {
    let API_URL = `${this.apiUrl}/getHowItsWork`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getHomeSectionAPPStore(): Observable<any> {
    let API_URL = `${this.apiUrlAdmin}/getAppStoreDetails`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getHomeSectionTestimonials(): Observable<any> {
    let API_URL = `${this.apiUrlAdmin}/getTestimonialList`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getHomeSectionCatalogue(): Observable<any> {
    let API_URL = `${this.apiUrlAdmin}/getCatalogueDetails`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  //photographer catalogue
  getUserCatalogueList(): Observable<any> {
    let API_URL = `${this.apiUrl}/getUserCatalogueList`;
    console.log(API_URL)
    return this.httpClient.get(API_URL, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  getCatalogueSubCategories(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getCatalogueSubCategories`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  getCatalogueSubSubCategoriesAll(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getCatalogueSubSubCategories`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  addCatalogueQuestion(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addCatalogueQuestion`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getCatalogueQuestionAnswer(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getCatalogueQuestionAnswer`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  replyCatalogueQuestionAnswer(data): Observable<any> {
    let API_URL = `${this.apiUrl}/answerCatalogueQuestion`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  addUserCatalogue(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addUserCatalogue`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  deleteCatalogue(data): Observable<any> {
    let API_URL = `${this.apiUrl}/deleteCatalogue`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  deleteCatalogueAlbum(data): Observable<any> {
    let API_URL = `${this.apiUrl}/deleteCatalogueAlbum`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  editCatalogue(data): Observable<any> {
    let API_URL = `${this.apiUrl}/editCatalogue`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  userCatalogueDetail(data): Observable<any> {
    let API_URL = `${this.apiUrl}/userCatalogueDetail`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }


  //frontend home page cataloge
  getCatalogueSubCategoriesPagination(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getCatalogueSubCategoriesPagination`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  getCatalogueSubSubCategoriesPagination(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getCatalogueSubSubCategoriesPagination`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  getCataloguesAccToSubSubCategory(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getCataloguesAccToSubSubCategory`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  getHomeSectionFooter(): Observable<any> {
    let API_URL = `${this.apiUrlAdmin}/getFooterDetails`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getAboutUsDetail(): Observable<any> {
    let API_URL = `${this.apiUrlAdmin}/getAboutUsDetails`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }


  getCountries(): Observable<any> {
    let API_URL = `${this.apiUrl}/getCountries`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }


  getStates(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getStatesOfCountry`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }


  getStatesFromCountryName(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getStateFromCountryName`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }


  getAllCities(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getAllCities`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  brandTypes(): Observable<any> {
    let API_URL = `${this.apiUrl}/brandTypes`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  branch_cat(data): Observable<any> {
    let API_URL = `${this.apiUrl}/brandCategories`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  serviceList(): Observable<any> {
    let API_URL = `${this.apiUrl}/serviceSubCategories`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getDistinctServiceCties(): Observable<any> {
    let API_URL = `${this.apiUrl}/getDistinctServiceCties`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  signupCustomer(data): Observable<any> {
    let API_URL = `${this.apiUrl}/register`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }


  registerProfessional(data): Observable<any> {
    let API_URL = `${this.apiUrl}/registerProfessional`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }

  registerPhotographer(data): Observable<any> {
    let API_URL = `${this.apiUrl}/registerPhotographer`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }
  //photographer brach api
  addPhotographerBranch(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addPhotographerBranch`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }


  getPhotographerBranchList(): Observable<any> {
    let API_URL = `${this.apiUrl}/getPhotographerBranchList`;
    console.log(API_URL)
    return this.httpClient.get(API_URL, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }

  getPhotographerBranchDetails(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getPhotographerBranchDetails`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }
  editPhotographerBranch(data): Observable<any> {
    let API_URL = `${this.apiUrl}/editPhotographerBranch`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }
  login(data): Observable<any> {
    let API_URL = `${this.apiUrl}/login`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res;
        }),
        retry(1)
      );
  }

  // settoken(token){
  //   token = JSON.parse(localStorage.getItem('token'));
  //   this.httpOptions = {
  //     headers: new HttpHeaders({
  //        token: token
  //     })
  //   }

  //   this.httpOptions1 = {
  //     headers: new HttpHeaders({
  //       token: token,
  //       "content-type": "application/json"
  //     })
  //   }
  // }

  validateOtp(data): Observable<any> {
    let API_URL = `${this.apiUrl}/otpVerification`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  forgotPassword(data): Observable<any> {
    let API_URL = `${this.apiUrl}/forgotPassword`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  validateForgotOtp(data): Observable<any> {
    let API_URL = `${this.apiUrl}/checkForgotPasswordOtp`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  resetPassword(data): Observable<any> {
    let API_URL = `${this.apiUrl}/resetPassword`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getUserDetails(): Observable<any> {
    let API_URL = `${this.apiUrl}/getUserDetails`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, {}, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }

  getCatFromSubCat(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getCatFromSubCat`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }

  updateProfile(data): Observable<any> {
    let API_URL = `${this.apiUrl}/updateProfile`;
    console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  updatePhotographerProfile(data): Observable<any> {
    let API_URL = `${this.apiUrl}/updatePhotographerProfile`;
    console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  uploadImage(data): Observable<any> {
    let API_URL = `${this.apiUrl}/uploadImage`;
    console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  addUserAlbumMedia(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addUserAlbumMedia`;
    console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }


  uploadImageService(data): Observable<any> {
    let API_URL = `${this.apiUrl}/professional/upload/images`;
    console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  AddProfessionalService(data): Observable<any> {
    let API_URL = `${this.apiUrl}/AddProfessionalServiceWeb`;
    console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  proffSelectedCatAndSubcat(): Observable<any> {
    let API_URL = `${this.apiUrl}/getSelectedCatAndSubCat`;
    console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, {}, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getProfessionalServices(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getProfessionalServices`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }

  filterSellerServices(data): Observable<any> {
    let API_URL = `${this.apiUrl}/filterSellerServices`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }

  changeServiceStatus(data): Observable<any> {
    let API_URL = `${this.apiUrl}/changeServiceStatus`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }

  deleteSellerService(data): Observable<any> {
    let API_URL = `${this.apiUrl}/deleteSellerService`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }

  getSellerServiceDetails(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getSellerServiceDetails`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getServiceDetails(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getServiceDetails`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getAllServiceLists(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getAllServicesList`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  addBooking(data): Observable<any> {
    let API_URL = `${this.apiUrl}/booking/addBooking`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getBookingList(data): Observable<any> {
    let API_URL = `${this.apiUrl}/booking/getMyBookingList`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  editSellerServices(data): Observable<any> {
    let API_URL = `${this.apiUrl}/editSellerServices`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  searchSellerServices(data): Observable<any> {
    let API_URL = `${this.apiUrl}/searchSellerServices`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  // getStyleListing(): Observable<any> {
  //   let API_URL = `${this.apiUrl}/getStyleListing`;
  //   console.log(API_URL)
  //   return this.httpClient.get(API_URL)
  //     .pipe(
  //       map(res => {
  //         return res
  //       }),
  //   
  //     )
  // }

  getStyleListing(): Observable<any> {
    let API_URL = `${this.apiUrlAdmin}/getProductStyleList`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getAboutUS(): Observable<any> {
    let API_URL = `${this.apiUrlAdmin}/getAboutUsDetails`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  addProfessionalProject(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addProfessionalProject`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  getProfessionalProjects(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getProfessionalProjects`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getProjectById(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getProjectById`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getServiceListing(data): Observable<any> {
    console.log("data here==", data)
    let API_URL = `${this.apiUrl}/getServiceListing`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions1)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getCatAndSubCat(): Observable<any> {
    let API_URL = `${this.apiUrl}/getCatAndSubCat`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }

  getCountryByCode(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getCountryByCode`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions1)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  requestQuotation(data): Observable<any> {
    let API_URL = `${this.apiUrl}/requestQuotation`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  issueQuotation(data): Observable<any> {
    let API_URL = `${this.apiUrl}/issueQuotation/details`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  issueQuotationmodify(data): Observable<any> {
    let API_URL = `${this.apiUrl}/issueQuotation/modify`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  quotationAction(data): Observable<any> {
    let API_URL = `${this.apiUrl}/professional/quotationAction`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  createRoom(data): Observable<any> {
    let API_URL = `${this.apiChat}/roomId`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  sellerQuotations(data): Observable<any> {
    let API_URL = `${this.apiUrl}/sellerQuotations`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions1)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  pendingQuotations(data): Observable<any> {
    let API_URL = `${this.apiUrl}/sellerStatusQuotations`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions1)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getCategory(): Observable<any> {
    let API_URL = `${this.apiUrl}/product/categories`;
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getProductType(): Observable<any> {
    let API_URL = `${this.apiUrl}/get/product/types`;
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getProductVendorType(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getProductTypeVendor`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }



  getSubCat(id): Observable<any> {
    let API_URL = `${this.apiUrl}/product/subcategories/${id}`;
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }



  // productList(data): Observable<any> {
  //   let API_URL = `${this.apiUrl}/products`;
  //   return this.httpClient.post(API_URL,data,this.httpOptions )
  //     .pipe(
  //       map(res => {
  //         return res
  //       })
  //     )
  // }
  productList(data): Observable<any> {
    let API_URL = `${this.apiUrl}/productsWithoutToken`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addProductService(data): Observable<any> {
    let API_URL = `${this.apiUrl}/add_product`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addToCart(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addToCart`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  // cartDetail(data):Observable<any>{
  //   let API_URL= `${this.apiUrl}/cartDetails`;
  //   return this.httpClient.post(API_URL,data,this.httpOptions)
  //   .pipe(
  //     map(res =>{
  //       return res
  //     })
  //   )
  // }
  cartDetail(): Observable<any> {
    let API_URL = `${this.apiUrl}/cartDetails`;
    return this.httpClient.post(API_URL, {}, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  cartDetailGuest(data): Observable<any> {
    let API_URL = `${this.apiUrl}/cartDetailsNew`;
    return this.httpClient.post(API_URL, {})
      .pipe(
        map(res => {
          return res
        })
      )
  }


  // cartDetailGuest(data):Observable<any>{
  //   let API_URL= `${this.apiUrl}/cartDetails`;
  //   return this.httpClient.post(API_URL,data)
  //   .pipe(
  //     map(res =>{
  //       return res
  //     })
  //   )
  // }

  updateCartItem(data): Observable<any> {
    let API_URL = `${this.apiUrl}/updateCartItemQty`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addToWishList(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addToWishlist`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  wishlistDetail(): Observable<any> {
    let API_URL = `${this.apiUrl}/myWishlist`;
    return this.httpClient.post(API_URL, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  wishlistParamDetail(paravalue): Observable<any> {
    let API_URL = `${this.apiUrl}/myWishlist`;
    return this.httpClient.post(API_URL, paravalue, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  wishlistDetailGuest(): Observable<any> {
    let API_URL = `${this.apiUrl}/myWishlist`;
    return this.httpClient.post(API_URL, {})
      .pipe(
        map(res => {
          return res
        })
      )
  }

  removeWishlistData(data): Observable<any> {
    let API_URL = `${this.apiUrl}/removeFromWishlist`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addRemoveWishlistData(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addRemoveFromWishlist`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getGeneralContents(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getGeneralContent`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getAllProduct(data): Observable<any> {
    console.log("Value in the header is====>>>", this.httpOptions.headers)
    let API_URL = `${this.apiUrl}/getAllProducts`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getProductDetail(data): Observable<any> {
    let API_URL = `${this.apiUrl}/product/details`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getProductDetailGuest(data): Observable<any> {
    let API_URL = `${this.apiUrl}/product/details`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addNewAddres(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addNewAddress`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  deleteAddress(data): Observable<any> {
    let API_URL = `${this.apiUrl}/deleteAddresses`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addressLists(): Observable<any> {
    let API_URL = `${this.apiUrl}/addressList`;
    return this.httpClient.get(API_URL, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addNewCards(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addNewCard`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  cardsLists(): Observable<any> {
    let API_URL = `${this.apiUrl}/cardsList`;
    return this.httpClient.get(API_URL, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  ordersCheckout(data): Observable<any> {
    let API_URL = `${this.apiUrl}/orderCheckout`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  orderList(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getMyOrderList`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  changePassword(data): Observable<any> {
    let API_URL = `${this.apiUrl}/changeOldPassword`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  editAddress(data): Observable<any> {
    let API_URL = `${this.apiUrl}/editOldAddress`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  defaultAddress(data): Observable<any> {
    let API_URL = `${this.apiUrl}/setAddressDefault`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getOrderDetail(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getMyOrderDetails`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  getOrderItem(data): Observable<any> {
    let API_URL = `${this.apiOrder}/getOrderItems/accToStatus`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }


  cancelOrder(data): Observable<any> {
    let API_URL = `${this.apiUrl}/cancelOrderItems`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  cancelOrderItem(data): Observable<any> {
    let API_URL = `${this.apiUrl}/cancelOrder`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  cancelOrderList(): Observable<any> {
    let API_URL = `${this.apiUrl}/getCancelledOrderList`;
    return this.httpClient.get(API_URL, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getOrderPurchasedByUserList(): Observable<any> {
    console.log("Token is===>>>>", this.httpOptions.headers)
    let API_URL = `${this.apiUrl}/getOrderPurchasedByUser`;
    return this.httpClient.post(API_URL, {}, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addUserAlbum(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addUserAlbum`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getAlbumList(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getMyAlbumList`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getAlbumDetail(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getAlbumDetails`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }


  editAlbumDetail(data): Observable<any> {
    let API_URL = `${this.apiUrl}/EditUserAlbum`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }


  deleteAlbum(data): Observable<any> {
    let API_URL = `${this.apiUrl}/deleteSingleAlbum`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  searchAlbum(data): Observable<any> {
    let API_URL = `${this.apiUrl}/searchAlbum`;
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getInventory(): Observable<any> {
    let API_URL = `${this.apiUrl}/getInventoryList`;
    return this.httpClient.get(API_URL, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }


  updatedQuotationStatus(data): Observable<any> {
    let API_URL = `${this.apiUrl}/updateQuoteStatus`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  editProfessionalProfile(data): Observable<any> {
    console.log("Value in the header is:", this.httpOptions.headers)
    let API_URL = `${this.apiUrl}/editProfessionalProfile`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1)
      );
  }

  uploadProfile(data): Observable<any> {
    let API_URL = `${this.apiUrl}/uploadProfile`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1)
      );
  }

  quoteDetails(data): Observable<any> {
    let API_URL = `${this.apiUrl}/quotationDetails`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addProfessionalBranch(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addProfessionalBranch`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }

  getBranchList(): Observable<any> {
    let API_URL = `${this.apiUrl}/getBranchList`;
    console.log(API_URL)
    return this.httpClient.get(API_URL, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }
  getBranchDetails(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getBranchDetails`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }
  editProfessionalBranch(data): Observable<any> {
    let API_URL = `${this.apiUrl}/editProfessionalBranch`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }

  addProfessionalStaffs(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addProfessionalStaffs`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }
  getProfessionalStaffList(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getProfessionalStaffList`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }
  getPrivilegeList(): Observable<any> {
    let API_URL = `${this.apiUrl}/getAllPrivilegeList`;
    console.log(API_URL)
    return this.httpClient.get(API_URL, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }
  addStaffPrivileges(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addStaffPrivileges`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }
  editProfessionalStaffs(data): Observable<any> {
    let API_URL = `${this.apiUrl}/editProfessionalStaffs`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }
  getProfessionalStaffDetails(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getProfessionalStaffDetails`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }

  addSellerProject(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addProfessionalProject`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }
  getProfessionalProjectsWithoutPagination(): Observable<any> {
    let API_URL = `${this.apiUrl}/getProfessionalProjectsWithoutPagination`;
    return this.httpClient.post(API_URL, {}, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),
      );
  }

  getProfessionalServicesNew(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getProfessionalServicesList`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),

      );
  }
  getProjectsAccordingToSubCat(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getProjectsAccordingToSubCat`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  searchServices(data): Observable<any> {
    let API_URL = `${this.apiUrl}/searchServices`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  customerQuotation(data): Observable<any> {
    let API_URL = `${this.apiUrl}/quotationRequestList`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  customerQuotationDetail(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getQuotationDetails`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  customerPendingQuotation(data): Observable<any> {
    let API_URL = `${this.apiUrl}/quotationRequestList`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  customerProgressQuotation(data): Observable<any> {
    let API_URL = `${this.apiUrl}/quotationRequestList`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  customerRejectQuotation(data): Observable<any> {
    let API_URL = `${this.apiUrl}/quotationRequestList`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  customerApprovedQuotation(data): Observable<any> {
    let API_URL = `${this.apiUrl}/quotationRequestList`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  customerCompletedQuotation(data): Observable<any> {
    let API_URL = `${this.apiUrl}/quotationRequestList`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  customerClosedQuotation(data): Observable<any> {
    let API_URL = `${this.apiUrl}/quotationRequestList`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }


  professionalQuotationRequest(data): Observable<any> {
    let API_URL = `${this.apiUrl}/professional/quotationRequestList`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  professionalQuotationSearch(data): Observable<any> {
    let API_URL = `${this.apiUrl}/professional/quotationRequestList`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  professionalQuotationAction(data): Observable<any> {
    let API_URL = `${this.apiUrl}/professional/quotationAction`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }


  professionalAppointment(data): Observable<any> {
    let API_URL = `${this.apiUrl}/professional/getMyBookingList`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  professionalAppointmentAction(data): Observable<any> {
    let API_URL = `${this.apiUrl}/professional/bookingAction`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  professionalList(data): Observable<any> {
    let API_URL = `${this.apiUrl}/nonlogged/professionals`;
    // console.log("token", this.httpOptions)
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getDesignations(): Observable<any> {
    let API_URL = `${this.apiUrl}/designations`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  checkEmailstatus(data): Observable<any> {
    let API_URL = `${this.apiUrl}/emailAlreadyExist`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }
  getprofessionals(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getNearByProfessional`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),

      )
  }

  getTwilioService(From, To, Body) {


    let body = new URLSearchParams();
    body.set('To', To);
    body.set('From', From);
    body.set('Body', Body);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic QUNmYmJiZjcwNzI2NWJlZDQ2YTFiOGM3ZGU4Yzg4NWM5OTowYjJiNTc5OGZmMjczZmI1NGY2ZDJjZTgwZDhmY2U1ZA==',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };


    const TWILIO_SID = "ACfbbbf707265bed46a1b8c7de8c885c99"
    let API_URL = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json?`;
    return this.httpClient.post(API_URL, body.toString(), this.httpOptions)
      .pipe(
        map(res => {
          return res
        }),
      )
  }
  // getTopratedProfessionals(): Observable<any>
  // {

  //   var data={
  //     user_type:'professional',

  //   }

  //   let API_URL = `https://developers.promaticstechnologies.com:3003/getUserTypeList`;
  //   console.log(API_URL)
  //   return this.httpClient.post(API_URL,data)
  //     .pipe(
  //       map(res => {
  //         return res
  //       }),
  //   
  //     )
  // }

  AddQuotation(data): Observable<any> {
    let API_URL = `${this.apiUrl}/professional/issueQuotation/add`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }

  cancelOrCreateQuatationOrder(data): Observable<any> {
    let API_URL = `${this.apiUrl}/cancelOrCreateQuatationOrder`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  getQuationOrders(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getQuationOrders`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  stripeApi(data): Observable<any> {
    let API_URL = `${this.apiUrl}/paymentToken`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  payQuationOrders(data): Observable<any> {
    let API_URL = `${this.apiUrl}/payQuationOrders`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  sendMilestoneFeedback(data): Observable<any> {
    let API_URL = `${this.apiUrl}/feedbackOfMilestone`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  changeStatusQuationOrders(data): Observable<any> {
    let API_URL = `${this.apiUrl}/changeStatusQuationOrders`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  getEarnings(data): Observable<any> {
    let API_URL = `${this.apiUrl}/myEarningList`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  getAllprofessionals(): Observable<any> {
    let API_URL = `${this.apiUrl}/getAll/professionals/withoutPagination`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  markAsDoneMilestone(data): Observable<any> {
    let API_URL = `${this.apiUrl}/markAsDoneMilestone`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  transactionWalletMoneyList(data): Observable<any> {
    let API_URL = `${this.apiUrl}/transactionWalletMoneyList`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  creditDebitWalletMoney(data): Observable<any> {
    let API_URL = `${this.apiUrl}/creditDebitWalletMoney`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }

  createRoomId(data): Observable<any> {
    let API_URL = `${this.apiUrl}/create/get/roomId`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  top10Photographers(): Observable<any> {
    let API_URL = `${this.apiUrl}/get/top/photographer/list`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  PhotographersDetails(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getUserDetailUsingId`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  getMemberships(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getMemberShipPlans`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  buyMemberships(data): Observable<any> {
    let API_URL = `${this.apiUrl}/buyMemberShipPlan`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  getMembershipDetails(data): Observable<any> {
    let API_URL = `${this.apiUrl}/userMemberShipPlan`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  CancelMembership(data): Observable<any> {
    let API_URL = `${this.apiUrl}/changePlanStatusOfUser`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  search(data): Observable<any> {
    let API_URL = `${this.apiUrl}/searchInHomeScreen`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  addDevice(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addUserDevice`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  removeDevice(data): Observable<any> {
    let API_URL = `${this.apiUrl}/removeDevice`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  notifications(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getAllNotifications`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  readNotifications(data): Observable<any> {
    let API_URL = `${this.apiUrl}/markAsReadNotifications`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

      );
  }
  getdiscountlist(data): Observable<any> {
    let API_URL = `${this.apiUrl}/professional/discounts`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        catchError(this.error)
      );
  }
  adddiscount(data): Observable<any> {
    let API_URL = `${this.apiUrl}/professional/discounts/add`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        catchError(this.error)
      );
  }
  packagelist(data): Observable<any> {
    let API_URL = `${environment.endPointAdmin}/get/package/list`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        // catchError(this.error)
      );
  }
  getAddedGiftCardToCustomers(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getAddedGiftCardToCustomers`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        // catchError(this.error)
      );
  }
  addGiftCard(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addGiftCardForCustomers`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        // catchError(this.error)
      );
  }
  getCustomerFromOrderItems(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getCustomerFromOrderItems`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        // catchError(this.error)
      );
  }
  addCustomerByProfessionalForGifts(data): Observable<any> {
    let API_URL = `${this.apiUrl}/addCustomerByProfessionalForGifts`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        // catchError(this.error)
      );
  }
  buyPhotographerPackage(data): Observable<any> {
    let API_URL = `${this.apiUrl}/buyPhotographerPackage`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        // catchError(this.error)
      );
  }
  getPhotographerPackageBookings(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getPhotographerPackageBookings`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        // catchError(this.error)
      );
  }
  getLogisticLocations(): Observable<any> {
    let API_URL = `${this.apiUrl}/getLogisticLocations`;
    console.log(API_URL)
    return this.httpClient.get(API_URL)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        // catchError(this.error)
      );
  }
  changeOrderItemStatus(data): Observable<any> {
    let API_URL = `${this.apiUrl}/changeOrderItemStatus`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        // catchError(this.error)
      );
  }
  trackOrderStatus(data): Observable<any> {
    let API_URL = `${this.apiUrl}/trackOrderStatus`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        // catchError(this.error)
      );
  }
  applyCoupan(data): Observable<any> {
    let API_URL = `${this.apiUrl}/checkGiftCouponCodes`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        // catchError(this.error)
      );
  }
  getAdPlans(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getAdvertisementPackage`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        // catchError(this.error)
      );
  }
  addAdvertisement(data): Observable<any> {
    let API_URL = `${this.apiUrl}/buyAdvertisementPackage`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, this.httpOptions)
      //return this.httpClient.get(API_URL,this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),

        // catchError(this.error)
      );
  }

  getFaqContents(data): Observable<any> {
    let API_URL = `${this.apiUrl}/getFaq`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }


}
