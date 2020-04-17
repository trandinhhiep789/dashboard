export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/Product/Search";
export const LoadAPIPath = "api/Product/Load";
export const LoadAPIPathNew = "api/Product/LoadNew";
export const AddAPIPath = "api/Product/Add";
export const UpdateAPIPath = "api/Product/Update";
export const DeleteAPIPath = "api/Product/Delete";
export const UpdateOrderAPIPath = "api/Product/UpdateOrder";
export const BackLink = "/Product";
export const AddLink = "/Product/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ProductID";
export const PKModelColumnName = "ModelID,ModelName";

export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}
];

export const PagePath = [{ Link: "", Title: "Trang chủ" },
{ Link: "/Product", Title: "Sản phẩm" }
];
export const EditPagePath = [{ Link: "", Title: "Trang chủ" },
{ Link: "/Product", Title: "Sản phẩm" },
{ Link: "", Title: "Sửa sản phẩm" }

];
export const AddPagePath = [{ Link: "", Title: "Trang chủ" },
{ Link: "/Product", Title: "Sản phẩm" },
{ Link: "", Title: "Thêm sản phẩm" }

];
export const DetailPagePath = [{ Link: "", Title: "Trang chủ" },
{ Link: "/Product", Title: "Sản phẩm" },
{ Link: "", Title: "Chi tiết sản phẩm" }

]


export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}

    },
    {
        type: "select",
        name: "slProductTypeID",
        label: "Loại sản phẩm",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProductTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PRODUCTTYPE",
        ValueMember: "ProductTypeID",
        NameMember: "ProductTypeName"
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "ProductTypeID",
        DefaultValue: -1,
        BindControlName: "slProductTypeID"
    }
];

export const AddElementList = [
];
export const EditElementList = [
    {
        type: "text",
        name: "txtProductImageTypeID",
        label: "Mã loại ảnh sản phẩm",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: true,
        DataSourceMember: "ProductImageTypeID",
        validatonList: []

    },
    {
        type: "text",
        name: "txtProductImageTypeName",
        label: "Tên loại ảnh sản phẩm",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "ProductImageTypeName",
        validatonList: ["required"]

    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "Description",
        validatonList: []

    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsActived",
        validatonList: []

    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsSystem",
        validatonList: []

    }
];

//Barcode
export const GridMLObjectBarcodeDefinition = [
    {
        Name: "Barcode",
        DefaultValue: "",
        BindControlName: "Barcode",
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
        Name: "chkSelect",
        Type: "checkboxAll",
        Caption: "",
        DataSourceMember: "Barcode",
        Width: 50
    },
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
    }
];
//End Barcode

export const GridMLObjectCategoryTypeDefinition = [
    {
        Name: "CategoryTypeID",
        DefaultValue: "",
        BindControlName: "txtCategoryTypeID",
        DataSourceMember: "CategoryTypeID"
    },
    {
        Name: "CategoryTypeName",
        DefaultValue: "",
        BindControlName: "CategoryTypeName",
        DataSourceMember: "CategoryTypeName"
    },
    {
        Name: "CategoryID",
        DefaultValue: "",
        BindControlName: "cbCategoryID",
        DataSourceMember: "CategoryID"
    }
];
export const InputCategoryTypeColumnList = [
    {
        Name: "txtCategoryTypeName",
        Type: "text",
        Caption: "Loại danh mục",
        DataSourceMember: "CategoryTypeName",
        Width: 250
    },
    {
        Name: "cbCategoryID",
        Type: "combobox",
        Caption: "Danh mục",
        DataSourceMember: "CategoryID",
        isCategory: true,
        rowCategoryType: "CategoryTypeID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CATEGORY",
        ValueMember: "CategoryID",
        NameMember: "CategoryName",
        Width: 450,
    }
];

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
        Name: "chkSelect",
        Type: "checkboxAll",
        Caption: "",
        DataSourceMember: "AttributeID,AttributeValueID",
        Width: 100,
        iputpop: false
    },
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
        DataSourceMember: ["AttributeID", "AttributeValueID"],
        Width: 100,
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
        BindControlName: "cbProductStatusID",
        DataSourceMember: "ProductStatusID"
    }
];
export const InputProductStatusColumnList = [
    {
        Name: "txtCompanyID",
        Type: "text",
        Caption: "Mã công ty",
        DataSourceMember: "CompanyID",
        Width: 100
    },
    {
        Name: "txtCompanyName",
        Type: "text",
        Caption: "công ty",
        DataSourceMember: "CompanyName",
        Width: 350
    },
    {
        Name: "cbProductStatusID",
        Type: "combobox",
        Caption: "Trang thái sản phẩm",
        DataSourceMember: "ProductStatusID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIM_PRODUCTSTATUS",
        ValueMember: "ProductStatusID",
        NameMember: "ProductStatusName",
        Width: 450
    }
];

