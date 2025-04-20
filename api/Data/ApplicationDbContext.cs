using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Dot> Dots { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Dot>()
                .HasMany(d => d.Comments)
                .WithOne(c => c.Dot)
                .HasForeignKey(c => c.DotId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
