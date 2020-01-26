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
        private readonly Guid estab = new Guid("B7882E07-56A3-478E-A4C2-51125E471CAC");

        public vwProdutosController(AppDbContext context)
        {
            _context = context;
        }
        //Metodos para cliente estabelecimento
        [HttpGet("LoadProdList")]
        public async Task<ActionResult<IEnumerable<vwProdutoEstabelecimento>>> LoadProduto()
        {
            return await _context.ProdutoEstabelecimento.Where(x => x.UidEstabelecimento == estab).ToListAsync();
        }

        [HttpPost("ProdEstab")]
        public async Task<ActionResult<vwProdutoEstabelecimento>> ProdEstab(vwProdutoEstabelecimento Produto)
        {
            Produto.UidEstabelecimento = estab;
            _context.Entry(Produto).State = EntityState.Added;
            //_context.Produto.Add(Produto);
            await _context.SaveChangesAsync();

            return Ok();//CreatedAtAction("GetvwProduto", new { id = Produto. }, Produto);
        }
        // GET: api/vwProdutos/5
        [HttpGet("GetvwProdutoEstab/{id}")]
        public async Task<ActionResult<vwProdutoEstabelecimento>> GetvwProdutoEstab(Guid id)
        {
            var vwProduto = await _context.ProdutoEstabelecimento.FindAsync(id);

            if (vwProduto == null)
            {
                return NotFound();
            }

            return vwProduto;
        }

        // GET: api/vwProdutos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<vwProduto>>> GetProduto()
        {
            return await _context.Produto.ToListAsync();
        }

        // GET: api/vwProdutos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<vwProduto>> GetvwProduto(Guid id)
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
        public async Task<IActionResult> PutvwProduto(Guid id, vwProduto vwProduto)
        {
            if (id != vwProduto.UidProduto)
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

            return Ok();
        }

        // POST: api/vwProdutos
        [HttpPost]
        public async Task<ActionResult<vwProduto>> PostvwProduto(vwProduto Prod)
        {
            //Prod.UidProduto = 1;
            _context.Entry<vwProduto>(Prod).State = EntityState.Added;
            //_context.Produto.Add(Produto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetvwProduto", new { id = Prod.UidProduto }, Prod);
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

        private bool vwProdutoExists(Guid id)
        {
            return _context.Produto.Any(e => e.UidProduto == id);
        }
    }
}
