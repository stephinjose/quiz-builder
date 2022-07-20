namespace Common.Models
{
    public class ValidationResults
    {
        public bool Success { get; set; }
        public List<string> Errors { get; set; }
        public string PermaLink { get; set; }
    }
}
