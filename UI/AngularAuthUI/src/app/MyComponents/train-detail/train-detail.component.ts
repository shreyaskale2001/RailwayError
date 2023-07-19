import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UserdataService } from 'src/app/Services/userdata.service';
@Component({
  selector: 'app-train-detail',
  templateUrl: './train-detail.component.html',
  styleUrls: ['./train-detail.component.css']
})
export class TrainDetailComponent {

  journeyIdN!:number;

  trainNo!:string;
  trainName!: string;
  arrivalLocation!: string;
  destinationLocation!: string;
  startDate!: Date;
  journeyTime!: number;
  seatCount_AC1tire!: number;
  seatCount_AC2tire!: number;
  seatCount_AC3tire!: number;
  seatCount_Slepper!: number;
  seatCount_SecoundSetting!: number;

  trainData:any;

  currentDate:string = new Date().toISOString().slice(0,16);


  resultArray!:any;
  constructor(private auth:AuthService, private userData:UserdataService){}

  GetAllTrains(){
    this.auth.GetAllTrains().subscribe({
      next:(res)=>{
        this.resultArray=res;
      },
      error:(err)=>{alert(err?.error.message);
      }
    });
  }

  ngOnInit(){

    this.GetAllTrains();
  }

  deleteTrain(id:number){

      if (confirm("Do you want to delete")) {
        this.auth.deleteTrain(id).subscribe({
          next:(res)=>{
            alert('Deleted successfully!')
            this.GetAllTrains();
          },
          error:(err)=>{
            alert(err?.error.message);

          }
        });
      } else
      {
        alert('Deletetion Cancelled!');
      }

  }

  editTrainClicked(id:number){
    this.auth.getTrainById(id).subscribe({
      next:(res)=>{
        this.trainData=res;
        this.journeyIdN=this.trainData.journeyId;
        this.trainNo = this.trainData.trainNo;
        this.trainName=this.trainData.trainName;
        this.arrivalLocation =this.trainData.arrivalLocation;
        this.destinationLocation =this.trainData.destinationLocation;
        this.startDate =this.trainData.startDate;
        this.journeyTime =this.trainData.journeyTime;
        this.seatCount_AC1tire =this.trainData.seatCount_AC1tire;
        this.seatCount_AC2tire =this.trainData.seatCount_AC2tire;
        this.seatCount_AC3tire =this.trainData.seatCount_AC3tire;
        this.seatCount_Slepper =this.trainData.seatCount_Slepper;
        this.seatCount_SecoundSetting =this.trainData.seatCount_SecoundSetting;
      },
      error:(err)=>{
        alert("Error!");
      }
    });
  }

  editTrain(){
    if(this.trainNo == null ||
      this.trainName==null ||
      this.arrivalLocation == null ||
      this.destinationLocation == null ||
      this.startDate == null ||
      this.journeyTime == null ||
      this.seatCount_AC1tire == null ||
      this.seatCount_AC2tire == null ||
      this.seatCount_AC3tire == null ||
      this.seatCount_AC3tire == null ||
      this.seatCount_SecoundSetting == null ||
      this.seatCount_Slepper  == null ||
      this.trainNo=="" ||
      this.arrivalLocation=="" ||
      this.destinationLocation==""){
        alert("Error!");
      }
      else{
        this.auth.updateTrain({
          journeyId:this.journeyIdN,
          trainNo:this.trainNo,
          trainName:this.trainName,
          arrivalLocation:this.arrivalLocation,
          destinationLocation:this.destinationLocation,
          startDate:this.startDate,
          journeyTime:this.journeyTime,
          seatCount_AC1tire:this.seatCount_AC1tire,
          seatCount_AC2tire:this.seatCount_AC2tire,
          seatCount_AC3tire:this.seatCount_AC3tire,
          seatCount_Slepper:this.seatCount_Slepper,
          seatCount_SecoundSetting:this.seatCount_SecoundSetting
        }).subscribe({
          next:(res)=>{
            alert("Update Train Detail Successfully!");
            document.getElementById("updateTrainModalClose")?.click();
            this.trainNo = "";
            this.trainName == null;
            this.arrivalLocation = "";
            this.destinationLocation = "";
            this.startDate = new Date();
            this.journeyTime = 0;
            this.seatCount_AC1tire = 0;
            this.seatCount_AC2tire = 0;
            this.seatCount_AC3tire = 0;
            this.seatCount_Slepper = 0;
            this.seatCount_SecoundSetting = 0;
            this.GetAllTrains();
          },
          error:(err)=>{
            alert("Error!");
          }
        });
      }
  }

  addTrain(){
    // alert("Called");
    if(
      this.trainName==null ||
      this.arrivalLocation == null ||
      this.destinationLocation == null ||
      this.startDate == null ||
      this.journeyTime == null ||
      this.seatCount_AC1tire == null ||
      this.seatCount_AC2tire == null ||
      this.seatCount_AC3tire == null ||
      this.seatCount_Slepper == null ||
      this.seatCount_SecoundSetting == null ||
      this.trainNo=="" ||
      this.arrivalLocation=="" ||
      this.destinationLocation==""){
        alert("Error!");
        alert("message");
      }
      else{
        this.auth.addTrain({
          // trainNo:this.trainNo,
          trainName:this.trainName,
          arrivalLocation:this.arrivalLocation,
          destinationLocation:this.destinationLocation,
          startDate:this.startDate,
          journeyTime:this.journeyTime,
          seatCount_AC1tire:this.seatCount_AC1tire,
          seatCount_AC2tire:this.seatCount_AC2tire,
          seatCount_AC3tire:this.seatCount_AC3tire,
          seatCount_Slepper:this.seatCount_Slepper,
          seatCount_SecoundSetting:this.seatCount_SecoundSetting


        }).subscribe({
          next:(res)=>{
            alert("Detail added Successfully!");
            document.getElementById("addTrainModalClose")?.click();

            // this.trainNo = "";
            this.trainName == "";
            this.arrivalLocation = "";
            this.destinationLocation = "";
            this.startDate = new Date();
            this.journeyTime = 0;
            this.seatCount_AC1tire = 0;
            this.seatCount_AC2tire = 0;
            this.seatCount_AC3tire = 0;
            this.seatCount_Slepper = 0;
            this.seatCount_SecoundSetting = 0;
            this.GetAllTrains();
          },
          error:(err)=>{
            alert("Error!");

          }
        });
      }
  }
}
