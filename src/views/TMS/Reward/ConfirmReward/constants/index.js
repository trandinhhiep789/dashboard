export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/TMSRewardDetail/SearchExportRewardDetail";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Xuất dữ liệu chốt thưởng" }
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
        value: "-1",
        isMultiSelect: false,
        placeholder: "---Loại thưởng---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TMSREWARDTYPE",
        ValueMember: "RewardTypeID",
        NameMember: "RewardTypeName",
        classNameCol: "col-custom",
        validatonList: ["Comborequired"],
    },
    {
        type: "ComboBoxNewChange",
        name: "cbRewardPositionID",
        DataSourceMember: "cbRewardTypeID",
        label: "Vị trí thưởng",
        colspan: 3,
        value: "-1",
        isMultiSelect: true,
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
