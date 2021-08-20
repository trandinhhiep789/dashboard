export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/OTTimeKeeping/Search";
export const LoadAPIPath = "api/OTTimeKeeping/Load";
export const AddAPIPath = "api/OTTimeKeeping/Add";
export const UpdateAPIPath = "api/OTTimeKeeping/Update";
export const DeleteAPIPath = "api/OTTimeKeeping/Delete";
export const UpdateOrderAPIPath = "api/OTTimeKeeping/UpdateOrder";
export const BackLink = "/OTTimeKeeping";
export const AddLink = "/OTTimeKeeping/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "OTTimeKeepingID";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Thông tin nhân viên vượt giờ công trong tháng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/OTTimeKeeping", Title: "Thông tin nhân viên vượt giờ công trong tháng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/OTTimeKeeping", Title: "Thông tin nhân viên vượt giờ công trong tháng" },
    { Link: "", Title: "Thêm" }
];

var date = new Date();
const dtFromdate = new Date(date.getFullYear(), date.getMonth(), 1);
const dtTodate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
//const dtFromdate = new Date(new Date().setHours(0,0,0,0));
//dtFromdate.setDate(new Date().getDate() - 1);
export const InitSearchParams = [
    // {
    //     SearchKey: "@Keyword",
    //     SearchValue: ""
    // },
    {
        SearchKey: "@USERNAME",
        SearchValue: -1
    },
    {
        SearchKey: "@TIMEKEEPINGMONTH",
        SearchValue: dtFromdate
    },
    // {
    //     SearchKey: "@ToDate",
    //     SearchValue: dtTodate
    // }
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
    //     name: "slOTTimeKeepingTypeID",
    //     label: "Loại giao dịch",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "OTTimeKeepingTypeID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.OTTimeKeepingTYPE",
    //     ValueMember: "OTTimeKeepingTypeID",
    //     NameMember: "OTTimeKeepingTypeName"
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
    // {
    //     type: "datetime",
    //     name: "dtFromDate",
    //     label: "Từ ngày",
    //     value: dtFromdate,
    //     placeholder: "",
    //     icon: "",
    //     DataSourceMember: "FromDate",
    //     ValueMember: "FromDate",
    //     NameMember: "FromDate"
    // },
    // {
    //     type: "datetime",
    //     name: "dtToDate",
    //     label: "Đến ngày",
    //     value: dtTodate,
    //     placeholder: "",
    //     icon: "",
    //     DataSourceMember: "ToDate",
    //     ValueMember: "ToDate",
    //     NameMember: "ToDate"
    // }
    // {
    //     type: "monthpicker",
    //     name: "dtFromDate",
    //     label: "Từ ngày",
    //     value: dtFromdate,
    //     placeholder: "",
    //     icon: "",
    //     DataSourceMember: "FromDate",
    //     ValueMember: "FromDate",
    //     NameMember: "FromDate"
    // },
    {
        type: "MultiSelectUser",
        name: "slUserName",
        DataSourceMember: "UserName",
        label: "Nhân viên",
        colspan: 12,
        rowspan: 3,
        labelcolspan: 12,
        IsLabelDiv: true,
        value: -1,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        isMultiSelect: false,
        isClearable: true
    },
    {
        type: "MonthPicker",
        name: "dtTimeKeepingMonth",
        DataSourceMember: "TimeKeepingMonth",
        label: "Tháng thưởng",
        //value: new Date((new Date().getMonth()) + "/" + '01' + "/" + new Date().getFullYear()),
        value: new Date(),
        format: "MM-YYYY",
        colspan: 2,
        placeholder: "MM-YYYY",
    },
];


export const SearchMLObjectDefinition = [
    // {
    //     Name: "Keyword",
    //     DefaultValue: "",
    //     BindControlName: "txtKeyword"
    // },
    // {
    //     Name: "IsResponseError",
    //     DefaultValue: "",
    //     BindControlName: "IsResponseError"
    // },
    // {
    //     Name: "OTTimeKeepingTypeID",
    //     DefaultValue: -1,
    //     BindControlName: "slOTTimeKeepingTypeID"
    // },
    {
        Name: "UserName",
        DefaultValue: -1,
        BindControlName: "slUserName"
    },
    {
        Name: "TimeKeepingMonth",
        DefaultValue: "",
        BindControlName: "dtTimeKeepingMonth"
    },
    // {
    //     Name: "ToDate",
    //     DefaultValue: "",
    //     BindControlName: "dtToDate"
    // }
];



export const DataGridColumnList = [
    // {
    //     Name: "OTTimeKeepingID",
    //     Type: "texttolink",
    //     Caption: "Mã phụ cấp",
    //     Link: "/OTTimeKeeping/Edit/",
    //     DataSourceMember: "OTTimeKeepingID",
    //     //Width: 
    // },
    // {
    //     Name: "OTTimeKeepingTypeName",
    //     Type: "text",
    //     //Link: "/OTTimeKeeping/Edit/",
    //     Caption: "Loại giao dịch",
    //     DataSourceMember: "OTTimeKeepingTypeName",
    //     Width: 300
    // },


    {
        Name: "TimeKeepingMonthString",
        Type: "text",
        Caption: "Tháng",
        DataSourceMember: "TimeKeepingMonthString",
        Width: 100
    },
    {
        Name: "UserName",
        Type: "text",
        Caption: "Mã nhân viên",
        DataSourceMember: "UserName",
        Width: 150
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Tên nhân viên",
        DataSourceMember: "FullName",
        Width: 150
    },
    {
        Name: "StandardManHour",
        Type: "text",
        Caption: "Giờ công chuẩn",
        DataSourceMember: "StandardManHour",
        Width: 150
    },
    {
        Name: "TotalManHour",
        Type: "text",
        Caption: "Giờ công thực tế",
        DataSourceMember: "TotalManHour",
        Width: 150
    },
    {
        Name: "OTTimeString",
        Type: "text",
        Caption: "Thời điểm vượt",
        DataSourceMember: "OTTimeString",
        Width: 150
    }
   




    // {
    //     Name: "SubsidizeDateString",
    //     Type: "text",
    //     //Link: "/OTTimeKeeping/Edit/",
    //     Caption: "Ngày phụ cấp",
    //     DataSourceMember: "SubsidizeDateString",
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
