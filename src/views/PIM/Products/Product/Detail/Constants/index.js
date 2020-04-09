export const APIHostName = "PIMAPI";
export const SearchGeneralInfoAPIPath = "api/Product/Load";


export const DeleteBarcode = "api/Product_Barcode/Delete";
export const editBarcode = "api/Product_Barcode/Update";

export const DeleteAttribute = "api/Product_Attribute/Delete";
export const editAttribute = "api/Product_Attribute/Update";

export const DeleteProductStatus = "api/Product_ProductStatus/Delete";
export const editProductStatus = "api/Product_ProductStatus/Update";

export const Deleteanotherstore = "api/Product_outputanotherstore/Delete";
export const editanotherstore = "api/Product_outputanotherstore/Update";

export const DeletePartnermap = "api/Product_Partnermap/Delete";
export const editPartnermap = "api/Product_Partnermap/Update";

export const Deletecontent = "api/Product_content/Delete";
export const editcontent = "api/Product_content/Update";


export const DeleteAlbum = "api/Product_album/Delete";
export const editAlbum = "api/Product_album/Update";


export const Deletearticle = "api/Product_article/Delete";
export const editarticle = "api/Product_article/Update";

export const DeleteImages = "api/Product_Images/Delete";
export const editImages = "api/Product_Images/Add";

//Barcode
export const GridMLObjectBarcodeDefinition = [
    {
        Name: "Barcode",
        DefaultValue: "",
        BindControlName: "textbox",
        DataSourceMember: "Barcode"
    },
    {
        Name: "BarcodeDescription",
        DefaultValue: "",
        BindControlName: "BarcodeDescription",
        DataSourceMember: "BarcodeDescription"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    }


];
export const InputBarcodeColumnList = [
    {
        Name: "Barcode",
        Type: "textbox",
        Caption: "Barcode",
        DataSourceMember: "Barcode",
        Width: 250,
        validatonList: ["required"]
    },
    {
        Name: "BarcodeDescription",
        Type: "textbox",
        Caption: "Mô tả",
        DataSourceMember: "BarcodeDescription",
        Width: 450,
        validatonList: ["required"]
    },
    {
        Name: "IsActived",
        Type: "checkbox",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 70
    },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "Barcode",
        Width: 70,
        iputpop: false
    }
];
//End Barcode
export const GridMLObjectProductAttributeDefinition = [
    {
        Name: "AttributeID",
        DefaultValue: "",
        BindControlName: "txtAttributeID",
        DataSourceMember: "AttributeID"
    },
    {
        Name: "AttributeValueID",
        DefaultValue: "",
        BindControlName: "AttributeValueID",
        DataSourceMember: "AttributeValueID"
    },
    {
        Name: "AttributeName",
        DefaultValue: "",
        BindControlName: "AttributeName",
        DataSourceMember: "AttributeName"
    },
    {
        Name: "AttributeValueName",
        DefaultValue: "",
        BindControlName: "AttributeValueName",
        DataSourceMember: "AttributeValueName"
    },
    {
        Name: "AttributeValue",
        DefaultValue: "",
        BindControlName: "AttributeValue",
        DataSourceMember: "AttributeValue"
    },
    {
        Name: "Isvariantattribute",
        DefaultValue: false,
        BindControlName: "Isvariantattribute",
        DataSourceMember: "Isvariantattribute"
    }
];
export const InputProductAttributeColumnList = [
    {
        Name: "AttributeID",
        ID: "AttributeName",
        Type: "combobox",
        Caption: "Thuộc tính",
        DataSourceMember: "AttributeID",
        Width: 150,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIMATTRIBUTE",
        ValueMember: "AttributeID",
        NameMember: "AttributeName",
        validatonList: ["required"]
    },
    {
        Name: "AttributeValueID",
        ID: "AttributeValueName",
        Type: "combobox",
        Caption: "Giá trị thuộc tính",
        DataSourceMember: "AttributeValueID",
        Width: 200,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.ATTRIBUTEVALUE",
        ValueMember: "AttributeValueID",
        NameMember: "AttributeValue",
        validatonList: ["required"]
    },
    {
        Name: "AttributeValue",
        Type: "text",
        Caption: "Tên thuộc tính",
        DataSourceMember: "AttributeValue",
        Width: 200,
        validatonList: ["required"]
    },
    {
        Name: "Isvariantattribute",
        Type: "checkbox",
        Caption: "Là thuộc tính variant",
        DataSourceMember: "Isvariantattribute",
        Width: 100
    },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember:  ["AttributeID","AttributeValueID"],
        Width: 70,
        Link: "",
        LinkText: "Chỉnh sửa",
        iputpop: false
    }
];

