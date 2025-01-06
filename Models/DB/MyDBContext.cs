using Microsoft.EntityFrameworkCore;

namespace KShoppeMVC.Models.DB
{
    public class MyDBContext : DbContext
    {
        public MyDBContext()
        {
        }
        public MyDBContext(DbContextOptions<MyDBContext> options) 
        : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            optionsBuilder.UseSqlServer("Server=tcp:jtcuyugan.database.windows.net,1433;Initial Catalog=kshoppe;Persist Security Info=False;User ID=jtcuyugan;Password=Jm!081602;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
            entity.ToTable("product");

            entity.Property(e => e.Id)
            .HasColumnName("id")
            .HasColumnType("int");

            entity.Property(e => e.Name)
            .HasColumnName("name")
            .HasMaxLength(255)
            .IsUnicode(false);

            entity.Property(e => e.Artist)
            .HasColumnName("artist")
            .HasMaxLength(255)
            .IsUnicode(false);

            entity.Property(e => e.Category)
            .HasColumnName("category")
            .HasMaxLength(255)
            .IsUnicode(false);

            entity.Property(e => e.Price)
            .HasColumnName("price")
            .HasColumnType("decimal(10, 2)");

            entity.Property(e => e.Stock)
            .HasColumnName("stock")
            .HasColumnType("int");

            entity.Property(e => e.Description)
            .HasColumnName("description")
            .HasMaxLength(255)
            .IsUnicode(false);

            entity.Property(e => e.ImageUrl)
            .HasColumnName("image_url")
            .HasMaxLength(255)
            .IsUnicode(false);
            });
        }
    }
}
