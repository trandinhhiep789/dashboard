export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/RewardPosImportSchedule/Search";
export const LoadAPIPath = "api/RewardPosImportSchedule/Load";
export const AddAPIPath = "api/RewardPosImportSchedule/Add";
export const UpdateAPIPath = "api/RewardPosImportSchedule/Update";
export const DeleteAPIPath = "api/RewardPosImportSchedule/Delete";
export const UpdateOrderAPIPath = "api/RewardPosImportSchedule/UpdateOrder";
export const BackLink = "/RewardPosImportSchedule";
export const AddLink = "/RewardPosImportSchedule/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "RewardPosImportScheduleID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách lịch đồng bộ VTT" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardPosImportSchedule", Title: "Danh sách lịch đồng bộ VTT" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardPosImportSchedule", Title: "Danh sách lịch đồng bộ VTT" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardPosImportSchedule", Title: "Danh sách lịch đồng bộ VTT" },
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
        name: "RewardDateFrom",
        label: "ngày đồng bộ VTT (từ ngày)",
        value: new Date(),
        placeholder: "",
        icon: "",
        readonly: true,
        DataSourceMember: "RewardDateFrom",
        validatonList: ["required"]
    },
    {
        type: "date",
        name: "RewardDateTo",
        label: "ngày đồng bộ VTT (đến ngày)",
        value: new Date(),
        placeholder: "",
        icon: "",
        DataSourceMember: "RewardDateFrom",
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
        name: "txtRewardPosImportScheduleID",
        label: "mã lịch đồng bộ VTT",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "RewardPosImportScheduleID",
        readonly: true,
        validatonList: ["required"]
    },
    {
        type: "date",
        name: "ImportDate",
        label: "ngày đồng bộ VTT",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "RewardDateString",
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
        Name: "RewardPosImportScheduleID",
        DefaultValue: "",
        BindControlName: "txtRewardPosImportScheduleID",
        DataSourceMember: "RewardPosImportScheduleID"
    },
    {
        Name: "ImportDate",
        DefaultValue: "",
        BindControlName: "ImportDate",
        DataSourceMember: "ImportDate"
    },
    {
        Name: "RewardDateFrom",
        DefaultValue: "",
        BindControlName: "RewardDateFrom",
        DataSourceMember: "RewardDateFrom"
    },
    {
        Name: "RewardDateTo",
        DefaultValue: "",
        BindControlName: "RewardDateTo",
        DataSourceMember: "RewardDateTo"
    },
    {
        Name: "RewardDateString",
        DefaultValue: "",
        BindControlName: "RewardDateString",
        DataSourceMember: "RewardDateString"
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
        DataSourceMember: "RewardPosImportScheduleID",
        Width: 60
    },
    // {
    //     Name: "RewardPosImportScheduleID",
    //     Type: "texttolink",
    //     Link: "/RewardPosImportSchedule/Detail/",
    //     Caption: "Mã lịch tính thưởng",
    //     DataSourceMember: "RewardPosImportScheduleID",
    //     Width: 150
    // },
    {
        Name: "ImportDate",
        //Type: "date",
        Type: "texttolink",
        Link: "/RewardPosImportSchedule/Detail/",
        Caption: "Ngày đồng bộ VTT",
        DataSourceMember: "RewardDateString",
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
        Name: "IsCompletedImport",
        Type: "checkicon",
        Caption: "Kết thúc đồng bộ VTT",
        DataSourceMember: "IsCompletedImport",
        Width: 120
    },
    {
        Name: "ImportIntervalString",
        Type: "text",
        Caption: "Thời gian tính",
        DataSourceMember: "ImportIntervalString",
        Width: 150
    },
    {
        Name: "ImportError",
        Type: "checkicon",
        Caption: "Lỗi đồng bộ VTT",
        DataSourceMember: "ImportError",
        Width: 100
    },
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
        Name: "UpdatedUser",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUser",
        Width: 140
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "RewardPosImportScheduleID",
        Width: 80,
        Link: "/RewardPosImportSchedule/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
