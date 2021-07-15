export const APIHostName = "TMSAPI";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo chất lượng toàn quốc" }
];

export const SearchAPIPath = "api/...";

import moment from 'moment';
var yesterday = moment().subtract(1, 'day');
var valid = function (current) {
    // return current.isAfter(yesterday);
    return current.isBefore(yesterday);
    //return current.day() !== 0 && current.day() !== 6;
};

export const SearchElementList = [
    {
        type: "Datetime",
        label: "Từ ngày",
        name: "cbFromDate",
        DataSourceMember: "FromDate",
        placeholder: "Từ ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        classNameCol: "col-custom",
        isValidDate: valid,
    },
    {
        type: "Datetime",
        label: "Đến ngày",
        name: "cbToDate",
        DataSourceMember: "ToDate",
        placeholder: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        isValidDate: valid,
        classNameCol: "col-custom"
    },
    
    {
        type: "ComboBox",
        name: "cbArea",
        DataSourceMember: "AreaID",
        label: "Khu vực",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREA",
        ValueMember: "AreaID",
        NameMember: "AreaName"
    },
  
    {
        type: "ComboBox",
        name: "cbMainGroup",
        label: "Ngành hàng",
        value: -1,
        colspan: 2,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "MainGroupID",
        readonly: false,
        // validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        ValueMember: "MainGroupID",
        NameMember: "MainGroupName",
        filterrest: "cbSubGroup",
        OrderIndex: 5
    },
    {
        type: "ComboBox",
        name: "cbSubGroup",
        label: "Nhóm hàng",
        value: -1,
        colspan: 2,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "SubGroupID",
        readonly: false,
        // validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName",
        filterName: "cbMainGroup",
        filterValue: "",
        filterobj: "MainGroupID",
        filterrest: "",
        OrderIndex: 6
    },
  
    {
        type: "ComboBox",
        name: "cbReportQualityType",
        DataSourceMember: "ReportQualityTypeID",
        label: "Loại báo cáo",
        colspan: 2,
        value: 1,
        isMultiSelect: false,
        placeholder: "--Tất cả--",
        listoption: [
            { value: 1, label: 'Báo cáo chất lượng toàn quốc' },
            { value: 2, label: 'Báo cáo tổng hợp các ngành hàng, nhóm hàng' },
            { value: 3, label: 'Báo cáo theo chi nhánh' },
            { value: 4, label: 'Báo cáo tổng hợp theo chi nhánh' },
            { value: 5, label: 'Báo cáo theo user' },
        ],
        ValueMember: "ReportQualityTypeID",
        NameMember: "ReportQualityTypeName"

    },

    {
        type: "MGCOOMultiTreeSelect",
        name: "cbMonthlyCoordGropup",
        DataSourceMember: "MonthlyCoordGropupID",
        label: "Danh sách nhóm",
        colspan: 3,
        rowspan: 2,
        value: -1,
        maxTagCount: 1,
        IsLabelDiv: true,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREA",
        ValueMember: "MonthlyCoordGropupID",
        NameMember: "MonthlyCoordGropupName",
        listoption: [],
        classNameCol: "col-custom"
    },
];

export const SearchMLObjectDefinition = [
    {
        Name: "FromDate",
        DefaultValue: "",
        BindControlName: "cbFromDate"
    },
    {
        Name: "ToDate",
        DefaultValue: "",
        BindControlName: "cbToDate"
    },
    {
        Name: "ReportQualityTypeID",
        DefaultValue: "",
        BindControlName: "cbReportQualityType"
    },
    {
        Name: "AreaID",
        DefaultValue: "",
        BindControlName: "cbArea"
    },
    {
        Name: "MainGroupID",
        DefaultValue: "",
        BindControlName: "cbMainGroup"
    },
    {
        Name: "SubGroupID",
        DefaultValue: "",
        BindControlName: "cbSubGroup"
    },
    {
        Name: "MonthlyCoordGropupID",
        DefaultValue: "",
        BindControlName: "cbMonthlyCoordGropup"
    },
];