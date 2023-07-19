using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace RailwayReservationJWT.Models
{
    public class TrainDetail
    {
        [Key]    
        public int TrainNo { get; set; }

        public string TrainName { get; set; }   
        public string ArrivalLocation { get; set; }
        public string DestinationLocation { get; set;}
        public DateTime StartDate { get; set;}
        public float JourneyTime { get; set; }
        public int SeatCount_AC1tire { get; set; }
        public int SeatCount_AC2tire { get; set; }
        public int SeatCount_AC3tire { get; set; }
        public int SeatCount_Slepper { get; set; }
        public int SeatCount_SecoundSetting { get; set; }


    }
}
