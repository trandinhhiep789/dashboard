export const APIHostName = "TMSAPI";
export const SearchAPIPath = "TMSAPI";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo thống kê công nợ quá hạn" }
];

export const SearchMLObjectDefinition = [
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
    {
        Name: "CoordinatorStoreID",
        DefaultValue: "",
        BindControlName: "cbCoordinatorStoreID"
    },

];

export const SearchElementList = [
    {
        type: "Datetime",
        label: "Từ ngày",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        placeholder: "Từ ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        classNameCol: "col-custom"
    },
    {
        type: "Datetime",
        label: "Đến ngày",
        name: "dtToDate",
        DataSourceMember: "ToDate",
        placeholder: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        classNameCol: "col-custom"
    },
    {
        type: "ComboBoxNewChange",
        name: "cbCoordinatorStoreID",
        DataSourceMember: "CoordinatorStoreID",
        label: "kho điều phối",
        colspan: 2,
        value: "",
        isMultiSelect: false,
        placeholder: "---Kho điều phối---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.USER_COOSTORE_BYUSER",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        // filterValue: 10,
        // filterobj:"CompanyID",
        classNameCol: "col-custom"
    },

];

export const GridColumnList  = [
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "StoreName",
        Width: "10%"
    },
    {
        Name: "TotalCOD",
        Type: "textCurrency",
        Caption: "Tổng tiền phải thu hộ",
        DataSourceMember: "TotalCOD",
        Width: "10%"
    },
    {
        Name: "TotalSaleMaterialMoney",
        Type: "textCurrency",
        Caption: "Tổng tiền phải thu vật tư",
        DataSourceMember: "TotalSaleMaterialMoney",
        Width: "10%"
    },
    {
        Name: "TotalMoneyDebt",
        Type: "textCurrency",
        Caption: "Tổng tiền còn nợ",
        DataSourceMember: "TotalMoneyDebt",
        Width: "10%"
    },
    {
        Name: "TotalDebtOrders",
        Type: "textCurrency",
        Caption: "Tổng vận đơn còn nợ",
        DataSourceMember: "TotalDebtOrders",
        Width: "10%"
    },
    {
        Name: "TotALoverDueDebtOrders",
        Type: "textCurrency",
        Caption: "Tổng vận đơn nợ quá hạn",
        DataSourceMember: "TotALoverDueDebtOrders",
        Width: "10%"
    },
    
]