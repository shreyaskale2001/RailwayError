using RailwayReservationJWT.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RailwayReservationJWT.ViewModels
{
    public class TicketData
    {
        public int TicketNo { get; set; }
        public string UserName { get; set; }
        [Range(typeof(int), "0", "100", ErrorMessage = "The age must be between 0 and 100.")]
        public int Age { get; set; }
        public string Gender { get; set; }
        public string TicketType { get; set; }
        [Range(1, 6, ErrorMessage = "The Passenger must less than and equal to 6")]
        public int Passenger { get; set; }
        public int TrainNo { get; set; }
        public string UserId { get; set; }
    }
}