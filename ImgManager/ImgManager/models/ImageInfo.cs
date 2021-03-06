﻿using ImgManager.interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ImgManager.models
{
    public class ImageInfo : Record
    {
        public string Name { get; set; }
        public string VirtualPath { get; set; }
        public string PhysicalPath { get; set; }
        public long Size { get; set; }
        [NotMapped]
        public bool itsNew
        {
            get
            {
                return (DateTime.Now - this.Created).Hours < 1;
            }
        }
    }
}