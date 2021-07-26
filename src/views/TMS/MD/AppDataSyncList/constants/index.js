export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/AppDataSyncList/Search";
export const LoadAPIPath = "api/AppDataSyncList/Load";
export const AddAPIPath = "api/AppDataSyncList/Add";
export const UpdateAPIPath = "api/AppDataSyncList/Update";
export const DeleteAPIPath = "api/AppDataSyncList/Delete";
export const UpdateOrderAPIPath = "api/AppDataSyncList/UpdateOrder";
export const BackLink = "/AppDataSyncList";
export const AddLink = "/AppDataSyncList/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AppDataSyncListID";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách đồng bộ dữ liệu giữa các ứng dụng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppDataSyncList", Title: "Danh sách đồng bộ dữ liệu giữa các ứng dụng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppDataSyncList", Title: "Danh sách đồng bộ dữ liệu giữa các ứng dụng" },
    { Link: "", Title: "Thêm" }
];

var date = new Date();
const dtFromdate = new Date(date.getFullYear(), date.getMonth(), 1);
const dtTodate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
//const dtFromdate = new Date(new Date().setHours(0,0,0,0));
//dtFromdate.setDate(new Date().getDate() - 1);
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@SyncFrequencyType",
        SearchValue: -1
    },
    {
        SearchKey: "@FromDate",
        SearchValue: dtFromdate
    },
    {
        SearchKey: "@ToDate",
        SearchValue: dtTodate
    }
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
    },
    {
        type: "select",
        name: "slSyncFrequencyType",
        label: "Loại định kỳ đồng bộ",
        value: 1,
        placeholder: "",
        icon: "",
        listoption: [{ value: -1, label: "---Vui lòng chọn---" }, { value: 1, label: "Hàng ngày" }, { value: 2, label: "Hàng tháng" }],
        DataSourceMember: "SyncFrequencyType",
        readonly: false,
        disabled: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false
    },
    // {
    //     type: "select",
    //     name: "IsResponseError",
    //     label: "Lỗi phản hồi",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [{value: -1, label: "Tất cả"}, {value: 0, label: "Không lỗi"}, {value: 1, label: "Có lỗi"}],
    //     DataSourceMember: "IsResponseError",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: false
    // },
    // {
    //     type: "select",
    //     name: "slAppDataSyncListTypeID",
    //     label: "Loại giao dịch",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "AppDataSyncListTypeID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.AppDataSyncListTYPE",
    //     ValueMember: "AppDataSyncListTypeID",
    //     NameMember: "AppDataSyncListTypeName"
    // },
    // {
    //     type: "select",
    //     name: "slPartnerID",
    //     label: "Đối tác",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "PartnerID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
    //     ValueMember: "PartnerID",
    //     NameMember: "PartnerName"
    // },
    {
        type: "datetime",
        name: "dtFromDate",
        label: "Từ ngày",
        value: dtFromdate,
        placeholder: "",
        icon: "",
        DataSourceMember: "FromDate",
        ValueMember: "FromDate",
        NameMember: "FromDate"
    },
    {
        type: "datetime",
        name: "dtToDate",
        label: "Đến ngày",
        value: dtTodate,
        placeholder: "",
        icon: "",
        DataSourceMember: "ToDate",
        ValueMember: "ToDate",
        NameMember: "ToDate"
    }
];


export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    // {
    //     Name: "IsResponseError",
    //     DefaultValue: "",
    //     BindControlName: "IsResponseError"
    // },
    // {
    //     Name: "AppDataSyncListTypeID",
    //     DefaultValue: -1,
    //     BindControlName: "slAppDataSyncListTypeID"
    // },
    {
        Name: "SyncFrequencyType",
        DefaultValue: -1,
        BindControlName: "slSyncFrequencyType"
    },
    {
        Name: "FromDate",
        DefaultValue: "",
        BindControlName: "dtFromDate"
    },
    {
        Name: "ToDate",
        DefaultValue: "",
        BindControlName: "dtToDate"
    }
];



