using ImgManager.contexts;
using ImgManager.interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ImgManager.repositories
{
    public class CRUDRepository<T> : IRepository<T>, IDisposable
       where T : class, ICRUDModel
    {
        ApplicationDbContext db = new ApplicationDbContext();

        public T GetById(int Id)
        {
            return Determine((Entity) =>
            {
                var Object = Entity
                    .Where(x => x.Id == Id)
                    .First();
                return Object;
            });
        }

        public static object GetById(int Id, string TName)
        {
            using (var db = new ApplicationDbContext())
            {
                foreach (var Property in typeof(ApplicationDbContext).GetProperties())
                {
                    if (Property.PropertyType.Name.Contains("DbSet"))
                        if (Property.PropertyType.GetGenericArguments()
                            .Where(x => x.Name == TName)
                            .Count() > 0)
                        {
                            var Entity = Property.GetValue(db) as DbSet<T>;
                            return Entity.Where(x => x.Id == Id)
                                .FirstOrDefault();
                        }
                }
                return default(T);
            }
        }

        public int Add(T Model)
        {
            int SaveCode = 0;

            Determine((Entity) =>
            {
                Model.Created = DateTime.Now;
                Entity.Add(Model);
                SaveCode = db.SaveChanges();
                return default(T);
            });

            return SaveCode;
        }

        public int Update(T Model)
        {
            int SaveCode = 0;

            Determine((Entity) =>
            {
                var Entry = db.Entry(Model);
                Entry.State = EntityState.Modified;
                SaveCode = db.SaveChanges();
                return default(T);
            });

            return SaveCode;
        }

        public int Remove(T Model)
        {
            int SaveCode = 0;

            Determine((Entity) =>
            {
                Entity.Attach(Model);
                Entity.Remove(Model);
                SaveCode = db.SaveChanges();
                return default(T);
            });

            return SaveCode;
        }

        public List<T> Linq(Func<DbSet<T>, List<T>> Constraint)
        {
            List<T> Data = new List<T>();

            Determine((Entity) =>
            {
                Data = Constraint(Entity);
                return default(T);
            });

            return Data;
        }

        public void Query(Action<DbSet<T>> Constraint)
        {
            Determine((db) =>
            {
                Constraint(db);
                return default(T);
            });
        }

        public List<T> All(System.Linq.Expressions.Expression<Func<T, bool>> Constraint)
        {
            List<T> Data = new List<T>();

            Determine((Entity) =>
            {
                Data = Entity
                    .Where(Constraint)
                    .ToList();
                return default(T);
            });

            return Data;
        }

        private T Determine(Func<DbSet<T>, T> EntityProcess)
        {
            foreach (var Property in typeof(ApplicationDbContext).GetProperties())
            {
                if (Property.PropertyType.Name.Contains("DbSet"))
                    if (Property.PropertyType.GetGenericArguments()
                        .Where(x => x == typeof(T))
                        .Count() > 0)
                    {
                        var Entity = Property.GetValue(db) as DbSet<T>;
                        return EntityProcess(Entity);
                    }
            }
            return default(T);
        }

        public void Dispose()
        {
            db.Dispose();
        }

        T IRepository<T>.GetById(int Id)
        {
            throw new NotImplementedException();
        }

        int IRepository<T>.Add(T Model)
        {
            throw new NotImplementedException();
        }

        int IRepository<T>.Update(T Model)
        {
            throw new NotImplementedException();
        }

        List<T> IRepository<T>.All(System.Linq.Expressions.Expression<Func<T, bool>> Constraint)
        {
            throw new NotImplementedException();
        }
    }
}