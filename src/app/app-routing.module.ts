import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './Auth/user.guard';
import { AddProjectComponent } from './views/add-project/add-project.component';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
import { ConsultantDashboardComponent } from './views/consultant-dashboard/consultant-dashboard.component';
import { ConsultantDashboardModule } from './views/consultant-dashboard/consultant-dashboard.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EditMyProfileComponent } from './views/edit-my-profile/edit-my-profile.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { HomepageComponent } from './views/home-page/homepage.component';
import { LoginComponent } from './views/login/login.component';
import { MychatComponent } from './views/mychat/mychat.component';
import { MyprofileComponent } from './views/myprofile/myprofile.component';
import { PhotographerChangePasswordComponent } from './views/photographer-change-password/photographer-change-password.component';
import { PhotographerChangePasswordModule } from './views/photographer-change-password/photographer-change-password.module';
import { PhotographerProfileComponent } from './views/photographer-profile/photographer-profile.component';
import { PhotographerProfileModule } from './views/photographer-profile/photographer-profile.module';
import { ProductsDetailsComponent } from './views/products-details/products-details.component';
import { ProductsComponent } from './views/products/products.component';
import { SellerAddProductComponent } from './views/seller-add-product/seller-add-product.component';
import { SellerAddServicesComponent } from './views/seller-add-services/seller-add-services.component';
import { SellerDashboardComponent } from './views/seller-dashboard/seller-dashboard.component';
import { SellerDashboardModule } from './views/seller-dashboard/seller-dashboard.module';
import { SellerEditProfileComponent } from './views/seller-edit-profile/seller-edit-profile.component';
import { SellerEditServicesComponent } from './views/seller-edit-services/seller-edit-services.component';
import { SellerProductListComponent } from './views/seller-product-list/seller-product-list.component';
import { SellerProfileComponent } from './views/seller-profile/seller-profile.component';
import { SellerServiceListComponent } from './views/seller-service-list/seller-service-list.component';
import { ServicesDetailsNewComponent } from './views/services-details-new/services-details-new.component';
import { ServicesComponent } from './views/services/services.component';
import { SignupComponent } from './views/signup/signup.component';
import { SellerQuotationComponent } from './views/seller-quotation/seller-quotation.component';
import { SellerQuotationDetailComponent } from './views/seller-quotation-detail/seller-quotation-detail.component';
import { AboutUsComponent } from './views/about-us/about-us.component';

import { MycartComponent } from './views/mycart/mycart.component';
//import{Myishlist, MyWishlistComponent} from './views/my-wishlist/my-wishlist.component';
import { MyWishlistComponent } from './views/my-wishlist/my-wishlist.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { TermsConditionsComponent } from './views/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './views/privacy-policy/privacy-policy.component';
import { AddressComponent } from './views/address/address.component';
import { MyOrdersComponent } from './views/my-orders/my-orders.component';
import { EditAddressComponent } from './views/edit-address/edit-address.component';
//import{ UserGuard } from './loginAuth/user.guard';
import { ViewDetailsComponent } from './views/view-details/view-details.component';
import { SellerOrderManagementComponent } from './views/seller-order-management/seller-order-management.component';

import { ProfessionalsComponent } from './views/professionals/professionals.component';
import { MyAlbumsComponent } from './views/my-albums/my-albums.component';
import { SellerBranchComponent } from './views/seller-branch/seller-branch.component';
import { SellerEditBranchComponent } from './views/seller-edit-branch/seller-edit-branch.component';
//import{ UserGuard } from './loginAuth/user.guard';
import { SelllerBranchListingComponent } from './views/selller-branch-listing/selller-branch-listing.component';
import { MyAlbumsDetailComponent } from './views/my-albums-detail/my-albums-detail.component';
import { StaffPrivilegesComponent } from './views/staff-privileges/staff-privileges.component';

import { GrantPrivelegeComponent } from './views/staff-privileges/grant-privelege/grant-privelege.component';
//import {SellerProjectsComponent} from './views/seller-projects/seller-projects.component';
import { EditStaffComponent } from './views/staff-privileges/edit-staff/edit-staff.component';

import { SellerAddStaffPrivilegesComponent } from './views/seller-add-staff-privileges/seller-add-staff-privileges.component';

