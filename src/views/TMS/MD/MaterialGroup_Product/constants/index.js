export const AddAPIPath = "api/Skill_SkillRank/Add";
export const UpdateAPIPath = "api/Skill_SkillRank/Update";
export const DeleteAPIPath = "api/Skill_SkillRank/Delete";

export const ModalColumnList_Insert = [
    // {
    //     type: "multiselect",
    //     Name: "SkillRankID",
    //     label: "cấp bậc kỹ năng",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "SkillRankID",
    //     readonly: false,
    //     validatonList: [],
    //     isMulti: false,
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.SKILLRANK",
    //     ValueMember: "SkillRanKid",
    //     NameMember: "SkillRankName"
    // },
    {
        Name: "ProductID",
        type: "productbox",
        label: "Mã sản phẩm vật tư",
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: ["ProductID"]
    },
    {
        Name: "ConvertRatio",
        type: "text",
        label: "Tỷ lệ quy đổi",
        maxSize: "9",
        DataSourceMember: "ConvertRatio",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "Note",
        type: "textarea",
        label: "Ghi chú",
        maxSize: "2000",
        DataSourceMember: "Note",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
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
    // {
    //     type: "multiselect",
    //     Name: "SkillRankID",
    //     label: "cấp bậc kỹ năng",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "SkillRankID",
    //     readonly: true,
    //     disabled: true,
    //     validatonList: [],
    //     isMulti: false,
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.SKILLRANK",
    //     ValueMember: "SkillRanKid",
    //     NameMember: "SkillRankName"
    // },
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
        validatonList: ["ProductID"]
    },
    {
        Name: "ConvertRatio",
        type: "text",
        label: "Tỷ lệ quy đổi",
        maxSize: "9",
        DataSourceMember: "ConvertRatio",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "Note",
        type: "textarea",
        label: "Ghi chú",
        maxSize: "2000",
        DataSourceMember: "Note",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
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
        Name: "chkSelectMaterialGroupProductCSID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "MaterialGroupProductCSID",
        Width: 60
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Sản phẩm vật tư",
        DataSourceMember: "ProductName",
        Width: 150
    },
    {
        Name: "ConvertRatio",
        Type: "text",
        Caption: "Tỷ lệ quy đổi",
        DataSourceMember: "ConvertRatio",
        Width: 150
    },
    {
        Name: "Note",
        Type: "text",
        Caption: "Ghi chú",
        DataSourceMember: "Note",
        Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 150
    },
    {
        Name: "MaterialGroupProductCSID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "MaterialGroupProductCSID",
        Width: 100
    }

];

export const MLObjectDefinition = [
    {
        Name: "MaterialGroupProductCSID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "MaterialGroupProductCSID"
    },
    {
        Name: "MaterialGroupID",
        DefaultValue: "",
        BindControlName: "",
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
        Name: "ConvertRatio",
        DefaultValue: "",
        BindControlName: "ConvertRatio",
        DataSourceMember: "ConvertRatio"
    },
    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "Note",
        DataSourceMember: "Note"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
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