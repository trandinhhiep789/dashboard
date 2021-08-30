import { toIsoStringCus } from '../../../../../utils/function'

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/TMSReward/SearchListUserName";
export const SearchNewAPIPath = "api/TMSReward/SearchListUserNameNew";
export const LoadByDateAPIPath = "api/TMSRewardDetail/LoadByDate";
export const LoadUserNameByDateAPIPath = "api/TMSRewardDetail/LoadUserNameByDate";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách thưởng giao hàng theo nhân viên" }
];

export const PageByDatePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardShipmentOrderByUser", Title: "Danh sách thưởng giao hàng theo nhân viên" },
    { Link: "/RewardShipmentOrderByUser", Title: "Danh sách thống kê vận đơn theo ngày" }
];

const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

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
        SearchKey: "@REWARDCOMPUTETYPEID",
        SearchValue: -1
    },
    {
        SearchKey: "@USERNAMELIST",
        SearchValue: ""
    },
];



export const SearchElementList = [
    {
        colspan: 2,
        DataSourceMember: "FromDate",
        dateFormat: "DD/MM/YYYY",
        label: "Từ Ngày",
        name: "dtFromDate",
        timeFormat: false,
        type: "Datetime",
        value: new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear())
    },
    {
        colspan: 2,
        DataSourceMember: "ToDate",
        dateFormat: "DD/MM/YYYY",
        label: "Đến Ngày",
        name: "dtToDate",
        timeFormat: false,
        type: "Datetime",
        value: new Date()
    },
    {
        //classNameCol: "col-custom",
        colspan: 2,
        DataSourceMember: "cbRewardTypeID",
        IsAutoLoadItemFromCache: true,
        isMultiSelect: false,
        label: "Loại thưởng",
        listoption: [],
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TMSREWARDTYPE",
        name: "cbRewardTypeID",
        NameMember: "RewardTypeName",
        placeholder: "---Loại thưởng---",
        type: "ComboBoxNewChange",
        value: "-1",
        ValueMember: "RewardTypeID"
    },
    {
        //classNameCol: "col-custom",
        colspan: 2,
        DataSourceMember: "cbRewardComputeTypeID",
        IsAutoLoadItemFromCache: true,
        isMultiSelect: false,
        label: "Loại tính thưởng",
        listoption: [],
        LoadItemCacheKeyID: "ERPCOMMONCACHE.REWARDCOMPUTETYPE",
        name: "cbRewardComputeTypeID",
        NameMember: "RewardComputeTypeName",
        placeholder: "---Loại thưởng---",
        type: "ComboBoxNewChange",
        value: "-1",
        ValueMember: "RewardComputeTypeID"
    },
    {
        colspan: 12,
        DataSourceMember: "UserName",
        IsAutoLoadItemFromCache: false,
        IsLabelDiv: true,
        isMultiSelect: true,
        label: "Nhân viên",
        labelcolspan: 12,
        listoption: [],
        name: "cbUserName",
        placeholder: "---Vui lòng chọn---",
        rowspan: 2,
        type: "MultiSelectUser",
        value: -1
    }
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
    {
        Name: "RewardComputeTypeID",
        DefaultValue: "",
        BindControlName: "cbRewardComputeTypeID"
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
        Type: "texttolinkdateblank",
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
    {
        Name: "NoteReward",
        Type: "text",
        Caption: "Nội dung thưởng",
        DataSourceMember: "NoteReward",
        Width: 300
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

