export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ApiCallLog/Search";
export const LoadAPIPath = "api/ApiCallLog/Load";
export const AddAPIPath = "api/ApiCallLog/Add";
export const UpdateAPIPath = "api/ApiCallLog/Update";
export const DeleteAPIPath = "api/ApiCallLog/Delete";
export const UpdateOrderAPIPath = "api/ApiCallLog/UpdateOrder";
export const BackLink = "/CallLog";
export const AddLink = "/CallLog/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "APICallLogID";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Nhật ký gọi API" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/CallLog", Title: "Nhật ký gọi API" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/CallLog", Title: "Nhật ký gọi API" },
    { Link: "", Title: "Thêm" }
];

const dtFromdate = new Date()
dtFromdate.setDate(new Date().getDate() - 1);
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    // {
    //     SearchKey: "@APICategoryID",
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
    // {
    //     Name: "APICategoryID",
    //     DefaultValue: -1,
    //     BindControlName: "APICategoryID"
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
        Name: "APICallLogID",
        Type: "texttolink",
        Caption: "Mã gọi API",
        Link: "/CallLog/Edit/",
        DataSourceMember: "APICallLogID",
        Width: 100
    },
    // {
    //     Name: "APICategoryID",
    //     Type: "text",
    //     Caption: " Danh mục API",
    //     DataSourceMember: "APICategoryID",
    //     Width: 150
    // },
    {
        Name: "APICallDate",
        Type: "date",
        Caption: "Ngày gọi API",
        DataSourceMember: "APICallDate",
        Width: 120
    },
    {
        Name: "RequestTimeString",
        Type: "text",
        Caption: "Thời gian yêu cầu",
        DataSourceMember: "RequestTimeString",
        Width: 150
    },
    {
        Name: "RequestURL",
        Type: "text",
        Caption: "Địa chỉ URL yêu cầu",
        DataSourceMember: "RequestURL",
        //Width: 150
    },
    {
        Name: "IsResponse",
        Type: "checkicon",
        Caption: "Đã phản hồi",
        DataSourceMember: "IsResponse",
        Width: 120
    },
    {
        Name: "ResponseTimeString",
        Type: "text",
        Caption: "Thời gian phản hồi",
        DataSourceMember: "ResponseTimeString",
        Width: 160
    }
];
