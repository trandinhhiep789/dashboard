export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/RewardComputeList/Search";
export const ConfirmAPIPath = "api/RewardComputeList/Confirm";
export const SearchConfirmLogAPIPath = "api/RewardComputeList_CFLog/Search";
import { toIsoStringCus } from '../../../../../utils/function'
export const ConfirmListAPIPath = "api/RewardComputeList/ConfirmListItem";



export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách tính thưởng" }
];



const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

export const SearchElementList = [
    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ ngày",
        value: new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtToDate",
        DataSourceMember: "ToDate",
        label: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "ComboBoxNewChange",
        name: "cbRewardComputeTypeID",
        DataSourceMember: "RewardComputeTypeID",
        label: "loại tính thưởng",
        colspan: 2,
        value: "",
        isMultiSelect: false,
        placeholder: "---loại tính thưởng---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.REWARDCOMPUTETYPE",
        ValueMember: "RewardComputeTypeID",
        NameMember: "RewardComputeTypeName",
        classNameCol:"col-custom"
    },
    {
        type: "ComboBox",
        name: "cbIsComputed",
        DataSourceMember: "IsComputed",
        label: "Tính thưởng",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "--Tất cả--",
        listoption: [
            { value: -1, label: '--Tất cả--' },
            { value: 0, label: 'Chưa tính' },
            { value: 1, label: 'Đã tính' },

        ],
        ValueMember: "IsComputed",
        NameMember: "IsComputedName"

    },
    
];

export const MLObjectChangeConfirmModal = [
    {
        Name: "IsConfirm",
        DefaultValue: "",
        BindControlName: "cbIsConfirm"
    }
]

export const  SearchMLObjectDefinition = [
    {
        Name: "RewardComputeTypeID",
        DefaultValue: "",
        BindControlName: "cbRewardComputeTypeID"
    },
    {
        Name: "IsComputed",
        DefaultValue: "",
        BindControlName: "cbIsComputed"
    },
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
]

export const InitSearchParams = [
    {
        SearchKey: "@REWARDCOMPUTETYPEID",
        SearchValue: ""
    },
    {
        SearchKey: "@ISCOMPUTED",
        SearchValue: ""
    },
    {
        SearchKey: "@FROMDATE",
        SearchValue:  toIsoStringCus(new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()))
    },
    {
        SearchKey: "@TODATE",
        SearchValue: new Date()
    },
];

export const GridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "RewardComputeListID",
        Width: "5%"
    },
    {
        Name: "RewardComputeTypeName",
        Type: "text",
        Caption: "Mã loại tính thưởng",
        DataSourceMember: "RewardComputeTypeName",
        Width: "10%"
    },
    {
        Name: "RewardDate",
        Type: "date",
        Caption: "Ngày tính thưởng",
        DataSourceMember: "RewardDate",
        Width: "10%"
    },
    
    {
        Name: "IsComputed",
        Type: "checkicon",
        Caption: "Đã tính thưởng",
        DataSourceMember: "IsComputed",
        Width: "10%"
    },
    {
        Name: "LastComputedDate",
        Type: "datetime",
        Caption: "TG tính thưởng cuối",
        DataSourceMember: "LastComputedDate",
        Width: "10%"
    },
    {
        Name: "IsConfirm",
        Type: "checkicon",
        Caption: "Đã chốt thưởng",
        DataSourceMember: "IsConfirm",
        Width: "10%"
    },
    {
        Name: "ConfirmFullName",
        Type: "text",
        Caption: "Người chốt",
        DataSourceMember: "ConfirmFullName",
        Width: "10%"
    },

    {
        Name: "IsUnConfirm",
        Type: "checkicon",
        Caption: "Đã bỏ chốt thưởng",
        DataSourceMember: "IsUnConfirm",
        Width: "10%"
    },
    {
        Name: "UnConfirmFullName",
        Type: "text",
        Caption: "Người bỏ chốt",
        DataSourceMember: "UnConfirmFullName",
        Width: "10%"
    },
    {
        Name: "IsConfirmStatus",
        Type: "btnActionConfirm",
        Caption: "Chốt thưởng",
        DataSourceMember: "IsConfirmStatus",
        Width: "10%"
    },
    {
        Name: "History",
        Type: "btnHistory",
        Caption: "Lịch sử",
        DataSourceMember: "History",
        Width: "5%"
    },
    
]


export const DataGirdHistoryColumnList = [
    {
        Name: "RewardComputeListID",
        Type: "text",
        Caption: "Mã",
        DataSourceMember: "RewardComputeListID",
        Width: "10%"
    },
    {
        Name: "RewardDate",
        Type: "datetime",
        Caption: "Ngày thưởng",
        DataSourceMember: "RewardDate",
        Width: "10%"
    },
    {
        Name: "ConfirmLogTypeName",
        Type: "text",
        Caption: "Loại chốt",
        DataSourceMember: "ConfirmLogTypeName",
        Width: "10%"
    },
    {
        Name: "ConfirmLogFullName",
        Type: "text",
        Caption: "Người chốt",
        DataSourceMember: "ConfirmLogFullName",
        Width: "10%"
    },
    {
        Name: "ConfirmLogDate",
        Type: "datetime",
        Caption: "Ngày chốt",
        DataSourceMember: "ConfirmLogDate",
        Width: "10%"
    },
];