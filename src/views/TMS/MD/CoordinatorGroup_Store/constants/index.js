export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/CoordinatorGroup_Store/Add";
export const UpdateAPIPath = "api/CoordinatorGroup_Store/Update";
export const DeleteAPIPath = "api/CoordinatorGroup_Store/Delete";
export const GetUserAPIPath = "api/CoordinatorGroup_Store/GetUserByStoreID";
export const BackLink = "/CoordinatorGroup";
export const AddByFileAPIPath ="api/CoordinatorGroup_Store/AddByFile";

export const ModalColumnList_Insert = [
    {
        type: "select",
        Name: "SenderStoreID",
        label: "kho đối tác",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SenderStoreID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        KeyFilter: "CompanyID",
        ValueFilter: 10

    },
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
        Name: "chkSelectSenderStoreID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "SenderStoreID",
        Width: 60
    },
    {
        Name: "SenderStoreID",
        Type: "text",
        Caption: "Mã kho đối tác",
        DataSourceMember: "SenderStoreID",
        Width: 200
    },
    {
        Name: "SenderStoreName",
        Type: "text",
        Caption: "Tên kho đối tác",
        DataSourceMember: "SenderStoreName",
        Width: 300
    },
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 200
    // },
    // {
    //     Name: "EditUserName",
    //     Type: "edit",
    //     Caption: "Sửa",
    //     DataSourceMember: "UserName",
    //     Width: 100
    // }



];

export const MLObjectDefinition = [
    {
        Name: "CSID",
        DefaultValue: "",
        BindControlName: "CSID",
        DataSourceMember: "CSID"
    },
    {
        Name: "SenderStoreID",
        DefaultValue: "",
        BindControlName: "SenderStoreID",
        DataSourceMember: "SenderStoreID"
    },
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "UserName",
        DataSourceMember: "UserName"
    },
    {
        Name: "FullName",
        DefaultValue: "",
        BindControlName: "FullName",
        DataSourceMember: "FullName"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "chkIsSystem",
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
    'Mã trưởng nhóm': {
        prop: 'UserName',
        type: String,
        required: true
    }
}

export const DataTemplateExport = [
    {
        "Mã trưởng nhóm": '98138'
    }
];