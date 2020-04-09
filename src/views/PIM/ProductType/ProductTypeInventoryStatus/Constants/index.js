export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ProductType_InvStatus/Search";
export const LoadAPIPath = "api/ProductType_InvStatus/Load";
export const AddAPIPath = "api/ProductType_InvStatus/Add";
export const UpdateAPIPath = "api/ProductType_InvStatus/Update";
export const DeleteAPIPath = "api/ProductType_InvStatus/Delete";

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
        DataSourceMember: "ProductTypeID,CompanyID,InventoryStatusID",
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
        Name: "CompanyID",
        Type: "combobox",
        Caption: "Công ty",
        DataSourceMember: "CompanyID",
        Width: 150,
        hideInput: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.MD_COMPANY",
        ValueMember: "CompanyID",
        NameMember: "CompanyName",
        validatonList: ["required"]
    },
    {
        Name: "CompanyName",
        Type: "text",
        Caption: "Công ty",
        DataSourceMember: "CompanyName",
        Width: 150,
        iputpop:false,
    },
    {
        Name: "InventoryStatusID",
        Type: "combobox",
        Caption: "Trạng thái hàng hóa",
        DataSourceMember: "InventoryStatusID",
        Width: 150,
        hideInput: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.INVENTORYSTATUS",
        ValueMember: "InventoryStatusID",
        NameMember: "InventoryStatusName",
        validatonList: ["required"]
    },
    {
        Name: "InventoryStatusName",
        Type: "text",
        Caption: "Trạng thái hàng hóa",
        DataSourceMember: "InventoryStatusName",
        Width: 150,
        iputpop:false,
    }
    // {
    //     Name: "Action",
    //     Type: "editnew",
    //     Caption: "Tác vụ",
    //     DataSourceMember: "AttributeID",
    //     Width: 100,
    //     Link: "",
    //     LinkText: "Chỉnh sửa",
    //     iputpop:false
    // }
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
        Name: "CompanyID",
        DefaultValue: "",
        BindControlName: "CompanyID",
        DataSourceMember: "CompanyID"
    },
    {
        Name: "CompanyName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "CompanyName"
    },
    {
        Name: "InventoryStatusID",
        DefaultValue: "",
        BindControlName: "InventoryStatusID",
        DataSourceMember: "InventoryStatusID"
    },
    {
        Name: "InventoryStatusName",
        DefaultValue: "",
        BindControlName: "InventoryStatusName",
        DataSourceMember: "InventoryStatusName"
    },
    {
        Name: "LoginLogID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: ""
    },
];
