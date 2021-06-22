export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/CoordinatorGroup_Member/Add";
export const UpdateAPIPath = "api/CoordinatorGroup_Member/Update";
export const DeleteAPIPath = "api/CoordinatorGroup_Member/Delete";
export const GetUserAPIPath = "api/CoordinatorGroup_Member/GetUserByStoreID";
export const BackLink = "/CoordinatorGroup";
export const AddByFileAPIPath ="api/CoordinatorGroup_Member/AddByFile";

export const ModalColumnList_Insert = [
    {
        type: "select",
        Name: "ReviewLevelID",
        label: "mức duyệt",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ReviewLevelID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: false
    },
    {
        type: "select",
        Name: "StoreID",
        label: "kho duyệt",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "StoreID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName"
    },
    {
        type: "multiselect",
        Name: "UserName",
        label: "cấp bậc kỹ năng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "UserName",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: false
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
        Name: "chkSelectUserName",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "UserName",
        Width: 60
    },
    {
        Name: "UserName",
        Type: "text",
        Caption: "Mã trưởng nhóm",
        DataSourceMember: "UserName",
        Width: 200
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Tên trưởng nhóm",
        DataSourceMember: "FullName",
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
        Name: "CoordinatorGroupID",
        DefaultValue: "",
        BindControlName: "CoordinatorGroupID",
        DataSourceMember: "CoordinatorGroupID"
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