export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/AreaType/Search";
export const LoadAPIPath = "api/AreaType/Load";
export const AddAPIPath = "api/AreaType/Add";
export const UpdateAPIPath = "api/AreaType/Update";
export const DeleteAPIPath = "api/AreaType/Delete";
export const UpdateOrderAPIPath = "api/AreaType/UpdateOrder";
export const BackLink = "/AreaType";
export const AddLink = "/AreaType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AreaTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách loại khu vực" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AreaType", Title: "Danh sách loại khu vực" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AreaType", Title: "Danh sách loại khu vực" },
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
        name: "txtAreaTypeID",
        label: "mã loại khu vực",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AreaTypeID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAreaTypeName",
        label: "tên loại khu vực",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AreaTypeName",
        readonly: false,
        validatonList: ["required"],
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
        name: "txtAreaTypeID",
        label: "mã loại khu vực",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AreaTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAreaTypeName",
        label: "tên loại khu vực",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AreaTypeName",
        readonly: false,
        validatonList: ["required"],
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
        Name: "AreaTypeID",
        DefaultValue: "",
        BindControlName: "txtAreaTypeID",
        DataSourceMember: "AreaTypeID"
    },
    {
        Name: "AreaTypeName",
        DefaultValue: "",
        BindControlName: "txtAreaTypeName",
        DataSourceMember: "AreaTypeName"
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
        DataSourceMember: "AreaTypeID",
        Width: 60
    },
    {
        Name: "AreaTypeID",
        Type: "text",
        Caption: "Mã loại khu vực",
        DataSourceMember: "AreaTypeID",
        Width: 160
    },
    {
        Name: "AreaTypeName",
        Type: "text",
        Caption: "Tên loại khu vực",
        DataSourceMember: "AreaTypeName",
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
        Width: 140
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 140
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "AreaTypeID",
        Width: 80,
        Link: "/AreaType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
