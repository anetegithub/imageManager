using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace ImgManager.contracts
{
    public struct SortingContract
    {
        public int page { get; set; }
        public int pageSize { get; set; }
        public string property { get; set; }
        public Order order { get; set; }
    }

    public enum Order
    {
        None = 0,
        Ascending,
        Descending
    }
}