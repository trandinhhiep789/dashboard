export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/TMSRewardDetail/SearchByDate";
export const SearchByUserAPIPath = "api/TMSRewardDetail/LoadRewardUserNameByDate";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Tổng thưởng nhân viên - CTV" }
];

const dtFromdate = new Date();
//dtFromdate.setDate(new Date().getDate());

// dtFromdate.setDate(new Date('11/01/2020'));

export const titleModal = "Hiển thị chi tiết thưởng đơn thàng theo nhân viên";

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
        colspan: 2,
        value: "-1",
        isMultiSelect: false,
        placeholder: "---Loại thưởng---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TMSREWARDTYPE",
        ValueMember: "RewardTypeID",
        NameMember: "RewardTypeName",
        classNameCol: "col-custom"
    },
    {
        type: "ComboBoxNewChange",
        name: "cbRewardPositionID",
        DataSourceMember: "RewardPositionID",
        label: "Vị trí thưởng",
        colspan: 2,
        value: "-1",
        isMultiSelect: false,
        placeholder: "---Vị trí thưởng---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TMSREWARDPOSITION",
        ValueMember: "RewardPositionID",
        NameMember: "RewardPositionName",
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
    {
        Name: "RewardPositionID",
        DefaultValue: "",
        BindControlName: "cbRewardPositionID"
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

];

export const GridColumnList = [
    {
        Name: "RewardUser",
        Type: "popupNew",
        Caption: "Mã nhân viên",
        DataSourceMember: "RewardUser",
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

        Name: "WorkStoreFullName",
        Type: "text",
        Caption: "Nơi làm việc",
        DataSourceMember: "WorkStoreFullName",
        Width: 100
    },
    {
        Name: "TotalReward1",
        Type: "textCurrency",
        Caption: "Thưởng giao hàng",
        DataSourceMember: "TotalReward1",
        Width: 100
    },
    {
        Name: "TotalReward2",
        Type: "textCurrency",
        Caption: "Phụ cấp ống đồng",
        DataSourceMember: "TotalReward2",
        Width: 100
    },
    {
        Name: "TotalReward3",
        Type: "textCurrency",
        Caption: "Tiền xăng",
        DataSourceMember: "TotalReward3",
        Width: 100
    },
    {
        Name: "TotalReward",
        Type: "textCurrency",
        Caption: "Thực lãnh",
        DataSourceMember: "TotalReward",
        Width: 100
    },

]
