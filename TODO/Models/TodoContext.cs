using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TODO.Models;

namespace TODO.Models
{
    public class TodoContext : DbContext 
    {
        public TodoContext(DbContextOptions<TodoContext> options)
          : base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; }

        public DbSet<TODO.Models.ArchivedTask> ArchivedTask { get; set; }
    }
}