export const GridMLObjectProductLimitDefinition = [
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
    },
    {
        Name: "MinStockQuantity",
        DefaultValue: "",
        BindControlName: "txtMinStockQuantity",
        DataSourceMember: "MinStockQuantity"
    },
    {
        Name: "MaxStockQuantity",
        DefaultValue: "",
        BindControlName: "txtMaxStockQuantity",
        DataSourceMember: "MaxStockQuantity"
    },
    {
        Name: "MinOrderQuantity",
        DefaultValue: "",
        BindControlName: "txtMinOrderQuantity",
        DataSourceMember: "MinOrderQuantity"
    },
    {
        Name: "MaxOrderQuantity",
        DefaultValue: "",
        BindControlName: "txtMaxOrderQuantity",
        DataSourceMember: "MaxOrderQuantity"
    },
    {
        Name: "MinSaleQuantity",
        DefaultValue: "",
        BindControlName: "txtMinSaleQuantity",
        DataSourceMember: "MinSaleQuantity"
    },
    {
        Name: "MaxSaleQuantity",
        DefaultValue: "",
        BindControlName: "txtMaxSaleQuantity",
        DataSourceMember: "MaxSaleQuantity"
    },
    {
        Name: "WebminStockQuantity",
        DefaultValue: "",
        BindControlName: "txtWebminStockQuantity",
        DataSourceMember: "WebminStockQuantity"
    }

];
export const InputProductLimitColumnList = [
    {
        Name: "txtCompanyID",
        Type: "text",
        Caption: "Mã công ty",
        DataSourceMember: "CompanyID",
        Width: 50
    },
    {
        Name: "txtCompanyName",
        Type: "text",
        Caption: "công ty",
        DataSourceMember: "CompanyName",
        Width: 150
    },
    {
        Name: "txtMinStockQuantity",
        Type: "textbox",
        Caption: "TK Tối thiểu",
        DataSourceMember: "MinStockQuantity",
        Width: 50
    },
    {
        Name: "txtMaxStockQuantity",
        Type: "textbox",
        Caption: "TK Tối đa",
        DataSourceMember: "MaxStockQuantity",
        Width: 50
    },
    {
        Name: "txtMinOrderQuantity",
        Type: "textbox",
        Caption: "Đặt hàng tối thiểu",
        DataSourceMember: "MinOrderQuantity",
        Width: 50
    },
    {
        Name: "txtMaxOrderQuantity",
        Type: "textbox",
        Caption: "Đặt hàng tối đa",
        DataSourceMember: "MaxOrderQuantity",
        Width: 50
    },
    {
        Name: "txtMinSaleQuantity",
        Type: "textbox",
        Caption: "Bán tối tiểu",
        DataSourceMember: "MinSaleQuantity",
        Width: 50
    },
    {
        Name: "txtMaxSaleQuantity",
        Type: "textbox",
        Caption: "Bán tối đa",
        DataSourceMember: "MaxSaleQuantity",
        Width: 50
    },
    {
        Name: "txtWebminStockQuantity",
        Type: "textbox",
        Caption: "TK tối thiểu trên Web",
        DataSourceMember: "WebminStockQuantity",
        Width: 50
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
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "index",
        Width: 50
    },
    {
        Name: "OutputTypeID",
        Type: "combobox",
        Caption: "Hình thức xuất",
        DataSourceMember: "OutputTypeID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.MD_OUTPUTTYPE",
        ValueMember: "OutputTypeID",
        NameMember: "OutputTypeName",
        Width: 300
    },
    {
        Name: "CompanyID",
        Type: "combobox",
        Caption: "Công ty",
        DataSourceMember: "CompanyID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.MD_COMPANY",
        ValueMember: "CompanyID",
        NameMember: "CompanyName",
        Width: 300
    },
    {
        Name: "InstockstoreID",
        Type: "combobox",
        Caption: "Kho tồn",
        DataSourceMember: "InstockstoreID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.MD_STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        Width: 300
    },
    {
        Name: "IsRequireVoucher",
        Type: "checkbox",
        Caption: "Yêu cầu chứng từ",
        DataSourceMember: "IsRequireVoucher",
        Width: 50
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
        Name: "chkSelect",
        Type: "checkboxAll",
        Caption: "",
        DataSourceMember: "index",
        Width: 100,
        iputpop: false
    },
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
        Type: "combobox",
        Caption: "Đối tác",
        DataSourceMember: "CustomerID",
        ID: "CustomerName",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CUSTOMER",
        ValueMember: "CustomerID",
        NameMember: "CustomerName",
        Width: 300,
        validatonList: ["required"]
    },
    {
        Name: "PartnerProductmapTypeID",
        Type: "combobox",
        Caption: "Loại sản phẩm của đối tác",
        DataSourceMember: "PartnerProductmapTypeID",
        ID: "PartnerProductmapTypeName",
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
    }
];
export const InputProductContentColumnList = [
    {
        Name: "chkSelect",
        Type: "checkboxAll",
        Caption: "",
        DataSourceMember: "ProductContentID",
        Width: 50,
        iputpop: false
    },
    {
        Name: "ContentTypeID",
        Type: "combobox",
        Caption: "Loại nội dung",
        DataSourceMember: "ContentTypeID",
        ID: "ContentTypeName",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIM_CONTENTTYPE",
        ValueMember: "ContentTypeID",
        NameMember: "ContentTypeName",
        Width: 250,
        validatonList: ["required"]
    },
    {
        Name: "LanguageID",
        Type: "combobox",
        Caption: "Ngôn ngữ",
        DataSourceMember: "LanguageID",
        ID: "LanguageName",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.MDLANGUAGE",
        ValueMember: "LanguageID",
        NameMember: "LanguageName",
        Width: 150,
        validatonList: ["required"]
    },

    {
        Name: "txtContentDescription",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "ContentDescription",
        Width: 480,
        Textleng: 80
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
        Name: "chkSelect",
        Type: "checkboxAll",
        Caption: "",
        DataSourceMember: "AlbumID",
        Width: 50,
        iputpop: false
    },
    {
        Name: "AlbumID",
        Type: "text",
        Caption: "Mã album",
        DataSourceMember: "AlbumID",
        Width: 70
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
        Name: "chkSelect",
        Type: "checkboxAll",
        Caption: "",
        DataSourceMember: "ArticleID",
        Width: 50,
        iputpop: false
    },
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
        Name: "Content",
        Type: "textbox",
        Caption: "Nội dung",
        DataSourceMember: "Content",
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
        Name: "chkSelect",
        Type: "checkboxAll",
        Caption: "",
        DataSourceMember: "index",
        Width: 50,
        iputpop: false
    },
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
        DataSourceMember: "AlbumID",
        Width: 70,
        Link: "",
        LinkText: "Chỉnh sửa",
        iputpop: false
    }

];

