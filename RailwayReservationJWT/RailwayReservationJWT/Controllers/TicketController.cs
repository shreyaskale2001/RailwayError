
using RailwayReservationJWT.Data;
using RailwayReservationJWT.Models;
using RailwayReservationJWT.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using User.Management.Service.Services;
using User.Management.Service.Model;
using System;
using static Org.BouncyCastle.Asn1.Cmp.Challenge;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Text.Json;

namespace RailwayReservationJWT.Controllers
{
    [Authorize(Roles = "User")]
    [ApiController]
    [Route("api/[controller]")]

    public class TicketController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RailwayContext context;
        private readonly IEmailService _emailService;
        //private object resultList;

        public TicketController(UserManager<IdentityUser> userManager, RailwayContext context, IEmailService emailService)
        {
            this._userManager = userManager;
            this.context = context;
            _emailService = emailService;

        }
        [HttpPost]
        //[Route("Booking")]
        public async Task<IActionResult> Booking(List<TicketData> ticketList)
        {

            var resultList = new List<TicketResult>();
            string messageStr = "Your booking is succesfully done!\n";
            foreach (var ticketData in ticketList)
            {
                int TId = ticketData.TrainNo;
                TrainDetail trainDetail = context.trainDetails.FirstOrDefault(id => id.TrainNo == TId);
                Ticket ticket = new Ticket();
                ticket.UserName = ticketData.UserName;
                ticket.Age = ticketData.Age;
                ticket.Gender = ticketData.Gender;
                ticket.TrainNo = TId;
                ticket.UserId = ticketData.UserId;
                ticket.Passenger = ticketData.Passenger;

           

                if (ticketData.TicketType == "SL" && trainDetail.SeatCount_Slepper > 0)
                {
                    ticket.SeatNo = "SL" + (trainDetail.SeatCount_Slepper - trainDetail.SeatCount_Slepper + 1);
                    trainDetail.SeatCount_Slepper -= ticketData.Passenger;
                }
                else if (ticketData.TicketType == "AC1" && trainDetail.SeatCount_AC1tire > 0)
                {
                    ticket.SeatNo = "AC1" + (trainDetail.SeatCount_AC1tire - trainDetail.SeatCount_AC1tire + 1);
                    trainDetail.SeatCount_AC1tire -= ticketData.Passenger;
                }
                else if (ticketData.TicketType == "AC2" && trainDetail.SeatCount_AC2tire > 0)
                {
                    ticket.SeatNo = "AC2" + (trainDetail.SeatCount_AC2tire - trainDetail.SeatCount_AC2tire + 1);
                    trainDetail.SeatCount_AC2tire -= ticketData.Passenger;
                }
                else if (ticketData.TicketType == "AC3" && trainDetail.SeatCount_AC3tire > 0)
                {
                    ticket.SeatNo = "AC3" + (trainDetail.SeatCount_AC3tire - trainDetail.SeatCount_AC3tire + 1);
                    trainDetail.SeatCount_AC3tire -= ticketData.Passenger;
                }
                else
                {
                    ticket.SeatNo = "G" + (trainDetail.SeatCount_SecoundSetting - trainDetail.SeatCount_SecoundSetting + 1);
                    trainDetail.SeatCount_SecoundSetting -= ticketData.Passenger;
                }

                context.tickets.Add(ticket);
                context.SaveChanges();

                if (ticket.TicketNo != 0)
                {
                    var message = new Message(new string[] { "shreyaskale.ssk@gmail.com" }, "Booking confirmation",
                        "Your booking is succesfully done!\nBooking ID: " + ticket.TicketNo +
                        "\nUser Name. " + ticket.UserName +
                        "\nJourney from: " + trainDetail.ArrivalLocation +
                        "\nJourney to: " + trainDetail.DestinationLocation +
                        "\nJourney time: " + trainDetail.JourneyTime +
                        "\nJourney Date :" + trainDetail.StartDate +
                        "\nTrain name: " + trainDetail.TrainName +
                        "\nTicket Type :" + ticketData.TicketType +
                        "\nNo of Passenger :" + ticketData.Passenger

                        );

                    _emailService.SendEmail(message);

                    return Ok(new
                    {
                        status = "success",
                        message = "booking successfull",
                        
                    });
                }
            }
                    return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Unable to book the ticket", Message = "Please try again!" });
                }





