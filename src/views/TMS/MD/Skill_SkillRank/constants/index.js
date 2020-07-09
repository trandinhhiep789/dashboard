export const AddAPIPath = "api/Skill_SkillRank/Add";
export const UpdateAPIPath = "api/Skill_SkillRank/Update";
export const DeleteAPIPath = "api/Skill_SkillRank/Delete";

export const ModalColumnList_Insert = [
    {
        type: "multiselect",
        Name: "SkillRankID",
        label: "cấp bậc kỹ năng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SkillRankID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SKILLRANK",
        ValueMember: "SkillRanKid",
        NameMember: "SkillRankName"
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
        Name: "SkillRankID",
        label: "cấp bậc kỹ năng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SkillRankID",
        readonly: true,
        disabled: true,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SKILLRANK",
        ValueMember: "SkillRanKid",
        NameMember: "SkillRankName"
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
        Name: "chkSelectSkillSkillRankCSID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "SkillSkillRankCSID",
        Width: 60
    },
    {
        Name: "SkillRankName",
        Type: "text",
        Caption: "Cấp bậc kỹ năng",
        DataSourceMember: "SkillRankName",
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
        Name: "SkillSkillRankCSID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "SkillSkillRankCSID",
        Width: 100
    }

];

export const MLObjectDefinition = [
    {
        Name: "SkillSkillRankCSID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "SkillSkillRankCSID"
    },
    {
        Name: "SkillID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "SkillID"
    },
    {
        Name: "SkillRankID",
        DefaultValue: "",
        BindControlName: "SkillRankID",
        DataSourceMember: "SkillRankID"
    },
    {
        Name: "SkillRankName",
        DefaultValue: "",
        BindControlName: "SkillRankName",
        DataSourceMember: "SkillRankName"
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