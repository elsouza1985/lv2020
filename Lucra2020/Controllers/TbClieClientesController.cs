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
    public class TbClieClientesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TbClieClientesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/TbClieClientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbClieCliente>>> GetTbClieCliente()
        {
            return await _context.TbClieCliente.ToListAsync();
        }

        // GET: api/TbClieClientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbClieCliente>> GetTbClieCliente(int id)
        {
            var tbClieCliente = await _context.TbClieCliente.FindAsync(id);

            if (tbClieCliente == null)
            {
                return NotFound();
            }

            return tbClieCliente;
        }

        // PUT: api/TbClieClientes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbClieCliente(int id, TbClieCliente tbClieCliente)
        {
            if (id != tbClieCliente.ClieIdtCliente)
            {
                return BadRequest();
            }

            _context.Entry(tbClieCliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbClieClienteExists(id))
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

        // POST: api/TbClieClientes
        [HttpPost]
        public async Task<ActionResult<TbClieCliente>> PostTbClieCliente(TbClieCliente tbClieCliente)
        {
            _context.TbClieCliente.Add(tbClieCliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTbClieCliente", new { id = tbClieCliente.ClieIdtCliente }, tbClieCliente);
        }

        // DELETE: api/TbClieClientes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbClieCliente>> DeleteTbClieCliente(int id)
        {
            var tbClieCliente = await _context.TbClieCliente.FindAsync(id);
            if (tbClieCliente == null)
            {
                return NotFound();
            }

            _context.TbClieCliente.Remove(tbClieCliente);
            await _context.SaveChangesAsync();

            return tbClieCliente;
        }

        private bool TbClieClienteExists(int id)
        {
            return _context.TbClieCliente.Any(e => e.ClieIdtCliente == id);
        }
    }
}
