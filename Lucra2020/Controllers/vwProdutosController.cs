using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Lucra2020.Models;

namespace Lucra2020.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class vwProdutosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public vwProdutosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/vwProdutos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<vwProduto>>> GetProduto()
        {
            return await _context.Produto.ToListAsync();
        }

        // GET: api/vwProdutos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<vwProduto>> GetvwProduto(int id)
        {
            var vwProduto = await _context.Produto.FindAsync(id);

            if (vwProduto == null)
            {
                return NotFound();
            }

            return vwProduto;
        }

        // PUT: api/vwProdutos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutvwProduto(int id, vwProduto vwProduto)
        {
            if (id != vwProduto.IdProduto)
            {
                return BadRequest();
            }

            _context.Entry(vwProduto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!vwProdutoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/vwProdutos
        [HttpPost]
        public async Task<ActionResult<vwProduto>> PostvwProduto(vwProduto vwProduto)
        {
            _context.Produto.Add(vwProduto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetvwProduto", new { id = vwProduto.IdProduto }, vwProduto);
        }

        // DELETE: api/vwProdutos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<vwProduto>> DeletevwProduto(int id)
        {
            var vwProduto = await _context.Produto.FindAsync(id);
            if (vwProduto == null)
            {
                return NotFound();
            }

            _context.Produto.Remove(vwProduto);
            await _context.SaveChangesAsync();

            return vwProduto;
        }

        private bool vwProdutoExists(int id)
        {
            return _context.Produto.Any(e => e.IdProduto == id);
        }
    }
}
