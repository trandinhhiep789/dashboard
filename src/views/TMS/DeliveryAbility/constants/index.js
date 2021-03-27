export const APIHostName = "TMSAPI";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Khai báo tổng tải" }
];

export const SearchElementList = [
    {
        type: "ComboBox",
        name: "cbProvinceID",
        // DataSourceMember: "StoreID",
        label: "Chọn tỉnh, thành",
        colspan: 2,
        // value: -1,
        // isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        // IsAutoLoadItemFromCache: true,
        // isUsercache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PROVINCE",
        // ValueMember: "StoreID",
        // NameMember: "StoreName",
        // filterValue:10,
        // filterobj:"CompanyID",

    },
    {
        type: "ComboBox",
        name: "cbStoreID",
        // DataSourceMember: "StoreID",
        label: "Chọn siêu thị",
        colspan: 2,
        // value: -1,
        // isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        // IsAutoLoadItemFromCache: true,
        // isUsercache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        // ValueMember: "StoreID",
        // NameMember: "StoreName",
        // filterValue:10,
        // filterobj:"CompanyID",

    }
]

export const tableHead = [
    {
        className: "jsgrid-header-cell",
        style: { width: 100 },
        content: "Siêu thị"
    },
    {
        className: "jsgrid-header-cell",
        style: { width: 100 },
        content: "Khung giờ/ Phương tiện"
    },
    {
        className: "jsgrid-header-cell",
        style: { width: 100 },
        content: "Máy lạnh"
    },
    {
        className: "jsgrid-header-cell",
        style: { width: 100 },
        content: "Sản phẩm khác"
    },
    {
        className: "jsgrid-header-cell",
        style: { width: 100 },
        content: "DV vệ sinh"
    },
    {
        className: "jsgrid-header-cell",
        style: { width: 100 },
        content: "Bảo hành"
    },
    {
        className: "jsgrid-header-cell",
        style: { width: 100 },
        content: "Khác"
    },
    {
        className: "jsgrid-header-cell",
        style: { width: 100 },
        content: "Thứ"
    },
    {
        className: "jsgrid-header-cell",
        style: { width: 100 },
        content: "Chỉnh sửa"
    }
]

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
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