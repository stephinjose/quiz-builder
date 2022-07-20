namespace Common.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string text { get; set; }
        public char type { get; set; }
        public Answer[] answers { get; set; }
    }
}