export const GridMLObjectProductStatusDefinition = [
    {
        Name: "CompanyID",
        DefaultValue: "",
        BindControlName: "txtCompanyID",
        DataSourceMember: "CompanyID"
    },
    {
        Name: "CompanyName",
        DefaultValue: "",
        BindControlName: "txtCompanyName",
        DataSourceMember: "CompanyName"
    }
    ,
    {
        Name: "ProductStatusID",
        DefaultValue: "",
        BindControlName: "ProductStatusID",
        DataSourceMember: "ProductStatusID"
    }
];
export const InputProductStatusColumnList = [
    {
        Name: "CompanyID",
        ID: "CompanyName",
        Type: "combobox",
        Caption: "công ty",
        DataSourceMember: "CompanyID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.MD_COMPANY",
        ValueMember: "CompanyID",
        NameMember: "CompanyName",
        validatonList: ["required"],
        Width: 350
    },
    {
        Name: "ProductStatusID",
        ID: "ProductStatusName",
        Type: "combobox",
        Caption: "Trang thái sản phẩm",
        DataSourceMember: "ProductStatusID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIM_PRODUCTSTATUS",
        ValueMember: "ProductStatusID",
        NameMember: "ProductStatusName",
        validatonList: ["required"],
        Width: 450
    }
    ,
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "CompanyID",
        Width: 70,
        Link: "",
        LinkText: "Chỉnh sửa",
        iputpop: false
    }
];

export const GridMLObjectOutputAnotherStoreDefinition = [
    {
        Name: "OutputTypeID",
        DefaultValue: -1,
        BindControlName: "OutputTypeID",
        DataSourceMember: "OutputTypeID"
    },
    {
        Name: "CompanyID",
        DefaultValue: -1,
        BindControlName: "CompanyID",
        DataSourceMember: "CompanyID"
    },
    {
        Name: "InstockstoreID",
        DefaultValue: -1,
        BindControlName: "InstockstoreID",
        DataSourceMember: "InstockstoreID"
    }, {
        Name: "IsRequireVoucher",
        DefaultValue: false,
        BindControlName: "IsRequireVoucher",
        DataSourceMember: "IsRequireVoucher"
    }
];
export const InputOutputAnotherStoreColumnList = [
    {
        Name: "OutputTypeID",
        ID: "OutputTypeName",
        Type: "combobox",
        Caption: "Hình thức xuất",
        DataSourceMember: "OutputTypeID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.MD_OUTPUTTYPE",
        ValueMember: "OutputTypeID",
        NameMember: "OutputTypeName",
        validatonList: ["required"],
        Width: 300
    },
    {
        Name: "CompanyID",
        ID: "CompanyName",
        Type: "combobox",
        Caption: "Công ty",
        DataSourceMember: "CompanyID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.MD_COMPANY",
        ValueMember: "CompanyID",
        NameMember: "CompanyName",
        validatonList: ["required"],
        Width: 300
    },
    {
        Name: "InstockstoreID",
        ID: "StoreName",
        Type: "combobox",
        Caption: "Kho tồn",
        DataSourceMember: "InstockstoreID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.MD_STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        validatonList: ["required"],
        Width: 300
    },
    {
        Name: "IsRequireVoucher",
        Type: "checkbox",
        Caption: "Yêu cầu chứng từ",
        DataSourceMember: "IsRequireVoucher",
        Width: 50
    },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "CompanyID",
        Width: 70,
        Link: "",
        LinkText: "Chỉnh sửa",
        iputpop: false
    }

];

