import { ERPCOMMONCACHE_PROJECTARCHITECHTURE, ERPCOMMONCACHE_PROJECTTYPE } from "../../../../../constants/keyCache";

export const APIHostName = "TMSMDMAPI";
export const SearchAPIPath = "api/ArchitechtureType_PRJType/Search";
export const LoadAPIPath = "api/ArchitechtureType_PRJType/Load";
export const AddAPIPath = "api/ArchitechtureType_PRJType/Add";
export const UpdateAPIPath = "api/ArchitechtureType_PRJType/Update";
export const DeleteAPIPath = "api/ArchitechtureType_PRJType/Delete";
export const UpdateOrderAPIPath = "api/ArchitechtureType_PRJType/UpdateOrder";
export const BackLink = "/ArchitechtureType_PRJType";
export const AddLink = "/ArchitechtureType_PRJType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ArchitechtureTypeID,ProjectTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách bảng Map loại mô hình và loại công trình" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ArchitechtureType_PRJType", Title: "Danh sách bảng Map loại mô hình và loại công trình" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ArchitechtureType_PRJType", Title: "Danh sách bảng Map loại mô hình và loại công trình" },
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
        name: "txtArchitechtureTypeID",
        label: "Loại mô hình",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ArchitechtureTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PROJECTARCHITECHTURE,
        ValueMember: "ArchitectureID",
        NameMember: "ArchitectureName"
    },
    {
        type: "select",
        name: "txtProjectTypeID",
        label: "Loại công trình",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProjectTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PROJECTTYPE,
        ValueMember: "ProjecTypeID",
        NameMember: "ProjectTypeName"
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
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
        label: "Hệ thống:",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "select",
        name: "txtArchitechtureTypeID",
        label: "Loại mô hình",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ArchitechtureTypeID",
        readonly: true,
        disabled: true,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PROJECTARCHITECHTURE,
        ValueMember: "ArchitectureID",
        NameMember: "ArchitectureName"
    },
    {
        type: "select",
        name: "txtProjectTypeID",
        label: "Loại công trình",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProjectTypeID",
        readonly: false,
        //disabled: true,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PROJECTTYPE,
        ValueMember: "ProjecTypeID",
        NameMember: "ProjectTypeName"
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
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
        label: "Hệ thống:",
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
        Name: "ArchitechtureTypeID",
        DefaultValue: "",
        BindControlName: "txtArchitechtureTypeID",
        DataSourceMember: "ArchitechtureTypeID"
    },
    {
        Name: "ArchitechtureTypeName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "ArchitechtureTypeName"
    },
    {
        Name: "ProjectTypeID",
        DefaultValue: "",
        BindControlName: "txtProjectTypeID",
        DataSourceMember: "ProjectTypeID"
    },
    {
        Name: "ProjectTypeName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "ProjectTypeName"
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
        DataSourceMember: "ArchitechtureTypeID,ProjectTypeID",
        Width: 60
    },
    {
        Name: "ArchitechtureTypeID",
        Type: "text",
        Caption: "Mã loại mô hình",
        DataSourceMember: "ArchitechtureTypeID",
        Width: 120
    },
    {
        Name: "ArchitechtureTypeName",
        Type: "text",
        Caption: "Tên loại mô hình",
        DataSourceMember: "ArchitechtureTypeName",
        Width: 200
    },
    {
        Name: "ProjectTypeID",
        Type: "text",
        Caption: "Mã loại công trình ",
        DataSourceMember: "ProjectTypeID",
        Width: 120
    },
    {
        Name: "ProjectTypeName",
        Type: "text",
        Caption: "Tên loại công trình ",
        DataSourceMember: "ProjectTypeName",
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
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ArchitechtureTypeID,ProjectTypeID",
        Width: 100,
        Link: "/ArchitechtureType_PRJType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
