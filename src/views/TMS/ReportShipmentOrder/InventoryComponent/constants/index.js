import {
    ERPCOMMONCACHE_AREA,
    ERPCOMMONCACHE_BRAND,
    ERPCOMMONCACHE_MAINGROUP,
    ERPCOMMONCACHE_SUBGROUP,
    ERPCOMMONCACHE_PROVINCE,
    ERPCOMMONCACHE_AREATT,
} from '../../../../../constants/keyCache';

export const APIHostName = "TMSAPI";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo tồn kho linh kiện" }
];

export const listelement = [
    {
        type: "ComboBox",
        name: "cbArea",
        classNameCol: "col-custom",
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
    // {
    //     type: "ComboBox",
    //     name: "cbSubGroupID",
    //     classNameCol: "col-custom",
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
    //     value: -1,
    //     ValueMember: "SubGroupID",
    // },
    {
        type: "ComboBox",
        name: "cbMainGroupID",
        classNameCol: "col-custom",
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
        classNameCol: "col-custom",
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
        classNameCol: "col-custom",
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
        IsAutoLoadItemFromCache: false,
        IsLabelDiv: true,
        isMulti: false,
        isMultiSelect: false,
        label: "Sản phẩm",
        labelcolspan: 12,
        listoption: [],
        placeholder: "---Vui lòng chọn---",
        rowspan: 2,
        value: "",
    },
];

export const MLObjectDefinition = [
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
    {
        Name: "BrandID",
        DefaultValue: "",
        BindControlName: "cbBrandID"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "cbProductID"
    },
];

export const listColumn = [
    {
        Name: "",
        Type: "text",
        Caption: "Column",
        DataSourceMember: "",
        Width: 200
    }
]