using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_CoreNet.Models;

namespace React_CoreNet.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class ContatoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContatoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Contato
        [HttpGet]
        public IEnumerable<Contatos> GetContatos()
        {
            return  _context.Contatos.ToList();
        }

        // GET: api/Contato/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contatos>> GetContatos(int id)
        {
            var contatos = await _context.Contatos.FindAsync(id);

            if (contatos == null)
            {
                return NotFound();
            }

            return contatos;
        }

        // PUT: api/Contato/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContatos(int id, Contatos contatos)
        {
            if (id != contatos.ContatoId)
            {
                return BadRequest();
            }

            _context.Entry(contatos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContatosExists(id))
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

        // POST: api/Contato
        [HttpPost]
        public async Task<ActionResult<Contatos>> PostContatos(Contatos contatos)
        {
            _context.Contatos.Add(contatos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContatos", new { id = contatos.ContatoId }, contatos);
        }

        // DELETE: api/Contato/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Contatos>> DeleteContatos(int id)
        {
            var contatos = await _context.Contatos.FindAsync(id);
            if (contatos == null)
            {
                return NotFound();
            }

            _context.Contatos.Remove(contatos);
            await _context.SaveChangesAsync();

            return contatos;
        }
        [HttpGet]
        public IEnumerable<Cidades> Details()
        {
            return _context.Cidades.ToList();
        }

        private bool ContatosExists(int id)
        {
            return _context.Contatos.Any(e => e.ContatoId == id);
        }
    }
}
