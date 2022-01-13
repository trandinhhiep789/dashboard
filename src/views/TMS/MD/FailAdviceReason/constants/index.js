export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/FailAdviceReason/Search";
export const LoadAPIPath = "api/FailAdviceReason/Load";
export const AddAPIPath = "api/FailAdviceReason/Add";
export const UpdateAPIPath = "api/FailAdviceReason/Update";
export const DeleteAPIPath = "api/FailAdviceReason/Delete";
export const BackLink = "/FailAdviceReason";
export const AddLink = "/FailAdviceReason/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "FailAdviceReasonID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách lý do tư vấn thất bại" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/FailAdviceReason", Title: "Danh sách lý do tư vấn thất bại" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/FailAdviceReason", Title: "Danh sách lý do tư vấn thất bại" },
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
        name: "txtFailAdviceReasonID",
        label: "Mã lý do",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FailAdviceReasonID",
        disabled: false,
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtFailAdviceReasonName",
        label: "Tên lý do",
        value: "",
        maxSize: "250",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FailAdviceReasonName",
        readonly: false,
        validatonList: ["required"]
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
        name: "chkIsOtherReason",
        label: "Lý do khác:",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: [],
        DataSourceMember: "IsOtherReason",
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
        validatonList: [],
        DataSourceMember: "IsActived",
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
        validatonList: [],
        DataSourceMember: "IsSystem",
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtFailAdviceReasonID",
        label: "Mã lý do",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FailAdviceReasonID",
        disabled: true,
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtFailAdviceReasonName",
        label: "Tên lý do",
        value: "",
        maxSize: "250",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FailAdviceReasonName",
        readonly: false,
        validatonList: ["required"]
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
        name: "chkIsOtherReason",
        label: "Lý do khác:",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: [],
        DataSourceMember: "IsOtherReason",
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
        validatonList: [],
        DataSourceMember: "IsActived",
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
        validatonList: [],
        DataSourceMember: "IsSystem",
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
        Name: "FailAdviceReasonID",
        DefaultValue: "",
        BindControlName: "txtFailAdviceReasonID",
        DataSourceMember: "FailAdviceReasonID"
    },
    {
        Name: "FailAdviceReasonName",
        DefaultValue: "",
        BindControlName: "txtFailAdviceReasonName",
        DataSourceMember: "FailAdviceReasonName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "IsOtherReason",
        DefaultValue: false,
        BindControlName: "chkIsOtherReason",
        DataSourceMember: "IsOtherReason"
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
        DataSourceMember: "FailAdviceReasonID",
        Width: 50
    },
    {
        Name: "FailAdviceReasonID",
        Type: "text",
        Caption: "Mã lý do",
        DataSourceMember: "FailAdviceReasonID",
        Width: 70,
    },
    {
        Name: "FailAdviceReasonName",
        Type: "text",
        Caption: "Tên lý do",
        DataSourceMember: "FailAdviceReasonName",
        Width: 170
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        Width: 150
    },
    {
        Name: "IsOtherReason",
        Type: "checkicon",
        Caption: "Lý do khác",
        DataSourceMember: "IsOtherReason",
        Width: 120
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 150
    },
    {
        Name: "CreatedDate",
        Type: "datetime",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 60
    },
    {
        Name: "IsSystem",
        Type: "checkicon",
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Width: 60
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "FailAdviceReasonID",
        Width: 80,
        Link: "/FailAdviceReason/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
