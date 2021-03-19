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
        type: "multiselect",
        label: "sản phẩm vật tư",
        DataSourceMember: "ProductID",
        readonly: false,
        value: -1,
        listoption: [],
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MATERIALGROUP",
        ValueMember: "MaterialGroupID",
        NameMember: "MaterialGroupName",
        // KeyFilter: "FunctionCategoryID",
        // ValueFilter: "1,2"
    },
    // {
    //     Name: "ProductID",
    //     type: "productbox",
    //     label: "Mã sản phẩm vật tư",
    //     colspan: 12,
    //     isMulti: false,
    //     DataSourceMember: "ProductID",
    //     readonly: false,
    //     validatonList: ["Comborequired"]
    // },
    {
        Name: "IsCheckMinMaxQuality",
        type: "checkbox",
        label: "Có kiểm tra số lượng nhỏ nhất, lớn nhất",
        colspan: 12,
        value: true,
        DataSourceMember: "IsCheckMinMaxQuality",
        readonly: false,
        validatonList: []
    },
    {
        Name: "MinQuality",
        type: "text",
        label: "số lượng nhỏ nhất",
        maxSize: "19",
        value: 0,
        DataSourceMember: "MinQuality",
        readonly: false,
        validatonList: ["digit"]
    },
    {
        Name: "MaxQuality",
        type: "text",
        label: "số lượng lớn nhất",
        maxSize: "19",
        value: 0,
        DataSourceMember: "MaxQuality",
        readonly: false,
        validatonList: ["digit"]
    },
    {
        Name: "InventoryStatusID",
        type: "multiselect",
        label: "trạng thái tồn kho",
        DataSourceMember: "InventoryStatusID",
        readonly: false,
        value: -1,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPRELATECACHE.INVENTORYSTATUS",
        ValueMember: "InventoryStatusID",
        NameMember: "InventoryStatusName"
    }

];

export const ModalColumnList_Edit = [
    {
        Name: "MaterialGroupID",
        type: "multiselect",
        label: "nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        readonly: true,
        disabled: true,
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
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: true,
        disabled: true,
        validatonList: ["Comborequired"]
    },
    {
        Name: "IsCheckMinMaxQuality",
        type: "checkbox",
        label: "Có kiểm tra số lượng nhỏ nhất, lớn nhất",
        colspan: 12,
        value: false,
        DataSourceMember: "IsCheckMinMaxQuality",
        readonly: false,
        validatonList: []
    },
    {
        Name: "MinQuality",
        type: "text",
        label: "số lượng nhỏ nhất",
        maxSize: "19",
        value: 0,
        DataSourceMember: "MinQuality",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "MaxQuality",
        type: "text",
        label: "số lượng lớn nhất",
        maxSize: "19",
        value: 0,
        DataSourceMember: "MaxQuality",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "InventoryStatusID",
        type: "multiselect",
        label: "trạng thái tồn kho",
        DataSourceMember: "InventoryStatusID",
        readonly: false,
        value: -1,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPRELATECACHE.INVENTORYSTATUS",
        ValueMember: "InventoryStatusID",
        NameMember: "InventoryStatusName"
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
        Width: 200
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
        Width: 200
    },
    {
        Name: "IsCheckMinMaxQuality",
        Type: "checkicon",
        Caption: "Kiểm tra số lượng lớn nhất, nhỏ nhất",
        DataSourceMember: "IsCheckMinMaxQuality",
        Width: 160
    },
    {
        Name: "MinQuality",
        Type: "text",
        Caption: "Số lượng lớn nhất",
        DataSourceMember: "MinQuality",
        Width: 120
    },
    {
        Name: "MaxQuality",
        Type: "text",
        Caption: "Số lượng nhỏ nhất",
        DataSourceMember: "MaxQuality",
        Width: 120
    },
    {
        Name: "EditProductIDMaterialGroupID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "ProductID,MaterialGroupID",
        Width: 100
    }

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
    },
    {
        Name: "IsCheckMinMaxQuality",
        DefaultValue: "",
        BindControlName: "IsCheckMinMaxQuality",
        DataSourceMember: "IsCheckMinMaxQuality"
    },
    {
        Name: "MinQuality",
        DefaultValue: "",
        BindControlName: "MinQuality",
        DataSourceMember: "MinQuality"
    },
    {
        Name: "MaxQuality",
        DefaultValue: "",
        BindControlName: "MaxQuality",
        DataSourceMember: "MaxQuality"
    },
    {
        Name: "InventoryStatusID",
        DefaultValue: "",
        BindControlName: "InventoryStatusID",
        DataSourceMember: "InventoryStatusID"
    },
];