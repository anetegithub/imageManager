using ImgManager.interfaces;
using System;
using System.Collections.Generic;
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
    }
}