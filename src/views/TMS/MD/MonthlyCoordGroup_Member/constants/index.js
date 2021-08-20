export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/MonthlyCoordGroup_Member/Add";
export const UpdateAPIPath = "api/MonthlyCoordGroup_Member/Update";
export const DeleteAPIPath = "api/MonthlyCoordGroup_Member/Delete";
export const GetUserAPIPath = "api/MonthlyCoordGroup_Member/GetUserByStoreID";
export const BackLink = "/CoordinatorGroup";
export const AddByFileAPIPath ="api/MonthlyCoordGroup_Member/AddByFile";

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
        DataSourceMember: "MonthlyCoordGroupID,UserName",
        Width: 60
    },
    {
        Name: "UserName",
        Type: "text",
        Caption: "Mã trưởng nhóm",
        DataSourceMember: "UserName",
        Width: 150
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Tên trưởng nhóm",
        DataSourceMember: "FullName",
        Width: 150
    },
    {
        Name: "UpdatedDate",
        Type: "date",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
        Width: 150
    },
    {
        Name: "UpdatedUserFullName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserFullName",
        Width: 150
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
        Name: "MonthlyCoordGroupID",
        DefaultValue: "",
        BindControlName: "MonthlyCoordGroupID",
        DataSourceMember: "MonthlyCoordGroupID"
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