export const GridMLObjectPartnerDefinition = [
    {
        Name: "CustomerID",
        DefaultValue: "",
        BindControlName: "CustomerID",
        DataSourceMember: "CustomerID"
    },
    {
        Name: "CustomerName",
        DefaultValue: "",
        BindControlName: "CustomerName",
        DataSourceMember: "CustomerName"
    },
    {
        Name: "PartnerProductmapTypeID",
        DefaultValue: "",
        BindControlName: "PartnerProductmapTypeID",
        DataSourceMember: "PartnerProductmapTypeID"
    },
    {
        Name: "PartnerProductmapTypeName",
        DefaultValue: "",
        BindControlName: "PartnerProductmapTypeName",
        DataSourceMember: "PartnerProductmapTypeName"
    },
    {
        Name: "PartnerProductCode",
        DefaultValue: "",
        BindControlName: "PartnerProductCode",
        DataSourceMember: "PartnerProductCode"
    },
    {
        Name: "PartnerProductName",
        DefaultValue: "",
        BindControlName: "PartnerProductName",
        DataSourceMember: "PartnerProductName"
    },
    {
        Name: "PartnerQuantityunitName",
        DefaultValue: "",
        BindControlName: "PartnerQuantityunitName",
        DataSourceMember: "PartnerQuantityunitName"
    }
];
export const InputProductPartnerColumnList = [
    {
        Name: "PartnerProductCode",
        Type: "textbox",
        Caption: "Mã Sản phẩm của đối tác",
        DataSourceMember: "PartnerProductCode",
        Width: 250,
        validatonList: ["required"]
    },
    {
        Name: "PartnerProductName",
        Type: "textbox",
        Caption: "Tên sản phẩm của đối tác",
        DataSourceMember: "PartnerProductName",
        Width: 250,
        validatonList: ["required"]
    },
    {
        Name: "CustomerID",
        ID:"CustomerName",
        Type: "combobox",
        Caption: "Đối tác",
        DataSourceMember: "CustomerID",
        ID:"CustomerName",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CUSTOMER",
        ValueMember: "CustomerID",
        NameMember: "CustomerName",
        Width: 300,
        validatonList: ["required"]
    },
    {
        Name: "PartnerProductmapTypeID",
        ID:"PartnerProductMapTypeName",
        Type: "combobox",
        Caption: "Loại sản phẩm của đối tác",
        DataSourceMember: "PartnerProductmapTypeID",
        ID:"PartnerProductmapTypeName",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIM_PARTNERPRODUCTMAPTYPE",
        ValueMember: "PartnerProductMapTypeID",
        NameMember: "PartnerProductMapTypeName",
        Width: 300,
        validatonList: ["required"]
    },
   
    
    {
        Name: "PartnerQuantityunitName",
        Type: "textbox",
        Caption: "Đơn vị tính",
        DataSourceMember: "PartnerQuantityunitName",
        Width: 250
    },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "AttributeID",
        Width: 100,
        Link: "",
        LinkText: "Chỉnh sửa",
        iputpop: false
    }
];

export const GridMLObjectContentDefinition = [
    {
        Name: "ProductContentID",
        DefaultValue: "",
        BindControlName: "ProductContentID",
        DataSourceMember: "ProductContentID"
    },
    {
        Name: "ContentTypeID",
        DefaultValue: "",
        BindControlName: "ContentTypeID",
        DataSourceMember: "ContentTypeID"
    },
    {
        Name: "LanguageID",
        DefaultValue: "",
        BindControlName: "LanguageID",
        DataSourceMember: "LanguageID"
    },
    {
        Name: "ContentTypeName",
        DefaultValue: "",
        BindControlName: "ContentTypeName",
        DataSourceMember: "ContentTypeName"
    },
    {
        Name: "LanguageName",
        DefaultValue: "",
        BindControlName: "LanguageName",
        DataSourceMember: "LanguageName"
    },
    {
        Name: "ContentDescription",
        DefaultValue: "",
        BindControlName: "ContentDescription",
        DataSourceMember: "ContentDescription"
    },
    {
        Name: "Content",
        DefaultValue: "",
        BindControlName: "Content",
        DataSourceMember: "Content"
    }
];
export const InputProductContentColumnList = [
    {
        Name: "ContentTypeID",
        ID:"ContentTypeName",
        Type: "combobox",
        Caption: "Loại nội dung",
        DataSourceMember: "ContentTypeID",
        ID:"ContentTypeName",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIM_CONTENTTYPE",
        ValueMember: "ContentTypeID",
        NameMember: "ContentTypeName",
        Width: 250,
        validatonList: ["required"]
    },
    {
        Name: "LanguageID",
        ID:"LanguageName",
        Type: "combobox",
        Caption: "Ngôn ngữ",
        DataSourceMember: "LanguageID",
        ID:"LanguageName",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.MDLANGUAGE",
        ValueMember: "LanguageID",
        NameMember: "LanguageName",
        Width: 150,
        validatonList: ["required"]
    },
   
    {
        Name: "ContentDescription",
        Type: "text",
        Caption: "Mô tả nội dung",
        DataSourceMember: "ContentDescription",
        Width: 480,
        Textleng:2000
    },
    {
        Name: "Content",
        Type: "Editor",
        Caption: "Nội dung",
        DataSourceMember: "Content",
        Width: 480,
        hideInput:false
    },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "ProductContentID",
        Width: 70,
        Link: "",
        LinkText: "Chỉnh sửa",
        iputpop: false
    }
];

