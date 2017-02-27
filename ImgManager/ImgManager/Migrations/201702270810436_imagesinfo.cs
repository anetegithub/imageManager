namespace ImgManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class imagesinfo : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ImageInfoes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        VirtualPath = c.String(),
                        PhysicalPath = c.String(),
                        Size = c.Long(nullable: false),
                        Created = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ImageInfoes");
        }
    }
}
