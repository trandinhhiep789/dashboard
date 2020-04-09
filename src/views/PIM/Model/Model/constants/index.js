export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/Model/Search";
export const LoadAPIPath = "api/Model/Load";
export const AddAPIPath = "api/Model/Add";
export const UpdateAPIPath = "api/Model/Update";
export const DeleteAPIPath = "api/Model/Delete";
export const UpdateOrderAPIPath = "api/Model/UpdateOrder";
export const BackLink = "/Model";
export const AddLink = "/Model/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const IDSelectColumnNameModelUnit = "chkSelectModelUnit";
export const IDSelectColumnNameModelVariant = "chkSelectModelVariant";
export const PKColumnName = "ModelID";

export const LoadAPIPathModelCategory = "api/Model_Category/Search";
export const LoadAPIPathModelUnit = "api/Model_Unit/Search";
export const LoadAPIPathModelVariant = "api/Model_Variant/Search";
export const LoadAPIPathModelVariantByProduct = "api/Model_Variant/LoadByProduct";

export const UpdateAPIPathModelCategory = "api/Model_Category/Update";
export const UpdateAPIPathModelUnit = "api/Model_Unit/Update";
export const UpdateAPIPathModelVariant = "api/Model_Variant/Update";

export const AddAPIPathModelCategory = "api/Model_Category/Add";
export const AddAPIPathModelUnit = "api/Model_Unit/Add";
export const AddAPIPathModelVariant = "api/Model_Variant/Add";