export const GridMLObjectAlbumDefinition = [
    {
        Name: "AlbumID",
        DefaultValue: "",
        BindControlName: "AlbumID",
        DataSourceMember: "AlbumID"
    },
    {
        Name: "AlbumName",
        DefaultValue: "",
        BindControlName: "AlbumName",
        DataSourceMember: "AlbumName"
    },
    {
        Name: "IconfileURL",
        DefaultValue: "",
        BindControlName: "IconfileURL",
        DataSourceMember: "IconfileURL"
    },
    {
        Name: "Isdefault",
        DefaultValue: "",
        BindControlName: "Isdefault",
        DataSourceMember: "Isdefault"
    }
];
export const InputProductAlbumColumnList = [
    {
        Name: "AlbumID",
        Type: "text",
        Caption: "Mã album",
        DataSourceMember: "AlbumID",
        Width: 70,
        iputpop: false
    },
    {
        Name: "AlbumName",
        Type: "textbox",
        Caption: "Tên album",
        DataSourceMember: "AlbumName",
        Width: 380,
        validatonList: ["required"]
    },
    {
        Name: "IconfileURL",
        Type: "textbox",
        Caption: "Đường dẫn hình ảnh",
        DataSourceMember: "IconfileURL",
        Width: 400,
        validatonList: ["required"]
    },
    {
        Name: "Isdefault",
        Type: "checkbox",
        Caption: "Album mặc định",
        DataSourceMember: "Isdefault",
        Width: 100
    },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "AlbumID",
        Width: 70,
        Link: "",
        LinkText: "Chỉnh sửa",
        iputpop: false
    }
];

export const GridMLObjectImagesDefinition = [
    {
        Name: "ImagesID",
        DefaultValue: "",
        BindControlName: "txtImagesID",
        DataSourceMember: "ImagesID"
    },
    {
        Name: "AlbumID",
        DefaultValue: "",
        BindControlName: "txtAlbumID",
        DataSourceMember: "AlbumID"
    },
    {
        Name: "ImageName",
        DefaultValue: "",
        BindControlName: "txtImageName",
        DataSourceMember: "ImageName"
    },
    {
        Name: "ProductImageTypeID",
        DefaultValue: "",
        BindControlName: "txtProductImageTypeID",
        DataSourceMember: "ProductImageTypeID"
    },
    {
        Name: "ImagefileURL",
        DefaultValue: "",
        BindControlName: "txtImagefileURL",
        DataSourceMember: "ImagefileURL"
    },
    {
        Name: "Isdefault",
        DefaultValue: "",
        BindControlName: "chkIsdefault",
        DataSourceMember: "Isdefault"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    }
];
export const InputProductImagesColumnList = [
    {
        Name: "txtAlbumID",
        Type: "text",
        Caption: "Album",
        DataSourceMember: "AlbumID",
        Width: 200,
        validatonList: ["required"]
    },
    {
        Name: "txtProductImageTypeID",
        Type: "text",
        Caption: "Loại hình ảnh",
        DataSourceMember: "ProductImageTypeID",
        Width: 200,
        validatonList: ["required"]
    },
    {
        Name: "txtImageName",
        Type: "textbox",
        Caption: "Tên hình ảnh",
        DataSourceMember: "ImageName",
        Width: 200
    },
    {
        Name: "txtImagefileURL",
        Type: "text",
        Caption: "Đường dẫn",
        DataSourceMember: "ImagefileURL",
        Width: 200
    },
    {
        Name: "chkIsdefault",
        Type: "checkicon",
        Caption: "Mặc định",
        DataSourceMember: "Isdefault",
        Width: 70
    },
    {
        Name: "chkIsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 70
    },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "ImagesID",
        Width: 70,
        Link: "",
        LinkText: "Chỉnh sửa",
        iputpop: false
    }

];

export const GridMLObjectArticleDefinition = [
    {
        Name: "ArticleID",
        DefaultValue: "",
        BindControlName: "txtArticleID",
        DataSourceMember: "ArticleID"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "ProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "Title",
        DefaultValue: "",
        BindControlName: "txtTitle",
        DataSourceMember: "Title"
    },
    {
        Name: "Content",
        DefaultValue: "",
        BindControlName: "Content",
        DataSourceMember: "Content"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    }
];
export const InputProductArticleColumnList = [
    {
        Name: "txtArticleID",
        Type: "text",
        Caption: "Mã bài viết",
        DataSourceMember: "ArticleID",
        Width: 100,
        iputpop: false
    },
    {
        Name: "Title",
        Type: "textbox",
        Caption: "Tiêu đề",
        DataSourceMember: "Title",
        Width: 200,
        validatonList: ["required"]
    },
    {
        Name: "Description",
        Type: "textbox",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        Width: 460,
        validatonList: ["required"]
    },
    {
        Name: "Content",
        Type: "Editor",
        Caption: "Nội dung",
        DataSourceMember: "Content",
        Width: 480,
        hideInput:false
    },
    {
        Name: "IsActived",
        Type: "checkbox",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 70
    },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "ArticleID",
        Width: 70,
        iputpop: false
    }
];