import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UserdataService } from 'src/app/Services/userdata.service';
@Component({
  selector: 'app-cancelticket',
  templateUrl: './cancelticket.component.html',
  styleUrls: ['./cancelticket.component.css']
})
export class CancelticketComponent {
  bookingArray:any[]=[];
  userId:string="";

  constructor(private auth:AuthService, private userData:UserdataService){}

  ngOnInit(){
    this.userData.getUserIdFromStore().subscribe(val=>{
      let userIdFromToken=this.auth.getUserIdFromToken();
      this.userId=val || userIdFromToken;
    });
    this.getAllTickets();
  }

  getAllBookingsForUser(){
    this.auth.getAllTicketsForUser({userId: this.userId}).subscribe({
      next:(res)=>{
        this.bookingArray=res;
      },
      error:(err)=>{
        this.bookingArray=[];
      }
    });
  }

  cancelBookingClick(id:number){
    Swal.fire({
      title: "Do you want to cancel this booking?",
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.cancelBooking(id).subscribe({
          next:(res)=>{
            Swal.fire({
              title: 'Success!',
              text: "Booking Cancelled Successfully! And Confirmation Email is Sent To Registered Mail ID.",
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.getAllBookingsForUser();
          },
          error:(err)=>{
            Swal.fire({
              title: 'Error!',
              text: "Couldn't Find The Booking You Are Trying To Cancel!",
              icon: 'error',
              confirmButtonText: 'Ok'
            });
            this.getAllBookingsForUser();
          }
        });
      }else if (result.isDenied) {
        Swal.fire('Booking Cancellation aborted!', '', 'info');
      }
    });
  }
}
