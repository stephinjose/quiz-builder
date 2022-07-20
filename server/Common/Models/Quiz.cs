namespace Common.Models
{
    public class Quiz
    {
        public int id { get; set; }
        public string title { get; set; }
        public string permalink { get; set; }
        public Question[] questions { get; set; }
    }
}
