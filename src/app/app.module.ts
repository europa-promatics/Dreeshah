import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './views/home-page/homepage.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DbHeaderComponent } from './common/db-header/db-header.component';
import { SellerHeaderComponent } from './common/seller-header/seller-header.component';
import { SellerSidebarComponent } from './common/seller-sidebar/seller-sidebar.component';
import { ConsultantHeaderComponent } from './common/consultant-header/consultant-header.component';
import { ConsultantSidebarComponent } from './common/consultant-sidebar/consultant-sidebar.component';
import { MaterialModule } from './material.module';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { GalleryModule } from '@ngx-gallery/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { CKEditorModule } from 'ckeditor4-angular';
import { CdkAccordionModule } from '@angular/cdk/accordion'
// import { NgxStripeModule } from 'ngx-stripe';
// import { CKEditorModule } from 'ng2-ckeditor';

import { NgxDropzoneModule } from 'ngx-dropzone';

import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { MyprofileComponent } from './views/myprofile/myprofile.component';
import { EditMyProfileComponent } from './views/edit-my-profile/edit-my-profile.component';
import { ChangePasswordComponent } from './views/change-password/change-password.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { PhSidebarComponent } from './common/ph-sidebar/ph-sidebar.component';

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SellerDashboardComponent } from './views/seller-dashboard/seller-dashboard.component';
import { ConsultantDashboardComponent } from './views/consultant-dashboard/consultant-dashboard.component';
import { PhotographerProfileComponent } from './views/photographer-profile/photographer-profile.component';
import { PhotographerChangePasswordComponent } from './views/photographer-change-password/photographer-change-password.component';
import { SellerServiceListComponent } from "./views/seller-service-list/seller-service-list.component";
import { SellerAddServicesComponent } from "./views/seller-add-services/seller-add-services.component";
import { AddProjectComponent } from './views/add-project/add-project.component';
import { TagInputModule } from 'ngx-chips';
import { SellerProfileComponent } from './views/seller-profile/seller-profile.component';
import { SellerEditProfileComponent } from './views/seller-edit-profile/seller-edit-profile.component';

import { SellerEditServicesComponent } from './views/seller-edit-services/seller-edit-services.component';
import { ServicesComponent } from './views/services/services.component';
import { SellerQuotationDetailComponent } from './views/seller-quotation-detail/seller-quotation-detail.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ProductsComponent } from './views/products/products.component';
import { ProductsDetailsComponent } from './views/products-details/products-details.component';
import { SellerAddProductComponent } from './views/seller-add-product/seller-add-product.component';
import { SellerProductListComponent } from './views/seller-product-list/seller-product-list.component';
import { MychatComponent } from './views/mychat/mychat.component';
import { SellerQuotationComponent } from './views/seller-quotation/seller-quotation.component';
import { ServicesDetailsNewComponent } from './views/services-details-new/services-details-new.component';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

import { MatTimepickerModule } from 'mat-timepicker';

import { NgxPaginationModule } from 'ngx-pagination';
// Import the library
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { MycartComponent } from './views/mycart/mycart.component';
import { MyWishlistComponent } from './views/my-wishlist/my-wishlist.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { TermsConditionsComponent } from './views/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './views/privacy-policy/privacy-policy.component';
import { AddressComponent } from './views/address/address.component';
import { MyOrdersComponent } from './views/my-orders/my-orders.component';
import { EditAddressComponent } from './views/edit-address/edit-address.component';
import { PhotographerUpdatePasswordComponent } from './views/photographer-update-password/photographer-update-password.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { UserGuard } from './Auth/user.guard';

import { ViewDetailsComponent } from './views/view-details/view-details.component';
import { SellerOrderManagementComponent } from './views/seller-order-management/seller-order-management.component';

import { ProfessionalsComponent } from './views/professionals/professionals.component';
import { MyAlbumsComponent } from './views/my-albums/my-albums.component';

import { SellerBranchComponent } from './views/seller-branch/seller-branch.component';
import { SellerEditBranchComponent } from './views/seller-edit-branch/seller-edit-branch.component';
//import{ UserGuard } from './loginAuth/user.guard';
import { SelllerBranchListingComponent } from './views/selller-branch-listing/selller-branch-listing.component';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { MyAlbumsDetailComponent } from './views/my-albums-detail/my-albums-detail.component';
import { StaffPrivilegesComponent } from './views/staff-privileges/staff-privileges.component';

