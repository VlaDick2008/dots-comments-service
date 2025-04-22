using Api.Data;
using Api.DotDTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// Dots controller
/// </summary>
[ApiController]
[Route("api/dots")]
public class DotsController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public DotsController(ApplicationDbContext dbContext) => _dbContext = dbContext;

    /// <summary>
    /// Gets all dots, including their comments.
    /// </summary>
    /// <returns>The list of dots.</returns>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Dot>>> GetDots() =>
        await _dbContext.Dots.Include(d => d.Comments).ToListAsync();

    /// <summary>
    /// Adds a new dot.
    /// </summary>
    /// <param name="dto">The dot data transfer object containing the dot's properties.</param>
    /// <returns>The created <see cref="Dot"/> if successful, otherwise a <see cref="NotFoundResult"/>.</returns>
    [HttpPost]
    public async Task<ActionResult<Dot>> AddDot(DotCreateDto dto)
    {
        var dot = new Dot
        {
            X = dto.X,
            Y = dto.Y,
            Radius = dto.Radius,
            Color = dto.Color,
        };
        _dbContext.Dots.Add(dot);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetDots), new { id = dot.Id }, dot);
    }

    /// <summary>
    /// Deletes a dot.
    /// </summary>
    /// <param name="id">The id of the dot to delete.</param>
    /// <returns>A <see cref="NoContentResult"/> if successful, otherwise a <see cref="NotFoundResult"/>.</returns>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDot(int id)
    {
        var dot = await _dbContext.Dots.FindAsync(id);
        if (dot == null)
        {
            return NotFound();
        }

        _dbContext.Dots.Remove(dot);

        try
        {
            await _dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            return NotFound();
        }

        return NoContent();
    }

    /// <summary>
    /// Updates a dot.
    /// </summary>
    /// <param name="id">The id of the dot to update.</param>
    /// <param name="dto">The updated dot.</param>
    /// <returns>A <see cref="NoContentResult"/> if successful, otherwise a <see cref="BadRequestResult"/> or a <see cref="NotFoundResult"/>.</returns>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDot(int id, DotUpdateDto dto)
    {
        if (id != dto.Id)
            return BadRequest("Dot id mismatch");

        var dot = await _dbContext.Dots.FindAsync(id);
        if (dot == null)
            return NotFound();

        dot.X = dto.X;
        dot.Y = dto.Y;
        dot.Radius = dto.Radius;
        dot.Color = dto.Color;

        await _dbContext.SaveChangesAsync();
        return NoContent();
    }
}
