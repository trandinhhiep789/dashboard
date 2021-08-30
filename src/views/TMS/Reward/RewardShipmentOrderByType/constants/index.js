import { toIsoStringCus } from '../../../../../utils/function'

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/TMSReward/Search";
export const SearchNewAPIPath = "api/TMSRewardDetail/SearchByRewardType";
export const SearchDetailAPIPath = "api/TMSRewardDetail/LoadRewardTypeByDate";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Thưởng giao hàng theo loại" }
];


export const PagePathByUserName = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardShipmentOrderByType", Title: "Thưởng giao hàng theo loại" },
    { Link: "", Title: "Thưởng giao hàng với loại thưởng theo ngày" }
];


const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

export const SearchElementList = [

    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ Ngày",
        value: new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()),
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
        name: "cbRewardTypeID",
        DataSourceMember: "cbRewardTypeID",
        label: "Loại thưởng",
        colspan: 3,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Loại thưởng---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TMSREWARDTYPE",
        ValueMember: "RewardTypeID",
        NameMember: "RewardTypeName",
        classNameCol: "col-custom"
    },


]

export const SearchMLObjectDefinition = [
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
        Name: "RewardTypeID",
        DefaultValue: "",
        BindControlName: "cbRewardTypeID"
    },

]

export const InitSearchParams = [
    {
        SearchKey: "@FROMDATE",
        SearchValue: toIsoStringCus(new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()).toISOString())
        //SearchValue: new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear())
    },
    {
        SearchKey: "@TODATE",
        SearchValue: new Date()
    },
    {
        SearchKey: "@REWARDTYPEID",
        SearchValue: -1
    },
    {
        SearchKey: "@PAGEINDEX",
        SearchValue: 1
    },
    {
        SearchKey: "@PAGESIZE",
        SearchValue: 31
    },

];

export const GridColumnList = [
    {
        Name: "RewardDate",
        Type: "texttolinkdateblank",
        Caption: "Ngày",
        DataSourceMember: "RewardDate",
        Link: "/RewardShipmentOrderByType/RewardDate/",
        Width: 100
    },
    {
        Name: "TotalReward",
        Type: "textCurrency",
        Caption: "Tổng thưởng",
        DataSourceMember: "TotalReward",
        Width: 100
    },
    {
        Name: "NoteReward",
        Type: "text",
        Caption: "Nội dung thưởng",
        DataSourceMember: "NoteReward",
        Width: 300
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
        Type: "texttolink",
        Caption: "Mã vận đơn",
        DataSourceMember: "ShipmentOrderID",
        Link: "/ShipmentOrder/Detail/",
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

