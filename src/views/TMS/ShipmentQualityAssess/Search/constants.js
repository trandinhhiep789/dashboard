let fromDate = new Date();
fromDate.setHours(0, 0, 0, 0);

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Đánh giá chất lượng giao hàng" }
];

export const APIHostName = "TMSAPI";
export const APISearch = "api/ShipmentQualityAssess/Search";
export const APIExportExcel = "api/ShipmentQualityAssess/ExportExcel";

export const dataSearch = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@FROMDATE",
        SearchValue: fromDate
    },
    {
        SearchKey: "@TODATE",
        SearchValue: fromDate
    },
    {
        SearchKey: "@COORDINATORSTOREID",
        SearchValue: -1
    },
    {
        SearchKey: "@QUALITYASSESSGROUPID",
        SearchValue: -1
    },
    {
        SearchKey: "@PAGENUMBER",
        SearchValue: 1
    },
    {
        SearchKey: "@PAGESIZE",
        SearchValue: 50
    }
]

export const listElement = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Mã đơn hàng/ Vận đơn",
        value: "",
        placeholder: "",
        icon: "",
        colspan: 2,
        listoption: {}
    },
    {
        type: "Datetime",
        label: "Từ ngày",
        name: "dtCreatedOrderTimeFo",
        DataSourceMember: "CreatedOrderTimeFo",
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
        name: "dtCreatedOrderTimeTo",
        DataSourceMember: "CreatedOrderTimeTo",
        placeholder: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        name: "cbCoordinatorStoreID",
        DataSourceMember: "CoordinatorStoreID",
        label: "Kho điều phối",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Kho điều phối---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        filterValue: 10,
        filterobj: "CompanyID",
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        name: "cbQualityAssessGroupID",
        DataSourceMember: "QualityAssessGroupID",
        label: "Nhóm tiêu chí",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Nhóm tiêu chí---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.QUALITYASSESSGROUP",
        ValueMember: "QualityAssessGroupID",
        NameMember: "QualityAssessGroupName",
        classNameCol: "col-custom"
    }
]

export const MLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "CreatedOrderTimeFo",
        DefaultValue: "",
        BindControlName: "dtCreatedOrderTimeFo"
    },
    {
        Name: "CreatedOrderTimeTo",
        DefaultValue: "",
        BindControlName: "dtCreatedOrderTimeTo"
    },
    {
        Name: "CoordinatorStoreID",
        DefaultValue: "",
        BindControlName: "cbCoordinatorStoreID"
    },
    {
        Name: "QualityAssessGroupID",
        DefaultValue: "",
        BindControlName: "cbQualityAssessGroupID"
    },
]

