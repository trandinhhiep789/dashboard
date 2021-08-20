export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/TMSGroupReward/Search";
export const LoadAPIPath = "api/TMSGroupReward/Load";
export const AddAPIPath = "api/TMSGroupReward/Add";
export const UpdateAPIPath = "api/TMSGroupReward/Update";
export const DeleteAPIPath = "api/TMSGroupReward/Delete";
export const UpdateOrderAPIPath = "api/TMSGroupReward/UpdateOrder";
export const BackLink = "/TMSGroupReward";
export const AddLink = "/TMSGroupReward/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "TMSGroupRewardID";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Thông tin thưởng nhóm điều phối" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/TMSGroupReward", Title: "Thông tin thưởng nhóm điều phối" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/TMSGroupReward", Title: "Thông tin thưởng nhóm điều phối" },
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
    //     name: "slTMSGroupRewardTypeID",
    //     label: "Loại giao dịch",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "TMSGroupRewardTypeID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.TMSGroupRewardTYPE",
    //     ValueMember: "TMSGroupRewardTypeID",
    //     NameMember: "TMSGroupRewardTypeName"
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
        type: "MonthPicker",
        name: "dtFromDate",
        DataSourceMember: "SaleMonth",
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
    //     Name: "TMSGroupRewardTypeID",
    //     DefaultValue: -1,
    //     BindControlName: "slTMSGroupRewardTypeID"
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
    // {
    //     Name: "ToDate",
    //     DefaultValue: "",
    //     BindControlName: "dtToDate"
    // }
];



export const DataGridColumnList = [
    // {
    //     Name: "TMSGroupRewardID",
    //     Type: "texttolink",
    //     Caption: "Mã phụ cấp",
    //     Link: "/TMSGroupReward/Edit/",
    //     DataSourceMember: "TMSGroupRewardID",
    //     //Width: 
    // },
    // {
    //     Name: "TMSGroupRewardTypeName",
    //     Type: "text",
    //     //Link: "/TMSGroupReward/Edit/",
    //     Caption: "Loại giao dịch",
    //     DataSourceMember: "TMSGroupRewardTypeName",
    //     Width: 300
    // },


    {
        Name: "AreaID",
        Type: "text",
        Caption: "Mã khu vực",
        DataSourceMember: "AreaID",
        Width: 100
    },
    {
        Name: "AreaName",
        Type: "text",
        Caption: "Tên khu vực",
        DataSourceMember: "AreaName",
        Width: 150
    },
    {
        Name: "CoordinatorGroupID",
        Type: "text",
        Caption: "Mã nhóm ĐP",
        DataSourceMember: "CoordinatorGroupID",
        Width: 100
    },
    {
        Name: "CoordinatorGroupName",
        Type: "text",
        Caption: "Tên nhóm ĐP",
        DataSourceMember: "CoordinatorGroupName",
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
        Name: "FullName",
        Type: "text",
        Caption: "Tên nhân viên",
        DataSourceMember: "FullName",
        Width: 150
    },
    {
        Name: "TotalMainHour",
        Type: "text",
        Caption: "Giờ công tống",
        DataSourceMember: "TotalMainHour",
        Width: 150
    },
    {
        Name: "MemberMainHour",
        Type: "text",
        Caption: "Giờ công đóng góp",
        DataSourceMember: "MemberMainHour",
        Width: 150
    },
    {
        Name: "TotalReward",
        Type: "text",
        Caption: "Tổng thưởng nhóm",
        DataSourceMember: "TotalReward",
        Width: 150
    },
    {
        Name: "MemberTotalReward",
        Type: "text",
        Caption: "Thưởng NVĐP",
        DataSourceMember: "MemberTotalReward",
        Width: 150
    },




    // {
    //     Name: "SubsidizeDateString",
    //     Type: "text",
    //     //Link: "/TMSGroupReward/Edit/",
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
