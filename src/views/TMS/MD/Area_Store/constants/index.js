export const AddAPIPath = "api/Skill_SkillRank/Add";
export const UpdateAPIPath = "api/Skill_SkillRank/Update";
export const DeleteAPIPath = "api/Skill_SkillRank/Delete";

export const ModalColumnList_Insert = [
    {
        type: "select",
        Name: "StoreID",
        label: "chi nhánh",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "StoreID",
        readonly: false,
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

export const ModalColumnList_Edit = [
    {
        type: "select",
        Name: "StoreID",
        label: "chi nhánh",
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
        Caption: "Chi nhánh",
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
        Name: "AreaStoreCSID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "AreaStoreCSID",
        Width: 100
    }

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