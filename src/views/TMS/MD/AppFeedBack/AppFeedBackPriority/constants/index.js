export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/AppFeedBackPriority/Search";
export const LoadAPIPath = "api/AppFeedBackPriority/Load";
export const AddAPIPath = "api/AppFeedBackPriority/Add";
export const UpdateAPIPath = "api/AppFeedBackPriority/Update";
export const DeleteAPIPath = "api/AppFeedBackPriority/Delete";
export const UpdateOrderAPIPath = "api/AppFeedBackPriority/UpdateOrder";
export const BackLink = "/AppFeedBackPriority";
export const AddLink = "/AppFeedBackPriority/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AppFeedBackPriorityID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách độ ưu tiên phản hồi" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppFeedBackPriority", Title: "Danh sách độ ưu tiên phản hồi" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppFeedBackPriority", Title: "Danh sách độ ưu tiên phản hồi" },
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
        name: "txtAppFeedBackPriorityID",
        label: "mã độ ưu tiên phản hồi",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackPriorityID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAppFeedBackPriorityName",
        label: "tên độ ưu tiên phản hồi",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackPriorityName",
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
        name: "txtIConURL",
        label: "đường dẫn hình Icon",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IConURL",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtColorCode",
        label: "mã màu",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ColorCode",
        readonly: false,
        validatonList: [],
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
        name: "txtAppFeedBackPriorityID",
        label: "mã độ ưu tiên phản hồi",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackPriorityID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAppFeedBackPriorityName",
        label: "tên độ ưu tiên phản hồi",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackPriorityName",
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
        name: "txtIConURL",
        label: "đường dẫn hình Icon",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IConURL",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtColorCode",
        label: "mã màu",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ColorCode",
        readonly: false,
        validatonList: [],
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
        Name: "AppFeedBackPriorityID",
        DefaultValue: "",
        BindControlName: "txtAppFeedBackPriorityID",
        DataSourceMember: "AppFeedBackPriorityID"
    },
    {
        Name: "AppFeedBackPriorityName",
        DefaultValue: "",
        BindControlName: "txtAppFeedBackPriorityName",
        DataSourceMember: "AppFeedBackPriorityName"
    },
    {
        Name: "IConURL",
        DefaultValue: "",
        BindControlName: "txtIConURL",
        DataSourceMember: "IConURL"
    },
    {
        Name: "ColorCode",
        DefaultValue: "",
        BindControlName: "txtColorCode",
        DataSourceMember: "ColorCode"
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
        DataSourceMember: "AppFeedBackPriorityID",
        Width: 60
    },
    {
        Name: "AppFeedBackPriorityID",
        Type: "text",
        Caption: "Mã độ ưu tiên phản hồi",
        DataSourceMember: "AppFeedBackPriorityID",
        Width: 160
    },
    {
        Name: "AppFeedBackPriorityName",
        Type: "text",
        Caption: "Tên độ ưu tiên phản hồi",
        DataSourceMember: "AppFeedBackPriorityName",
        Width: 200
    },
    {
        Name: "IConURL",
        Type: "text",
        Caption: "Đường dẫn hình Icon",
        DataSourceMember: "IConURL",
        Width: 120
    },
    {
        Name: "ColorCode",
        Type: "text",
        Caption: "Mã màu",
        DataSourceMember: "ColorCode",
        Width: 100
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
        DataSourceMember: "AppFeedBackPriorityID",
        Width: 80,
        Link: "/AppFeedBackPriority/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
