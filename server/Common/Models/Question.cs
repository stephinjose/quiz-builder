namespace Common.Models
{
    public class Question
    {
        public int id { get; set; }
        public string text { get; set; }
        public char type { get; set; }
        public int sortOrder { get; set; }
        public Answer[] answers { get; set; }
    }
}