import { GrantPrivelegeComponent } from './views/staff-privileges/grant-privelege/grant-privelege.component';
//import {SellerProjectsComponent} from './views/seller-projects/seller-projects.component';
import { EditStaffComponent } from './views/staff-privileges/edit-staff/edit-staff.component';

import { SellerAddStaffPrivilegesComponent } from './views/seller-add-staff-privileges/seller-add-staff-privileges.component';
import { CatalogueDesigningComponent } from './views/catalogue-designing/catalogue-designing.component';
import { SellerProjectListingPageComponent } from './views/seller-project-listing-page/seller-project-listing-page.component';
import { ViewSingleProjectListComponent } from './views/seller-project-listing-page/view-single-project-list/view-single-project-list.component';
import { SellerProjectsComponent } from './views/seller-projects/seller-projects.component';
import { RatingModule } from 'ng-starrating';
import { SellerServiceDetailComponent } from './views/seller-service-list/seller-service-detail/seller-service-detail.component';
import { MyBookingsComponent } from './views/my-bookings/my-bookings.component'
import { CustomerAppointmentsComponent } from './views/customer-appointments/customer-appointments.component'
import { SellerBookAppointmentComponent } from './views/seller-book-appointment/seller-book-appointment.component'
//import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CustomerQuotationComponent } from './views/customer-quotation/customer-quotation.component'
import { CustomerQuotationDetailsComponent } from './views/customer-quotation-details/customer-quotation-details.component'
import { PhotographeraddressComponent } from './views/photographeraddress/photographeraddress.component'
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SellerIssueQuotationComponent } from './views/seller-issue-quotation/seller-issue-quotation.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { CheckComponent } from './check/check.component';
import { ChecktestComponent } from './checktest/checktest.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { Ng5SliderModule } from 'ng5-slider';

import { CatalogueDetailComponent } from './views/catalogue-detail/catalogue-detail.component';
import { MyCatalogueComponent } from './views/my-catalogue/my-catalogue.component';
import { AddCatalogueComponent } from './views/add-catalogue/add-catalogue.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field'
//import 'hammerjs'
import firebase from "firebase/app";
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';
FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

const maskConfig: Partial<IConfig> = {
  validation: false,
};

import { CustomerQuotationManagementComponent } from './views/customer-quotation-management/customer-quotation-management.component';
import { CustomerIssueQuotationComponent } from './views/customer-issue-quotation/customer-issue-quotation.component';
import { ExteriorCatalogueComponent } from './views/exterior-catalogue/exterior-catalogue.component';
import { ExteriorComponent } from './views/exterior/exterior.component';
import { InteriorComponent } from './views/interior/interior.component';
import { ChangePasswordProfessionalComponent } from './views/change-password-professional/change-password-professional.component';
import { PhotographerAddBranchComponent } from './views/photographer-add-branch/photographer-add-branch.component';
import { PhotographerBranchListingComponent } from './views/photographer-branch-listing/photographer-branch-listing.component';
import { PhotographerBranchComponent } from './views/photographer-branch/photographer-branch.component';
import { CategoryImageDetailComponent } from './views/category-image-detail/category-image-detail.component';
import { ProfessionalsDetailsComponent } from './views/professionals-details/professionals-details.component';
import { SellerAddIssueQuoteComponent } from './views/seller-add-issue-quote/seller-add-issue-quote.component';

