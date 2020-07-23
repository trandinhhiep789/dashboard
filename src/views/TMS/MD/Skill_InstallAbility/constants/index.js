export const AddAPIPath = "api/Skill_InstallAbility/Add";
export const UpdateAPIPath = "api/Skill_InstallAbility/Update";
export const DeleteAPIPath = "api/Skill_InstallAbility/Delete";

export const ModalColumnList_Insert = [
    {
        type: "multiselect",
        Name: "MainGroupID",
        label: "Ngành hàng",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "MainGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        ValueMember: "MainGroupID",
        NameMember: "MainGroupName"
    },
    {
        type: "multiselect",
        Name: "SubGroupID",
        label: "Nhóm hàng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: ["required"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        type: "multiselect",
        Name: "TechspecsID",
        label: "Thông số kỹ thuật",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "TechspecsID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUPTECHSPECS",
        ValueMember: "TechspecsID",
        NameMember: "TechspecsName"
    },
    {
        type: "multiselect",
        Name: "TechspecsValueID",
        label: "Giá trị thông số kỹ thuật",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "TechspecsValueID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECSVALUE",
        ValueMember: "TechSpecsValueID",
        NameMember: "Value"
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
    //     Name: "MainGroupID",
    //     label: "Ngành hàng",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     //listoption: [],
    //     DataSourceMember: "MainGroupID",
    //     readonly: true,
    //     disabled: true,
    //     validatonList: [],
    //     isMulti: false,
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
    //     ValueMember: "MainGroupID",
    //     NameMember: "MainGroupName"
    // },
    {
        type: "multiselect",
        Name: "SubGroupID",
        label: "Nhóm hàng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SubGroupID",
        readonly: true,
        disabled: true,
        validatonList: ["required"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        type: "multiselect",
        Name: "TechspecsID",
        label: "Thông số kỹ thuật",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "TechspecsID",
        readonly: true,
        disabled: true,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUPTECHSPECS",
        ValueMember: "TechspecsID",
        NameMember: "TechspecsName"
    },
    {
        type: "multiselect",
        Name: "TechspecsValueID",
        label: "Giá trị thông số kỹ thuật",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "TechspecsValueID",
        readonly: true,
        disabled: true,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECSVALUE",
        ValueMember: "TechSpecsValueID",
        NameMember: "Value"
    },
    {
        Name: "Note",
        type: "textarea",
        label: "Ghi chú",
        maxSize: "1900",
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
        value: ""
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: ""
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelectSkillInstallAbilityCSID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "SkillInstallAbilityCSID",
        Width: 60
    },
    
    {
        Name: "SubGroupName",
        Type: "text",
        Caption: "Nhóm hàng",
        DataSourceMember: "SubGroupName",
        Width: 350
    },
    {
        Name: "TechspecsName",
        Type: "text",
        Caption: "Thông số kỹ thuật",
        DataSourceMember: "TechspecsName",
        Width: 350
    },
    {
        Name: "TechspecsValueName",
        Type: "text",
        Caption: "Giá trị thông số KT",
        DataSourceMember: "TechspecsValueName",
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
        Name: "SkillInstallAbilityCSID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "SkillInstallAbilityCSID",
        Width: 100
    }

];

export const MLObjectDefinition = [
    {
        Name: "SkillInstallAbilityCSID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "SkillInstallAbilityCSID"
    },
    {
        Name: "SkillID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "SkillID"
    },
    {
        Name: "MainGroupID",
        DefaultValue: "",
        BindControlName: "MainGroupID",
        DataSourceMember: "MainGroupID"
    },
    {
        Name: "SubGroupID",
        DefaultValue: "",
        BindControlName: "SubGroupID",
        DataSourceMember: "SubGroupID"
    },
    {
        Name: "SubGroupName",
        DefaultValue: "",
        BindControlName: "SubGroupName",
        DataSourceMember: "SubGroupName"
    },
    {
        Name: "TechspecsID",
        DefaultValue: "",
        BindControlName: "TechspecsID",
        DataSourceMember: "TechspecsID"
    },
    {
        Name: "TechspecsName",
        DefaultValue: "",
        BindControlName: "TechspecsName",
        DataSourceMember: "TechspecsName"
    },
    {
        Name: "TechspecsValueID",
        DefaultValue: "",
        BindControlName: "TechspecsValueID",
        DataSourceMember: "TechspecsValueID"
    },
    {
        Name: "TechspecsValueName",
        DefaultValue: "",
        BindControlName: "TechspecsValueName",
        DataSourceMember: "TechspecsValueName"
    },
    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "Note",
        DataSourceMember: "Note",
        // Label: "Kiểu lấy chi phí",
        // ValidationList: ["required"]
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