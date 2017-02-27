using ImgManager.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ImgManager.models
{
    public class Record : ICRUDModel
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
    }
}