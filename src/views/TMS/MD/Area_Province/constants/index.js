export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/Area_Province/Add";
export const UpdateAPIPath = "api/Area_Province/Update";
export const DeleteAPIPath = "api/Area_Province/Delete";
export const AddByFileAPIPath = "api/Area_Province/AddByFile";

export const ModalColumnList_Insert = [
    {
        type: "multiselect",
        Name: "ProvinceID",
        label: "tỉnh thành",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProvinceID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PROVINCE",
        ValueMember: "ProvinceID",
        NameMember: "ProvinceName"
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
        Name: "ProvinceID",
        label: "Tỉnh thành",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProvinceID",
        readonly: true,
        disabled: true,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PROVINCE",
        ValueMember: "ProvinceID",
        NameMember: "ProvinceName"
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
        Name: "chkSelectProvinceID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ProvinceID",
        Width: 60
    },
    {
        Name: "ProvinceName",
        Type: "text",
        Caption: "Tỉnh thành",
        DataSourceMember: "ProvinceName",
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
    //     Name: "ProvinceID",
    //     Type: "edit",
    //     Caption: "Sửa",
    //     DataSourceMember: "ProvinceID",
    //     Width: 100
    // }

];

export const MLObjectDefinition = [
    {
        Name: "ProvinceID",
        DefaultValue: "",
        BindControlName: "ProvinceID",
        DataSourceMember: "ProvinceID"
    },
    {
        Name: "AreaID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "AreaID"
    },
    {
        Name: "ProvinceName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "ProvinceName"
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
    'Mã tỉnh thành': {
        prop: 'ProvinceID',
        type: String,
        required: true
    }
}

export const DataTemplateExport = [
    {
        "Mã tỉnh thành": '6373'
    }
];