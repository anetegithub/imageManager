using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImgManager.interfaces
{
    public interface ICRUDModel
    {
        int Id { get; set; }
        DateTime Created { get; set; }
    }
}
