using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    /// <summary>
    /// The application's database context.
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        /// <summary>
        /// The collection of dots.
        /// </summary>
        public DbSet<Dot> Dots { get; set; }

        /// <summary>
        /// The collection of comments.
        /// </summary>
        public DbSet<Comment> Comments { get; set; }

        /// <summary>
        /// Initializes a new instance of the ApplicationDbContext class.
        /// </summary>
        /// <param name="options">The DbContextOptions for the application database context.</param>
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        /// <summary>
        /// Configures the model for the application database.
        /// </summary>
        /// <param name="modelBuilder">The model builder to configure.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Dot>()
                .HasMany(d => d.Comments)
                .WithOne(c => c.Dot)
                .HasForeignKey(c => c.DotId)
                .IsRequired();

            modelBuilder.Entity<Dot>().Property(d => d.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Comment>().Property(c => c.Id).ValueGeneratedOnAdd();
        }
    }
}