import { SellerProjectListingPageComponent } from './views/seller-project-listing-page/seller-project-listing-page.component';
import { ViewSingleProjectListComponent } from './views/seller-project-listing-page/view-single-project-list/view-single-project-list.component';
import { SellerProjectsComponent } from './views/seller-projects/seller-projects.component';
import { SellerServiceDetailComponent } from './views/seller-service-list/seller-service-detail/seller-service-detail.component';
import { MyBookingsComponent } from './views/my-bookings/my-bookings.component'
import { CustomerAppointmentsComponent } from './views/customer-appointments/customer-appointments.component'
import { SellerBookAppointmentComponent } from './views/seller-book-appointment/seller-book-appointment.component'
import { CustomerQuotationComponent } from './views/customer-quotation/customer-quotation.component'
import { CustomerQuotationDetailsComponent } from './views/customer-quotation-details/customer-quotation-details.component'
import { SellerIssueQuotationComponent } from './views/seller-issue-quotation/seller-issue-quotation.component'
import { SellerAddIssueQuoteComponent } from './views/seller-add-issue-quote/seller-add-issue-quote.component'
import { CustomerAddIssueQuoteComponent } from './views/customer-add-issue-quote/customer-add-issue-quote.component'

import { PhotographerUpdatePasswordComponent } from './views/photographer-update-password/photographer-update-password.component';
import { PhotographeraddressComponent } from './views/photographeraddress/photographeraddress.component';
import { CustomerQuotationManagementComponent } from './views/customer-quotation-management/customer-quotation-management.component';
import { CustomerIssueQuotationComponent } from './views/customer-issue-quotation/customer-issue-quotation.component';
import { CatalogueDetailComponent } from './views/catalogue-detail/catalogue-detail.component';
import { CatalogueDesigningComponent } from './views/catalogue-designing/catalogue-designing.component';
import { MyCatalogueComponent } from './views/my-catalogue/my-catalogue.component';
import { AddCatalogueComponent } from './views/add-catalogue/add-catalogue.component';
import { ExteriorCatalogueComponent } from './views/exterior-catalogue/exterior-catalogue.component';
import { ExteriorComponent } from './views/exterior/exterior.component';
import { InteriorComponent } from './views/interior/interior.component';
import { ChangePasswordProfessionalComponent } from './views/change-password-professional/change-password-professional.component';
import { PhotographerBranchComponent } from './views/photographer-branch/photographer-branch.component';
import { PhotographerBranchListingComponent } from './views/photographer-branch-listing/photographer-branch-listing.component';
import { PhotographerAddBranchComponent } from './views/photographer-add-branch/photographer-add-branch.component';
import { CategoryImageDetailComponent } from './views/category-image-detail/category-image-detail.component';
import { ProfessionalsDetailsComponent } from './views/professionals-details/professionals-details.component';
import { SellerModifyIssueQuotationComponent } from './views/seller-modify-issue-quotation/seller-modify-issue-quotation.component';
import { SellerModifyRequestsComponent } from './views/seller-modify-requests/seller-modify-requests.component';
import { CustomerModifyQuoteComponent } from './views/customer-modify-quote/customer-modify-quote.component';
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
import { CustomerFAQComponent } from './views/customer-faq/customer-faq.component';
import { CustomerNotificationsComponent } from './views/customer-notifications/customer-notifications.component';
import { CustomerTermAndConditionComponent } from './views/customer-term-and-condition/customer-term-and-condition.component';
import { CustomerPrivacyPolicyComponent } from './views/customer-privacy-policy/customer-privacy-policy.component';

import { AddAddressComponent } from './views/add-address/add-address.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { SellerProfileViewComponent } from './views/seller-profile-view/seller-profile-view.component';
import { AddNewComponent } from './views/add-new/add-new.component';
import { SellerCatalogueComponent } from './views/seller-catalogue/seller-catalogue.component';
import { SellerCatalogueViewComponent } from './views/seller-catalogue-view/seller-catalogue-view.component';
// import { SellerBranchViewComponent } from './views/seller-branch-view/seller-branch-view.component';
import { SearchResultComponent } from './views/search-result/search-result.component';


