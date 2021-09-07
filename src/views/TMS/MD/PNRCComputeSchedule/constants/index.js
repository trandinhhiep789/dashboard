import { ERPCOMMONCACHE_PARTNER } from "../../../../../constants/keyCache";

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/PNRCComputeSchedule/Search";
export const LoadAPIPath = "api/PNRCComputeSchedule/Load";
export const AddAPIPath = "api/PNRCComputeSchedule/Add";
export const UpdateAPIPath = "api/PNRCComputeSchedule/Update";
export const DeleteAPIPath = "api/PNRCComputeSchedule/Delete";
export const UpdateOrderAPIPath = "api/PNRCComputeSchedule/UpdateOrder";
export const BackLink = "/PNRCComputeSchedule";
export const AddLink = "/PNRCComputeSchedule/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PNRCComputeScheduleID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Lịch tính doanh thu phải thu từ đối tác" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PNRCComputeSchedule", Title: "Lịch tính doanh thu phải thu từ đối tác" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PNRCComputeSchedule", Title: "Lịch tính doanh thu phải thu từ đối tác" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PNRCComputeSchedule", Title: "Lịch tính doanh thu phải thu từ đối tác" },
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
        type: "select",
        name: "cbPartnerID",
        label: "đối tác",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PARTNER,
        ValueMember: "PartnerID",
        NameMember: "PartnerName"
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
        name: "txtPNRCComputeScheduleID",
        label: "mã lịch tính thưởng",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PNRCComputeScheduleID",
        readonly: true,
        validatonList: []
    },
    {
        type: "date",
        name: "ReceivableDate",
        label: "ngày tính doanh thu",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "ReceivableDateString",
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "cbPartnerID",
        label: "đối tác",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PARTNER,
        ValueMember: "PartnerID",
        NameMember: "PartnerName"
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
        Name: "PNRCComputeScheduleID",
        DefaultValue: "",
        BindControlName: "txtPNRCComputeScheduleID",
        DataSourceMember: "PNRCComputeScheduleID"
    },
    {
        Name: "ReceivableDate",
        DefaultValue: "",
        BindControlName: "ReceivableDate",
        DataSourceMember: "ReceivableDate"
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
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "cbPartnerID",
        DataSourceMember: "PartnerID"
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
        DataSourceMember: "PNRCComputeScheduleID",
        Width: 60
    },
    // {
    //     Name: "PNRCComputeScheduleID",
    //     Type: "texttolink",
    //     Link: "/PNRCComputeSchedule/Detail/",
    //     Caption: "Mã lịch tính thưởng",
    //     DataSourceMember: "PNRCComputeScheduleID",
    //     Width: 150
    // },
    {
        Name: "ReceivableDate",
        Type: "text",
        //Type: "date",
        // Type: "texttolink",
        // Link: "/PNRCComputeSchedule/Detail/",
        Caption: "Ngày tính",
        DataSourceMember: "ReceivableDateString",
        Width: 90
    },
    {
        Name: "PartnerName",
        Type: "text",
        Caption: "Đối tác",
        DataSourceMember: "PartnerName",
        Width: 220
    },
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     Width: 160
    // },
    {
        Name: "IsAutoAdd",
        Type: "checkicon",
        Caption: "Lịch tự động thêm",
        DataSourceMember: "IsAutoAdd",
        Width: 100
    },
    {
        Name: "IsCompletedCompute",
        Type: "checkicon",
        Caption: "Kết thúc tính",
        DataSourceMember: "IsCompletedCompute",
        Width: 90
    },
    {
        Name: "ComputeIntervalString",
        Type: "text",
        Caption: "Thời gian tính",
        DataSourceMember: "ComputeIntervalString",
        Width: 90
    },
    {
        Name: "IsComputeError",
        Type: "checkicon",
        Caption: "Lỗi tính",
        DataSourceMember: "IsComputeError",
        Width: 90
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
        Type: "datetime",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
        Width: 110
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
        DataSourceMember: "PNRCComputeScheduleID",
        Width: 80,
        Link: "/PNRCComputeSchedule/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
