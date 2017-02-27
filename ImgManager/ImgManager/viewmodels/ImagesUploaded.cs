using ImgManager.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ImgManager.viewmodels
{
    public class ImagesUploaded
    {
        public ImageInfo[] data { get; set; }
        public Int32 total { get; set; }
    }
}