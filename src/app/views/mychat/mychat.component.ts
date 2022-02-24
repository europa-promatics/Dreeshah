import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CustomerService } from "src/app/shared/customer.service";
import firebase from "firebase/app";
import "firebase/firestore";
import * as moment from "moment";
import { environment } from "src/environments/environment";
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";

import { Observable } from "rxjs";
import { lookup } from "dns";
import { fileURLToPath } from "url";

import "firebase/storage";

@Component({
  selector: "app-mychat",
  templateUrl: "./mychat.component.html",
  styleUrls: ["./mychat.component.scss"],
})
export class MychatComponent implements OnInit,AfterViewChecked {
  isLogin
  isLoginData
  id: any;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  imageChangedEvent: any = '';
  magForm: FormGroup;
  services_list;
  db;
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  myId;
  userData: any;
  roomData;
  messageChatArr = [];
  messageToSend = "";
  availableUser=[];
  receiver;
  urlsProfilePic=[]
  docs=[];
  uploadprogress=0;

  firebaseStorage;
  firebaseData: any[]=[];
  chatRooms:any[]=[];
  messages: any[]=[];
  receiverData: any;
  reqdProffId: any;
  prfUser: any;
  imagePath: any;
  constructor(
    private route: ActivatedRoute,
    public CustomerService: CustomerService,
    public _formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
 
        
  }
 
  
  ngOnInit(): void {
    this.messages=[]
    this.reqdProffId=this.route.snapshot.paramMap.get('id')
    this.imagePath=environment.profileUrl
    console.log("reqd id is============>",this.reqdProffId);
    
    this.isLoginData = localStorage["userData"] != null ? JSON.parse(localStorage["userData"]) : null;
    console.log("sdjhsjfhdshjdhsfdf====",this.isLoginData);
    
    
    this.prfUser = localStorage["PROFESSIONAL_DATA"] != null ? JSON.parse(localStorage["PROFESSIONAL_DATA"]) : null;
    console.log("professional user=========",this.prfUser);
    localStorage.removeItem("PROFESSIONAL_DATA")
    this.scrollToBottom();
    this.createForm()
    this.initFireBase();
    
    
    if(this.prfUser!=null){
      let newReceiver={
        _id : this.prfUser._id,
        name : this.prfUser.first_name,
        profileImg : environment.profileUrl+this.prfUser.profile_image,
        type : this.prfUser.user_type,
        email : this.prfUser.email,
        message : []
      }
      if(newReceiver._id!=null){
        setTimeout(()=>{
          this.selectReceiver(newReceiver._id,newReceiver)
        },2000)
      }
   }

  //  let User = localStorage["user_Data"] != null ? JSON.parse(localStorage["user_Data"]) : null;
  //   console.log(" user=========",User);
    
  //   if(User!=null){
  //     let newReceiver={
  //       _id : User._id,
  //       name : User.first_name,
  //       profileImg : environment.profileUrl+User.profile_image,
  //       type : User.user_type,
  //       email : User.email,
  //       message : []
  //     }
  //     if(newReceiver._id!=null){
  //       this.selectReceiver(newReceiver._id,newReceiver)
  //     }
  //  }

   
   setTimeout(()=>{
     var reqdroom=this.firebaseData.find(data=>data.receiver_id==this.reqdProffId)
     console.log("reqd rooom is========>",reqdroom);
     if(!reqdroom){
     this.createRoomId()
    }
   },2000)
   //this.createRoomId()
   console.log("available user============>",this.availableUser);
   
  }
  get loggedInUser(){
    let user = localStorage["userData"] != null ? JSON.parse(localStorage["userData"]) : null;
   console.log("userData=========",user);
    
    return {
      _id:user._id,
      name:user.first_name,
      profileImg:environment.profileUrl+user.profile_image,
      type:user.user_type,
      email:user.email
    }
  }
  get receiverUser(){
    console.log("aaaaaaaaaaaaa",this.receiver);

    return {
      
      _id:this.receiver._id,
      name:this.receiver.name,
      profileImg:this.receiver.profileImg,
      type:this.receiver.type,
      email:this.receiver.email
    }
  }
  