export const GridMLObjectVideoDefinition = [
    {
        Name: "VideoID",
        DefaultValue: "",
        BindControlName: "VideoID",
        DataSourceMember: "VideoID"
    },
    {
        Name: "VideoName",
        DefaultValue: "",
        BindControlName: "txtVideoName",
        DataSourceMember: "VideoName"
    },
    {
        Name: "VideofileURL",
        DefaultValue: "",
        BindControlName: "txtVideofileURL",
        DataSourceMember: "VideofileURL"
    },
    {
        Name: "ImageVideofileURL",
        DefaultValue: "",
        BindControlName: "txtImageVideofileURL",
        DataSourceMember: "ImageVideofileURL"
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
export const InputProductVideoColumnList = [
    {
        Name: "txtVideoID",
        Type: "text",
        Caption: "Mã video",
        DataSourceMember: "VideoID",
        Width: 120
    },
    {
        Name: "txtVideoName",
        Type: "text",
        Caption: "Tên video",
        DataSourceMember: "VideoName",
        Width: 260
    },
    {
        Name: "txtDescription",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        Width: 350
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
        DataSourceMember: "VideoID",
        Width: 70,
        Link: "",
        LinkText: "Chỉnh sửa"
    }
];


export const MLObjectDefinition = [
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "txtProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "txtProductName",
        DataSourceMember: "ProductName"
    },
    {
        Name: "ProductshortName",
        DefaultValue: "",
        BindControlName: "txtProductshortName",
        DataSourceMember: "ProductshortName"
    },
    {
        Name: "ProductTypeID",
        DefaultValue: "0",
        BindControlName: "cboProductTypeID",
        DataSourceMember: "ProductTypeID"
    },
    {
        Name: "DefaultCategoryID",
        DefaultValue: "0",
        BindControlName: "cboDefaultCategoryID",
        DataSourceMember: "DefaultCategoryID"
    },
    {
        Name: "BrandID",
        DefaultValue: "0",
        BindControlName: "cboBrandID",
        DataSourceMember: "BrandID"
    },
    {
        Name: "DefaultquantityunitID",
        DefaultValue: "0",
        BindControlName: "cboDefaultquantityunitID",
        DataSourceMember: "DefaultquantityunitID"
    },
    {
        Name: "ModelID",
        DefaultValue: "0",
        BindControlName: "txtModelID",
        DataSourceMember: "ModelID"
    },
    {
        Name: "Age",
        DefaultValue: "0",
        BindControlName: "cboAge",
        DataSourceMember: "Age"
    },
    {
        Name: "Vat",
        DefaultValue: "0",
        BindControlName: "cboVat",
        DataSourceMember: "Vat"
    },
    {
        Name: "Povat",
        DefaultValue: "0",
        BindControlName: "cboPovat",
        DataSourceMember: "Povat"
    },
    {
        Name: "ArryProduct_Feature",
        DefaultValue: "",
        BindControlName: "ArryProduct_Feature",
        DataSourceMember: "ArryProduct_Feature"
    },
    {
        Name: "ArryProduct_ShippingMethod",
        DefaultValue: "",
        BindControlName: "ArryProduct_ShippingMethod",
        DataSourceMember: "ArryProduct_ShippingMethod"
    },
    {
        Name: "Isnovat",
        DefaultValue: true,
        BindControlName: "chkIsnovat",
        DataSourceMember: "Isnovat"
    },
    {
        Name: "Isnopovat",
        DefaultValue: false,
        BindControlName: "chkIsnopovat",
        DataSourceMember: "Isnopovat"
    },
    {
        Name: "IsrequesTimei",
        DefaultValue: false,
        BindControlName: "IsrequesTimei",
        DataSourceMember: "IsrequesTimei"
    },
    {
        Name: "Isrequestlot",
        DefaultValue: false,
        BindControlName: "Isrequestlot",
        DataSourceMember: "Isrequestlot"
    },
    {
        Name: "Isrequirepincode",
        DefaultValue: false,
        BindControlName: "Isrequirepincode",
        DataSourceMember: "Isrequirepincode"
    },
    {
        Name: "Isautocreateimei",
        DefaultValue: false,
        BindControlName: "Isautocreateimei",
        DataSourceMember: "Isautocreateimei"
    },
    {
        Name: "Ischeckinstock",
        DefaultValue: false,
        BindControlName: "Ischeckinstock",
        DataSourceMember: "Ischeckinstock"
    },
    {
        Name: "IsautogeTimei",
        DefaultValue: false,
        BindControlName: "IsautogeTimei",
        DataSourceMember: "IsautogeTimei"
    },
    {
        Name: "Isinputinstallimei",
        DefaultValue: false,
        BindControlName: "Isinputinstallimei",
        DataSourceMember: "Isinputinstallimei"
    },
    {
        Name: "Isshippingandinstall",
        DefaultValue: false,
        BindControlName: "Isshippingandinstallsssss",
        DataSourceMember: "Isshippingandinstall"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUser"
    },
    {
        Name: "LstProduct_Barcode",
        DefaultValue: {},
        BindControlName: "LstProduct_Barcode",
        DataSourceMember: "LstProduct_Barcode"
    },
    {
        Name: "LstCategory_Member",
        DefaultValue: {},
        BindControlName: "LstCategory_Member",
        DataSourceMember: "LstCategory_Member"
    },
    {
        Name: "LstProduct_Attribute",
        DefaultValue: {},
        BindControlName: "LstProduct_Attribute",
        DataSourceMember: "LstProduct_Attribute"
    },
    {
        Name: "LstProduct_ProductStatus",
        DefaultValue: {},
        BindControlName: "LstProduct_ProductStatus",
        DataSourceMember: "LstProduct_ProductStatus"
    },
    {
        Name: "LstProduct_Limit",
        DefaultValue: {},
        BindControlName: "LstProduct_Limit",
        DataSourceMember: "LstProduct_Limit"
    },
    {
        Name: "LstProduct_OutputAnotherStore",
        DefaultValue: {},
        BindControlName: "LstProduct_OutputAnotherStore",
        DataSourceMember: "LstProduct_OutputAnotherStore"
    },
    {
        Name: "LstProduct_Partnermap",
        DefaultValue: {},
        BindControlName: "LstProduct_Partnermap",
        DataSourceMember: "LstProduct_Partnermap"
    },
    {
        Name: "LstProduct_Content",
        DefaultValue: {},
        BindControlName: "LstProduct_Content",
        DataSourceMember: "LstProduct_Content"
    },
    {
        Name: "LstProduct_Album",
        DefaultValue: {},
        BindControlName: "LstProduct_Album",
        DataSourceMember: "LstProduct_Album"
    },
    {
        Name: "LstProduct_Images",
        DefaultValue: {},
        BindControlName: "LstProduct_Images",
        DataSourceMember: "LstProduct_Images"
    },
    {
        Name: "LstProduct_Video",
        DefaultValue: {},
        BindControlName: "LstProduct_Video",
        DataSourceMember: "LstProduct_Video"
    },
    {
        Name: "LstProduct_Article",
        DefaultValue: {},
        BindControlName: "LstProduct_Article",
        DataSourceMember: "LstProduct_Article"
    }


];
export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ProductID",
        Width: 70
    },
    {
        Name: "ProductID",
        Type: "texttolink",
        Caption: "Mã sản phẩm",
        Link: "/Product/Detail/",
        DataSourceMember: "ProductID",
        Width: 100
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "ProductName",
        Width: 250
    },
    {
        Name: "ProductshortName",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "ProductshortName",
        Width: 260
    },
    // {
    //     Name: "Vat",
    //     Type: "text",
    //     Caption: "Thuế VAT",
    //     DataSourceMember: "Vat",
    //     Width: 200
    // },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 50
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 100
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ProductID",
        Width: 70,
        Link: "/Product/Edit/",
        LinkText: "Chỉnh sửa"
    }
];