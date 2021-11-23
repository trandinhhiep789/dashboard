import {
    // ERPCOMMONCACHE_BRAND,
    // ERPCOMMONCACHE_MAINGROUP,
    // ERPCOMMONCACHE_STORE_AREA,
    // ERPCOMMONCACHE_SUBGROUP,
    // ERPRELATECACHE_INVENTORYSTATUS,
    ERPCOMMONCACHE_AREA_PROVINCE,
    ERPCOMMONCACHE_AREATT,
    ERPCOMMONCACHE_STORETMS,
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
        filterrest: "cbProvinceID,cbStoreID",
        IsAutoLoadItemFromCache: true,
        isMultiSelect: false,
        label: "Miền",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_AREATT,
        NameMember: "AreaName",
        placeholder: "Miền",
        value: "",
        ValueMember: "AreaID",
    },
    {
        // classNameCol: "col-custom",
        type: "ComboBox",
        name: "cbProvinceID",
        colspan: 2,
        DataSourceMember: "ProvinceID",
        filterName: "cbAreaID",
        filterobj: "AreaID",
        filterrest: "cbStoreID",
        filterValue: "",
        IsAutoLoadItemFromCache: true,
        isMultiSelect: false,
        label: "Tỉnh",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_AREA_PROVINCE,
        NameMember: "ProvinceName",
        placeholder: "Tỉnh",
        value: "",
        ValueMember: "ProvinceID",
    },
    {
        type: "ComboBoxFilterTwoCondition", // lọc theo 2 điều kiện: 1 theo field search cbProvinceID, 2 theo CompanyID = 10
        name: "cbStoreID",
        // classNameCol: "col-custom",
        colspan: 2,
        DataSourceMember: "StoreID",
        filterName: "cbProvinceID",
        filterobj: "ProvinceID",
        filterValue: "",
        filterobj_1: "CompanyID",
        filterValue_1: 10,
        IsAutoLoadItemFromCache: true,
        isMultiSelect: false,
        label: "Mã kho",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_STORETMS,
        NameMember: "StoreName",
        placeholder: "Mã kho",
        value: "",
        ValueMember: "StoreID",
    },
    // {
    //     type: "ComboBox",
    //     name: "cbMainGroupID",
    //     // classNameCol: "col-custom",
    //     colspan: 2,
    //     DataSourceMember: "MainGroupID",
    //     IsAutoLoadItemFromCache: true,
    //     isMultiSelect: false,
    //     label: "Ngành hàng",
    //     listoption: [],
    //     LoadItemCacheKeyID: ERPCOMMONCACHE_MAINGROUP,
    //     NameMember: "MainGroupName",
    //     placeholder: "Ngành hàng",
    //     value: 624,
    //     ValueMember: "MainGroupID",
    // },
    // {
    //     type: "ComboBox",
    //     name: "cbSubGroupID",
    //     // classNameCol: "col-custom",
    //     colspan: 2,
    //     DataSourceMember: "SubGroupID",
    //     filterName: "cbMainGroupID",
    //     filterobj: "MainGroupID",
    //     filterValue: "",
    //     IsAutoLoadItemFromCache: true,
    //     isMultiSelect: false,
    //     label: "Nhóm hàng",
    //     listoption: [],
    //     LoadItemCacheKeyID: ERPCOMMONCACHE_SUBGROUP,
    //     NameMember: "SubGroupName",
    //     placeholder: "Nhóm hàng",
    //     value: 1771,
    //     ValueMember: "SubGroupID",
    // },
    // {
    //     type: "ComboBox",
    //     name: "cbBrandID",
    //     // classNameCol: "col-custom",
    //     colspan: 2,
    //     DataSourceMember: "BrandID",
    //     // filterName: "cbMainGroupID",
    //     filterobj: "MainGroupID",
    //     filterValue: "624",
    //     IsAutoLoadItemFromCache: true,
    //     isMultiSelect: false,
    //     label: "Nhà sản xuất",
    //     listoption: [],
    //     LoadItemCacheKeyID: ERPCOMMONCACHE_BRAND,
    //     NameMember: "BrandName",
    //     placeholder: "Nhà sản xuất",
    //     value: -1,
    //     ValueMember: "BrandID",
    // },
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
        rowspan: 6,
        value: "",
    },
    {
        type: "ComboBoxNewChange",
        name: "cbInventoryStatusID",
        // classNameCol: "col-custom",
        colspan: 3,
        DataSourceMember: "InventoryStatusID",
        // filterobj: "",
        // filterValue: "",
        // IsAutoLoadItemFromCache: true,
        isMultiSelect: true,
        label: "Trạng thái",
        listoption: [
            { value: 1, label: "Mới" },
            { value: 2, label: "Trả xác" },
            { value: 5, label: "Thanh lý" },
        ],
        // LoadItemCacheKeyID: ERPRELATECACHE_INVENTORYSTATUS,
        NameMember: "InventoryStatusName",
        placeholder: "Trạng thái",
        value: "1,2,5",
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
    // {
    //     Name: "INVENTORYSTATUSID",
    //     Type: "text",
    //     Caption: "Mã trạng thái",
    //     DataSourceMember: "INVENTORYSTATUSID",
    //     // Width: 100
    // },
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
    // {
    //     Name: "MainGroupID",
    //     DefaultValue: "",
    //     BindControlName: "cbMainGroupID"
    // },
    // {
    //     Name: "SubGroupID",
    //     DefaultValue: "",
    //     BindControlName: "cbSubGroupID"
    // },
];