export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/Store_Area/Add";
export const UpdateAPIPath = "api/Store_Area/Update";
export const DeleteAPIPath = "api/Store_Area/Delete";
export const AddByFileAPIPath = "api/Store_Area/AddByFile";

export const ModalColumnList_Insert = [
    // {
    //     type: "multiselect",
    //     Name: "AreaID",
    //     label: "khu vực",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "AreaID",
    //     readonly: false,
    //     validatonList: [],
    //     isMulti: false,
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.AREA",
    //     ValueMember: "AreaID",
    //     NameMember: "AreaName"
    // },
    {
        type: "multiselect",
        Name: "StoreID",
        label: "kho điều phối",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "StoreID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        // KeyFilter: "CompanyID",
        // ValueFilter: "10"
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];

export const ModalColumnList_Edit = [
    {
        type: "multiselect",
        Name: "StoreID",
        label: "kho điều phối",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "StoreID",
        readonly: true,
        disabled: true,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName"
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelectAreaStoreCSID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "AreaStoreCSID",
        Width: 60
    },
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "StoreName",
        Width: 350
    },
    {
        Name: "IsSystem",
        Type: "checkicon",
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Width: 150
    },
    {
        Name: "UpdatedDate",
        Type: "date",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
        Width: 140
    },
    {
        Name: "UpdatedUserFullName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserFullName",
        Width: 140
    },
    // {
    //     Name: "AreaStoreCSID",
    //     Type: "edit",
    //     Caption: "Sửa",
    //     DataSourceMember: "AreaStoreCSID",
    //     Width: 100
    // }

];

export const MLObjectDefinition = [
    {
        Name: "AreaStoreCSID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "AreaStoreCSID"
    },
    {
        Name: "StoreID",
        DefaultValue: "",
        BindControlName: "StoreID",
        DataSourceMember: "StoreID"
    },
    {
        Name: "AreaID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "AreaID"
    },
    {
        Name: "StoreName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "StoreName"
    },
    // {
    //     Name: "IsActived",
    //     DefaultValue: true,
    //     BindControlName: "IsActived",
    //     DataSourceMember: "IsActived"
    // },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
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

export const schema = {
    'Mã kho điều phối': {
        prop: 'StoreID',
        type: String,
        required: true
    }
}

export const DataTemplateExport = [
    {
        "Mã kho điều phối": '6373'
    }
];