  initFireBase(){
    this.firebaseStorage = firebase.storage().ref();
    
    this.db = firebase.firestore();
    this.db.collection("Chat").where('room_id','!=', null).orderBy("room_id").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) =>{
        let data = change.doc.data(); 
       this.availableUser.push(data.receiver_id)  
        console.log("firebase Data============",data);
             
             
          if (data?.receiver_id == this.loggedInUser?._id) {
            this.onMessage({type:'R',data:data});
          }
          if (data?.sender_id == this.loggedInUser?._id) {
            this.onMessage({type:'S',data:data});
          }
          if(data?.sender_id==this.isLoginData?._id || data?.receiver_id==this.isLoginData._id)
          this.firebaseData.push(data)
      });
    });
    // if(this.firebaseData.length>0){
    //   this.chatRooms=this.firebaseData.filter(message=>message!=null)
    // }
    // for(let i=0;i<this.firebaseData.length;i++){
    //   if(this.firebaseData[i].room_id)
    //   this.chatRooms.push(this.firebaseData[i])
    // }
    console.log("MESSAGE============>",this.firebaseData);
  
    
    // console.log("chats with room iddddd======>",this.chatRooms  );
    
  }
  onMessage(msg){
    this.scrollToBottom();
    if(msg.type=='R'){
      console.log("this.availableUser==========",this.availableUser);
     
      let tmp =  this.availableUser.find(i=>i==msg.data.sender_id);
      console.log("tmppppppppppp",tmp);

      if(!tmp){
        //msg.data.sender['message']=[];
        //this.availableUser.push(msg.data.sender);
        console.log("available User========",this.availableUser);

      }
    }
    if(msg.type=='S'){
      let tmp =  this.availableUser.find(i=>i==msg.data.receiver_id);
      console.log("tmppppppppppp",tmp);
      
      if(!tmp){
        // msg.data.receiver['message']=[];
        //this.availableUser.push(msg.data.receiver);
        console.log("available User========",this.availableUser);
        
      }
    }
      
    
    // for(let i=0; i<this.availableUser.length;i++){
    //   if(this.availableUser[i]==msg.data.sender_id || this.availableUser[i]==msg.data.receiver_id){
    //     msg.data.displayTime = moment(msg.data.created_At).format("h:mm a");
    //     msg.data.displayDate = this.getDisplayDate(msg,i)
    //     this.availableUser[i].message.push(msg);
    //   }
    // }
    console.log("available user============>",this.availableUser);
  }
  getDisplayDate(msg,i){
    let displayDate = "";
    if(this.availableUser[i].message.length==0){
      displayDate = moment(msg.data.created_At).format("MMMM Do YYYY");
    }else{
      let lastMsg = this.availableUser[i].message.at(-1);
      let oldDay = moment(lastMsg.data.created_At).format("DD");
      let currday = moment(msg.data.created_At).format("DD");
      console.log("====",oldDay,currday);
      
      if(oldDay!=currday){
        displayDate = moment(msg.data.created_At).format("MMMM Do YYYY")
      }
    }
    return displayDate;
  }
  sendMsg(msg,type) {
    // console.log(this.db.collection("Chat").doc(this.re).collection("messages"));
    console.log("dfgsadgvaedsgfveadgfv",this.roomData?._id);
    if(this.isLoginData.user_type=="customer"){
    let message = {
      created_At: new Date(),
      updated_At: new Date(),
      room_id:this.receiverData.room_id,
      message_type: type,
      message:  msg,
      sender_id: this.loggedInUser._id,
      receiver_id: this.receiverData.receiver_id,
      sender_name:this.isLoginData.first_name,
      receiver_name:this.receiverData.receiver_name
    };
    this.db.collection("Chat").doc(this.receiverData?.room_id).collection("messages").add(message);
    this.messageToSend="";
    this.scrollToBottom();
    console.log("available user============>",this.availableUser);
  }
  if(this.isLoginData.user_type=="professional"){
    let message = {
      created_At: new Date(),
      updated_At: new Date(),
      room_id:this.receiverData.room_id,
      message_type: type,
      message:  msg,
      sender_id: this.loggedInUser._id,
      receiver_id: this.receiverData.sender_id,
      sender_name:this.isLoginData.first_name,
      receiver_name:this.receiverData.sender_name
      
    };
    this.db.collection("Chat").doc(this.receiverData.room_id).collection("messages").add(message);
    this.messageToSend="";
    this.scrollToBottom();
    console.log("available user============>",this.availableUser);
  }
  
  }
  selectReceiver(id,newReceiver?){
    this.messages=[]
    if(this.reqdProffId){

       console.log(this.reqdProffId,"firebase data for receiver",this.firebaseData);
      
       this.receiverData=this.firebaseData.find(name =>name.receiver_id==this.reqdProffId)
       console.log("receiverdatais===================>",this.receiverData);
      
    }
    
    
    console.log("room data",id);
    if(!this.reqdProffId){
    this.receiverData=id
  }
    this.db.collection("Chat").doc(this.receiverData?.room_id?this.receiverData?.room_id:this.roomData?._id).collection("messages").orderBy("created_At").onSnapshot((snapshot)=>{
      snapshot.docChanges().forEach((change) =>{
        let data = change.doc.data();
        this.messages.push(data)
      })
    })
    console.log("messages are====>",this.messages);
    this.receiver = this.availableUser.find(i=>i==id.receiver_id);
    console.log("receiver is====>",this.receiver);
     this.reqdProffId=null
    if(newReceiver && !this.receiver){
      // this.availableUser.push(newReceiver);
      this.receiver = newReceiver;
    }
    console.log("available user============>",this.availableUser);
  }
  createForm(){
this.magForm=this._formBuilder.group({
  messageToSend: [''],

})
  }

  submit(){
    this.sendMsg(this.messageToSend,"text");
    this.messageToSend="";

  }

  createRoomId() {
    console.log("receiverData is===>",this.receiver);
    
    let obj = {
      sender_id: this.loggedInUser._id,
      receiver_id: this.prfUser?._id,
    };
    
      this.CustomerService.createRoomId(obj).subscribe((data) => {
        console.log("createRoom====>>>>>>", data.data);
        this.roomData = data.data;
        var room={
          created_At:new Date(),
          updated_At:new Date(),
          room_id:data.data._id,
          sender_id:data.data.sender_id._id,
          sender_name:data.data.sender_id.first_name,
          sender_type:"customer",
          receiver_id:data.data.receiver_id._id,
          receiver_name:data.data.receiver_id.first_name,
          receiver_type:"professional",
          sender_image:this.imagePath+this.isLoginData?.profile_image,
          receiver_image:this.imagePath+this.prfUser?.profile_image,
          isSenderOnline:true,
          isReceiverOnline:false,
          receiverUnreadCount:0,
          senderUnreadeCount:0,
          message_type:"",
          recent_message:"",
          receiver_typing:false,
          sender_typing:false
        }
        this.db.collection("Chat").add(room)
      });
      // var room={
      //   created_At:new Date(),
      //   updated_At:new Date(),
      //   room_id:this.roomData._id,
      //   sender_id:this.roomData.sender_id._id,
      //   sender_name:this.roomData.sender_id.first_name,
      //   sender_type:"customer",
      //   receiver_id:this.roomData.receiver_id._id,
      //   receiver_name:this.roomData.receiver_id.first_name,
      //   receiver_type:"professional",
      //   sender_image:this.imagePath+this.userData.profile_image,
      //   receiver_image:this.imagePath+this.prfUser.profile_image,
      //   isSenderOnline:true,
      //   isReceiverOnline:false,
      //   receiverUnreadCount:0,
      //   senderUnreadeCount:0,
      //   message_type:"",
      //   recent_message:"",
      //   receiver_typing:false,
      //   sender_typing:false
      // }
      // this.db.collection("Chat").add(room)
   
  }
  //image fundraiser
  onSelectFile(event) {
    let fileObj = event.target.files[0];
    let ext = fileObj.name.split('.').pop();
    let random = Math.floor(Math.random() * 100);
    let fileType="";
    
    if(fileObj.type.startsWith('image')){
      fileType = "image"
    }else if(fileObj.type.startsWith('video')){
      fileType = "video"
    }else{
      this.toastrService.error("Please select image/video files");
      return false;
    }
    let name = fileType+"/"+Date.now()+random+'.'+ext;
    let imagesRef = this.firebaseStorage.child(name);
    let uploadTask =  imagesRef.put(fileObj);
    uploadTask.on('state_changed', (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.uploadprogress = Math.ceil(progress)
      }, 
      (error) => {
        this.toastrService.error("Unable to upload files");
        this.uploadprogress=0;
      }, 
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.sendMsg(downloadURL,fileType);
          this.uploadprogress=0;
        });
      }
    );
      
}

ngAfterViewChecked() {        
  this.scrollToBottom();        
} 

scrollToBottom(): void {
  try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  } catch(err) { }                 
}


}