import { CustomerAddIssueQuoteComponent } from './views/customer-add-issue-quote/customer-add-issue-quote.component';
import { SellerModifyIssueQuotationComponent } from './views/seller-modify-issue-quotation/seller-modify-issue-quotation.component';
import { SellerModifyRequestsComponent } from './views/seller-modify-requests/seller-modify-requests.component';
import { CustomerModifyQuoteComponent } from './views/customer-modify-quote/customer-modify-quote.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SellerCreateOrderComponent } from './views/seller-create-order/seller-create-order.component';
import { SellerQuotationManagementComponent } from './views/seller-quotation-management/seller-quotation-management.component';
import { SellerQuotationManagementDetailComponent } from './views/seller-quotation-management-detail/seller-quotation-management-detail.component';
import { CustomerCreateOrderComponent } from './views/customer-create-order/customer-create-order.component';
import { PaymentMethodsComponent } from './views/payment-methods/payment-methods.component';
import { EarningsComponent } from './views/earnings/earnings.component';
import { EarningDetailsComponent } from './views/earning-details/earning-details.component';
import { WalletComponent } from './views/wallet/wallet.component';
import { PhotographerDetailComponent } from './views/photographer-detail/photographer-detail.component';
import { MyMembershipListComponent } from './views/my-membership-list/my-membership-list.component';
import { MyMemberShipComponent } from './views/my-member-ship/my-member-ship.component';
import { SellerRefundManagementComponent } from './views/seller-refund-management/seller-refund-management.component';
import { SearchComponent } from './views/search/search.component';
import { NotificationsComponent } from './views/notifications/notifications.component';
import { SellerdiscountsComponent } from './views/sellerdiscounts/sellerdiscounts.component';
import { CreatediscountComponent } from './views/creatediscount/creatediscount.component';
import { PhotographerPkgManagementComponent } from './views/photographer-pkg-management/photographer-pkg-management.component';
import { GiftCardComponent } from './views/gift-card/gift-card.component';
import { IssueGiftComponent } from './views/issue-gift/issue-gift.component';
import { CustomerListComponent } from './views/customer-list/customer-list.component';
import { AddCustomerComponent } from './views/add-customer/add-customer.component';
import { AddGiftComponent } from './views/add-gift/add-gift.component';
import { PhotographerBoughtPackagesComponent } from './views/photographer-bought-packages/photographer-bought-packages.component';
import { OrderdetailsComponent } from './views/orderdetails/orderdetails.component';
import { AdvertisementDetailsComponent } from './views/advertisement-details/advertisement-details.component';
import { PreviewProductComponent } from './views/preview-product/preview-product.component';
import { CustomerAccountSettingComponent } from './views/customer-account-setting/customer-account-setting.component';
import { CustomerNotificationsComponent } from './views/customer-notifications/customer-notifications.component';
import { CustomerFAQComponent } from './views/customer-faq/customer-faq.component';
import { CustomerTermAndConditionComponent } from './views/customer-term-and-condition/customer-term-and-condition.component';
import { CustomerPrivacyPolicyComponent } from './views/customer-privacy-policy/customer-privacy-policy.component';
import { AddAddressComponent } from './views/add-address/add-address.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { SellerProfileViewComponent } from './views/seller-profile-view/seller-profile-view.component';
import { AddNewComponent } from './views/add-new/add-new.component';
import { SellerCatalogueComponent } from './views/seller-catalogue/seller-catalogue.component';
// import { SellerBranchViewComponent } from './views/seller-branch-view/seller-branch-view.component';