export const DataGridColumnList = [
    // {
    //     Name: "AppDataSyncListID",
    //     Type: "texttolink",
    //     Caption: "Mã phụ cấp",
    //     Link: "/AppDataSyncList/Edit/",
    //     DataSourceMember: "AppDataSyncListID",
    //     //Width: 
    // },
    // {
    //     Name: "AppDataSyncListTypeName",
    //     Type: "text",
    //     //Link: "/AppDataSyncList/Edit/",
    //     Caption: "Loại giao dịch",
    //     DataSourceMember: "AppDataSyncListTypeName",
    //     Width: 300
    // },
    {
        Name: "AppDataSyncTypeName",
        Type: "text",
        Caption: "Loại đồng bộ",
        DataSourceMember: "AppDataSyncTypeName",
        Width: 120
    },
    {
        Name: "SyncFrequencyTypeName",
        Type: "text",
        Caption: "Loại định kỳ",
        DataSourceMember: "SyncFrequencyTypeName",
        Width: 100
    },
    {
        Name: "SyncDate",
        Type: "date",
        Caption: "Ngày/tháng",
        DataSourceMember: "SyncDate",
        Width: 80
    },
    {
        Name: "IsBeginSync",
        Type: "checkicon",
        Caption: "Đã bắt đầu",
        DataSourceMember: "IsBeginSync",
        Width: 90
    },
    {
        Name: "IsCompletedSync",
        Type: "checkicon",
        Caption: "Đã kết thúc",
        DataSourceMember: "IsCompletedSync",
        Width: 90
    },
    {
        Name: "BeginSyncTime",
        Type: "date",
        Caption: "Thời gian BĐ",
        DataSourceMember: "BeginSyncTime",
        Width: 100
    },
    {
        Name: "EndSyncTime",
        Type: "date",
        Caption: "Thời gian KT",
        DataSourceMember: "EndSyncTime",
        Width: 100
    },
    {
        Name: "SyncInterval",
        Type: "text",
        Caption: "Khoản thời gian(ms)",
        DataSourceMember: "SyncInterval",
        Width: 140
    },
    {
        Name: "SyncIntervalString",
        Type: "text",
        Caption: "Chuổi khoảng TG",
        DataSourceMember: "SyncIntervalString",
        Width: 120
    },
    {
        Name: "TotalSyncRows",
        Type: "text",
        Caption: "Tổng số dòng",
        DataSourceMember: "TotalSyncRows",
        Width: 100
    },
    {
        Name: "PartnerTransactionID",
        Type: "text",
        Caption: "Mã giao dịch",
        DataSourceMember: "PartnerTransactionID",
        Width: 100
    },
    {
        Name: "IsSyncError",
        Type: "checkicon",
        Caption: "Lỗi",
        DataSourceMember: "IsSyncError",
        Width: 50
    },
    {
        Name: "ErrorContent",
        Type: "text",
        Caption: "Nội dung lỗi",
        DataSourceMember: "ErrorContent",
        //Width: 150
    },
    


    // {
    //     Name: "UserFullName",
    //     Type: "text",
    //     Caption: "Tên nhân viên",
    //     DataSourceMember: "UserFullName",
    //     Width: 150
    // },
    // {
    //     Name: "TimeKeepIngHour",
    //     Type: "text",
    //     Caption: "Số giờ công",
    //     DataSourceMember: "TimeKeepIngHour",
    //     Width: 150
    // },
    // {
    //     Name: "FuelPrice",
    //     Type: "textCurrency",
    //     Caption: "Đơn giá xăng",
    //     DataSourceMember: "FuelPrice",
    //     Width: 150
    // },
    // {
    //     Name: "TotalSubsidize",
    //     Type: "textCurrency",
    //     Caption: "Tổng tiền phụ cấp",
    //     DataSourceMember: "TotalSubsidize",
    //     Width: 150
    // },
    // {
    //     Name: "UpdatedDate",
    //     Type: "date",
    //     Caption: "Ngày cập nhật",
    //     DataSourceMember: "UpdatedDate",
    //     Width: 140
    // },
    // {
    //     Name: "UpdatedUserFullName",
    //     Type: "text",
    //     Caption: "Người cập nhật",
    //     DataSourceMember: "UpdatedUserFullName",
    //     Width: 140
    // },

    // {
    //     Name: "RequestTimeString",
    //     Type: "text",
    //     Caption: "Ngày yêu cầu",
    //     DataSourceMember: "RequestTimeString",
    //     Width: 150
    // },
    // {
    //     Name: "RequestTime",
    //     Type: "datetime",
    //     Caption: "Ngày yêu cầu",
    //     DataSourceMember: "RequestTime",
    //     Width: 150
    // },
    // {
    //     Name: "RequestURL",
    //     Type: "text",
    //     Caption: "Địa chỉ URL yêu cầu",
    //     DataSourceMember: "RequestURL",
    //     Width: 150
    // },
    // {
    //     Name: "IsResponse",
    //     Type: "checkicon",
    //     Caption: "Đã phản hồi",
    //     DataSourceMember: "IsResponse",
    //     Width: 120
    // },
    // {
    //     Name: "ResponseTime",
    //     Type: "datetime",
    //     Caption: "Thời gian phản hồi",
    //     DataSourceMember: "ResponseTime",
    //     Width: 150
    // }
    // {
    //     Name: "ResponseTimeString",
    //     Type: "text",
    //     Caption: "Thời gian phản hồi",
    //     DataSourceMember: "ResponseTimeString",
    //     Width: 150
    // }
];