const routes: Routes = [
	{
		path: '',
		component: HomepageComponent
	},
	{
		path: 'add-new',
		component: AddNewComponent
	},
  {
		path: 'add-address',
		component: AddAddressComponent
	},
  {
		path: 'reset-password',
		component: ResetPasswordComponent
	},
	{
		path: 'my-membership-list',
		component: MyMembershipListComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'photographerPackageManagement',
		component: PhotographerPkgManagementComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'my-membership',
		component: MyMemberShipComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'seller-discounts',
		component: SellerdiscountsComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'seller-gift-card',
		component: GiftCardComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'creatediscount',
		component: CreatediscountComponent,
		canActivate: [UserGuard]
	},
	{
		path: 'advertisement-form',
		component: AdvertisementDetailsComponent,

	},
	{
		path: 'signup',
		component: SignupComponent
	},
	{
		path: 'photographer-detail/:id',
		component: PhotographerDetailComponent
	},
	{
		path: 'customer-modify-quote/:id',
		component: CustomerModifyQuoteComponent
	},
	{
		path: 'about-us',
		component: AboutUsComponent
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'forgot-password',
		component: ForgotPasswordComponent
	},
	{
		path: 'customer-issue-quotation',
		component: CustomerIssueQuotationComponent
	},
	{
		path: 'seller-create-order',
		component: SellerCreateOrderComponent
	},
	{
		path: 'customer-create-order',
		component: CustomerCreateOrderComponent
	},
	{
		path: 'seller-modify-issue-quote',
		component: SellerModifyIssueQuotationComponent
	},
	{
		path: 'seller-modify-requests',
		component: SellerModifyRequestsComponent
	},
	{
		path: 'change-password',
		component: ChangePasswordComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'myprofile',
		component: MyprofileComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'edit-my-profile',
		component: EditMyProfileComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'photographerDashboard',
		component: ConsultantDashboardComponent
	},
	{
		path: 'photographerProfile',
		component: PhotographerProfileComponent
	},
	{
		path: 'photographerEditProfile',
		component: PhotographerChangePasswordComponent
	},
	{
		path: 'change-password-photographer',
		component: PhotographerUpdatePasswordComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'seller-dashboard',
		component: SellerDashboardComponent
	},
	{
		path: 'customer-add-issue-quote',
		component: CustomerAddIssueQuoteComponent
	},
	{
		path: 'seller-add-issue-quote',
		component: SellerAddIssueQuoteComponent
	},
	{
		path: 'seller-password-change',
		component: ChangePasswordProfessionalComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'seller-service-list',
		component: SellerServiceListComponent
	},
	{
		path: 'addService',
		component: SellerAddServicesComponent
	},
	{
		path: 'editService/:id',
		component: SellerEditServicesComponent
	},
	{
		path: 'addProject',
		component: AddProjectComponent
	},
	{
		path: 'order-details',
		component: OrderdetailsComponent
	},
	{
		path: 'seller-profile',
		component: SellerProfileComponent
	},
  {
		path: 'seller-profile-view',
		component: SellerProfileViewComponent
	},
	{
		path: 'seller-edit-profile',
		component: SellerEditProfileComponent
	},
	{
		path: 'services',
		component: ServicesComponent
	},
	{
		path: 'services/:category_id/:sub_category_id',
		component: ServicesComponent
	},
	{
		path: "ServicesDetails/:id",
		component: ServicesDetailsNewComponent
	},
	{
		path: 'seller-product-list',
		component: SellerProductListComponent
	},
	{
		path: 'seller-add-product',
		component: SellerAddProductComponent
	},
	{
		path: 'products',
		component: ProductsComponent
	},
	{
		path: 'products-details/:id',
		component: ProductsDetailsComponent
	},
	{
		path: 'mychat',
		component: MychatComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'mychat/:id',
		component: MychatComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'sellerQuotation',
		component: SellerQuotationComponent
	},
	{
		path: 'sellerQuotationDetails/:quote_id',
		component: SellerQuotationDetailComponent
	},
	{
		path: 'mycart',
		component: MycartComponent
	},
	{
		path: 'photographerRequest',
		component: PhotographerBoughtPackagesComponent,
		canActivate: [UserGuard]
	},
	{
		path: 'mywishlist',
		component: MyWishlistComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'checkout/:total',
		component: CheckoutComponent
	},
	{
		path: 'checkout/:total/:qty/:id',
		component: CheckoutComponent
	},
	{
		path: 'terms-condition',
		component: TermsConditionsComponent
	},
	{
		path: 'privacy-policy',
		component: PrivacyPolicyComponent
	},
	{
		path: 'address',
		component: AddressComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'address-photographer',
		component: PhotographeraddressComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'myorders',
		component: MyOrdersComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'editaddress/:id',
		component: EditAddressComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'view-order-details/:id',
		component: ViewDetailsComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'seller-order-management',
		component: SellerOrderManagementComponent,
		canActivate: [UserGuard],
	},

	{
		path: 'catalogue-interior-detail/:cata_id',
		component: CatalogueDetailComponent,
	},
	{
		path: 'catalogue-interior',
		component: InteriorComponent,
	},
	{
		path: 'seller-refund-management',
		component: SellerRefundManagementComponent,
	},
	{
		path: 'catalogue-exterior',
		component: ExteriorComponent,
	},
	{
		path: 'catalogue-exterior-detail/:id',
		component: ExteriorCatalogueComponent,
	},
	{
		path: 'catalogue-designing',
		component: CatalogueDesigningComponent,
	},
	{
		path: 'catalogue-ImageDetail/:id',
		component: CategoryImageDetailComponent,
	},
	{
		path: 'my-catalogue',
		component: MyCatalogueComponent,
	},
  {
		path: 'seller-catalogue',
		component: SellerCatalogueComponent,
	},
	{
		path: 'add-catalogue/:id',
		component: AddCatalogueComponent,
	},
  {
		path: 'seller-catalogue-view/:id',
		component: SellerCatalogueViewComponent,
	},
	{
		path: 'professionals',
		component: ProfessionalsComponent,

	},
	{
		path: 'my-albums',
		component: MyAlbumsComponent,

	},
	{
		path: 'sellerBranch/:id',
		component: SellerBranchComponent
	},
  // {
	// 	path: 'seller-branch-view/:id',
	// 	component: SellerBranchViewComponent
	// },
	{
		path: 'sellerEditBranch',
		component: SellerEditBranchComponent
	},
	{
		path: 'sellerBranchListing',
		component: SelllerBranchListingComponent
	},
	{
		path: 'photographerBranch/:id',
		component: PhotographerBranchComponent
	},
	{
		path: 'photographerAddBranch',
		component: PhotographerAddBranchComponent
	},
	{
		path: 'photographerBranchListing',
		component: PhotographerBranchListingComponent
	},
	{
		path: 'album-detail/:id',
		component: MyAlbumsDetailComponent
	},
	{
		path: 'sellerGrantPrivilages/:id',
		component: GrantPrivelegeComponent
	},

	{
		path: 'edit-staff/:id',
		component: EditStaffComponent
	},
	{
		path: 'sellerStaffPrivileges',
		component: StaffPrivilegesComponent
	},
	{
		path: 'addCustomerorder',
		component: AddCustomerComponent
	},
	{
		path: 'sellerAddStaffPrivileges',
		component: SellerAddStaffPrivilegesComponent
	},
	{
		path: 'sellerProjectListing',
		component: SellerProjectListingPageComponent
	},
	{
		path: 'viewSellerProjectList/:id',
		component: ViewSingleProjectListComponent
	},
	{
		path: 'sellerProjects',
		component: SellerProjectsComponent
	},
	{
		path: 'seller-service-detail/:id',
		component: SellerServiceDetailComponent
	},
	{
		path: 'my-bookings',
		component: MyBookingsComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'customers-list-orders',
		component: CustomerListComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'add-gifts',
		component: AddGiftComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'my-appointment',
		component: CustomerAppointmentsComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'my-appointment-seller',
		component: SellerBookAppointmentComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'customer-quotation',
		component: CustomerQuotationComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'customer-quotation-management',
		component: CustomerQuotationManagementComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'seller-quotation-management',
		component: SellerQuotationManagementComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'seller-quotation-management-detail',
		component: SellerQuotationManagementDetailComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'customer-quotation-detail/:id',
		component: CustomerQuotationDetailsComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'customer-issue-quotation/:id',
		component: CustomerIssueQuotationComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'seller-issue-quotation',
		component: SellerIssueQuotationComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'issue-gift-card',
		component: IssueGiftComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'professionals-details/:_id',
		component: ProfessionalsDetailsComponent
	},
	{
		path: 'payment-methods',
		component: PaymentMethodsComponent
	},
	{
		path: 'earnings',
		component: EarningsComponent
	},
	{
		path: 'notifications',
		component: NotificationsComponent
	},
	{
		path: 'earning-details/:id',
		component: EarningDetailsComponent
	},
	{
		path: 'wallet',
		component: WalletComponent
	},
	{
		path: 'search',
		component: SearchComponent
	},
	{
		path: 'preview',
		component: PreviewProductComponent
	},
	{
		path: 'customer-account-setting',
		component: CustomerAccountSettingComponent

	},
	{
		path: 'customer-notification',
		component: CustomerNotificationsComponent,
		canActivate: [UserGuard],
	},
	{
		path: 'customer-faq',
		component: CustomerFAQComponent
	},
	{
		path: 'customer-term-and-condition',
		component: CustomerTermAndConditionComponent
	},
	{
		path: 'customer-privacy-policy',
		component: CustomerPrivacyPolicyComponent
	},
	{
		path:'search-results/:searchText',
		component: SearchResultComponent
	},
	// {
	// 	path: '',
	// 	component: SellerDashboardComponent,
	// 	children: [
	// 		{
	// 			path: 'seller-dashboard',
	// 			loadChildren: () => SellerDashboardModule
	// 		},
	// 	]
	// },
	// {
	// 	path: '',
	// 	children: [
	// 	// {
	// 	// 	path: 'photographerDashboard',
	// 	// 	loadChildren: () => ConsultantDashboardModule
	// 	// },
	// 	{
	// 		path: 'photographerProfile',
	// 		loadChildren: () => PhotographerProfileModule
	// 	},
	// 	{
	// 		path: 'photographerEditProfile',
	// 		loadChildren: () => PhotographerChangePasswordModule
	// 	},
	// 	]
	// },

];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
