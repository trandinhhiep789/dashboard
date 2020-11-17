export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/TMSReward/SearchListUserName";
export const LoadByDateAPIPath = "api/TMSRewardDetail/LoadByDate";
export const LoadUserNameByDateAPIPath = "api/TMSRewardDetail/LoadUserNameByDate";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách thống kê vận đơn theo nhân viên" }
];

export const PageByDatePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardShipmentOrderByUser", Title: "Danh sách thống kê vận đơn theo nhân viên" },
    { Link: "/RewardShipmentOrderByUser", Title: "Danh sách thống kê vận đơn theo ngày" }
];

const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

export const InitSearchParams = [
    {
        SearchKey: "@FROMDATE",
        SearchValue: dtFromdate
    },
    {
        SearchKey: "@TODATE",
        SearchValue: new Date()
    },
    {
        SearchKey: "@USERNAMELIST",
        SearchValue: ""
    },
];



export const SearchElementList = [
    
    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ Ngày",
        value: dtFromdate,
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtToDate",
        DataSourceMember: "ToDate",
        label: "Đến Ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "MultiSelectUser",
        name: "cbUserName",
        DataSourceMember: "UserName",
        label: "Nhân viên",
        colspan: 12,
        rowspan: 5,
        labelcolspan: 12,
        IsLabelDiv: true,
        value: -1,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        isMultiSelect: true

    },

]

export const  SearchMLObjectDefinition = [
    {
        Name: "FromDate",
        DefaultValue: "",
        BindControlName: "dtFromDate"
    },
    {
        Name: "ToDate",
        DefaultValue: "",
        BindControlName: "dtToDate"
    },
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "cbUserName"
    },
]

export const GridColumnList = [
    {
        Name: "RewardDate",
        Type: "texttolinkdateNew",
        Caption: "Ngày",
        DataSourceMember: "RewardDate",
        Link: "/RewardShipmentOrderByUser/RewardByDate/",
        Width: 100
    },
    {
        Name: "TotalReward",
        Type: "textCurrency",
        Caption: "Tổng thưởng",
        DataSourceMember: "TotalReward",
        Width: 100
    },
    
]

export const GridColumnListByDate = [

    {
        Name: "RewardTypeName",
        Type: "text",
        Caption: "Loại thưởng",
        DataSourceMember: "RewardTypeName",
        Width: 100
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 100
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "ProductName",
        Width: 200
    },
    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Mã vận đợn",
        DataSourceMember: "ShipmentOrderID",
        Width: 100
    },
    {
        Name: "Quantity",
        Type: "text",
        Caption: "Số lượng",
        DataSourceMember: "Quantity",
        Width: 100
    },
    {
        Name: "RewardPrice",
        Type: "textCurrency",
        Caption: "Đơn giá thưởng",
        DataSourceMember: "RewardPrice",
        Width: 100
    },
    {
        Name: "TotalReward",
        Type: "textCurrency",
        Caption: "Số tiền thưởng",
        DataSourceMember: "TotalReward",
        Width: 100
    },
]

