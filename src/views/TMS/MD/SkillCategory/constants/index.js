export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/SkillCategory/Search";
export const LoadAPIPath = "api/SkillCategory/Load";
export const AddAPIPath = "api/SkillCategory/Add";
export const UpdateAPIPath = "api/SkillCategory/Update";
export const DeleteAPIPath = "api/SkillCategory/Delete";
export const UpdateOrderAPIPath = "api/SkillCategory/UpdateOrder";
export const GetParent = "api/SkillCategory/GetParentSkillCategory";
export const BackLink = "/SkillCategory";
export const AddLink = "/SkillCategory/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "SkillCategoryID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách danh mục kỹ năng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SkillCategory", Title: "Danh sách danh mục kỹ năng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" , icon: "fa fa-home"},
    { Link: "/SkillCategory", Title: "Danh sách danh mục kỹ năng" },
    { Link: "", Title: "Thêm" }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}
    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtSkillCategoryID",
        label: "mã danh mục kỹ năng",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SkillCategoryID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtSkillCategoryName",
        label: "tên danh mục kỹ năng",
        value: "",
        maxSize: "180",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SkillCategoryName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "treeSelect",
        name: "comboParentID",
        label: "Danh mục cha",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        treeData: [],
        rootID: -1,
        rootKey: "ParentID",
        DataSourceMember: "ParentID",
        validatonList: [],
        LoadItemCacheKeyID: "",
        IsAutoLoadItemFromCache: false,
        ValueMember: "SkillCategoryID",
        NameMember: "SkillCategoryName",
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "1900",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
        value: "0",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: 1,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtSkillCategoryID",
        label: "mã danh mục kỹ năng",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SkillCategoryID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtSkillCategoryName",
        label: "tên danh mục kỹ năng",
        value: "",
        maxSize: "180",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SkillCategoryName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "treeSelect",
        name: "comboParentID",
        label: "Danh mục cha",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        treeData: [],
        rootID: -1,
        rootKey: "ParentID",
        DataSourceMember: "ParentID",
        validatonList: [],
        LoadItemCacheKeyID: "",
        IsAutoLoadItemFromCache: false,
        ValueMember: "SkillCategoryID",
        NameMember: "SkillCategoryName",
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "1900",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: []
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const MLObjectDefinition = [
    {
        Name: "SkillCategoryID",
        DefaultValue: "",
        BindControlName: "txtSkillCategoryID",
        DataSourceMember: "SkillCategoryID"
    },
    {
        Name: "SkillCategoryName",
        DefaultValue: "",
        BindControlName: "txtSkillCategoryName",
        DataSourceMember: "SkillCategoryName"
    },
    {
        Name: "ParentID",
        DefaultValue: "",
        BindControlName: "comboParentID",
        DataSourceMember: "ParentID"
    },
    {
        Name: "ParentName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "ParentName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "txtOrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUser"
    },
    {
        Name: "UpdatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "UpdatedUser"
    },
    {
        Name: "LoginLogID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: ""
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "SkillCategoryID",
        Width: 60
    },
    {
        Name: "SkillCategoryID",
        Type: "text",
        Caption: "Mã danh mục kỹ năng",
        DataSourceMember: "SkillCategoryID",
        Width: 150
    },
    {
        Name: "SkillCategoryName",
        Type: "text",
        Caption: "Tên danh mục kỹ năng",
        DataSourceMember: "SkillCategoryName",
        Width: 200
    },
    {
        Name: "ParentName",
        Type: "text",
        Caption: "Danh mục cha",
        DataSourceMember: "ParentName",
        Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "SkillCategoryID",
        Width: 70,
        Link: "/SkillCategory/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
