using ImgManager.models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ImgManager.contexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
            : base("DefaultConnection")
        {

        }
        public DbSet<ImageInfo> InfromationAboutImages { get; set; }
    }
}