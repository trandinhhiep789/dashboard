export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/PNRCComputeLog/Search";
export const LoadAPIPath = "api/PNRCComputeLog/Load";
export const AddAPIPath = "api/PNRCComputeLog/Add";
export const UpdateAPIPath = "api/PNRCComputeLog/Update";
export const DeleteAPIPath = "api/PNRCComputeLog/Delete";
export const UpdateOrderAPIPath = "api/PNRCComputeLog/UpdateOrder";
export const BackLink = "/PNRCComputeLog";
export const AddLink = "/PNRCComputeLog/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PNRCComputeLogID";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Nhật ký tính doanh thu phải thu đối tác" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PNRCComputeLog", Title: "Nhật ký tính doanh thu phải thu đối tác" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PNRCComputeLog", Title: "Nhật ký tính doanh thu phải thu đối tác" },
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
        SearchKey: "@IsComputeError",
        SearchValue: "-1"
    },
    // {
    //     SearchKey: "@PNRCComputeLogTypeID",
    //     SearchValue: ""
    // },
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
        name: "IsComputeError",
        label: "Tính doanh thu bị lỗi",
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
    //     name: "slPNRCComputeLogTypeID",
    //     label: "Loại giao dịch",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "PNRCComputeLogTypeID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.PNRCComputeLogTYPE",
    //     ValueMember: "PNRCComputeLogTypeID",
    //     NameMember: "PNRCComputeLogTypeName"
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
    // {
    //     Name: "PNRCComputeLogTypeID",
    //     DefaultValue: -1,
    //     BindControlName: "slPNRCComputeLogTypeID"
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
        Name: "ReceivableDateString",
        Type: "texttolink",
        Caption: "Ngày doanh thu phải thu đối tác",
        Link: "/PNRCComputeLog/Edit/",
        DataSourceMember: "ReceivableDateString",
        Width: 150
    },
    {
        Name: "ComputeDate",
        Type: "date",
        Caption: "Ngày tính",
        DataSourceMember: "ComputeDate",
        Width: 150
    },
    {
        Name: "ComputeInterval",
        Type: "text",
        Caption: "Thời gian tính(giây)",
        DataSourceMember: "ComputeInterval",
        Width: 150
    },
    {
        Name: "IsComputeError",
        Type: "checkicon",
        Caption: "Tính doanh thu bị lỗi",
        DataSourceMember: "IsComputeError",
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
