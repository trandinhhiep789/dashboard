export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/PartnerTransaction/SearchNew";
export const LoadAPIPath = "api/PartnerTransaction/Load";
export const AddAPIPath = "api/PartnerTransaction/Add";
export const UpdateAPIPath = "api/PartnerTransaction/Update";
export const DeleteAPIPath = "api/PartnerTransaction/Delete";
export const UpdateOrderAPIPath = "api/PartnerTransaction/UpdateOrder";
export const BackLink = "/PartnerTransaction";
export const AddLink = "/PartnerTransaction/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PartnerTransactionID";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Thông tin giao dịch với đối tác" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerTransaction", Title: "Thông tin giao dịch với đối tác" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerTransaction", Title: "Thông tin giao dịch với đối tác" },
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
        SearchKey: "@IsResponseError",
        SearchValue: "-1"
    },
    {
        SearchKey: "@PartnerTransactionTypeID",
        SearchValue: ""
    },
    {
        SearchKey: "@PartnerID",
        SearchValue: ""
    },
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
        name: "IsResponseError",
        label: "Lỗi phản hồi",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [{value: -1, label: "Tất cả"}, {value: 0, label: "Không lỗi"}, {value: 1, label: "Có lỗi"}],
        DataSourceMember: "IsResponseError",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false
    },
    {
        type: "select",
        name: "slPartnerTransactionTypeID",
        label: "Loại giao dịch",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerTransactionTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNERTRANSACTIONTYPE",
        ValueMember: "PartnerTransactionTypeID",
        NameMember: "PartnerTransactionTypeName"
    },
    {
        type: "select",
        name: "slPartnerID",
        label: "Đối tác",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName"
    },
    {
        type: "datetimes",
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
        type: "datetimes",
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
        Name: "IsResponseError",
        DefaultValue: "",
        BindControlName: "IsResponseError"
    },
    {
        Name: "PartnerTransactionTypeID",
        DefaultValue: -1,
        BindControlName: "slPartnerTransactionTypeID"
    },
    {
        Name: "PartnerID",
        DefaultValue: -1,
        BindControlName: "slPartnerID"
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
    {
        Name: "PartnerTransactionID",
        Type: "texttolink",
        Caption: "Mã giao dịch",
        Link: "/PartnerTransaction/Edit/",
        DataSourceMember: "PartnerTransactionID",
        //Width: 
    },
    {
        Name: "PartnerTransactionTypeName",
        Type: "text",
        //Link: "/PartnerTransaction/Edit/",
        Caption: "Loại giao dịch",
        DataSourceMember: "PartnerTransactionTypeName",
        Width: 300
    },
    {
        Name: "PartnerTransactionDate",
        Type: "datetime",
        Caption: "Ngày giao dịch",
        DataSourceMember: "PartnerTransactionDate",
        Width: 150
    },
    // {
    //     Name: "PartnerName",
    //     Type: "text",
    //     Caption: "Đối tác",
    //     DataSourceMember: "PartnerName",
    //     Width: 220
    // },
    // {
    //     Name: "RequestTimeString",
    //     Type: "text",
    //     Caption: "Ngày yêu cầu",
    //     DataSourceMember: "RequestTimeString",
    //     Width: 150
    // },
    {
        Name: "RequestTime",
        Type: "datetime",
        Caption: "Ngày yêu cầu",
        DataSourceMember: "RequestTime",
        Width: 150
    },
    {
        Name: "RequestURL",
        Type: "text",
        Caption: "Địa chỉ URL yêu cầu",
        DataSourceMember: "RequestURL",
        Width: 150
    },
    {
        Name: "IsResponse",
        Type: "checkicon",
        Caption: "Đã phản hồi",
        DataSourceMember: "IsResponse",
        Width: 120
    },
    {
        Name: "ResponseTime",
        Type: "datetime",
        Caption: "Thời gian phản hồi",
        DataSourceMember: "ResponseTime",
        Width: 150
    }
    // {
    //     Name: "ResponseTimeString",
    //     Type: "text",
    //     Caption: "Thời gian phản hồi",
    //     DataSourceMember: "ResponseTimeString",
    //     Width: 150
    // }
];
