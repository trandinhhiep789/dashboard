export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/AppFeedBackGroup/Search";
export const LoadAPIPath = "api/AppFeedBackGroup/Load";
export const AddAPIPath = "api/AppFeedBackGroup/Add";
export const UpdateAPIPath = "api/AppFeedBackGroup/Update";
export const DeleteAPIPath = "api/AppFeedBackGroup/Delete";
export const UpdateOrderAPIPath = "api/AppFeedBackGroup/UpdateOrder";
export const BackLink = "/AppFeedBackGroup";
export const AddLink = "/AppFeedBackGroup/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AppFeedBackGroupID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách phân loại phản hồi" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppFeedBackGroup", Title: "Danh sách phân loại phản hồi" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppFeedBackGroup", Title: "Danh sách phân loại phản hồi" },
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
        name: "txtAppFeedBackGroupID",
        label: "mã phân loại phản hồi",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackGroupID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAppFeedBackGroupName",
        label: "tên phân loại phản hồi",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackGroupName",
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
        name: "txtIconURL",
        label: "đường dẫn hình Icon",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IconURL",
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
        name: "txtAppFeedBackGroupID",
        label: "mã phân loại phản hồi",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackGroupID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAppFeedBackGroupName",
        label: "tên phân loại phản hồi",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackGroupName",
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
        name: "txtIconURL",
        label: "đường dẫn hình Icon",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IconURL",
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
        Name: "AppFeedBackGroupID",
        DefaultValue: "",
        BindControlName: "txtAppFeedBackGroupID",
        DataSourceMember: "AppFeedBackGroupID"
    },
    {
        Name: "AppFeedBackGroupName",
        DefaultValue: "",
        BindControlName: "txtAppFeedBackGroupName",
        DataSourceMember: "AppFeedBackGroupName"
    },
    {
        Name: "IconURL",
        DefaultValue: "",
        BindControlName: "txtIconURL",
        DataSourceMember: "IconURL"
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
        DataSourceMember: "AppFeedBackGroupID",
        Width: 60
    },
    {
        Name: "AppFeedBackGroupID",
        Type: "text",
        Caption: "Mã phân loại phản hồi",
        DataSourceMember: "AppFeedBackGroupID",
        Width: 160
    },
    {
        Name: "AppFeedBackGroupName",
        Type: "text",
        Caption: "Tên phân loại phản hồi",
        DataSourceMember: "AppFeedBackGroupName",
        Width: 200
    },
    {
        Name: "IconURL",
        Type: "text",
        Caption: "Đường dẫn hình Icon",
        DataSourceMember: "IconURL",
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
        DataSourceMember: "AppFeedBackGroupID",
        Width: 80,
        Link: "/AppFeedBackGroup/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
