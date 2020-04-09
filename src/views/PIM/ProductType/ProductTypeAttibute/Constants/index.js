export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ProductType_Attribute/Search";
export const LoadAPIPath = "api/ProductType_Attribute/Load";
export const AddAPIPath = "api/ProductType_Attribute/Add";
export const UpdateAPIPath = "api/ProductType_Attribute/Update";
export const DeleteAPIPath = "api/ProductType_Attribute/Delete";

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
        DataSourceMember: "ProductTypeID,AttributeID",
        Width: 100,
        iputpop:false
    },
    {
        Name: "ProductTypeName",
        Type: "text",
        readonly: true,
        Caption: "Tên loại sản phẩm",
        DataSourceMember: "ProductTypeName",
        Width: 200,
        iputpop:false,
    },
    {
        Name: "AttributeID",
        Type: "combobox",
        Caption: "Thuộc tính",
        DataSourceMember: "AttributeID",
        Width: 150,
        hideInput: false,
        forbiddenUpdate: true,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIMATTRIBUTE",
        ValueMember: "AttributeID",
        NameMember: "AttributeName",
        validatonList: ["required"]
    },
    {
        Name: "AttributeName",
        Type: "text",
        readonly: true,
        Caption: "Tên thuộc tính",
        DataSourceMember: "AttributeName",
        Width: 200,
        iputpop:false,
    },
    {
        Name: "IsvariantAttribute",
        Type: "checkbox",
        Caption: "Là thuộc tính variant",
        DataSourceMember: "IsvariantAttribute",
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
        Name: "AttributeID",
        DefaultValue: "",
        BindControlName: "AttributeID",
        DataSourceMember: "AttributeID"
    },
    {
        Name: "IsvariantAttribute",
        DefaultValue: false,
        BindControlName: "IsvariantAttribute",
        DataSourceMember: "IsvariantAttribute"
    },
    {
        Name: "LoginLogID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: ""
    },
];
