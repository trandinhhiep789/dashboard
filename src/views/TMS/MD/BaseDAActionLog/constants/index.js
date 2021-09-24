export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/BaseDAActionLog/Search";
export const LoadAPIPath = "api/BaseDAActionLog/Load";
export const AddAPIPath = "api/BaseDAActionLog/Add";
export const UpdateAPIPath = "api/BaseDAActionLog/Update";
export const DeleteAPIPath = "api/BaseDAActionLog/Delete";
export const UpdateOrderAPIPath = "api/BaseDAActionLog/UpdateOrder";
export const BackLink = "/BaseDAActionLog";
export const AddLink = "/BaseDAActionLog/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "BaseDAActionLogID";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Nhật ký xử lý tải chuẩn(tính tải, đồng bộ tải)" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/BaseDAActionLog", Title: "Nhật ký xử lý tải chuẩn(tính tải, đồng bộ tải)" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/BaseDAActionLog", Title: "Nhật ký xử lý tải chuẩn(tính tải, đồng bộ tải)" },
    { Link: "", Title: "Thêm" }
];

const dtFromdate = new Date()
dtFromdate.setDate(new Date().getDate() - 1);
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@LogActionType",
        SearchValue: "-1"
    },
    {
        SearchKey: "@IsComputeError",
        SearchValue: "-1"
    }, 
    // {
    //     SearchKey: "@PartnerID",
    //     SearchValue: ""
    // },
    {
        SearchKey: "@FromDate",
        SearchValue: dtFromdate
    },
    {
        SearchKey: "@ToDate",
        SearchValue: new Date()
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
        name: "LogActionType",
        label: "Loại nhật ký xử lý",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [{value: -1, label: "Tất cả"}, {value: 1, label: "Tính tải"}, {value: 2, label: "Đồng bộ tải"}],
        DataSourceMember: "LogActionType",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false
    },
    {
        type: "select",
        name: "IsComputeError",
        label: "Tính tải bị lỗi",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [{value: -1, label: "Tất cả"}, {value: 0, label: "Không lỗi"}, {value: 1, label: "Có lỗi"}],
        DataSourceMember: "IsComputeError",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false
    },
    // {
    //     type: "select",
    //     name: "slBaseDAActionLogTypeID",
    //     label: "Loại giao dịch",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "BaseDAActionLogTypeID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.BaseDAActionLogTYPE",
    //     ValueMember: "BaseDAActionLogTypeID",
    //     NameMember: "BaseDAActionLogTypeName"
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
        type: "date",
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
        type: "date",
        name: "dtToDate",
        label: "Đến ngày",
        value: new Date(),
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
    {
        Name: "IsComputeError",
        DefaultValue: "",
        BindControlName: "IsComputeError"
    },
    {
        Name: "LogActionType",
        DefaultValue: "",
        BindControlName: "LogActionType"
    },
    // {
    //     Name: "BaseDAActionLogTypeID",
    //     DefaultValue: -1,
    //     BindControlName: "slBaseDAActionLogTypeID"
    // },
    // {
    //     Name: "PartnerID",
    //     DefaultValue: -1,
    //     BindControlName: "slPartnerID"
    // },
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
    {
        Name: "DeliveryDateString",
        Type: "texttolink",
        Caption: "Ngày lấy tải",
        Link: "/BaseDAActionLog/Edit/",
        DataSourceMember: "DeliveryDateString",
        Width: 150
    },
    {
        Name: "LogActionTypeName",
        Type: "text",
        Caption: "Loại nhật ký xử lý",
        DataSourceMember: "LogActionTypeName",
        Width: 150
    },
    {
        Name: "ActionDate",
        Type: "date",
        Caption: "Ngày xử lý",
        DataSourceMember: "ActionDate",
        Width: 150
    },
    {
        Name: "ActionInterval",
        Type: "text",
        Caption: "Thời gian xử lý(giây)",
        DataSourceMember: "ActionInterval",
        Width: 150
    },
    {
        Name: "IsActionError",
        Type: "checkicon",
        Caption: "Xử lý bị bị lỗi",
        DataSourceMember: "IsActionError",
        Width: 150
    },




    // {
    //     Name: "RequestTimeString",
    //     Type: "text",
    //     Caption: "Ngày yêu cầu",
    //     DataSourceMember: "RequestTimeString",
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
    //     Name: "ResponseTimeString",
    //     Type: "text",
    //     Caption: "Thời gian phản hồi",
    //     DataSourceMember: "ResponseTimeString",
    //     Width: 150
    // }
];
