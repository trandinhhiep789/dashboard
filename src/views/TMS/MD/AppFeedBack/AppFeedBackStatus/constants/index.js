export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/AppFeedBackStatus/Search";
export const LoadAPIPath = "api/AppFeedBackStatus/Load";
export const AddAPIPath = "api/AppFeedBackStatus/Add";
export const UpdateAPIPath = "api/AppFeedBackStatus/Update";
export const DeleteAPIPath = "api/AppFeedBackStatus/Delete";
export const UpdateOrderAPIPath = "api/AppFeedBackStatus/UpdateOrder";
export const BackLink = "/AppFeedBackStatus";
export const AddLink = "/AppFeedBackStatus/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AppFeedBackStatusID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách trạng thái phản hồi" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppFeedBackStatus", Title: "Danh sách trạng thái phản hồi" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppFeedBackStatus", Title: "Danh sách trạng thái phản hồi" },
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
        name: "txtAppFeedBackStatusID",
        label: "mã trạng thái phản hồi",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackStatusID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAppFeedBackStatusName",
        label: "tên trạng thái phản hồi",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackStatusName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtColorCode",
        label: "mã màu trạng thái phản hồi",
        value: "",
        maxSize: "50",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ColorCode",
        readonly: false,
        validatonList: [],
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
        name: "txtAppFeedBackStatusID",
        label: "mã trạng thái phản hồi",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackStatusID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAppFeedBackStatusName",
        label: "tên trạng thái phản hồi",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackStatusName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtColorCode",
        label: "mã màu trạng thái phản hồi",
        value: "",
        maxSize: "50",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ColorCode",
        readonly: false,
        validatonList: [],
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
        Name: "AppFeedBackStatusID",
        DefaultValue: "",
        BindControlName: "txtAppFeedBackStatusID",
        DataSourceMember: "AppFeedBackStatusID"
    },
    {
        Name: "AppFeedBackStatusName",
        DefaultValue: "",
        BindControlName: "txtAppFeedBackStatusName",
        DataSourceMember: "AppFeedBackStatusName"
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
        DataSourceMember: "AppFeedBackStatusID",
        Width: 60
    },
    {
        Name: "AppFeedBackStatusID",
        Type: "text",
        Caption: "Mã trạng thái phản hồi",
        DataSourceMember: "AppFeedBackStatusID",
        Width: 160
    },
    {
        Name: "AppFeedBackStatusName",
        Type: "text",
        Caption: "Tên trạng thái phản hồi",
        DataSourceMember: "AppFeedBackStatusName",
        Width: 200
    },
    {
        Name: "ColorCode",
        Type: "text",
        Caption: "Mã màu trạng thái phải hồi",
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
        DataSourceMember: "AppFeedBackStatusID",
        Width: 80,
        Link: "/AppFeedBackStatus/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
