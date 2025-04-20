public class Comment
{
    public int Id { get; set; }
    public int DotId { get; set; }
    public string Text { get; set; }
    public string Background { get; set; }

    public Dot Dot { get; set; }
}
