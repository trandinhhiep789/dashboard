export const APIHostName = "TMSAPI";

export const AddAPIPath = "api/DeliveryAbility/Add";
export const SearchAPIPath = "api/DeliveryAbility/Search";
export const ApiSearchDeliveryGoods = "api/DeliveryGoodsGroup/Search";
export const LoadAPIPath = "api/DeliveryAbility/LoadNew";
export const DeleteNewAPIPath = "api/DeliveryAbility/DeleteNew";


export const AddLink = "/DeliveryAbility/Add";
export const EditLink ="/DeliveryAbility/Edit";
export const BackLink = "/DeliveryAbility";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "DeliveryAbilityID";


export const TitleFormSearch = "Tìm kiếm danh sách tải giao hàng";
export const TitleFormAdd = "Thêm danh sách tải giao hàng";
export const TitleFormEdit = "Cập nhật danh sách tải giao hàng";

export const widthModalAddDeliveryAbility = "50%";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách khai báo tổng tải" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DeliveryAbility", Title: "Danh sách khai báo tổng tải" },
    { Link: "", Title: "Cập nhật" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DeliveryAbility", Title: "Danh sách khai báo tổng tải" },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DeliveryAbility", Title: "Danh sách khai báo tổng tải" },
    { Link: "", Title: "Chi tiết" }
];


export const InitSearchParams = [

    {
        SearchKey: "@OUTPUTSTOREID",
        SearchValue: "-1"
    },
];


export const SearchElementList = [
    {
        type: "ComboBox",
        name: "cbProvinceID",
        DataSourceMember: "ReceiverProvinceID",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Khu vực---",
        label: "Khu vực",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PROVINCE",
        ValueMember: "ProvinceID",
        NameMember: "ProvinceName",
        filterrest: "cbStoreID",
        classNameCol: "col-custom"
    },
    {
        type: "ComboBoxNewChange",
        name: "cbStoreID",
        DataSourceMember: "StoreID",
        label: "Kho",
        colspan: 3,
        value: "",
        isMultiSelect: true,
        placeholder: "---Kho---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        NameMember: "StoreName",
        ValueMember: "StoreID",
        filterName: "cbProvinceID",
        filterValue: "",
        filterobj: "ProvinceID",
        classNameCol: "col-custom",
        maxTagCount: 1
    },
]


export const SearchMLObjectDefinition = [
    {
        Name: "ProvinceID",
        DefaultValue: "",
        BindControlName: "cbProvinceID"
    },
    {
        Name: "StoreID",
        DefaultValue: "",
        BindControlName: "cbStoreID"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "DeliveryAbilityID",
        Width: 60
    },

    {
        Name: "OutputStoreID",
        Type: "text",
        Caption: "Siêu thị",
        DataSourceMember: "OutputStoreID",
        Width: 150
    },
    {
        Name: "PartnerName",
        Type: "text",
        Caption: "Khung giờ làm việc",
        DataSourceMember: "PartnerName",
        Width: 150
    },
    {
        Name: "ServiceTypeName",
        Type: "text",
        Caption: "Máy lạnh",
        DataSourceMember: "ServiceTypeName",
        Width: 100
    },
    {
        Name: "AreaName",
        Type: "text",
        Caption: "SP có lắp đặt",
        DataSourceMember: "AreaName",
        Width: 100
    },
    {
        Name: "SignedDate",
        Type: "text",
        Caption: "SP dịc vụ",
        DataSourceMember: "SignedDate",
        Width: 100
    },
    {
        Name: "ExpiredDate",
        Type: "text",
        Caption: "Bảo hành",
        DataSourceMember: "ExpiredDate",
        Width: 100
    },
    {
        Name: "ExtendLable",
        Type: "text",
        Caption: "SP khác",
        DataSourceMember: "ExtendLable",
        Width: 100
    },
    {
        Name: "WeekDaysList",
        Type: "text",
        Caption: "Thứ áp dụng",
        DataSourceMember: "WeekDaysList",
        Width: 200
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "DeliveryAbilityID",
        Width: 100,
        Link: "/DeliveryAbility/Edit/",
        LinkText: "Chỉnh sửa"
    },
]

export const MLObjectDefinition = [

    {
        Name: "ProvinceID",
        DefaultValue: "",
        BindControlName: "cbProvinceID",
        DataSourceMember: "ProvinceID"
    },
    {
        Name: "StoreID",
        DefaultValue: "",
        BindControlName: "cbStoreID",
        DataSourceMember: "StoreID"
    },
    {
        Name: "OutputStoreID",
        DefaultValue: "",
        BindControlName: "cbOutputStoreID",
        DataSourceMember: "OutputStoreID"
    },
    
    {
        Name: "DeliveryTimeFrameID",
        DefaultValue: "",
        BindControlName: "cbDeliveryTimeFrameID",
        DataSourceMember: "DeliveryTimeFrameID"
    },
    {
        Name: "CarrierTypeID",
        DefaultValue: "",
        BindControlName: "cbCarrierTypeID",
        DataSourceMember: "CarrierTypeID"
    },

    {
        Name: "WeekDayID",
        DefaultValue: "",
        BindControlName: "cbWeekDayID",
        DataSourceMember: "WeekDayID"
    },

    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },

    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },

    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    },
]

export const lstDeliveryAbilityDetail = [
    {
        Name: "DeliveryGoodsGroupName",
        Type: "text",
        Caption: "Nhóm hàng vận chuyển",
        DataSourceMember: "DeliveryGoodsGroupName",
        Width: 100
    },
    {
        Name: "TotalAbility",
        Type: "text",
        Caption: "Số lượng",
        DataSourceMember: "TotalAbility",
        Width: 50
    }
]

export const lstDeliveryGoodsGroup = [
    {
        Name: "DeliveryGoodsGroupName",
        Type: "text",
        Caption: "Nhóm hàng vận chuyển",
        DataSourceMember: "DeliveryGoodsGroupName",
        Width: 100
    },
    {
        Name: "TotalAbility",
        Type: "number",
        Caption: "Số lượng",
        DataSourceMember: "TotalAbility",
        Width: 50,
        validatonList: ["number"]
    }
]

export const GridMLObjectDefinition = [
    {
        Name: "DeliveryGoodsGroupName",
        DefaultValue: "",
        BindControlName: "DeliveryGoodsGroupName",
        DataSourceMember: "DeliveryGoodsGroupName"
    },
    {
        Name: "TotalAbility",
        DefaultValue: "",
        BindControlName: "TotalAbility",
        DataSourceMember: "TotalAbility"
    },
    {
        Name: "DeliveryGoodsGroupID",
        DefaultValue: "",
        BindControlName: "DeliveryGoodsGroupID",
        DataSourceMember: "DeliveryGoodsGroupID"
    },

];
