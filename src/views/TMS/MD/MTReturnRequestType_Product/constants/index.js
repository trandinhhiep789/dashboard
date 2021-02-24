export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/MTReturnRequestType_Product/Add";
export const UpdateAPIPath = "api/MTReturnRequestType_Product/Update";
export const DeleteAPIPath = "api/MTReturnRequestType_Product/Delete";
export const BackLink = "/MTReturnRequestType";

export const ModalColumnList_Insert = [
    {
        Name: "MaterialGroupID",
        type: "multiselect",
        label: "nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        readonly: false,
        value: -1,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MATERIALGROUP",
        ValueMember: "MaterialGroupID",
        NameMember: "MaterialGroupName",
        // KeyFilter: "FunctionCategoryID",
        // ValueFilter: "1,2"
    },
    {
        Name: "ProductID",
        type: "productbox",
        label: "Mã sản phẩm vật tư",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: ["Comborequired"]
    }
];

export const ModalColumnList_Edit = [
    {
        Name: "ProductID",
        type: "productbox",
        label: "Mã sản phẩm vật tư",
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: true,
        disabled: true,
        validatonList: ["Comborequired"]
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelectProductID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ProductID,MaterialGroupID",
        Width: 60
    },
    {
        Name: "MaterialGroupName",
        Type: "text",
        Caption: "Nhóm vật tư",
        DataSourceMember: "MaterialGroupName",
        Width: 500
    },
    // {
    //     Name: "ProductID",
    //     Type: "text",
    //     Caption: "Mã vật tư",
    //     DataSourceMember: "ProductID",
    //     Width: 500
    // },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Vật tư",
        DataSourceMember: "ProductName",
        Width: 500
    },
    

];

export const MLObjectDefinition = [
    {
        Name: "MaterialGroupID",
        DefaultValue: "",
        BindControlName: "MaterialGroupID",
        DataSourceMember: "MaterialGroupID"
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
        Name: "CreatedDate",
        DefaultValue: "",
        BindControlName: "CreatedDate",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "CreatedUser",
        DataSourceMember: "CreatedUser"
    }
];