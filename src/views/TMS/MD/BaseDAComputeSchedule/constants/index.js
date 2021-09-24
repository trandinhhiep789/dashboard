import { ERPCOMMONCACHE_PARTNER } from "../../../../../constants/keyCache";

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/BaseDAComputeSchedule/Search";
export const LoadAPIPath = "api/BaseDAComputeSchedule/Load";
export const AddAPIPath = "api/BaseDAComputeSchedule/Add";
export const UpdateAPIPath = "api/BaseDAComputeSchedule/Update";
export const DeleteAPIPath = "api/BaseDAComputeSchedule/Delete";
export const UpdateOrderAPIPath = "api/BaseDAComputeSchedule/UpdateOrder";
export const BackLink = "/BaseDAComputeSchedule";
export const AddLink = "/BaseDAComputeSchedule/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "BaseDAComputeScheduleID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Lịch tính và đồng bộ tải chuẩn" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/BaseDAComputeSchedule", Title: "Lịch tính và đồng bộ tải chuẩn" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/BaseDAComputeSchedule", Title: "Lịch tính và đồng bộ tải chuẩn" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/BaseDAComputeSchedule", Title: "Lịch tính và đồng bộ tải chuẩn" },
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
        name: "DeliveryDateFrom",
        label: "ngày tính tải (từ ngày)",
        value: new Date(),
        placeholder: "",
        icon: "",
        readonly: true,
        DataSourceMember: "DeliveryDateFrom",
        validatonList: ["required"]
    },
    {
        type: "date",
        name: "DeliveryDateTo",
        label: "ngày tính tải (đến ngày)",
        value: new Date(),
        placeholder: "",
        icon: "",
        DataSourceMember: "DeliveryDateTo",
        validatonList: ["required"]
    },
    // {
    //     type: "select",
    //     name: "cbPartnerID",
    //     label: "đối tác",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "PartnerID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: ERPCOMMONCACHE_PARTNER,
    //     ValueMember: "PartnerID",
    //     NameMember: "PartnerName"
    // },
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
        name: "txtBaseDAComputeScheduleID",
        label: "mã lịch tính tải",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "BaseDAComputeScheduleID",
        readonly: true,
        validatonList: []
    },
    {
        type: "date",
        name: "DeliveryDate",
        label: "ngày tính tải",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "DeliveryDateString",
        validatonList: ["required"]
    },
    // {
    //     type: "select",
    //     name: "cbPartnerID",
    //     label: "đối tác",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "PartnerID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: ERPCOMMONCACHE_PARTNER,
    //     ValueMember: "PartnerID",
    //     NameMember: "PartnerName"
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
        Name: "BaseDAComputeScheduleID",
        DefaultValue: "",
        BindControlName: "txtBaseDAComputeScheduleID",
        DataSourceMember: "BaseDAComputeScheduleID"
    },
    {
        Name: "DeliveryDate",
        DefaultValue: "",
        BindControlName: "DeliveryDate",
        DataSourceMember: "DeliveryDate"
    },
    {
        Name: "DeliveryDateFrom",
        DefaultValue: "",
        BindControlName: "DeliveryDateFrom",
        DataSourceMember: "DeliveryDateFrom"
    },
    {
        Name: "DeliveryDateTo",
        DefaultValue: "",
        BindControlName: "DeliveryDateTo",
        DataSourceMember: "DeliveryDateTo"
    },
    {
        Name: "DeliveryDateString",
        DefaultValue: "",
        BindControlName: "DeliveryDateString",
        DataSourceMember: "DeliveryDateString"
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
    // {
    //     Name: "PartnerID",
    //     DefaultValue: "",
    //     BindControlName: "cbPartnerID",
    //     DataSourceMember: "PartnerID"
    // },
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
        DataSourceMember: "BaseDAComputeScheduleID",
        Width: 60
    },
    // {
    //     Name: "BaseDAComputeScheduleID",
    //     Type: "texttolink",
    //     Link: "/BaseDAComputeSchedule/Detail/",
    //     Caption: "Mã lịch tính tải",
    //     DataSourceMember: "BaseDAComputeScheduleID",
    //     Width: 150
    // },
    {
        Name: "DeliveryDate",
        Type: "text",
        //Type: "date",
        // Type: "texttolink",
        // Link: "/BaseDAComputeSchedule/Detail/",
        Caption: "Ngày tính tải",
        DataSourceMember: "DeliveryDateString",
        Width: 90
    },
    // {
    //     Name: "PartnerName",
    //     Type: "text",
    //     Caption: "Đối tác",
    //     DataSourceMember: "PartnerName",
    //     Width: 220
    // },
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
        DataSourceMember: "BaseDAComputeScheduleID",
        Width: 80,
        Link: "/BaseDAComputeSchedule/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
