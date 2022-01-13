export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/LeadOrderStatus/Search";
export const LoadAPIPath = "api/LeadOrderStatus/Load";
export const AddAPIPath = "api/LeadOrderStatus/Add";
export const UpdateAPIPath = "api/LeadOrderStatus/Update";
export const DeleteAPIPath = "api/LeadOrderStatus/Delete";
export const BackLink = "/LeadOrderStatus";
export const AddLink = "/LeadOrderStatus/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "LeadOrderStatusID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách Trạng thái của mối bán hàng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadOrderStatus", Title: "Danh sách Trạng thái của mối bán hàng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadOrderStatus", Title: "Danh sách Trạng thái của mối bán hàng" },
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
        name: "txtLeadOrderStatusID",
        label: "Mã trạng thái của mối bán hàng",
        value: "",
        maxSize: "9",
        placeholder: "Mã phương thức xử lý của mối bán hàng",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderStatusID",
        disabled: false,
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtLeadOrderStatusName",
        label: "Tên trạng thái của mối bán hàng",
        value: "",
        maxSize: "250",
        placeholder: "Tên trạng thái của mối bán hàng",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderStatusName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "450",
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
        name: "txtLeadOrderStatusID",
        label: "Mã trạng thái của mối bán hàng",
        value: "",
        maxSize: "9",
        placeholder: "Mã phương thức xử lý của mối bán hàng",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderStatusID",
        disabled: true,
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtLeadOrderStatusName",
        label: "Tên trạng thái của mối bán hàng",
        value: "",
        maxSize: "250",
        placeholder: "Tên trạng thái của mối bán hàng",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderStatusName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "450",
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
        Name: "LeadOrderStatusID",
        DefaultValue: "",
        BindControlName: "txtLeadOrderStatusID",
        DataSourceMember: "LeadOrderStatusID"
    },
    {
        Name: "LeadOrderStatusName",
        DefaultValue: "",
        BindControlName: "txtLeadOrderStatusName",
        DataSourceMember: "LeadOrderStatusName"
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
        DataSourceMember: "LeadOrderStatusID",
        Width: 50
    },
    {
        Name: "LeadOrderStatusID",
        Type: "text",
        Caption: "Mã trạng thái của mối bán hàng",
        DataSourceMember: "LeadOrderStatusID",
        Width: 170,
    },
    {
        Name: "LeadOrderStatusName",
        Type: "text",
        Caption: "Tên trạng thái của mối bán hàng",
        DataSourceMember: "LeadOrderStatusName",
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
        Width: 80
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
        DataSourceMember: "LeadOrderStatusID",
        Width: 80,
        Link: "/LeadOrderStatus/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
