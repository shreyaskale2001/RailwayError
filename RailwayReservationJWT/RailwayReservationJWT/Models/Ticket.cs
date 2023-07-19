using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace RailwayReservationJWT.Models
{
    public class Ticket
    {
        [Key]
        public int TicketNo { get; set; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(50)]
        [Required(AllowEmptyStrings = false, ErrorMessage = "User's Name is Required")]
        public string UserName { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "User's Age is Required")]
        [Range(typeof(int), "0", "100", ErrorMessage = "The age must be between 0 and 100.")]
        public int Age { get; set; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(10)]
        [Required(AllowEmptyStrings = false, ErrorMessage = "User's Gender is Required")]
        public string Gender { get; set; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(10)]
        public string SeatNo { get; set; }
        [Column(TypeName = "NVARCHAR")]
        [StringLength(450)]

        [Range(typeof(int), "0", "100", ErrorMessage = "The age must be between 0 and 100.")]
        public int Passenger { get; set; }
        [Column(TypeName = "INT")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Enter no of passenger")]
        public int TrainNo { get; set; }
        [Column(TypeName = "INT")]
        [ForeignKey("TrainNo")]

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public IdentityUser User { get; set; }

        public TrainDetail TrainDetail { get; set; }
    }
}