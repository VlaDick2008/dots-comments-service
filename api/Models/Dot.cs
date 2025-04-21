using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Dot model.
/// </summary>
public class Dot
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public float X { get; set; }
    public float Y { get; set; }
    public float Radius { get; set; }
    public string Color { get; set; } = "#ffffff";
    public List<Comment> Comments { get; set; } = new List<Comment>();
}