firebase.initializeApp(environment.firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
    CustomerIssueQuotationComponent,
    DashboardComponent,
    MyCatalogueComponent,
    AddCatalogueComponent,
    CatalogueDesigningComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    SellerModifyIssueQuotationComponent,
    ChangePasswordProfessionalComponent,
    SellerModifyRequestsComponent,
    SidebarComponent,
    PhSidebarComponent,
    DbHeaderComponent,
    SellerHeaderComponent,
    SellerSidebarComponent,
    ConsultantHeaderComponent,
    ConsultantSidebarComponent,
    LoginComponent,
    SellerQuotationManagementDetailComponent,
    CustomerModifyQuoteComponent,
    SignupComponent,
    SellerAddIssueQuoteComponent,
    ForgotPasswordComponent,
    MyprofileComponent,
    EditMyProfileComponent,
    ChangePasswordComponent,
    SellerDashboardComponent,
    InteriorComponent,
    ConsultantDashboardComponent,
    PhotographerProfileComponent,
    PhotographerChangePasswordComponent,
    SellerServiceListComponent,
    ExteriorComponent,
    SellerAddServicesComponent,
    AddProjectComponent,
    SellerProfileComponent,
    SellerEditProfileComponent,
    SellerEditServicesComponent,
    ExteriorCatalogueComponent,
    ServicesComponent,
    ProductsComponent,
    ProductsDetailsComponent,
    CategoryImageDetailComponent,
    SellerAddProductComponent,
    PhotographerAddBranchComponent,
    PhotographerBranchListingComponent,
    PhotographerBranchComponent,
    SellerProductListComponent,
    MychatComponent,
    ServicesDetailsNewComponent,
    SellerQuotationComponent,
    SellerQuotationDetailComponent,
    CatalogueDetailComponent,

    AboutUsComponent,
    MycartComponent,
    MyWishlistComponent,
    CheckoutComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    AddressComponent,
    MyOrdersComponent,
    EditAddressComponent,
    PhotographeraddressComponent,

    ViewDetailsComponent,
    SellerOrderManagementComponent,

    ProfessionalsComponent,
    MyAlbumsComponent,
    SellerBranchComponent,
    SellerEditBranchComponent,
    SelllerBranchListingComponent,
    MyAlbumsDetailComponent,
    GrantPrivelegeComponent,
    StaffPrivilegesComponent,
    PhotographerUpdatePasswordComponent,
    EditStaffComponent,
    SellerAddStaffPrivilegesComponent,
    SellerProjectListingPageComponent,
    ViewSingleProjectListComponent,
    SellerProjectsComponent,
    SellerServiceDetailComponent,
    MyBookingsComponent,
    CustomerAppointmentsComponent,
    SellerBookAppointmentComponent,
    CustomerQuotationComponent,
    CustomerQuotationDetailsComponent,
    SellerIssueQuotationComponent,
    CheckComponent,
    ChecktestComponent,
    WalletComponent,
    CustomerQuotationManagementComponent,
    CustomerIssueQuotationComponent,
    ProfessionalsDetailsComponent,
    CustomerAddIssueQuoteComponent,
    SellerCreateOrderComponent,
    CustomerCreateOrderComponent,
    SellerQuotationManagementComponent,
    PaymentMethodsComponent,
    EarningsComponent,
    EarningDetailsComponent,
    PhotographerDetailComponent,
    MyMembershipListComponent,
    MyMemberShipComponent,
    SellerRefundManagementComponent,
    SearchComponent,
    NotificationsComponent,
    SellerdiscountsComponent,
    CreatediscountComponent,
    PhotographerPkgManagementComponent,
    GiftCardComponent,
    IssueGiftComponent,
    CustomerListComponent,
    AddCustomerComponent,
    AddGiftComponent,
    PhotographerBoughtPackagesComponent,
    OrderdetailsComponent,
    AdvertisementDetailsComponent,
    PreviewProductComponent,
    CustomerAccountSettingComponent,
    CustomerNotificationsComponent,
    CustomerFAQComponent,
    CustomerTermAndConditionComponent,
    CustomerPrivacyPolicyComponent,
    AddAddressComponent,
    ResetPasswordComponent,
    SellerProfileViewComponent,
    AddNewComponent,
    SellerCatalogueComponent,
    // SellerBranchViewComponent
  ],
  imports: [
    BrowserModule,
    NgxDaterangepickerMd.forRoot(),
    MatSelectModule,
    // NgxStripeModule,

    CommonModule,
    GooglePlaceModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    // NgxUiLoaderHttpModule.forRoot({ showForeground:false }),

    CarouselModule,
    CdkAccordionModule,
    NgxImageZoomModule,
    MaterialModule,
    LightboxModule,
    NgxPaginationModule,
    GalleryModule,
    MatIconModule,
    MatMenuModule,
    Ng5SliderModule,
    MatButtonModule,
    MatTabsModule,
    NgxMatIntlTelInputModule,
    MatDatepickerModule,
    MatTimepickerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgSelectModule,
    Ng2SearchPipeModule,
    NgxDropzoneModule,
    TagInputModule,
    NgxSliderModule,
    FullCalendarModule,
    MatDatepickerModule,
    Ng2OrderModule,
    NgxMatTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    MatNativeDateModule,
    NgxMatMomentModule,
    RatingModule,
    CKEditorModule,
    NgxImageZoomModule,
    MatInputModule,
    MatFormFieldModule,

    NgxMaskModule.forRoot(maskConfig),
    AgmCoreModule.forRoot({
      //    apiKey: 'AIzaSyD7HfEfcZ9FLoaw8R58pg2h7me-gDuIltU',
      //  libraries: ['places']
    })
    //NgxIntlTelInputModule


  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,


    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
