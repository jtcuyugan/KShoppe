using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KShoppeMVC.Models.ViewModel
{
    public class ProductModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(100)]
        public string Artist { get; set; }

        [Required]
        [StringLength(50)]
        public string Category { get; set; }

        [Required]
        [Range(0.01, 10000.00)]
        public decimal Price { get; set; }

        [Required]
        [Range(0, 1000)]
        public int Stock { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [Url]
        public string ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }

    public class ProductsModel
    {
        public List<ProductModel> Products { get; set; }
    }
}
