using Api.CommentDTOs;
using Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// Сomments controller
/// </summary>
[ApiController]
[Route("api/comments")]
public class CommentsController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public CommentsController(ApplicationDbContext dbContext) => _dbContext = dbContext;

    /// <summary>
    /// Adds a new comment to a specific dot.
    /// </summary>
    /// <param name="dto">The comment data transfer object containing the dot ID, text, and background.</param>
    /// <returns>The created <see cref="Comment"/> if successful, otherwise a <see cref="NotFoundResult"/> if the dot is not found.</returns>
    [HttpPost]
    public async Task<ActionResult<Comment>> AddComment(CommentCreateDto dto)
    {
        var dot = await _dbContext.Dots.FindAsync(dto.DotId);
        if (dot == null)
            return NotFound($"Dot with Id={dto.DotId} not found");

        var comment = new Comment
        {
            DotId = dto.DotId,
            Text = dto.Text,
            Background = dto.Background
        };
        _dbContext.Comments.Add(comment);

        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(null, new { id = comment.Id }, comment);
    }

    /// <summary>
    /// Updates a comment.
    /// </summary>
    /// <param name="id">The id of the comment to update.</param>
    /// <param name="dto">The updated comment.</param>
    /// <returns>A <see cref="NoContentResult"/> if successful, otherwise a <see cref="BadRequestResult"/> or a <see cref="NotFoundResult"/>.</returns>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateComment(int id, CommentUpdateDto dto)
    {
        if (id != dto.Id)
            return BadRequest();
        var comment = await _dbContext.Comments.FindAsync(id);
        if (comment == null)
            return NotFound();

        comment.Text = dto.Text;
        comment.Background = dto.Background;
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }
}
