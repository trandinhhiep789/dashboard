import { ERPCOMMONCACHE_CONSTRUCSERVICETYPE, ERPCOMMONCACHE_PROJECTARCHITECHTURE, ERPCOMMONCACHE_PROJECTTYPE } from "../../../../../constants/keyCache";

export const APIHostName = "TMSMDMAPI";
export const SearchAPIPath = "api/ConstructService/Search";
export const LoadAPIPath = "api/ConstructService/Load";
export const AddAPIPath = "api/ConstructService/Add";
export const UpdateAPIPath = "api/ConstructService/Update";
export const DeleteAPIPath = "api/ConstructService/Delete";
export const UpdateOrderAPIPath = "api/ConstructService/UpdateOrder";
export const BackLink = "/ConstructService";
export const AddLink = "/ConstructService/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ConstructServiceID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách công việc xây dựng bảo trì" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ConstructService", Title: "Danh sách công việc xây dựng bảo trì" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ConstructService", Title: "Danh sách công việc xây dựng bảo trì" },
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
    // {
    //     type: "text",
    //     name: "txtConstructServiceID",
    //     label: "mã công việc",
    //     value: "",
    //     maxSize: "9",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "ConstructServiceID",
    //     readonly: false,
    //     validatonList: ["required","number"],
    // },
    {
        type: "text",
        name: "txtConstructServiceName",
        label: "tên công việc",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ConstructServiceName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "txtConstrucServiceTypeID",
        label: "mã loại công việc",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ConstrucServiceTypeID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_CONSTRUCSERVICETYPE,
        ValueMember: "ConstructServiceTypeID",
        NameMember: "ConstructServiceTypeName",
    },
    {
        type: "select",
        name: "txtArchitectureID",
        label: "mã mô hình",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ArchitectureID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PROJECTARCHITECHTURE,
        ValueMember: "ArchitectureID",
        NameMember: "ArchitectureName",
    },
    {
        type: "select",
        name: "txtProjectTypeID",
        label: "mã loại công trình mới",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProjectTypeID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PROJECTTYPE,
        ValueMember: "ProjecTypeID",
        NameMember: "ProjectTypeName"
    },
    {
        type: "select",
        name: "txtOldProjectTypeID",
        label: "mã loại công trình cũ",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "OldProjectTypeID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PROJECTTYPE,
        ValueMember: "ProjecTypeID",
        NameMember: "ProjectTypeName"
    },
    {
        name: "txtProductID",
        type: "productbox",
        label: "Mã sản phẩm",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: []
    },
    // {
    //     type: "textarea",
    //     name: "txtDescription",
    //     label: "Mô tả:",
    //     value: "",
    //     maxSize: "2000",
    //     placeholder: "",
    //     icon: "",
    //     rows: "6",
    //     listoption: {},
    //     DataSourceMember: "Description",
    //     readonly: false,
    //     validatonList: []
    // },
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
        type: "text",
        name: "txtConstructServiceID",
        label: "mã công việc",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ConstructServiceID",
        readonly: true,
        validatonList: ["required","number"],
    },
    {
        type: "text",
        name: "txtConstructServiceName",
        label: "tên công việc",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ConstructServiceName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "txtConstrucServiceTypeID",
        label: "mã loại công việc",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ConstrucServiceTypeID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_CONSTRUCSERVICETYPE,
        ValueMember: "ConstructServiceTypeID",
        NameMember: "ConstructServiceTypeName"
    },
    {
        type: "select",
        name: "txtArchitectureID",
        label: "mã mô hình",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ArchitectureID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PROJECTARCHITECHTURE,
        ValueMember: "ArchitectureID",
        NameMember: "ArchitectureName"
    },
    {
        type: "select",
        name: "txtProjectTypeID",
        label: "mã loại công trình mới",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProjectTypeID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PROJECTTYPE,
        ValueMember: "ProjecTypeID",
        NameMember: "ProjectTypeName"
    },
    {
        type: "select",
        name: "txtOldProjectTypeID",
        label: "mã loại công trình cũ",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "OldProjectTypeID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PROJECTTYPE,
        ValueMember: "ProjecTypeID",
        NameMember: "ProjectTypeName"
    },
    {
        name: "txtProductID",
        type: "productbox",
        label: "Mã sản phẩm",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: []
    },
    // {
    //     type: "textarea",
    //     name: "txtDescription",
    //     label: "Mô tả:",
    //     value: "",
    //     maxSize: "2000",
    //     placeholder: "",
    //     icon: "",
    //     rows: "6",
    //     listoption: {},
    //     DataSourceMember: "Description",
    //     readonly: false,
    //     validatonList: []
    // },
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
        Name: "ConstructServiceID",
        DefaultValue: "",
        BindControlName: "txtConstructServiceID",
        DataSourceMember: "ConstructServiceID"
    },
    {
        Name: "ConstructServiceName",
        DefaultValue: "",
        BindControlName: "txtConstructServiceName",
        DataSourceMember: "ConstructServiceName"
    },
    {
        Name: "ConstrucServiceTypeID",
        DefaultValue: "",
        BindControlName: "txtConstrucServiceTypeID",
        DataSourceMember: "ConstrucServiceTypeID"
    },
    {
        Name: "ConstrucServiceTypeName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "ConstrucServiceTypeName"
    },
    {
        Name: "ArchitectureID",
        DefaultValue: "",
        BindControlName: "txtArchitectureID",
        DataSourceMember: "ArchitectureID"
    },
    {
        Name: "OldProjectTypeID",
        DefaultValue: "",
        BindControlName: "txtOldProjectTypeID",
        DataSourceMember: "OldProjectTypeID"
    },
    {
        Name: "ProjectTypeID",
        DefaultValue: "",
        BindControlName: "txtProjectTypeID",
        DataSourceMember: "ProjectTypeID"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "txtProductID",
        DataSourceMember: "ProductID"
    },

    // {
    //     Name: "Description",
    //     DefaultValue: "",
    //     BindControlName: "txtDescription",
    //     DataSourceMember: "Description"
    // },
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
        DataSourceMember: "ConstructServiceID",
        Width: 60
    },
    {
        Name: "ConstructServiceID",
        Type: "text",
        Caption: "Mã công việc",
        DataSourceMember: "ConstructServiceID",
        Width: 150
    },
    {
        Name: "ConstructServiceName",
        Type: "text",
        Caption: "Tên công việc",
        DataSourceMember: "ConstructServiceName",
        Width: 250
    },
    {
        Name: "ConstrucServiceTypeName",
        Type: "text",
        Caption: "Tên loại công việc",
        DataSourceMember: "ConstrucServiceTypeName",
        Width: 250
    },
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     //Width: 200
    // },
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
        DataSourceMember: "ConstructServiceID",
        Width: 100,
        Link: "/ConstructService/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
