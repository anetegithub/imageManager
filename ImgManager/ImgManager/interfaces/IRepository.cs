using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ImgManager.interfaces
{
    /// <summary>
    /// Easy Repository
    /// </summary>
    /// <typeparam name="M">Model</typeparam>
    public interface IRepository<M>
    {
        /// <summary>
        /// Return model by Id
        /// </summary>
        /// <param name="Id">For int identity</param>
        /// <returns></returns>
        M GetById(int Id);
        /// <summary>
        /// Create new model from viewmodel
        /// </summary>
        /// <param name="Model"></param>
        /// <returns></returns>
        int Add(M Model);
        /// <summary>
        /// Update exsisting model
        /// </summary>
        /// <param name="Model"></param>
        /// <returns></returns>
        int Update(M Model);
        /// <summary>
        /// Return models by Where constraint
        /// </summary>
        /// <param name="Constraint"></param>
        /// <returns></returns>
        List<M> All(Expression<Func<M, bool>> Constraint);
    }
}
