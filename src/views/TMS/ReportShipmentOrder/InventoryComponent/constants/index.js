import {
    ERPCOMMONCACHE_AREA_PROVINCE,
    ERPCOMMONCACHE_AREATT,
    ERPCOMMONCACHE_BRAND,
    ERPCOMMONCACHE_MAINGROUP,
    ERPCOMMONCACHE_STORE,
    ERPCOMMONCACHE_SUBGROUP,
    ERPRELATECACHE_INVENTORYSTATUS,
} from '../../../../../constants/keyCache';

export const APIHostName = "TMSAPI";
export const APIExportPath = "api/InventoryComponent/GetCurrentInStockByPrdIDList";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo tồn kho linh kiện" }
];

export const listelement = [
    {
        type: "ComboBox",
        name: "cbAreaID",
        // classNameCol: "col-custom",
        colspan: 2,
        DataSourceMember: "AreaID",
        IsAutoLoadItemFromCache: true,
        isMultiSelect: false,
        label: "Miền",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_AREATT,
        NameMember: "AreaName",
        placeholder: "Miền",
        value: -1,
        ValueMember: "AreaID",
    },
    {
        type: "ComboBox",
        name: "cbProvinceID",
        // classNameCol: "col-custom",
        colspan: 2,
        DataSourceMember: "ProvinceID",
        filterName: "cbAreaID",
        filterobj: "AreaID",
        filterValue: "",
        IsAutoLoadItemFromCache: true,
        isMultiSelect: false,
        label: "Tỉnh",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_AREA_PROVINCE,
        NameMember: "ProvinceName",
        placeholder: "Tỉnh",
        value: -1,
        ValueMember: "ProvinceID",
    },
    {
        type: "ComboBoxNewChange",
        name: "cbStoreID",
        // classNameCol: "col-custom",
        colspan: 2,
        DataSourceMember: "StoreID",
        // filterName: "cbAreaID",
        filterobj: "CompanyID",
        filterValue: 10,
        IsAutoLoadItemFromCache: true,
        isMultiSelect: false,
        label: "Mã kho",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_STORE,
        NameMember: "StoreName",
        placeholder: "Mã kho",
        value: -1,
        ValueMember: "StoreID",
    },
    {
        type: "ComboBox",
        name: "cbMainGroupID",
        // classNameCol: "col-custom",
        colspan: 2,
        DataSourceMember: "MainGroupID",
        IsAutoLoadItemFromCache: true,
        isMultiSelect: false,
        label: "Ngành hàng",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_MAINGROUP,
        NameMember: "MainGroupName",
        placeholder: "Ngành hàng",
        value: -1,
        ValueMember: "MainGroupID",
    },
    {
        type: "ComboBox",
        name: "cbSubGroupID",
        // classNameCol: "col-custom",
        colspan: 2,
        DataSourceMember: "SubGroupID",
        filterName: "cbMainGroupID",
        filterobj: "MainGroupID",
        filterValue: "",
        IsAutoLoadItemFromCache: true,
        isMultiSelect: false,
        label: "Nhóm hàng",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_SUBGROUP,
        NameMember: "SubGroupName",
        placeholder: "Nhóm hàng",
        value: -1,
        ValueMember: "SubGroupID",
    },
    {
        type: "ComboBox",
        name: "cbBrandID",
        // classNameCol: "col-custom",
        colspan: 2,
        DataSourceMember: "BrandID",
        filterName: "cbMainGroupID",
        filterobj: "MainGroupID",
        filterValue: "",
        IsAutoLoadItemFromCache: true,
        isMultiSelect: false,
        label: "Nhà sản xuất",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_BRAND,
        NameMember: "BrandName",
        placeholder: "Nhà sản xuất",
        value: -1,
        ValueMember: "BrandID",
    },
    {
        type: "ProductComboBoxCustom",
        name: "cbProductID",
        colspan: 12,
        DataSourceMember: "ProductID",
        filterName: "cbMainGroupID",
        IsAutoLoadItemFromCache: false,
        IsLabelDiv: true,
        isMulti: true,
        label: "Sản phẩm",
        labelcolspan: 12,
        listoption: [],
        placeholder: "Sản phẩm",
        rowspan: 4,
        value: "",
    },
    {
        type: "ComboBoxNewChange",
        name: "cbInventoryStatusID",
        // classNameCol: "col-custom",
        colspan: 4,
        DataSourceMember: "InventoryStatusID",
        IsAutoLoadItemFromCache: true,
        isMultiSelect: true,
        label: "Trạng thái",
        listoption: [],
        LoadItemCacheKeyID: ERPRELATECACHE_INVENTORYSTATUS,
        NameMember: "InventoryStatusName",
        placeholder: "Trạng thái",
        value: -1,
        ValueMember: "InventoryStatusID",
    },
];

export const listColumn = [
    {
        Name: "STOREID",
        Type: "text",
        Caption: "Mã kho",
        DataSourceMember: "STOREID",
        // Width: 100
    },
    {
        Name: "STORENAME",
        Type: "text",
        Caption: "Tên kho",
        DataSourceMember: "STORENAME",
        // Width: 100
    },
    {
        Name: "PRODUCTID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "PRODUCTID",
        // Width: 100
    },
    {
        Name: "PRODUCTNAME",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "PRODUCTNAME",
        // Width: 100
    },
    {
        Name: "INVENTORYSTATUSID",
        Type: "text",
        Caption: "Mã trạng thái",
        DataSourceMember: "INVENTORYSTATUSID",
        // Width: 100
    },
    {
        Name: "INVENTORYSTATUSNAME",
        Type: "text",
        Caption: "Tên trạng thái",
        DataSourceMember: "INVENTORYSTATUSNAME",
        // Width: 100
    },
    {
        Name: "QUANTITY",
        Type: "text",
        Caption: "Số lượng tồn",
        DataSourceMember: "QUANTITY",
        // Width: 100
    },
]

export const MLObjectDefinition = [
    {
        Name: "StoreID",
        DefaultValue: "",
        BindControlName: "cbStoreID"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "cbProductID"
    },
    {
        Name: "InventoryStatusID",
        DefaultValue: "",
        BindControlName: "cbInventoryStatusID"
    },
    {
        Name: "MainGroupID",
        DefaultValue: "",
        BindControlName: "cbMainGroupID"
    },
    {
        Name: "SubGroupID",
        DefaultValue: "",
        BindControlName: "cbSubGroupID"
    },
];