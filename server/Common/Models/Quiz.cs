namespace Common.Models
{
    public class Quiz
    {
        public int Id { get; set; }
        public string title { get; set; }
        public Question[] questions { get; set; }
    }
}
