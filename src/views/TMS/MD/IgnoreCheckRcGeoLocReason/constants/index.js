export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/IgnoreCheckRcGeoLocReason/Search";
export const LoadAPIPath = "api/IgnoreCheckRcGeoLocReason/Load";
export const AddAPIPath = "api/IgnoreCheckRcGeoLocReason/Add";
export const UpdateAPIPath = "api/IgnoreCheckRcGeoLocReason/Update";
export const DeleteAPIPath = "api/IgnoreCheckRcGeoLocReason/Delete";
export const UpdateOrderAPIPath = "api/IgnoreCheckRcGeoLocReason/UpdateOrder";
export const BackLink = "/IgnoreCheckRcGeoLocReason";
export const AddLink = "/IgnoreCheckRcGeoLocReason/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "IgnoreCheckRcGeoLocReasonID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách nhóm tiêu chí đánh giá chất lượng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/IgnoreCheckRcGeoLocReason", Title: "Danh sách nhóm tiêu chí đánh giá chất lượng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/IgnoreCheckRcGeoLocReason", Title: "Danh sách nhóm tiêu chí đánh giá chất lượng" },
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
    // {
    //     type: "text",
    //     name: "txtIgnoreCheckRcGeoLocReasonID",
    //     label: "mã nhóm",
    //     value: "",
    //     maxSize: "5",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "IgnoreCheckRcGeoLocReasonID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "text",
        name: "txtIgnoreCheckRcGeoLocReasonName",
        label: "tên Lý do bỏ qua kiểm tra tọa độ nhận hàng",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IgnoreCheckRcGeoLocReasonName",
        readonly: false,
        validatonList: ["required"],
    },
    // {
    //     type: "select",
    //     name: "GetFeeType",
    //     label: "Kiểu lấy chi phí",
    //     value: 1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [{ value: 1, label: "Lấy giá trị cố định" }, { value: 2, label: "Lấy từ bảng làm giá" }],
    //     DataSourceMember: "GetFeeType",
    //     readonly: false,
    //     disabled: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: false
    // },
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
        value: "0",
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
        name: "txtIgnoreCheckRcGeoLocReasonID",
        label: "Mã lý do bỏ qua kiểm tra tọa độ nhận hàng",
        value: "",
        //maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IgnoreCheckRcGeoLocReasonID",
        readonly: true,
        validatonList: []
    },
    {
        type: "text",
        name: "txtIgnoreCheckRcGeoLocReasonName",
        label: "tên Lý do bỏ qua kiểm tra tọa độ nhận hàng",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IgnoreCheckRcGeoLocReasonName",
        readonly: false,
        validatonList: ["required"],
    },
    // {
    //     type: "select",
    //     name: "GetFeeType",
    //     label: "Kiểu lấy chi phí",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [{ value: 1, label: "Lấy giá trị cố định" }, { value: 2, label: "Lấy từ bảng làm giá" }],
    //     DataSourceMember: "GetFeeType",
    //     readonly: false,
    //     disabled: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: false
    // },
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
        Name: "IgnoreCheckRcGeoLocReasonID",
        DefaultValue: "",
        BindControlName: "txtIgnoreCheckRcGeoLocReasonID",
        DataSourceMember: "IgnoreCheckRcGeoLocReasonID"
    },
    {
        Name: "IgnoreCheckRcGeoLocReasonName",
        DefaultValue: "",
        BindControlName: "txtIgnoreCheckRcGeoLocReasonName",
        DataSourceMember: "IgnoreCheckRcGeoLocReasonName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    // {
    //     Name: "GetFeeType",
    //     DefaultValue: "",
    //     BindControlName: "GetFeeType",
    //     DataSourceMember: "GetFeeType"
    // },
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
        DataSourceMember: "IgnoreCheckRcGeoLocReasonID",
        Width: 60
    },
    {
        Name: "IgnoreCheckRcGeoLocReasonID",
        Type: "text",
        Caption: "Mã lý do bỏ qua kiểm tra tọa độ nhận hàng",
        DataSourceMember: "IgnoreCheckRcGeoLocReasonID",
        Width: 250
    },
    {
        Name: "IgnoreCheckRcGeoLocReasonName",
        Type: "text",
        Caption: "Tên lý do bỏ qua kiểm tra tọa độ nhận hàng",
        DataSourceMember: "IgnoreCheckRcGeoLocReasonName",
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
        DataSourceMember: "IgnoreCheckRcGeoLocReasonID",
        Width: 100,
        Link: "/IgnoreCheckRcGeoLocReason/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
