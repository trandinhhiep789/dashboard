export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/RewardPosition_RewardType/Add";
export const UpdateAPIPath = "api/RewardPosition_RewardType/Update";
export const DeleteAPIPath = "api/RewardPosition_RewardType/Delete";
export const LoadAPIPath = "api/RewardPosition_RewardType/Load";

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardPosition", Title: "Vị trí thưởng" },
    //{ Link: "/InventoryRequestType/ReviewLevelDetail", Title: "Mức duyệt" },
    { Link: "", Title: "Danh sách loại thưởng của một vị trí thưởng" }
];

export const ModalColumnList_Insert = [
    {
        type: "select",
        Name: "RewardTypeID",
        label: "mã loại thưởng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "RewardTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TMSREWARDTYPE",
        ValueMember: "RewardTypeID",
        NameMember: "RewardTypeName"
    },
    {
        type: "select",
        Name: "AreaID",
        label: "Khu vực",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AreaID",
        readonly: false,
        //validatonList: ["Comborequired"],
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREATT",
        ValueMember: "AreaID",
        NameMember: "AreaName"
    },
    {
        type: "select",
        Name: "GetRewardPriceTypeID",
        label: "kiểu lấy đơn giá thưởng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [{ value: -1, label: "------ Vui lòng chọn ------" }, { value: 1, label: "Lấy cố định đơn giá" }, { value: 2, label: "Lấy từ bảng đơn giá thưởng" }],
        DataSourceMember: "GetRewardPriceTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        // LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        // ValueMember: "StoreID",
        // NameMember: "StoreName"
    },
    {
        type: "select",
        Name: "RewardPriceTypeID",
        label: "loại đơn giá thưởng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "RewardPriceTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.REWARDPRICETYPE",
        ValueMember: "RewardPriceTypeID",
        NameMember: "RewardPriceTypeName"
    },
    {
        Name: "RewardPrice",
        type: "text",
        label: "đơn giá thưởng",
        maxSize: "19",
        DataSourceMember: "RewardPrice",
        readonly: false,
        validatonList: ["digit"]
    },
    {
        Name: "RewardRatio",
        type: "text",
        label: "tỷ lệ đơn giá thưởng",
        maxSize: "9",
        DataSourceMember: "RewardRatio",
        readonly: false,
        validatonList: ["digit"]
    },
    {
        Name: "IsConsiderContributeManHour",
        type: "checkbox",
        label: "Có tính theo tỷ lệ giờ công đóng góp hay không",
        DataSourceMember: "IsConsiderContributeManHour",
        readonly: false,
        validatonList: [],
        value: false
    },
    {
        Name: "IsLimitTotalReward",
        type: "checkbox",
        label: "Có giới hạn tổng thưởng theo loại thưởng này hay không?",
        DataSourceMember: "IsLimitTotalReward",
        readonly: false,
        validatonList: [],
        value: false
    },
    {
        Name: "MaxTotalReward",
        type: "text",
        label: "Giá trị tổng thưởng tối đa",
        maxSize: "19",
        DataSourceMember: "MaxTotalReward",
        readonly: false,
        validatonList: ["digit"]
    },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        maxSize: "2000",
        DataSourceMember: "Description",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "OrderIndex",
        type: "text",
        label: "thứ tự hiển thị",
        maxSize: "9",
        value: 0,
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];

