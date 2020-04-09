export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ProductType_ImeiFormat/Search";
export const LoadAPIPath = "api/ProductType_ImeiFormat/Load";
export const AddAPIPath = "api/ProductType_ImeiFormat/Add";
export const UpdateAPIPath = "api/ProductType_ImeiFormat/Update";
export const DeleteAPIPath = "api/ProductType_ImeiFormat/Delete";

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];


export const InputGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkboxAll",
        Caption: "",
        DataSourceMember: "ProductTypeID,BrandID",
        Width: 100,
        iputpop:false
    },
    {
        Name: "ProductTypeName",
        Type: "text",
        readonly: true,
        Caption: "Tên loại sản phẩm",
        DataSourceMember: "ProductTypeName",
        Width: 150,
        iputpop:false,
    },
    {
        Name: "BrandID",
        Type: "combobox",
        Caption: "Nhãn hiệu",
        DataSourceMember: "BrandID",
        Width: 150,
        hideInput: false,
        forbiddenUpdate: true,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.BRAND",
        ValueMember: "BrandID",
        NameMember: "BrandName",
        validatonList: ["required"]
    },
    {
        Name: "BrandName",
        Type: "text",
        Caption: "Nhãn hiệu",
        DataSourceMember: "BrandName",
        Width: 150,
        iputpop:false,
    },
    {
        Name: "ImeiFormatExp",
        Type: "text",
        Caption: "Định dạng IMEI sản phẩm",
        DataSourceMember: "ImeiFormatExp",
        Width: 200,
        iputpop:true,
    },
    {
        Name: "IsActived",
        Type: "checkbox",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100,
    },
    {
        Name: "IsSystem",
        Type: "checkbox",
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Width: 100,
    },
    
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "AttributeID",
        Width: 100,
        Link: "",
        LinkText: "Chỉnh sửa",
        iputpop:false
    }
];

export const InputGridMLObjectDefinition = [
    {
        Name: "ProductTypeID",
        DefaultValue: "",
        BindControlName: "ProductTypeID",
        DataSourceMember: "ProductTypeID"
    },
    {
        Name: "ProductTypeName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "ProductTypeName"
    },
    {
        Name: "BrandID",
        DefaultValue: "",
        BindControlName: "BrandID",
        DataSourceMember: "BrandID"
    },
    {
        Name: "BrandName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "BrandName"
    },
    {
        Name: "ImeiFormatExp",
        DefaultValue: "",
        BindControlName: "ImeiFormatExp",
        DataSourceMember: "ImeiFormatExp"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },

    {
        Name: "LoginLogID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: ""
    },
];
