export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/LeadOrderTypeProcess/Search";
export const LoadAPIPath = "api/LeadOrderTypeProcess/Load";
export const AddAPIPath = "api/LeadOrderTypeProcess/Add";
export const UpdateAPIPath = "api/LeadOrderTypeProcess/Update";
export const DeleteAPIPath = "api/LeadOrderTypeProcess/Delete";
export const BackLink = "/LeadOrderTypeProcess";
export const AddLink = "/LeadOrderTypeProcess/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "LeadOrderTypeProcessID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách Phương thức xử lý mối bán hàng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadOrderTypeProcess", Title: "Danh sách Phương thức xử lý mối bán hàng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadOrderTypeProcess", Title: "Danh sách Phương thức xử lý mối bán hàng" },
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
        name: "txtLeadOrderTypeProcessID",
        label: "Mã phương thức xử lý mối bán hàng",
        value: "",
        maxSize: "9",
        placeholder: "Mã phương thức xử lý mối bán hàng",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderTypeProcessID",
        disabled: false,
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtLeadOrderTypeProcessName",
        label: "Tên phương thức xử lý mối bán hàng",
        value: "",
        maxSize: "250",
        placeholder: "Tên phương thức xử lý mối bán hàng",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderTypeProcessName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "400",
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
        name: "txtLeadOrderTypeProcessID",
        label: "Mã phương thức xử lý mối bán hàng",
        value: "",
        maxSize: "9",
        placeholder: "Mã phương thức xử lý mối bán hàng",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderTypeProcessID",
        disabled: true,
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtLeadOrderTypeProcessName",
        label: "Tên phương thức xử lý mối bán hàng",
        value: "",
        maxSize: "250",
        placeholder: "Tên phương thức xử lý mối bán hàng",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderTypeProcessName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "400",
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
        Name: "LeadOrderTypeProcessID",
        DefaultValue: "",
        BindControlName: "txtLeadOrderTypeProcessID",
        DataSourceMember: "LeadOrderTypeProcessID"
    },
    {
        Name: "LeadOrderTypeProcessName",
        DefaultValue: "",
        BindControlName: "txtLeadOrderTypeProcessName",
        DataSourceMember: "LeadOrderTypeProcessName"
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
        DataSourceMember: "LeadOrderTypeProcessID",
        Width: 50
    },
    {
        Name: "LeadOrderTypeProcessID",
        Type: "text",
        Caption: "Mã phương thức xử lý mối bán hàng",
        DataSourceMember: "LeadOrderTypeProcessID",
        Width: 170,
    },
    {
        Name: "LeadOrderTypeProcessName",
        Type: "text",
        Caption: "Tên phương thức xử lý mối bán hàng",
        DataSourceMember: "LeadOrderTypeProcessName",
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
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 130
    },
    {
        Name: "CreatedDate",
        Type: "datetime",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 130
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
        DataSourceMember: "LeadOrderTypeProcessID",
        Width: 80,
        Link: "/LeadOrderTypeProcess/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
