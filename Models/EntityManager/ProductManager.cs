using KShoppeMVC.Models.DB;
using KShoppeMVC.Models.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KShoppeMVC.Models.EntityManager
{
    public class ProductManager
    {
        public async Task<IEnumerable<ProductModel>> GetAllProducts()
        {
            List<ProductModel> productList = new List<ProductModel>();

            using (MyDBContext db = new MyDBContext())
            {
            var products = from p in db.Products
                    select new
                    {
                    p.Id,
                    p.Name,
                    p.Artist,
                    p.Category,
                    p.Price,
                    p.Stock,
                    p.Description,
                    p.ImageUrl
                    };

            productList = await products.Select(product => new ProductModel
            {
                Id = product.Id,
                Name = product.Name,
                Artist = product.Artist,
                Category = product.Category,
                Price = product.Price,
                Stock = product.Stock,
                Description = product.Description,
                ImageUrl = product.ImageUrl
            }).ToListAsync();
            }

            return productList;
        }

        public async Task<ProductModel> GetProductById(int id)
        {
            ProductModel productModel = new ProductModel();

            using (MyDBContext db = new MyDBContext())
            {
            var product = await (from p in db.Products
                    where p.Id == id
                    select new
                    {
                    p.Id,
                    p.Name,
                    p.Artist,
                    p.Category,
                    p.Price,
                    p.Stock,
                    p.Description,
                    p.ImageUrl
                    }).FirstOrDefaultAsync();
            if (product != null)
            {
            productModel = new ProductModel
                {
                Id = product.Id,
                Name = product.Name,
                Artist = product.Artist,
                Category = product.Category,
                Price = product.Price,
                Stock = product.Stock,
                Description = product.Description,
                ImageUrl = product.ImageUrl
                };
            }
            }
            return productModel;
        }

        public async Task AddProduct(ProductModel product)
        {
            using (MyDBContext db = new MyDBContext())
            {
                Product dbProduct = new Product
                {
                    Name = product.Name,
                    Artist = product.Artist,
                    Category = product.Category,
                    Price = product.Price,
                    Stock = product.Stock,
                    Description = product.Description,
                    ImageUrl = product.ImageUrl
                };

                db.Products.Add(dbProduct);
                db.SaveChanges();

                int newProductId = db.Products.First(p => p.Name == dbProduct.Name).Id;
            }
        }

        public async Task UpdateProduct(ProductModel product)
        {
            using (MyDBContext db = new MyDBContext())
            {
            var dbProduct = await db.Products.FindAsync(product.Id);
            if (dbProduct == null)
            {
                return;
            }

            dbProduct.Name = product.Name;
            dbProduct.Artist = product.Artist;
            dbProduct.Category = product.Category;
            dbProduct.Price = product.Price;
            dbProduct.Stock = product.Stock;
            dbProduct.Description = product.Description;
            dbProduct.ImageUrl = product.ImageUrl;

            db.Entry(dbProduct).State = EntityState.Modified;
            await db.SaveChangesAsync();
            }
        }

        public async Task DeleteProduct(int id)
        {
            using (MyDBContext db = new MyDBContext())
            {
            var product = await db.Products.FindAsync(id);
            if (product == null)
            {
                throw new KeyNotFoundException("Product not found");
            }
            db.Products.Remove(product);
            await db.SaveChangesAsync();

            }
        }
    }
}
