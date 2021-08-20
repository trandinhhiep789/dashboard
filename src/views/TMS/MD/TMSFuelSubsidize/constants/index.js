export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/TMSFuelSubsidize/Search";
export const LoadAPIPath = "api/TMSFuelSubsidize/Load";
export const AddAPIPath = "api/TMSFuelSubsidize/Add";
export const UpdateAPIPath = "api/TMSFuelSubsidize/Update";
export const DeleteAPIPath = "api/TMSFuelSubsidize/Delete";
export const UpdateOrderAPIPath = "api/TMSFuelSubsidize/UpdateOrder";
export const BackLink = "/TMSFuelSubsidize";
export const AddLink = "/TMSFuelSubsidize/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "TMSFuelSubsidizeID";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Thông tin phụ cấp xăng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/TMSFuelSubsidize", Title: "Thông tin phụ cấp xăng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/TMSFuelSubsidize", Title: "Thông tin phụ cấp xăng" },
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
    //     name: "slTMSFuelSubsidizeTypeID",
    //     label: "Loại giao dịch",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "TMSFuelSubsidizeTypeID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.TMSFuelSubsidizeTYPE",
    //     ValueMember: "TMSFuelSubsidizeTypeID",
    //     NameMember: "TMSFuelSubsidizeTypeName"
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
    //     Name: "TMSFuelSubsidizeTypeID",
    //     DefaultValue: -1,
    //     BindControlName: "slTMSFuelSubsidizeTypeID"
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
    // {
    //     Name: "TMSFuelSubsidizeID",
    //     Type: "texttolink",
    //     Caption: "Mã phụ cấp",
    //     Link: "/TMSFuelSubsidize/Edit/",
    //     DataSourceMember: "TMSFuelSubsidizeID",
    //     //Width: 
    // },
    // {
    //     Name: "TMSFuelSubsidizeTypeName",
    //     Type: "text",
    //     //Link: "/TMSFuelSubsidize/Edit/",
    //     Caption: "Loại giao dịch",
    //     DataSourceMember: "TMSFuelSubsidizeTypeName",
    //     Width: 300
    // },
    {
        Name: "SubsidizeDateString",
        Type: "text",
        //Link: "/TMSFuelSubsidize/Edit/",
        Caption: "Ngày phụ cấp",
        DataSourceMember: "SubsidizeDateString",
        Width: 150
    },
    {
        Name: "UserName",
        Type: "text",
        Caption: "Mã nhân viên",
        DataSourceMember: "UserName",
        Width: 150
    },
    {
        Name: "UserFullName",
        Type: "text",
        Caption: "Tên nhân viên",
        DataSourceMember: "UserFullName",
        Width: 150
    },
    {
        Name: "TimeKeepIngHour",
        Type: "text",
        Caption: "Số giờ công",
        DataSourceMember: "TimeKeepIngHour",
        Width: 150
    },
    {
        Name: "FuelPrice",
        Type: "textCurrency",
        Caption: "Đơn giá xăng",
        DataSourceMember: "FuelPrice",
        Width: 150
    },
    {
        Name: "TotalSubsidize",
        Type: "textCurrency",
        Caption: "Tổng tiền phụ cấp",
        DataSourceMember: "TotalSubsidize",
        Width: 150
    },
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
