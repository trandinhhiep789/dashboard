export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/TMSRewardDetail/SearchExportRewardDetail";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Tổng xuất thưởng" }
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
        name: "cbRewardTypeID",
        DataSourceMember: "cbRewardTypeID",
        label: "Loại thưởng",
        colspan: 3,
        value: "-1",
        isMultiSelect: false,
        placeholder: "---Loại thưởng---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TMSREWARDTYPE",
        ValueMember: "RewardTypeID",
        NameMember: "RewardTypeName",
        classNameCol:"col-custom"
    },
    {
        type: "ComboBoxNewChange",
        name: "cbRewardPositionID",
        DataSourceMember: "cbRewardTypeID",
        label: "Vị trí thưởng thưởng",
        colspan: 3,
        value: "-1",
        isMultiSelect: false,
        placeholder: "---Vị trí thưởng thưởng---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TMSREWARDPOSITION",
        ValueMember: "RewardPositionID",
        NameMember: "RewardPositionName",
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
