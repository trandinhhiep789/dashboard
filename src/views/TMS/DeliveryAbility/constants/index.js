export const APIHostName = "TMSAPI";

export const AddAPIPath = "api/DeliveryAbility/Add";
export const AddLink = "/DeliveryAbility/Add";
export const BackLink = "/DeliveryAbility";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "DeliveryAbilityID";


export const TitleFormSearch = "Tìm kiếm danh sách tải giao hàng";
export const TitleFormAdd = "Thêm danh sách tải giao hàng";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách khai báo tổng tải" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ",  icon: "fa fa-home"  },
    { Link: "/DeliveryAbility", Title: "Danh sách khai báo tổng tải" },
    { Link: "", Title: "Cập nhật" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ",  icon: "fa fa-home"  },
    { Link: "/DeliveryAbility", Title: "Danh sách khai báo tổng tải" },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DeliveryAbility", Title: "Danh sách khai báo tổng tải" },
    { Link: "", Title: "Chi tiết" }
];

AddPagePath

export const InitSearchParams = [

    {
        SearchKey: "@SERVICETYPEID",
        SearchValue: "-1"
    },
    {
        SearchKey: "@AREAID",
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
        placeholder: "---Tỉnh /thành phố---",
        label: "Tỉnh /thành phố",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PROVINCE",
        ValueMember: "ProvinceID",
        NameMember: "ProvinceName",
        filterrest: "cbStoreID",
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        name: "cbStoreID",
        DataSourceMember: "StoreID",
        colspan: 3,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Kho---",
        label: "Kho",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        filterName: "cbProvinceID",
        filterValue: "",
        filterobj: "ProvinceID",
        classNameCol: "col-custom"
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
        Name: "ServiceAgreementNumber",
        Type: "text",
        Caption: "Siêu thị",
        DataSourceMember: "ServiceAgreementNumber",
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
        Caption:"Máy lạnh",
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
        Name: "StatusLable",
        Type: "text",
        Caption: "Thứ áp dụng",
        DataSourceMember: "StatusLable",
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

export const MLObjectDefinition=[

]