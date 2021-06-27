export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/TMSConfig/Search";
export const LoadAPIPath = "api/TMSConfig/Load";
export const AddAPIPath = "api/TMSConfig/Add";
export const UpdateAPIPath = "api/TMSConfig/Update";
export const DeleteAPIPath = "api/TMSConfig/Delete";
export const UpdateOrderAPIPath = "api/TMSConfig/UpdateOrder";
export const BackLink = "/TMSConfig";
export const AddLink = "/TMSConfig/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "TMSConfigID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách cấu hình hệ thống TMS" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/TMSConfig", Title: "Danh sách cấu hình hệ thống TMS" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/TMSConfig", Title: "Danh sách cấu hình hệ thống TMS" },
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
        name: "txtTMSConfigID",
        label: "mã cấu hình hệ thống TMS",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "TMSConfigID",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtTMSConfigName",
        label: "tên cấu hình hệ thống TMS",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "TMSConfigName",
        readonly: false,
        validatonList: [],
    },
    {
        type: "textarea",
        name: "txtTMSConfigValue",
        label: "Giá trị cấu hình:",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "TMSConfigValue",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtTMSConfigCategoryID",
        label: "mã danh mục cấu hình",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "TMSConfigCategoryID",
        readonly: false,
        validatonList: ["number"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
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
        label: "Thứ tự hiển thị:",
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
        label: "Kích hoạt:",
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
        label: "Hệ thống:",
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
        name: "txtTMSConfigID",
        label: "mã cấu hình hệ thống TMS",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "TMSConfigID",
        readonly: true,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtTMSConfigName",
        label: "tên cấu hình hệ thống TMS",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "TMSConfigName",
        readonly: false,
        validatonList: [],
    },
    {
        type: "textarea",
        name: "txtTMSConfigValue",
        label: "Giá trị cấu hình:",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "TMSConfigValue",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtTMSConfigCategoryID",
        label: "mã danh mục cấu hình",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "TMSConfigCategoryID",
        readonly: false,
        validatonList: ["number"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
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
        label: "Thứ tự hiển thị:",
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
        Name: "TMSConfigID",
        DefaultValue: "",
        BindControlName: "txtTMSConfigID",
        DataSourceMember: "TMSConfigID"
    },
    {
        Name: "TMSConfigName",
        DefaultValue: "",
        BindControlName: "txtTMSConfigName",
        DataSourceMember: "TMSConfigName"
    },
    {
        Name: "TMSConfigValue",
        DefaultValue: "",
        BindControlName: "txtTMSConfigValue",
        DataSourceMember: "TMSConfigValue"
    },
    {
        Name: "TMSConfigCategoryID",
        DefaultValue: "",
        BindControlName: "txtTMSConfigCategoryID",
        DataSourceMember: "TMSConfigCategoryID"
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
        DataSourceMember: "TMSConfigID",
        Width: 60
    },
    {
        Name: "TMSConfigID",
        Type: "text",
        Caption: "Mã cấu hình hệ thống TMS",
        DataSourceMember: "TMSConfigID",
        Width: 250
    },
    {
        Name: "TMSConfigName",
        Type: "text",
        Caption: "Tên cấu hình hệ thống TMS",
        DataSourceMember: "TMSConfigName",
        //Width: 250
    },
    {
        Name: "TMSConfigValue",
        Type: "text",
        Caption: "Giá trị cấu hình",
        DataSourceMember: "TMSConfigValue",
        Width: 220
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 200
    // },
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
        DataSourceMember: "TMSConfigID",
        Width: 80,
        Link: "/TMSConfig/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
