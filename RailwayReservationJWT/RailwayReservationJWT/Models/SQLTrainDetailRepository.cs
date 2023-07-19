using RailwayReservationJWT.Data;
using RailwayReservationJWT.Models;



namespace FlightBookingSystemV5.Models
{
    public class SQLJourneyDetailRepository : ITrainDetailRepository
    {
        private readonly RailwayContext _context;
        public SQLJourneyDetailRepository(RailwayContext context)
        {
            this._context = context;
        }
        public TrainDetail Get(int id)
        {
            return (_context.trainDetails.FirstOrDefault(u => u.TrainNo == id));
        }
        public List<TrainDetail> GetAll()
        {
            return (_context.trainDetails.ToList());
        }
        public TrainDetail Delete(int id)
        {
            TrainDetail train = _context.trainDetails.FirstOrDefault(u => u.TrainNo == id);
            if (train != null)
            {
                _context.trainDetails.Remove(train);
                _context.SaveChanges();
            }
            return train;
        }
        public void Add(TrainDetail journeyDetail)
        {
            _context.trainDetails.Add(journeyDetail);
            _context.SaveChanges();
        }
        public  TrainDetail Update(int id, TrainDetail train)
        {
            TrainDetail train1 = _context.trainDetails.FirstOrDefault();
            if (train1 != null)
            {
                train1 = train;
                _context.SaveChanges();
            }
            return train1;
        }
    }
}