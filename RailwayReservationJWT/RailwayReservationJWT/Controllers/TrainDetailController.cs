using RailwayReservationJWT.Data;
using RailwayReservationJWT.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RailwayReservationJWT.ViewModels;

namespace RailwayReservationJWT.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class TrainDetailController : Controller
    {
        private readonly RailwayContext context;
        public TrainDetailController(RailwayContext context)
        {
            this.context = context;
        }
        [Route("GetAllTrains")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrainDetail>>> GetTrainDetail()
        {
            if (context.trainDetails == null)
            {
                return NotFound();
            }
            return await context.trainDetails.ToListAsync();
        }
        [HttpGet("id")]
        public async Task<ActionResult<TrainDetail>> GetTrainDetail(int id )
        {
            if (context.trainDetails == null)
            {
                return NotFound();
            }
            var train = await context.trainDetails.FindAsync(id);
            if (train == null)
            {
                return NotFound();
            }
            return train;
        }

        [HttpPost]
        public async Task<ActionResult<TrainDetail>> PostTrainDetail(TrainDetail train
            )
        {
            context.trainDetails.Add(train);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTrainDetail), new { id = train.TrainNo }, train);
        }
        [HttpPut]
        public async Task<IActionResult> PuTrainDetail(TrainDetail train)
        {
            //if (id != train.TrainNo)
            //{
            //    return BadRequest();
            //}
            context.Entry(train).State = EntityState.Modified;
            try
            {
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

            }
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrainDetail(int id)
        {
            if (context.trainDetails == null)
            {
                return NotFound();
            }
            var train = await context.trainDetails.FindAsync(id);
            if (train == null)
            {
                return NotFound();
            }
            context.trainDetails.Remove(train);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}