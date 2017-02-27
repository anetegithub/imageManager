using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ImgManager.api;
using ImgManager.models;

namespace ImgManager.Tests.api
{
    [TestClass]
    public class ImagesControllerTest
    {
        [TestMethod]
        public ImagesControllerTestResponse Read()
        {
            // Arrange
            ImagesController controller = new ImagesController();

            var sorting = new contracts.SortingContract()
            {
                page = 1,
                pageSize = 1
            };

            // Act
            var response = controller.Read(sorting);

            // Assert
            Assert.AreNotEqual(response.total, 0);

            return new ImagesControllerTestResponse
            {
                sorting = sorting,
                imagesuploaded = response
            };
        }

        [TestMethod]
        public void ReadCount()
        {
            // Arrange
            ImagesController controller = new ImagesController();
            var sorting = new contracts.SortingContract()
            {
                page = 1,
                pageSize = 3
            };

            // Act
            var response = controller.Read(sorting);

            // Assert
            Assert.AreEqual(response.data.Length, 3);
        }

        [TestMethod]
        public void ReadPage()
        {
            // Arrange
            ImagesController controller = new ImagesController();
            var sorting = new contracts.SortingContract()
            {
                page = 1,
                pageSize = 1
            };

            // Act
            var response1 = controller.Read(sorting);

            sorting.page = 2;
            var response2 = controller.Read(sorting);

            // Assert
            Assert.AreEqual(response1.data[0], response2.data[1]);
        }

        [TestMethod]
        public void ReadOrderByCreatedAsc()
        {
            // Arrange
            var sorting = CreatedPropertySorting();
            sorting.order = contracts.Order.Ascending;

            // Act
            models.ImageInfo img1, img2;
            Query(sorting, out img1, out img2);

            // Assert
            Assert.IsTrue(img1.Created < img2.Created);
        }

        [TestMethod]
        public void ReadOrderByCreatedDesc()
        {
            // Arrange
            var sorting = CreatedPropertySorting();
            sorting.order = contracts.Order.Descending;

            // Act
            models.ImageInfo img1, img2;
            Query(sorting, out img1, out img2);

            // Assert
            Assert.IsTrue(img1.Created > img2.Created);
        }

        private contracts.SortingContract CreatedPropertySorting()
        {
            // Arrange
            var list = Read();

            list.sorting.property = "Created";

            return list.sorting;
        }

        private void Query(contracts.SortingContract sorting, out models.ImageInfo firstImage, out models.ImageInfo secondImage)
        {
            // Act
            var orderedList = new ImagesController()
                .Read(sorting);

            firstImage = orderedList.data[0];
            secondImage = orderedList.data[1];
        }

        public class ImagesControllerTestResponse
        {
            public contracts.SortingContract sorting;
            public viewmodels.ImagesUploaded imagesuploaded;
        }
    }
}