        //[HttpPost]
        //[Route("Bookings")]
        //public async Task<ActionResult<IEnumerable<Ticket>>> Bookings(UserModel userModel)
        //{
        //    List<Ticket> bookingDetails = context.tickets.Where(bd => bd.UserId == userModel.UserId).ToList();
        //    List<BookingDetailForUser> bookingDetailForUserList = new List<BookingDetailForUser>();
        //    foreach (BookingDetail bookingDetail in bookingDetails)
        //    {
        //        int sJId = bookingDetail.BookingDetailJourneyId;
        //        JourneyDetail journeyDetail = context.JourneyDetails.FirstOrDefault(jd => jd.JourneyId == sJId);
        //        bookingDetailForUserList.Add(new BookingDetailForUser()
        //        {
        //            BookingId = bookingDetail.BookingId,
        //            UserName = bookingDetail.UserName,
        //            Age = bookingDetail.Age,
        //            Gender = bookingDetail.Gender,
        //            SeatNo = bookingDetail.SeatNo,
        //            StartLoc = journeyDetail.StartLoc,
        //            EndLoc = journeyDetail.EndLoc,
        //            StartTime = journeyDetail.StartTime,
        //            AirlineName = journeyDetail.AirlineName
        //        });
        //    }
        //    if (bookingDetailForUserList.Count > 0)
        //    {
        //        return Ok(bookingDetailForUserList);
        //    }
        //    return NotFound("You Have Not Done Any Bookings Yet!");
        //}

        //[HttpGet]
        //public async Task<ActionResult> TicketDetail(cancelticket canceltickets)
        //{
        //    List<Ticket> res = context.tickets.Where(
        //               bd => bd.TicketNo == canceltickets.TicketNo && bd.UserName == canceltickets.UserName).ToList();
        //    if (res.Count > 0)
        //    {
        //        var json = JsonSerializer.Serialize(res);
        //        return Ok(res);
        //    }
        //    return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Ticket not available", Message = "Sorry, Ticket is not avaiable!" });

        //}


        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelTicket(string id, TicketData ticketData)
        {
            var ticket = await context.tickets.FindAsync(id);
            if (ticket == null)
            {
                return BadRequest();
            }
            int tId = ticket.TrainNo;
            TrainDetail trainDetail = context.trainDetails.FirstOrDefault(bd => bd.TrainNo == tId);
            string seatNo = ticket.SeatNo;
            if (seatNo == "SL1")
            {
                trainDetail.SeatCount_Slepper = trainDetail.SeatCount_Slepper + ticketData.Passenger;
                
            }
            else if (seatNo == "AC11")
            {
                trainDetail.SeatCount_Slepper = trainDetail.SeatCount_Slepper + ticketData.Passenger;

            }
            else if (seatNo == "AC21")
            {
                trainDetail.SeatCount_Slepper = trainDetail.SeatCount_Slepper + ticketData.Passenger;

            }
            if (seatNo == "AC31")
            {
                trainDetail.SeatCount_Slepper = trainDetail.SeatCount_Slepper + ticketData.Passenger;
            }
            if (seatNo == "G1")
            {
                trainDetail.SeatCount_Slepper = trainDetail.SeatCount_Slepper + ticketData.Passenger;
            }
            context.tickets.Remove(ticket);
            await context.SaveChangesAsync();
            //string messageStr = "Your booking is cancelled succesfully for:\n" +
            //            "\nBooking ID: " + bookingDetail.BookingId +
            //            "\nPassenger name: " + bookingDetail.UserName +
            //            "\nSeat no. " + bookingDetail.SeatNo +
            //            "\nJourney from: " + journeyDetail.StartLoc +
            //            "\nJourney to: " + journeyDetail.EndLoc +
            //            "\nJourney date: " + journeyDetail.StartTime +
            //            "\nAirline name: " + journeyDetail.AirlineName + "\n";
            //var message = new Message(new string[] { "harshdod.itse@gmail.com" }, "Booking cancellation", messageStr);
            //_emailService.SendEmail(message);
            return Ok();
        }

    }
    }

