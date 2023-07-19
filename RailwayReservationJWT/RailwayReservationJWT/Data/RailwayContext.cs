
using RailwayReservationJWT.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace RailwayReservationJWT.Data
{
    public class RailwayContext : IdentityDbContext<IdentityUser>
    {
        public RailwayContext(DbContextOptions<RailwayContext> options) : base(options)
        {
        }

        public DbSet<Admin> admins { get; set; }
        public DbSet<TrainDetail> trainDetails { get; set; }
        public DbSet<Ticket> tickets { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}