export const DeleteAPIPathModelCategory = "api/Model_Category/Delete";
export const DeleteAPIPathModelUnit = "api/Model_Unit/Delete";
export const DeleteAPIPathModelVariant = "api/Model_Variant/Delete";

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];
export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/Model", Title: "Model sản phẩm" }
];
export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/Model", Title: "Model sản phẩm" },
    { Link: "", Title: "Sửa Model sản phẩm" }
];
export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/Model", Title: "Model sản phẩm" },
    { Link: "", Title: "Thêm Model sản phẩm" }
];
export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa ",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}
    }
];
export const AddElementList = [
    {
        type: "text",
        Name: "txtModelID",
        label: "Mã model",
        value: "",
        placeholder: "(ID tạo tự động)",
        icon: "",
        listoption: {},
        DataSourceMember: "ModelID",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        Name: "txtModelName",
        label: "Tên model",
        maxSize: "400",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ModelName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "select",
        Name: "txtProductTypeID",
        label: "Loại sản phẩm",
        value: "",
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
    },
    {
        type: "select",
        Name: "txtDefaultCategoryID",
        label: "Danh mục sản phẩm mặc định",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "DefaultCategoryID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CATEGORY",
        ValueMember: "CategoryID",
        NameMember: "CategoryName"
    },
    {
        type: "select",
        Name: "txtBrandID",
        label: "Nhãn hiệu",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "BrandID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.BRAND",
        ValueMember: "BrandID",
        NameMember: "BrandName"
    },
    {
        type: "select",
        Name: "txtDefaultQuantityUnitID",
        label: "Đơn vị tính mặc định",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "DefaultQuantityUnitID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.QUANTITYUNIT",
        ValueMember: "QuantityUnitID",
        NameMember: "QuantityUnitName"
    },
    {
        type: "numeric",
        Name: "txtVAT",
        label: "VAT(%)",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VAT",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        Name: "chkIsNoVAT",
        label: "Không áp dụng VAT",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "numeric",
        Name: "txtPOVAT",
        label: "VAT mua(%)",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "POVAT",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        Name: "chkIsNoPOVAT",
        label: "Không áp dụng VAT mua",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        Name: "chkIsActived",
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
        Name: "chkIsSystem",
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
export const EditElementList = [
    {
        type: "text",
        Name: "txtModelID",
        label: "Mã model",
        value: "",
        placeholder: "(ID tạo tự động)",
        icon: "",
        listoption: {},
        DataSourceMember: "ModelID",
        readonly: true,
        validatonList: []
    },
    {
        type: "text",
        Name: "txtModelName",
        label: "Tên model",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ModelName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "select",
        Name: "txtProductTypeID",
        label: "Loại sản phẩm",
        value: "",
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
    },
    {
        type: "select",
        Name: "txtDefaultCategoryID",
        label: "Danh mục mặc định",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "DefaultCategoryID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CATEGORY",
        ValueMember: "CategoryID",
        NameMember: "CategoryName"
    },
    {
        type: "select",
        Name: "txtBrandID",
        label: "Nhãn hiệu",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "BrandID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.BRAND",
        ValueMember: "BrandID",
        NameMember: "BrandName"
    },
    {
        type: "select",
        Name: "txtDefaultQuantityUnitID",
        label: "Đơn vị tính mặc định",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "DefaultQuantityUnitID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.QUANTITYUNIT",
        ValueMember: "QuantityUnitID",
        NameMember: "QuantityUnitName"
    },
    {
        type: "numeric",
        Name: "txtVAT",
        label: "VAT(%)",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VAT",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        Name: "chkIsNoVAT",
        label: "Không áp dụng VAT",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsNoVAT",
        readonly: false,
        validatonList: []
    },
    {
        type: "numeric",
        Name: "txtPOVAT",
        label: "VAT mua(%)",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "POVAT",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        Name: "chkIsNoPOVAT",
        label: "Không áp dụng VAT mua",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsNoPOVAT",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        Name: "chkIsActived",
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
        Name: "chkIsSystem",
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
export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];
export const AddModelColumnList = [
    {
        Name: "ModelName",
        type: "text",
        label: "Tên Model",
        DataSourceMember: "ModelName",
        readonly: false,
        validatonList: ["required"],
        value: ""
    },
    {
        Name: "ProductTypeID",
        type: "select",
        label: "Loại sản phẩm",
        DataSourceMember: "ProductTypeID",
        readonly: false,
        validatonList: ["required"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PRODUCTTYPE",
        ValueMember: "ProductTypeID",
        NameMember: "ProductTypeName",
        value: ""
    },
    {
        Name: "ProductName",
        type: "text",
        label: "Tên sản phẩm tham chiếu",
        DataSourceMember: "ProductName",
        readonly: false,
        validatonList: [],
        value: ""
    },
    {
        Name: "DefaultCategoryID",
        type: "select",
        label: "Danh mục mặc định",
        DataSourceMember: "DefaultCategoryID",
        readonly: false,
        validatonList: ["required"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CATEGORY",
        ValueMember: "CategoryID",
        NameMember: "CategoryName",
        value: ""
    },
    {
        Name: "BrandID",
        type: "select",
        label: "Nhãn hiệu",
        DataSourceMember: "BrandID",
        readonly: false,
        validatonList: ["required"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.BRAND",
        ValueMember: "BrandID",
        NameMember: "BrandName",
        value: ""
    },
    {
        Name: "DefaultQuantityUnitID",
        type: "select",
        label: "Đơn vị mặc định",
        DataSourceMember: "DefaultQuantityUnitID",
        readonly: false,
        validatonList: ["required"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.QUANTITYUNIT",
        ValueMember: "QuantityUnitID",
        NameMember: "QuantityUnitName",
        value: ""
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: "true"
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: []
    }
];
export const MLObjectDefinition = [
    {
        Name: "ModelID",
        DefaultValue: "",
        BindControlName: "txtModelID",
        DataSourceMember: "ModelID"
    },
    {
        Name: "ModelName",
        DefaultValue: "",
        BindControlName: "txtModelName",
        DataSourceMember: "ModelName"
    },
    {
        Name: "ProductTypeID",
        DefaultValue: "",
        BindControlName: "txtProductTypeID",
        DataSourceMember: "ProductTypeID"
    },
    {
        Name: "ModelDescription",
        DefaultValue: "",
        BindControlName: "txtModelDescription",
        DataSourceMember: "ModelDescription"
    },
    {
        Name: "DefaultImageURL",
        DefaultValue: "",
        BindControlName: "txtDefaultImageURL",
        DataSourceMember: "DefaultImageURL"
    },
    {
        Name: "DefaultQuantityUnitID",
        DefaultValue: "",
        BindControlName: "txtDefaultQuantityUnitID",
        DataSourceMember: "DefaultQuantityUnitID"
    },
    {
        Name: "BrandID",
        DefaultValue: "",
        BindControlName: "txtBrandID",
        DataSourceMember: "BrandID"
    },
    {
        Name: "DefaultCategoryID",
        DefaultValue: "",
        BindControlName: "txtDefaultCategoryID",
        DataSourceMember: "DefaultCategoryID"
    },
    {
        Name: "VAT",
        DefaultValue: 0,
        BindControlName: "txtVAT",
        DataSourceMember: "VAT"
    },
    {
        Name: "IsNoVAT",
        DefaultValue: false,
        BindControlName: "chkIsNoVAT",
        DataSourceMember: "IsNoVAT"
    },
    {
        Name: "POVAT",
        DefaultValue: 0,
        BindControlName: "txtPOVAT",
        DataSourceMember: "POVAT"
    },
    {
        Name: "IsNoPOVAT",
        DefaultValue: false,
        BindControlName: "chkIsNoPOVAT",
        DataSourceMember: "IsNoPOVAT"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUser"
    },
    {
        Name: "LstModel_Lang",
        DefaultValue: "",
        BindControlName: "inputGridModel_Lang",
        DataSourceMember: "inputGridModel_Lang"
    },
    {
        Name: "LstModel_Category",
        DefaultValue: "",
        BindControlName: "inputGridModel_Category",
        DataSourceMember: "inputGridModel_Category"
    },
    {
        Name: "LstModel_Unit",
        DefaultValue: "",
        BindControlName: "inputGridModel_Unit",
        DataSourceMember: "inputGridModel_Unit"
    },
    {
        Name: "LstModel_Variant",
        DefaultValue: "",
        BindControlName: "inputGridModel_Variant",
        DataSourceMember: "inputGridModel_Variant"
    }
];
export const MLObjectDefinition1 = [
    {
        Name: "ModelID",
        DefaultValue: "",
        BindControlName: "ModelID",
        DataSourceMember: "ModelID"
    },
    {
        Name: "ModelName",
        DefaultValue: "",
        BindControlName: "ModelName",
        DataSourceMember: "ModelName"
    },
    {
        Name: "ProductTypeID",
        DefaultValue: "",
        BindControlName: "ProductTypeID",
        DataSourceMember: "ProductTypeID"
    },
    {
        Name: "ModelDescription",
        DefaultValue: "",
        BindControlName: "ModelDescription",
        DataSourceMember: "ModelDescription"
    },
    {
        Name: "DefaultImageURL",
        DefaultValue: "",
        BindControlName: "DefaultImageURL",
        DataSourceMember: "DefaultImageURL"
    },
    {
        Name: "DefaultQuantityUnitID",
        DefaultValue: "",
        BindControlName: "DefaultQuantityUnitID",
        DataSourceMember: "DefaultQuantityUnitID"
    },
    {
        Name: "BrandID",
        DefaultValue: "",
        BindControlName: "BrandID",
        DataSourceMember: "BrandID"
    },
    {
        Name: "DefaultCategoryID",
        DefaultValue: "",
        BindControlName: "DefaultCategoryID",
        DataSourceMember: "DefaultCategoryID"
    },
    {
        Name: "VAT",
        DefaultValue: 0,
        BindControlName: "VAT",
        DataSourceMember: "VAT"
    },
    {
        Name: "IsNoVAT",
        DefaultValue: false,
        BindControlName: "IsNoVAT",
        DataSourceMember: "IsNoVAT"
    },
    {
        Name: "POVAT",
        DefaultValue: 0,
        BindControlName: "POVAT",
        DataSourceMember: "POVAT"
    },
    {
        Name: "IsNoPOVAT",
        DefaultValue: false,
        BindControlName: "IsNoPOVAT",
        DataSourceMember: "IsNoPOVAT"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "CreatedUser",
        DataSourceMember: "CreatedUser"
    }
];
export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ModelID",
        Width: 50
    },
    {
        Name: "ModelID",
        Type: "text",
        Caption: "Mã Model",
        DataSourceMember: "ModelID",
        Width: 250
    },
    {
        Name: "ModelName",
        Type: "text",
        Caption: "Tên Model",
        DataSourceMember: "ModelName",
        Width: 300
    },
    {
        Name: "ProductTypeID",
        Type: "text",
        Caption: "Loại sản phẩm ",
        DataSourceMember: "ProductTypeName",
        Width: 250
    },
    {
        Name: "BrandID",
        Type: "text",
        Caption: "Nhà sản xuất",
        DataSourceMember: "BrandName",
        Width: 200
    },
    {
        Name: "DefaultCategoryID",
        Type: "text",
        Caption: "Danh mục mặc định",
        DataSourceMember: "DefaultCategoryName",
        Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 150
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 200
    },
    {
        Name: "CreatedFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedFullName",
        Width: 200
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ModelID",
        Width: 200,
        Link: "/Model/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
export const GridMLObjectDefinitionAttributeValue = [
    {
        Name: "AttributeID",
        DefaultValue: "",
        BindControlName: "AttributeID",
        DataSourceMember: "AttributeID"
    },
    {
        Name: "AttributeName",
        DefaultValue: "",
        BindControlName: "AttributeName",
        DataSourceMember: "AttributeName"
    },
    {
        Name: "AttributeValueID",
        DefaultValue: "",
        BindControlName: "AttributeValueID",
        DataSourceMember: "AttributeValueID"
    },
    {
        Name: "AttributeValueName",
        DefaultValue: "",
        BindControlName: "AttributeValueName",
        DataSourceMember: "AttributeValueName"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    }
];
export const InputAttributeValueColumnList = [
    {
        Name: "AttributeID",
        Type: "text",
        Caption: "Thuộc tính",
        DataSourceMember: "AttributeName",
        Width: 150
    },
    {
        Name: "AttributeValueID",
        Type: "combobox",
        Caption: "Giá trị thuộc tính",
        DataSourceMember: "AttributeValueID",
        Width: 200,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.ATTRIBUTEVALUE",
        ValueMember: "AttributeValueID",
        NameMember: "AttributeValue",
        IsFilterData: true,
        KeyFilter: "AttributeID",
        ValueFilter: ""
    },
    {
        Name: "IsActived",
        Type: "checkbox",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100
    },
    // {
    //     Name: "Action",
    //     Type: "buttonDelete",
    //     Caption: "Xóa thuộc tính",
    //     Width: 150,
    //     LinkText: "Xóa thuộc tính"
    // }
];
export const InputModelCategoryColumnList = [
    {
        Name: "CategoryTypeName",
        Type: "text",
        Caption: "Loại danh mục",
        DataSourceMember: "CategoryTypeName",
        Width: 150
    },
    {
        Name: "CategoryID",
        Type: "combobox",
        Caption: "Danh mục chọn",
        DataSourceMember: "CategoryID",
        Width: 200,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CATEGORY",
        ValueMember: "CategoryID",
        NameMember: "CategoryName",
        IsFilterData: true,
        KeyFilter: "CategoryTypeID",
        ValueFilter: ""
    }
];
export const GridMLObjectModelCategoryDefinition = [
    {
        Name: "CategoryTypeID",
        DefaultValue: "",
        BindControlName: "CategoryTypeID",
        DataSourceMember: "CategoryTypeID"
    },
    {
        Name: "CategoryID",
        DefaultValue: "",
        BindControlName: "CategoryID",
        DataSourceMember: "CategoryID"
    },
    {
        Name: "Comments",
        DefaultValue: "",
        BindControlName: "Comments",
        DataSourceMember: "Comments"
    }
];
export const InputModelUnitColumnList = [
    {
        Name: "chkSelectModelUnit",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "QuantityUnitID",
        Width: 50
    },
    {
        Name: "QuantityUnitID",
        Type: "text",
        Caption: "Mã đơn vị tính",
        DataSourceMember: "QuantityUnitID",
        Width: 100
    },
    {
        Name: "QuantityUnitName",
        Type: "text",
        Caption: "Tên đơn vị tính",
        DataSourceMember: "QuantityUnitName",
        Width: 100
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã Sản phẩm tham chiếu",
        DataSourceMember: "ProductID",
        Width: 250
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên Sản phẩm tham chiếu",
        DataSourceMember: "ProductName",
        Width: 250
    },
    {
        Name: "ExchangeQuantity",
        Type: "text",
        Caption: "SL quy đổi",
        DataSourceMember: "ExchangeQuantity",
        Width: 100
    },
    {
        Name: "IsDefaultUnit",
        Type: "checkicon",
        Caption: "Mặc định",
        DataSourceMember: "IsDefaultUnit",
        Width: 100
    },
    {
        Name: "Action",
        Type: "buttonEdit",
        Caption: "Chỉnh sửa",
        DataSourceMember: "QuantityUnitID",
        Width: 150,
        Link: "/Model/Edit/ModelUnit/",
        LinkText: "Chỉnh sửa"
    }
];
export const GridMLObjectModelUnitDefinition = [
    {
        Name: "QuantityUnitID",
        DefaultValue: "",
        BindControlName: "QuantityUnitID",
        DataSourceMember: "QuantityUnitID"
    },
    {
        Name: "QuantityUnitName",
        DefaultValue: "",
        BindControlName: "QuantityUnitName",
        DataSourceMember: "QuantityUnitName"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "ProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "ProductName",
        DataSourceMember: "ProductName"
    },
    {
        Name: "ExchangeQuantity",
        DefaultValue: 0,
        BindControlName: "ExchangeQuantity",
        DataSourceMember: "ExchangeQuantity"
    },
    {
        Name: "IsDefaultUnit",
        DefaultValue: "",
        BindControlName: "IsDefaultUnit",
        DataSourceMember: "IsDefaultUnit"
    }
];
export const AddModelUnitColumnList = [
    {
        type: "select",
        Name: "QuantityUnitID",
        label: "Đơn vị tính",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "QuantityUnitID",
        readonly: false,
        validatonList: ["required"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.QUANTITYUNIT",
        ValueMember: "QuantityUnitID",
        NameMember: "QuantityUnitName"
    },
    {
        type: "select",
        Name: "ProductID",
        label: "Sản phẩm tham chiếu",
        value: "",
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: [],
        listoption: [],
        DataSourceMember: "ProductID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIM_PRODUCT",
        ValueMember: "ProductID",
        NameMember: "ProductName"
    },
    {
        Name: "ExchangeQuantity",
        type: "numeric",
        value: 0,
        maxSize: "10",
        label: "SL quy đổi",
        DataSourceMember: "ExchangeQuantity",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "IsDefaultUnit",
        type: "checkbox",
        value: "",
        label: "Mặc định",
        DataSourceMember: "IsDefaultUnit",
        readonly: false,
        validatonList: []
    }
];
export const ModifyModalColumnList = [
    {
        type: "select",
        Name: "QuantityUnitID",
        label: "Đơn vị tính",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "QuantityUnitID",
        readonly: true,
        disabled: true,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.QUANTITYUNIT",
        ValueMember: "QuantityUnitID",
        NameMember: "QuantityUnitName"
    },
    {
        type: "select",
        Name: "ProductID",
        label: "Sản phẩm tham chiếu",
        DataSourceMember: "ProductID",
        readonly: true,
        validatonList: [],
        listoption: [],
        DataSourceMember: "ProductID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIM_PRODUCT",
        ValueMember: "ProductID",
        NameMember: "ProductName"
    },
    {
        Name: "ExchangeQuantity",
        type: "numeric",
        label: "SL quy đổi",
        maxSize: "10",
        DataSourceMember: "ExchangeQuantity",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "IsDefaultUnit",
        type: "checkbox",
        label: "Mặc định",
        DataSourceMember: "IsDefaultUnit",
        readonly: false,
        validatonList: []
    }
];
export const ModalModelUnitMLObjectDefinition = [
    {
        Name: "QuantityUnitID",
        DefaultValue: "",
        BindControlName: "QuantityUnitID",
        DataSourceMember: "QuantityUnitID"
    },
    {
        Name: "QuantityUnitName",
        DefaultValue: "",
        BindControlName: "QuantityUnitName",
        DataSourceMember: "QuantityUnitName"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "ProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "ProductName",
        DataSourceMember: "ProductName"
    },
    {
        Name: "ExchangeQuantity",
        DefaultValue: 0,
        BindControlName: "ExchangeQuantity",
        DataSourceMember: "ExchangeQuantity"
    },
    {
        Name: "IsDefaultUnit",
        DefaultValue: "",
        BindControlName: "IsDefaultUnit",
        DataSourceMember: "IsDefaultUnit"
    }
];
export const InputModelVariantColumnList = [
    {
        Name: "chkSelectModelVariant",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ModelVariantID",
        Width: 50
    },
    {
        Name: "ModelVariantID",
        Type: "text",
        Caption: "Mã biến thể",
        DataSourceMember: "ModelVariantID",
        Width: 100
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã Sản phẩm biến thể",
        DataSourceMember: "ProductID",
        Width: 150
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên Sản phẩm biến thể",
        DataSourceMember: "ProductName",
        Width: 250
    },
    {
        Name: "AttributeID",
        Type: "text",
        Caption: "Thuộc tính",
        DataSourceMember: "AttributeName",
        Width: 200
    },
    {
        Name: "AttributeValueID",
        Type: "text",
        Caption: "Giá trị thuộc tính",
        DataSourceMember: "AttributeValue",
        Width: 200
    },
    {
        Name: "IsActived_Parent",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived_Parent",
        Width: 150
    },
    {
        Name: "Action",
        Type: "buttonEdit",
        Caption: "Chỉnh sửa",
        DataSourceMember: "ModelVariantID",
        Width: 150,
        Link: "/Model/Edit/ModelVariant/",
        LinkText: "Chỉnh sửa"
    }
];
export const GridMLObjectModelVariantDefinition = [
    {
        Name: "ModelVariantID",
        DefaultValue: "",
        BindControlName: "ModelVariantID",
        DataSourceMember: "ModelVariantID"
    },
    {
        Name: "VariantDescription",
        DefaultValue: "",
        BindControlName: "VariantDescription",
        DataSourceMember: "VariantDescription"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "ProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "ProductName",
        DataSourceMember: "ProductName"
    },
    {
        Name: "AttributeID",
        DefaultValue: "",
        BindControlName: "AttributeID",
        DataSourceMember: "AttributeID"
    },
    {
        Name: "AttributeName",
        DefaultValue: "",
        BindControlName: "AttributeName",
        DataSourceMember: "AttributeName"
    },
    {
        Name: "AttributeValueID",
        DefaultValue: "",
        BindControlName: "AttributeValueID",
        DataSourceMember: "AttributeValueID"
    },
    {
        Name: "AttributeValue",
        DefaultValue: "",
        BindControlName: "AttributeValue",
        DataSourceMember: "AttributeValue"
    },
    {
        Name: "IsActived_Parent",
        DefaultValue: "",
        BindControlName: "IsActived_Parent",
        DataSourceMember: "IsActived_Parent"
    }
];
export const AddModelVariantColumnList = [
    {
        name: "ProductID",
        type: "select",
        label: "Sản phẩm biến thể",
        readonly: false,
        validatonList: [],
        listoption: [],
        DataSourceMember: "ProductID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIM_PRODUCT",
        ValueMember: "ProductID",
        NameMember: "ProductName"
    },
    {
        name: "IsActived_Parent",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived_Parent",
        readonly: false,
        validatonList: [],
        value: "true"
    }
];
export const ModifyModelVariantColumnList = [
    {
        Name: "ModelVariantID",
        type: "text",
        label: "Mã biến thể",
        placeholder: "",
        DataSourceMember: "ModelVariantID",
        readonly: true,
        validatonList: []
    },
    {
        type: "select",
        Name: "ProductID",
        label: "Sản phẩm biến thể",
        readonly: false,
        validatonList: [],
        listoption: [],
        DataSourceMember: "ProductID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIM_PRODUCT",
        ValueMember: "ProductID",
        NameMember: "ProductName"
    },
    {
        type: "select",
        Name: "AttributeID",
        label: "Thuộc tính",
        readonly: false,
        validatonList: [],
        listoption: [],
        DataSourceMember: "AttributeID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIMATTRIBUTE",
        ValueMember: "AttributeID",
        NameMember: "AttributeName"
    },
    {
        type: "multiselect",
        Name: "AttributeValueID",
        label: "Giá trị thuộc tính",
        readonly: false,
        validatonList: [],
        listoption: [],
        DataSourceMember: "AttributeValueID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.ATTRIBUTEVALUE",
        ValueMember: "AttributeValueID",
        NameMember: "AttributeValue"
    },
    {
        Name: "VariantDescription",
        type: "textarea",
        label: "Mô tả",
        DataSourceMember: "VariantDescription",
        readonly: false,
        validatonList: [],
        rows: "6"
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: "true"
    }
];
export const ModalModelVariantMLObjectDefinition = [
    {
        Name: "ModelVariantID",
        DefaultValue: "",
        BindControlName: "ModelVariantID",
        DataSourceMember: "ModelVariantID"
    },
    {
        Name: "VariantDescription",
        DefaultValue: "",
        BindControlName: "VariantDescription",
        DataSourceMember: "VariantDescription"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "ProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "ProductName",
        DataSourceMember: "ProductName"
    },
    {
        Name: "AttributeID",
        DefaultValue: "",
        BindControlName: "AttributeID",
        DataSourceMember: "AttributeID"
    },
    {
        Name: "AttributeName",
        DefaultValue: "",
        BindControlName: "AttributeName",
        DataSourceMember: "AttributeName"
    },
    {
        Name: "AttributeValueID",
        DefaultValue: "",
        BindControlName: "AttributeValueID",
        DataSourceMember: "AttributeValueID"
    },
    {
        Name: "AttributeValueName",
        DefaultValue: "",
        BindControlName: "AttributeValueName",
        DataSourceMember: "AttributeValueName"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    }
];
