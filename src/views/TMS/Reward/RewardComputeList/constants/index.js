export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/RewardComputeList/Search";
export const ConfirmAPIPath = "api/RewardComputeList/Confirm";




export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách tính thưởng" }
];



const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

export const SearchElementList = [
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
        name: "cbIscomPuted",
        DataSourceMember: "IscomPuted",
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
        ValueMember: "IscomPuted",
        NameMember: "IscomPutedName"

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
        Name: "IscomPuted",
        DefaultValue: "",
        BindControlName: "cbIscomPuted"
    }
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
];

export const GridColumnList = [
    
    {
        Name: "RewardComputeTypeName",
        Type: "text",
        Caption: "Mã loại tính thưởng",
        DataSourceMember: "RewardComputeTypeName",
        Width: 200
    },
    {
        Name: "RewardDate",
        Type: "date",
        Caption: "Ngày tính thưởng",
        DataSourceMember: "RewardDate",
        Width: 150
    },
    
    {
        Name: "IsComPuted",
        Type: "checkicon",
        Caption: "Đã tính thưởng",
        DataSourceMember: "IsComPuted",
        Width: 100
    },
    {
        Name: "LastComputedDate",
        Type: "date",
        Caption: "Ngày tính thưởng cuối",
        DataSourceMember: "LastComputedDate",
        Width: 150
    },
    {
        Name: "IsConfirm",
        Type: "checkicon",
        Caption: "Đã chốt thưởng",
        DataSourceMember: "IsConfirm",
        Width: 100
    },
    {
        Name: "ConfirmUser",
        Type: "text",
        Caption: "Người chốt",
        DataSourceMember: "ConfirmUser",
        Width: 200
    },

    {
        Name: "IsUnConfirm",
        Type: "checkicon",
        Caption: "Đã bỏ chốt thưởng",
        DataSourceMember: "IsUnConfirm",
        Width: 100
    },
    {
        Name: "UnConfirmUser",
        Type: "text",
        Caption: "Người bỏ chốt",
        DataSourceMember: "UnConfirmUser",
        Width: 200
    },
    {
        Name: "IsConfirmStatus",
        Type: "btnActionConfirm",
        Caption: "Chốt thưởng",
        DataSourceMember: "IsConfirmStatus",
        Width: "8%"
    },
    
    
]
