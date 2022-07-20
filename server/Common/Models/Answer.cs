namespace Common.Models
{
    public class Answer
    {
        public int id { get; set; }
        public int questionId { get; set; }
        public int sortOrder { get; set; }
        public string text { get; set; }
        public bool isCorrect { get; set; }
    }
}
