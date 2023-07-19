namespace RailwayReservationJWT.Models
{
    public interface ITrainDetailRepository
    {
        public TrainDetail Get(int id);
        public List<TrainDetail> GetAll();
        public TrainDetail Delete(int id);
        public void Add(TrainDetail journeyDetail);
        public TrainDetail Update(int id, TrainDetail journeyDetail);
    }
}