export const ModalColumnList_Edit = [
    {
        type: "select",
        Name: "RewardTypeID",
        label: "mã loại thưởng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "RewardTypeID",
        readonly: true,
        disabled: true,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TMSREWARDTYPE",
        ValueMember: "RewardTypeID",
        NameMember: "RewardTypeName"
    },
    {
        type: "select",
        Name: "AreaID",
        label: "Khu vực",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AreaID",
        readonly: true,
        disabled: true,
        //validatonList: ["Comborequired"],
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREATT",
        ValueMember: "AreaID",
        NameMember: "AreaName"
    },
    {
        type: "select",
        Name: "GetRewardPriceTypeID",
        label: "kiểu lấy đơn giá thưởng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [{ value: -1, label: "------ Vui lòng chọn ------" }, { value: 1, label: "Lấy cố định đơn giá" }, { value: 2, label: "Lấy từ bảng đơn giá thưởng" }],
        DataSourceMember: "GetRewardPriceTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        // LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        // ValueMember: "StoreID",
        // NameMember: "StoreName"
    },
    {
        type: "select",
        Name: "RewardPriceTypeID",
        label: "loại đơn giá thưởng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "RewardPriceTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.REWARDPRICETYPE",
        ValueMember: "RewardPriceTypeID",
        NameMember: "RewardPriceTypeName"
    },
    {
        Name: "RewardPrice",
        type: "text",
        label: "đơn giá thưởng",
        maxSize: "19",
        DataSourceMember: "RewardPrice",
        readonly: false,
        validatonList: ["digit"]
    },
    {
        Name: "RewardRatio",
        type: "text",
        label: "tỷ lệ đơn giá thưởng",
        maxSize: "9",
        DataSourceMember: "RewardRatio",
        readonly: false,
        validatonList: ["digit"]
    },
    {
        Name: "IsConsiderContributeManHour",
        type: "checkbox",
        label: "Có tính theo tỷ lệ giờ công đóng góp hay không",
        DataSourceMember: "IsConsiderContributeManHour",
        readonly: false,
        validatonList: [],
        value: false
    },
    {
        Name: "IsLimitTotalReward",
        type: "checkbox",
        label: "Có giới hạn tổng thưởng theo loại thưởng này hay không?",
        DataSourceMember: "IsLimitTotalReward",
        readonly: false,
        validatonList: [],
        value: false
    },
    {
        Name: "MaxTotalReward",
        type: "text",
        label: "Giá trị tổng thưởng tối đa",
        maxSize: "19",
        DataSourceMember: "MaxTotalReward",
        readonly: false,
        validatonList: ["digit"]
    },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        maxSize: "2000",
        DataSourceMember: "Description",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "OrderIndex",
        type: "text",
        label: "thứ tự hiển thị",
        maxSize: "9",
        value: 0,
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelectRewardPositionCSID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "RewardPositionCSID",
        Width: 60
    },
    {
        Name: "RewardTypeName",
        Type: "text",
        Caption: "Loại thưởng",
        DataSourceMember: "RewardTypeName",
        Width: 150
    },
    {
        Name: "AreaName",
        Type: "text",
        Caption: "Khu vực",
        DataSourceMember: "AreaName",
        Width: 150
    },
    {
        Name: "RewardPriceTypeName",
        Type: "text",
        Caption: "Loại đơn giá thưởng",
        DataSourceMember: "RewardPriceTypeName",
        Width: 250
    },
    {
        Name: "RewardPrice",
        Type: "text",
        Caption: "Đơn giá thưởng",
        DataSourceMember: "RewardPrice",
        Width: 100
    },
    {
        Name: "GetRewardPriceTypeName",
        Type: "text",
        Caption: " Kiểu lấy đơn giá thưởng",
        DataSourceMember: "GetRewardPriceTypeName",
        Width: 150
    },
    // {
    //     Name: "RewardTypeID",
    //     Type: "texttolink",
    //     Link: "/InventoryRequestType/ReviewLevelDetail/",
    //     Caption: "Tên mức duyệt",
    //     DataSourceMember: "ReviewLevelName",
    //     Width: 300
    // },
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     Width: 300
    // },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 90
    },
    {
        Name: "EditRewardPosition_RewardType",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "RewardPosition_RewardType",
        Width: 60
    }

];

export const MLObjectDefinition = [
    {
        Name: "RewardPositionCSID",
        DefaultValue: "",
        BindControlName: "RewardPositionCSID",
        DataSourceMember: "RewardPositionCSID"
    },
    {
        Name: "RewardPositionID",
        DefaultValue: "",
        BindControlName: "RewardPositionID",
        DataSourceMember: "RewardPositionID"
    },
    {
        Name: "RewardTypeID",
        DefaultValue: "",
        BindControlName: "RewardTypeID",
        DataSourceMember: "RewardTypeID"
    },
    {
        Name: "AreaID",
        DefaultValue: "",
        BindControlName: "AreaID",
        DataSourceMember: "AreaID"
    },
    {
        Name: "GetRewardPriceTypeID",
        DefaultValue: "",
        BindControlName: "GetRewardPriceTypeID",
        DataSourceMember: "GetRewardPriceTypeID"
    },
    {
        Name: "RewardPriceTypeID",
        DefaultValue: "",
        BindControlName: "RewardPriceTypeID",
        DataSourceMember: "RewardPriceTypeID"
    },
    {
        Name: "RewardPrice",
        DefaultValue: "",
        BindControlName: "RewardPrice",
        DataSourceMember: "RewardPrice"
    },
    {
        Name: "RewardRatio",
        DefaultValue: "",
        BindControlName: "RewardRatio",
        DataSourceMember: "RewardRatio"
    },
    {
        Name: "IsConsiderContributeManHour",
        DefaultValue: "",
        BindControlName: "IsConsiderContributeManHour",
        DataSourceMember: "IsConsiderContributeManHour"
    },
    {
        Name: "IsLimitTotalReward",
        DefaultValue: "",
        BindControlName: "IsLimitTotalReward",
        DataSourceMember: "IsLimitTotalReward"
    },
    {
        Name: "MaxTotalReward",
        DefaultValue: "",
        BindControlName: "MaxTotalReward",
        DataSourceMember: "MaxTotalReward"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "OrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedDate",
        DefaultValue: "",
        BindControlName: "CreatedDate",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "CreatedUser",
        DataSourceMember: "CreatedUser"
    }
];