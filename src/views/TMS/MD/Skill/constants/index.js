export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/Skill/Search";
export const LoadAPIPath = "api/Skill/Load";
export const AddAPIPath = "api/Skill/Add";
export const UpdateAPIPath = "api/Skill/Update";
export const DeleteAPIPath = "api/Skill/Delete";
export const UpdateOrderAPIPath = "api/Skill/UpdateOrder";
export const BackLink = "/Skill";
export const AddLink = "/Skill/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "SkillID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];
import {CDN_LOGO_IMAGE} from '../../../../../constants/systemVars';

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách kỹ năng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Skill", Title: "Danh sách kỹ năng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Skill", Title: "Danh sách kỹ năng" },
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
        type: "select",
        name: "txtSkillCategoryID",
        label: "danh mục kỹ năng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SkillCategoryID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SKILLCATEGORY",
        ValueMember: "SkillCategoryID",
        NameMember: "SkillCategoryName"
    },
    {
        type: "text",
        name: "txtSkillName",
        label: "tên kỹ năng",
        maxSize: "200",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SkillName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
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
        value: 0,
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
        value: true,
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
        value: false,
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
        name: "txtSkillID",
        label: "Mã kỹ năng",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SkillID",
        readonly: true,
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "txtSkillCategoryID",
        label: "danh mục kỹ năng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SkillCategoryID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SKILLCATEGORY",
        ValueMember: "SkillCategoryID",
        NameMember: "SkillCategoryName"
    },
    {
        type: "text",
        name: "txtSkillName",
        label: "tên kỹ năng",
        maxSize: "200",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SkillName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
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
        Name: "SkillID",
        DefaultValue: "",
        BindControlName: "txtSkillID",
        DataSourceMember: "SkillID"
    },
    {
        Name: "SkillCategoryID",
        DefaultValue: "",
        BindControlName: "txtSkillCategoryID",
        DataSourceMember: "SkillCategoryID"
    },
    {
        Name: "SkillCategoryName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "SkillCategoryName"
    },
    {
        Name: "SkillName",
        DefaultValue: "",
        BindControlName: "txtSkillName",
        DataSourceMember: "SkillName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: 0,
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
        Name: "CreatedUserFullName",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUserFullName"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUserFullName"
    },
    {
        Name: "UpdatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "UpdatedUser"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "SkillID",
        Width: 60
    },
    {
        Name: "SkillID",
        Type: "text",
        Caption: "Mã kỹ năng",
        DataSourceMember: "SkillID",
        Width: 150
    },
    {
        Name: "SkillCategoryName",
        Type: "text",
        Caption: "Danh mục kỹ năng",
        DataSourceMember: "SkillCategoryName",
        Width: 150
    },
    {
        Name: "SkillName",
        Type: "text",
        Caption: "Tên kỹ năng",
        DataSourceMember: "SkillName",
        Width: 150
    },
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     Width: 250
    // },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100
    },
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 200
    // },
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
        DataSourceMember: "SkillID",
        Width: 100,
        Link: "/Skill/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
