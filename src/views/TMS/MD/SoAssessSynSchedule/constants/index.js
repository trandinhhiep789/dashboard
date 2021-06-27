export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/SoAssessSynSchedule/Search";
export const LoadAPIPath = "api/SoAssessSynSchedule/Load";
export const AddAPIPath = "api/SoAssessSynSchedule/Add";
export const UpdateAPIPath = "api/SoAssessSynSchedule/Update";
export const DeleteAPIPath = "api/SoAssessSynSchedule/Delete";
export const UpdateOrderAPIPath = "api/SoAssessSynSchedule/UpdateOrder";
export const BackLink = "/SoAssessSynSchedule";
export const AddLink = "/SoAssessSynSchedule/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "SoAssessSynScheduleID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách lịch đồng bộ dữ liệu đánh giá vận đơn" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SoAssessSynSchedule", Title: "Danh sách lịch đồng bộ dữ liệu đánh giá vận đơn" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SoAssessSynSchedule", Title: "Danh sách lịch đồng bộ dữ liệu đánh giá vận đơn" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SoAssessSynSchedule", Title: "Danh sách lịch đồng bộ dữ liệu đánh giá vận đơn" },
    { Link: "", Title: "Chi tiết" }
];

const dtdateto = new Date()
dtdateto.setDate(new Date().getDate() + 1);

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
        type: "date",
        name: "SynDateFrom",
        label: "ngày đồng bộ (từ ngày)",
        value: new Date(),
        placeholder: "",
        icon: "",
        readonly: true,
        DataSourceMember: "SynDateFrom",
        validatonList: ["required"]
    },
    {
        type: "date",
        name: "SynDateTo",
        label: "ngày đồng bộ (đến ngày)",
        value: new Date(),
        placeholder: "",
        icon: "",
        DataSourceMember: "SynDateFrom",
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "1000",
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
        name: "txtPriorityIndex",
        label: "Thứ tự ưu tiên:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PriorityIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: false,
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
        name: "txtSoAssessSynScheduleID",
        label: "mã lịch đồng bộ",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SoAssessSynScheduleID",
        readonly: true,
        validatonList: ["required"]
    },
    {
        type: "date",
        name: "SynDate",
        label: "ngày đồng bộ",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "SynDateString",
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
        type: "text",
        name: "txtPriorityIndex",
        label: "Thứ tự ưu tiên:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PriorityIndex",
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
        Name: "SoAssessSynScheduleID",
        DefaultValue: "",
        BindControlName: "txtSoAssessSynScheduleID",
        DataSourceMember: "SoAssessSynScheduleID"
    },
    {
        Name: "SynDate",
        DefaultValue: "",
        BindControlName: "SynDate",
        DataSourceMember: "SynDate"
    },
    {
        Name: "SynDateFrom",
        DefaultValue: "",
        BindControlName: "SynDateFrom",
        DataSourceMember: "SynDateFrom"
    },
    {
        Name: "SynDateTo",
        DefaultValue: "",
        BindControlName: "SynDateTo",
        DataSourceMember: "SynDateTo"
    },
    {
        Name: "SynDateString",
        DefaultValue: "",
        BindControlName: "SynDateString",
        DataSourceMember: "SynDateString"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "PriorityIndex",
        DefaultValue: "",
        BindControlName: "txtPriorityIndex",
        DataSourceMember: "PriorityIndex"
    },
    {
        Name: "IsActived",
        DefaultValue: false,
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
        DataSourceMember: "SoAssessSynScheduleID",
        Width: 60
    },
    // {
    //     Name: "SoAssessSynScheduleID",
    //     Type: "texttolink",
    //     Link: "/SoAssessSynSchedule/Detail/",
    //     Caption: "Mã lịch đồng bộ",
    //     DataSourceMember: "SoAssessSynScheduleID",
    //     Width: 150
    // },
    {
        Name: "SynDateString",
        //Type: "date",
        Type: "texttolink",
        Link: "/SoAssessSynSchedule/Detail/",
        Caption: "Ngày đồng bộ",
        DataSourceMember: "SynDateString",
        Width: 110
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        Width: 160
    },
    {
        Name: "IsAutoAdd",
        Type: "checkicon",
        Caption: "Lịch tự động thêm",
        DataSourceMember: "IsAutoAdd",
        Width: 120
    },
    {
        Name: "IsCompletedsyn",
        Type: "checkicon",
        Caption: "Kết thúc đồng bộ",
        DataSourceMember: "IsCompletedsyn",
        Width: 120
    },
    {
        Name: "SynIntervalString",
        Type: "text",
        Caption: "Thời gian đồng bộ",
        DataSourceMember: "SynIntervalString",
        Width: 150
    },
    {
        Name: "IssynError",
        Type: "checkicon",
        Caption: "Lỗi đồng bộ",
        DataSourceMember: "IssynError",
        Width: 100
    },
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
        Width: 100
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
        DataSourceMember: "SoAssessSynScheduleID",
        Width: 80,
        Link: "/SoAssessSynSchedule/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
