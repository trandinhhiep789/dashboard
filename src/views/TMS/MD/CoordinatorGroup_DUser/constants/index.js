export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/CoordinatorGroup_DUser/Add";
export const UpdateAPIPath = "api/CoordinatorGroup_DUser/Update";
export const DeleteAPIPath = "api/CoordinatorGroup_DUser/Delete";
export const GetUserAPIPath = "api/CoordinatorGroup_DUser/GetUserByStoreID";
export const BackLink = "/CoordinatorGroup";
export const AddByFileAPIPath ="api/CoordinatorGroup_DUser/AddByFile";

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
        Caption: "Mã nhân viên giao hàng",
        DataSourceMember: "UserName",
        Width: 200
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Tên nhân viên giao hàng",
        DataSourceMember: "FullName",
        Width: 300
    },
    {
        Name: "IsSystem",
        Type: "checkicon",
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Width: 200
    },
    {
        Name: "EditUserName",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "UserName",
        Width: 100
    }



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
    'Mã nhân viên giao hàng': {
        prop: 'UserName',
        type: String,
        required: true
    },
    'Hệ thống': {
        prop: 'IsSystem',
        type: Number
    },
}

export const DataTemplateExport = [
    {
        "Mã nhân viên giao hàng": '98138',
        "Hệ thống": 0
    }
];
