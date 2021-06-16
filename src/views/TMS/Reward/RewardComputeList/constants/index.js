export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/RewardComputeList/Search";
export const SearchNewAPIPath = "api/TMSReward/SearchNew";
export const LoadByUserNameAPIPath = "api/TMSReward/LoadByUserName";
export const LoadByUserNameNewAPIPath = "api/TMSReward/LoadByUserNameNew";
export const SearchDetailAPIPath = "api/TMSRewardDetail/Search";

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
        label: "Đã tính thưởng",
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
        Name: "IscomPuted",
        Type: "checkicon",
        Caption: "Đã tính thưởng",
        DataSourceMember: "IscomPuted",
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

