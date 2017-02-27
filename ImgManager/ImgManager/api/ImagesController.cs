using ImgManager.contexts;
using ImgManager.contracts;
using ImgManager.interfaces;
using ImgManager.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Linq.Dynamic;
using ImgManager.viewmodels;
using System.Threading.Tasks;
using System.IO;
using System.Web;

namespace ImgManager.api
{
    public class ImagesController : ApiController
    {
        public static string FolderPath = "images";

        [HttpPost]
        public ImagesUploaded Read([FromBody]SortingContract sorting)
        {
            var vm = new ImagesUploaded();

            using (var db = new ApplicationDbContext())
            {
                var query = db.InfromationAboutImages.Select(x => x);

                //sorting
                if (sorting.order != Order.None)
                {
                    string orderQuery = "{0} {1}"
                        .f(sorting.property, sorting.order);

                    query = query.OrderBy(orderQuery);
                }
                vm.total = query.Count();

                //paging
                query = query.Skip(sorting.pageSize * (sorting.page - 1))
                    .Take(sorting.pageSize);
                vm.data = query.ToArray();

                return
                    vm;
            }
        }

        [HttpPut]
        public async Task<ImagesUploaded> Create()
        {
            var vm = new ImagesUploaded();
            List<ImageInfo> images = new List<ImageInfo>();

            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);
            using (var db = new ApplicationDbContext())
            {
                foreach (var file in provider.Contents)
                {
                    var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                    var buffer = await file.ReadAsByteArrayAsync();

                    var imageInfo = new ImageInfo()
                    {
                        Created = DateTime.Now,
                        Name = Path.GetFileName(filename),
                        Size = buffer.Count(),
                        VirtualPath = "/{0}/{1}".f(FolderPath, filename),
                        PhysicalPath = HttpContext.Current.Server.MapPath("/{0}/{1}".f(FolderPath, filename))
                    };
#if Azure
                    imageInfo.Size = 0;
                    imageInfo.VirtualPath = "/images/example.png";
                    imageInfo.PhysicalPath = HttpContext.Current.Server.MapPath(imageInfo.VirtualPath);   
#else
                    try
                    {
                        File.WriteAllBytes(imageInfo.PhysicalPath, buffer);
                    }
                    catch
                    {
                        imageInfo.Size = 0;
                        imageInfo.VirtualPath = "/images/error.png";
                        imageInfo.PhysicalPath = HttpContext.Current.Server.MapPath(imageInfo.VirtualPath);
                    }
#endif
                    db.InfromationAboutImages.Add(imageInfo);
                    images.Add(imageInfo);
                }
                await db.SaveChangesAsync();
            }

            vm.data = images.ToArray();
            vm.total = vm.data.Count();

            return vm;
        }

        [HttpGet]
        public bool Storage(String Path)
        {
            try
            {
                Directory.CreateDirectory(HttpContext.Current.Server.MapPath("/{0}".f(Path)));
                ImagesController.FolderPath = Path;

                return true;
            }
            catch
            {
                Directory.CreateDirectory(HttpContext.Current.Server.MapPath("/{0}".f(Path)));
                ImagesController.FolderPath = "images";

                return false;
            }
        }
    }
}