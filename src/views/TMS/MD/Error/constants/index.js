export const APIHostName = "TMSMDMAPI";
export const SearchAPIPath = "api/Error/Search";
export const LoadAPIPath = "api/Error/Load";
export const AddAPIPath = "api/Error/Add";
export const UpdateAPIPath = "api/Error/Update";
export const DeleteAPIPath = "api/Error/Delete";
export const UpdateOrderAPIPath = "api/Error/UpdateOrder";
export const BackLink = "/Error";
export const AddLink = "/Error/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ErrorID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách lỗi thực tế" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Error", Title: "Danh sách lỗi thực tế" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Error", Title: "Danh sách lỗi thực tế" },
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
        name: "txtErrorName",
        label: "tên lỗi thực tế",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ErrorName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "txtErrorGroupID",
        label: "Nhóm lỗi thực tế",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ErrorGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.ERRORGROUP",
        ValueMember: "ErrorGroupID",
        NameMember: "ErrorGroupName"
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
        name: "txtErrorName",
        label: "tên lỗi thực tế",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ErrorName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "txtErrorGroupID",
        label: "Nhóm lỗi thực tế",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ErrorGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.ERRORGROUP",
        ValueMember: "ErrorGroupID",
        NameMember: "ErrorGroupName"
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
        Name: "ErrorID",
        DefaultValue: "",
        BindControlName: "txtErrorID",
        DataSourceMember: "ErrorID"
    },
    {
        Name: "ErrorName",
        DefaultValue: "",
        BindControlName: "txtErrorName",
        DataSourceMember: "ErrorName"
    },
    {
        Name: "ErrorGroupID",
        DefaultValue: "",
        BindControlName: "txtErrorGroupID",
        DataSourceMember: "ErrorGroupID"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
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
        DataSourceMember: "ErrorID",
        Width: 60
    },
    {
        Name: "ErrorID",
        Type: "text",
        Caption: "Mã lỗi thực tế",
        DataSourceMember: "ErrorID",
        Width: 150
    },
    {
        Name: "ErrorName",
        Type: "text",
        Caption: "Tên lỗi thực tế",
        DataSourceMember: "ErrorName",
        Width: 250
    },
    {
        Name: "ErrorGroupName",
        Type: "text",
        Caption: "Nhóm lỗi thực tế",
        DataSourceMember: "ErrorGroupName",
        Width: 250
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        //Width: 200
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
        DataSourceMember: "ErrorID",
        Width: 100,
        Link: "/Error/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
