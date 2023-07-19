using RailwayReservationJWT.Models;

namespace RailwayReservationJWT.Models
{
    public interface ITicketRepository
    {
        public Ticket Get(int id);
        public List<Ticket> GetAll();
        public Ticket Delete(int id);
        public void Add(Ticket bookingDetail);
        public Ticket Update(int id, Ticket bookingDetail);
    }
}