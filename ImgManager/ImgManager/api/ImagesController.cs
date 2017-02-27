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
        [HttpGet]
        public ImagesUploaded Read(SortingContract sorting)
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

                //paging
                query = query.Skip(sorting.pageSize * (sorting.page - 1))
                    .Take(sorting.pageSize);
                vm.data = query.ToArray();
                vm.total = vm.data.Count();

                return
                    vm;
            }
        }

        [HttpPost]
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
                        Name = Path.GetFileNameWithoutExtension(filename),
                        Size = buffer.Count(),
                        VirtualPath = "/images/" + filename,
                        PhysicalPath = HttpContext.Current.Server.MapPath("/images/{0}".f(filename))
                    };
#if Azure
                    imageInfo.Size = 0;
                    imageInfo.VirtualPath = "~/images/example.png";
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
    }
}