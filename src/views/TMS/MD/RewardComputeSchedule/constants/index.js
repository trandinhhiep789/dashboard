export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/RewardComputeSchedule/Search";
export const LoadAPIPath = "api/RewardComputeSchedule/Load";
export const AddAPIPath = "api/RewardComputeSchedule/Add";
export const UpdateAPIPath = "api/RewardComputeSchedule/Update";
export const DeleteAPIPath = "api/RewardComputeSchedule/Delete";
export const UpdateOrderAPIPath = "api/RewardComputeSchedule/UpdateOrder";
export const BackLink = "/RewardComputeSchedule";
export const AddLink = "/RewardComputeSchedule/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "RewardComputeScheduleID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách lịch tính thưởng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardComputeSchedule", Title: "Danh sách lịch tính thưởng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardComputeSchedule", Title: "Danh sách lịch tính thưởng" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardComputeSchedule", Title: "Danh sách lịch tính thưởng" },
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
        label: "ngày tính thưởng (từ ngày)",
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
        label: "ngày tính thưởng (đến ngày)",
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
        name: "txtRewardComputeScheduleID",
        label: "mã lịch tính thưởng",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "RewardComputeScheduleID",
        readonly: true,
        validatonList: ["required"]
    },
    {
        type: "date",
        name: "RewardDate",
        label: "ngày tính thưởng",
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
        Name: "RewardComputeScheduleID",
        DefaultValue: "",
        BindControlName: "txtRewardComputeScheduleID",
        DataSourceMember: "RewardComputeScheduleID"
    },
    {
        Name: "RewardDate",
        DefaultValue: "",
        BindControlName: "RewardDate",
        DataSourceMember: "RewardDate"
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
        DataSourceMember: "RewardComputeScheduleID",
        Width: 60
    },
    // {
    //     Name: "RewardComputeScheduleID",
    //     Type: "texttolink",
    //     Link: "/RewardComputeSchedule/Detail/",
    //     Caption: "Mã lịch tính thưởng",
    //     DataSourceMember: "RewardComputeScheduleID",
    //     Width: 150
    // },
    {
        Name: "RewardDate",
        //Type: "date",
        Type: "texttolink",
        Link: "/RewardComputeSchedule/Detail/",
        Caption: "Ngày tính thưởng",
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
        Name: "IsCompletedCompute",
        Type: "checkicon",
        Caption: "Kết thúc tính thưởng",
        DataSourceMember: "IsCompletedCompute",
        Width: 120
    },
    {
        Name: "ComputeIntervalString",
        Type: "text",
        Caption: "Thời gian tính",
        DataSourceMember: "ComputeIntervalString",
        Width: 150
    },
    {
        Name: "IsComputeError",
        Type: "checkicon",
        Caption: "Lỗi tính thưởng",
        DataSourceMember: "IsComputeError",
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
        DataSourceMember: "RewardComputeScheduleID",
        Width: 80,
        Link: "/RewardComputeSchedule/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
