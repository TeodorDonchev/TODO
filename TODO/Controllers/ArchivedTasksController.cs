using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TODO.Models;

namespace TODO.Controllers
{
    [Route("api/ArchivedTasks")]
    [ApiController]
    public class ArchivedTasksController : ControllerBase
    {
        private readonly TodoContext _context;

        public ArchivedTasksController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/ArchivedTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArchivedTask>>> GetArchivedTask()
        {
            return await _context.ArchivedTask.ToListAsync();
        }

        // GET: api/ArchivedTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ArchivedTask>> GetArchivedTask(int id)
        {
            var archivedTask = await _context.ArchivedTask.FindAsync(id);

            if (archivedTask == null)
            {
                return NotFound();
            }

            return archivedTask;
        }

        // PUT: api/ArchivedTasks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArchivedTask(int id, ArchivedTask archivedTask)
        {
            if (id != archivedTask.Id)
            {
                return BadRequest();
            }

            _context.Entry(archivedTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArchivedTaskExists(id))
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

        // POST: api/ArchivedTasks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ArchivedTask>> PostArchivedTask(ArchivedTask archivedTask)
        {
            _context.ArchivedTask.Add(archivedTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArchivedTask", new { id = archivedTask.Id }, archivedTask);
        }

        // DELETE: api/ArchivedTasks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ArchivedTask>> DeleteArchivedTask(int id)
        {
            var archivedTask = await _context.ArchivedTask.FindAsync(id);
            if (archivedTask == null)
            {
                return NotFound();
            }

            _context.ArchivedTask.Remove(archivedTask);
            await _context.SaveChangesAsync();

            return archivedTask;
        }

        private bool ArchivedTaskExists(int id)
        {
            return _context.ArchivedTask.Any(e => e.Id == id);
        }
    }
}
