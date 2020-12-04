export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/AppFeedBackQuality/Search";
export const LoadAPIPath = "api/AppFeedBackQuality/Load";
export const AddAPIPath = "api/AppFeedBackQuality/Add";
export const UpdateAPIPath = "api/AppFeedBackQuality/Update";
export const DeleteAPIPath = "api/AppFeedBackQuality/Delete";
export const UpdateOrderAPIPath = "api/AppFeedBackQuality/UpdateOrder";
export const BackLink = "/AppFeedBackQuality";
export const AddLink = "/AppFeedBackQuality/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AppFeedBackQualityID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách chất lượng xử lý phản hồi" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppFeedBackQuality", Title: "Danh sách chất lượng xử lý phản hồi" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppFeedBackQuality", Title: "Danh sách chất lượng xử lý phản hồi" },
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
        name: "txtAppFeedBackQualityID",
        label: "mã chất lượng xử lý phản hồi",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackQualityID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAppFeedBackQualityName",
        label: "tên chất lượng xử lý phản hồi",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackQualityName",
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
        name: "txtAppFeedBackQualityID",
        label: "mã chất lượng xử lý phản hồi",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackQualityID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAppFeedBackQualityName",
        label: "tên chất lượng xử lý phản hồi",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackQualityName",
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
        Name: "AppFeedBackQualityID",
        DefaultValue: "",
        BindControlName: "txtAppFeedBackQualityID",
        DataSourceMember: "AppFeedBackQualityID"
    },
    {
        Name: "AppFeedBackQualityName",
        DefaultValue: "",
        BindControlName: "txtAppFeedBackQualityName",
        DataSourceMember: "AppFeedBackQualityName"
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
        DataSourceMember: "AppFeedBackQualityID",
        Width: 60
    },
    {
        Name: "AppFeedBackQualityID",
        Type: "text",
        Caption: "Mã chất lượng xử lý phản hồi",
        DataSourceMember: "AppFeedBackQualityID",
        Width: 160
    },
    {
        Name: "AppFeedBackQualityName",
        Type: "text",
        Caption: "Tên chất lượng xử lý phản hồi",
        DataSourceMember: "AppFeedBackQualityName",
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
        DataSourceMember: "AppFeedBackQualityID",
        Width: 80,
        Link: "/AppFeedBackQuality/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
