export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/TMSReward/Search";
export const LoadByUserNameAPIPath = "api/TMSReward/LoadByUserName";
export const SearchDetailAPIPath = "api/TMSRewardDetail/Search";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách thống kê vận đơn giao hàng" }
];


export const PagePathByUserName = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardShipmentOrder", Title: "Danh sách thống kê vận đơn giao hàng" },
    { Link: "", Title: "Danh sách thống kê vận đơn theo nhân viên" }
];


const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

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
        type: "ComboBoxNewChange",
        name: "cbCoordinatorStoreID",
        DataSourceMember: "CoordinatorStoreID",
        label: "kho làm việc",
        colspan: 3,
        value: "",
        isMultiSelect: false,
        placeholder: "---Kho làm việc---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        filterValue: 10,
        filterobj:"CompanyID",
        classNameCol:"col-custom"
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
        Name: "CoordinatorStore",
        DefaultValue: "",
        BindControlName: "cbCoordinatorStoreID"
    },
]

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
        SearchKey: "@COORDINATORSTOREID",
        SearchValue: -1
    },
];

export const GridColumnList = [
    {
        Name: "RewardUser",
        Type: "texttolink",
        Caption: "Mã nhân viên",
        DataSourceMember: "RewardUser",
        Link: "/RewardShipmentOrder/UserName/",
        Width: 100
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Tên nhân viên",
        DataSourceMember: "FullName",
        Width: 100
    },
    {
        Name: "TotalReward",
        Type: "text",
        Caption: "Tổng thưởng",
        DataSourceMember: "TotalReward",
        Width: 100
    },
    
]

export const GridColumnListByUserName = [
    {
        Name: "RewardDate",
        Type: "texttolinkdate",
        Caption: "Ngày",
        DataSourceMember: "RewardDate",
        Link: "/RewardShipmentOrder/RewardDate/",
        Width: 100
    },
    {
        Name: "TotalReward",
        Type: "text",
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
        Type: "text",
        Caption: "Đơn giá thưởng",
        DataSourceMember: "RewardPrice",
        Width: 100
    },
    {
        Name: "TotalReward",
        Type: "text",
        Caption: "Số tiền thưởng",
        DataSourceMember: "TotalReward",
        Width: 100
    },
]
