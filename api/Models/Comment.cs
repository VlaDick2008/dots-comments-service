using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

/// <summary>
/// Comment model.
/// </summary>
public class Comment
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [ForeignKey(nameof(Dot))]
    public int DotId { get; set; }
    public string Text { get; set; } = string.Empty;
    public string Background { get; set; } = string.Empty;

    /// <summary>
    /// Navigation property
    /// </summary>
    [JsonIgnore]
    public Dot Dot { get; set; } = null!;
}
