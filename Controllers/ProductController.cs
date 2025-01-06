using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KShoppeMVC.Models.DB;
using KShoppeMVC.Models.EntityManager;
using KShoppeMVC.Models.ViewModel;

namespace KShoppeMVC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly MyDBContext _context;

        public ProductController(MyDBContext context)
        {
            _context = context;
        }

        // GET: api/product
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var prod = new ProductManager();
            var product = await prod.GetAllProducts();
            return Ok(product);
        }

        // GET: api/product/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product newProduct)
        {
            // if (ModelState.IsValid)
            // {
            //     newProduct.CreatedAt = DateTime.Now;
            //     _context.Product.Add(newProduct);
            //     await _context.SaveChangesAsync();
            //     return RedirectToAction("Index", "Home"); // Adjust the action and controller as needed
            // }
            // return Ok(newProduct);

            _context.Products.Add(newProduct);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduct), new { id = newProduct.Id }, newProduct);
        }

        // PUT: api/Product/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product updatedProduct)
        {
            // if (id != updatedProduct.Id)
            // {
            //     return BadRequest();
            // }
            // _context.Entry(updatedProduct).State = EntityState.Modified;
            // try
            // {
            //     await _context.SaveChangesAsync();
            // }
            // catch (DbUpdateConcurrencyException)
            // {
            //     if (!_context.Product.Any(e => e.Id == id))
            //     {
            //         return NotFound();
            //     }
            //     else
            //     {
            //         throw;
            //     }
            // }
            // return RedirectToAction("Index");
            if (id != updatedProduct.Id) return BadRequest();

            _context.Entry(updatedProduct).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Product/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            // var product = await _context.Products.FindAsync(id);
            // if (product == null)
            // {
            //     return NotFound();
            // }

            // _context.Products.Remove(product);
            // await _context.SaveChangesAsync();
            // return NoContent();

            using (MyDBContext db = new MyDBContext())
            {
                var product = await db.Products.FindAsync(id);
                if (product == null)
                {
                    throw new KeyNotFoundException("Product not found");
                }
                db.Products.Remove(product);
                await db.SaveChangesAsync();
                return Ok();
            }
        }
    }
}