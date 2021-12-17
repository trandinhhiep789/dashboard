export const APIHostName = "TMSMDMAPI";
export const SearchAPIPath = "api/ArchitechtureType_PRJType/Search";
export const LoadAPIPath = "api/ArchitechtureType_PRJType/Load";
export const AddAPIPath = "api/ArchitechtureType_PRJType/Add";
export const UpdateAPIPath = "api/ArchitechtureType_PRJType/Update";
export const DeleteAPIPath = "api/ArchitechtureType_PRJType/Delete";
export const UpdateOrderAPIPath = "api/ArchitechtureType_PRJType/UpdateOrder";
export const BackLink = "/ArchitechtureType_PRJType";
export const AddLink = "/ArchitechtureType_PRJType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ArchitechtureType_PRJTypeID";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Xuất thông tin các công trình" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ArchitechtureType_PRJType", Title: "Xuất thông tin các công trình" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ArchitechtureType_PRJType", Title: "Xuất thông tin các công trình" },
    { Link: "", Title: "Thêm" }
];
var dateNow = new Date();  
// const dtFromdate = new Date()
// dtFromdate.setDate(new Date().getDate() - 1);
export const InitSearchParams = [
    // {
    //     SearchKey: "@Keyword",
    //     SearchValue: ""
    // },
    // {
    //     SearchKey: "@IsComputeError",
    //     SearchValue: "-1"
    // },
    // {
    //     SearchKey: "@ArchitechtureType_PRJTypeTypeID",
    //     SearchValue: ""
    // },
    // {
    //     SearchKey: "@PartnerID",
    //     SearchValue: ""
    // },
    {
        SearchKey: "@FROMDATE",
        SearchValue: new Date((dateNow.getMonth()) + "/" + '01' + "/" + dateNow.getFullYear()),
    },
    {
        SearchKey: "@TODATE",
        SearchValue: new Date(dateNow.getFullYear(), dateNow.getMonth(), 0),
    }
];

export const SearchElementList = [
    // {
    //     type: "text",
    //     name: "txtKeyword",
    //     label: "Từ khóa:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {}
    // },
    // {
    //     type: "select",
    //     name: "IsComputeError",
    //     label: "Tính thưởng bị lỗi",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [{value: -1, label: "Tất cả"}, {value: 0, label: "Không lỗi"}, {value: 1, label: "Có lỗi"}],
    //     DataSourceMember: "IsComputeError",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: false
    // },
    // {
    //     type: "select",
    //     name: "slArchitechtureType_PRJTypeTypeID",
    //     label: "Loại giao dịch",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "ArchitechtureType_PRJTypeTypeID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.ArchitechtureType_PRJTypeTYPE",
    //     ValueMember: "ArchitechtureType_PRJTypeTypeID",
    //     NameMember: "ArchitechtureType_PRJTypeTypeName"
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
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ Ngày",
        value: new Date((dateNow.getMonth()) + "/" + '01' + "/" + dateNow.getFullYear()),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtToDate",
        DataSourceMember: "ToDate",
        label: "Đến Ngày",
        value: new Date(dateNow.getFullYear(), dateNow.getMonth(), 0),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    }
];


export const SearchMLObjectDefinition = [
    // {
    //     Name: "Keyword",
    //     DefaultValue: "",
    //     BindControlName: "txtKeyword"
    // },
    // {
    //     Name: "IsComputeError",
    //     DefaultValue: "",
    //     BindControlName: "IsComputeError"
    // },
    // {
    //     Name: "ArchitechtureType_PRJTypeTypeID",
    //     DefaultValue: -1,
    //     BindControlName: "slArchitechtureType_PRJTypeTypeID"
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
        Name: "RewardDateString",
        Type: "texttolink",
        Caption: "Ngày thưởng",
        Link: "/ArchitechtureType_PRJType/Edit/",
        DataSourceMember: "RewardDateString",
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
        Caption: "Tính thưởng bị lỗi",
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
