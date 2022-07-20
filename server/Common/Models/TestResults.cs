namespace Common.Models
{
    public class TestResults
    {
        public QuestionResult[] results { get; set; }
    }

    public class QuestionResult
    {
        public int Id { get; set; }
        public bool IsRight { get; set; }
    }
}
