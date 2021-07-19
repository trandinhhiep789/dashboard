export const APIHostName = "TMSAPI";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo chất lượng" }
];
export const PageMainGroupPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo tổng hợp các ngành hàng, nhóm hàng" }
];
export const PageBranchPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo theo chi nhánh" }
];
export const PageBranchGeneralPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo tổng hợp theo chi nhánh" }
];
export const PageUserPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo chất lượng theo nhân viên" }
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
        value: new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        classNameCol: "col-custom",
        isValidDate: valid,
        filterrest: "cbCoordinatorGroup",
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
        type: "MultiTreeSelect",
        name: "cbArea",
        DataSourceMember: "AreaID",
        label: "Khu vực",
        rowspan: 2,
        colspan: 2,
        IsLabelDiv: true,
        value: 0,
        maxTagCount: 1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREA",
        ValueMember: "AreaID",
        NameMember: "AreaName",
        filterrest: "cbCoordinatorGroup",
    },
    // {
    //     tyvse: "ComboTreeSelect",
    //     name: "cbMainGroup",
    //     DataSourceMember: "MainGroupID",
    //     label: "Ngành hàng",
    //     colspan: 2,
    //     rowspan: 2,
    //     value: -1,
    //     maxTagCount: 1,
    //     IsLabelDiv: true,
    //     isMultiSelect: true,
    //     placeholder: "---Vui lòng chọn---",
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
    //     ValueMember: "MainGroupID",
    //     NameMember: "MainGroupName",
    //     listoption: [],
    //     classNameCol: "col-custom",
    //     filterrest: "cbSubGroup",
    // },
    // {
    //     type: "ComboTreeSelect",
    //     name: "cbSubGroup",
    //     DataSourceMember: "SubGroupID",
    //     label: "Nhóm hàng",
    //     colspan: 2,
    //     rowspan: 2,
    //     value: -1,
    //     maxTagCount: 1,
    //     IsLabelDiv: true,
    //     isMultiSelect: false,
    //     placeholder: "---Vui lòng chọn---",
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
    //     ValueMember: "SubGroupID",
    //     NameMember: "cbMainGroup",
    //     listoption: [],
    //     classNameCol: "col-custom",
    //     filterrest: "cbSubGroup",
    //     filterName: "cbMainGroup",
    //     filterValue: "",
    //     filterobj: "MainGroupID",
    //     filterrest: "",
    // },

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
        placeholder: "---Vui lòng chọn---",
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
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
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
            { value: 5, label: 'Báo cáo theo nhân viên' },
        ],
        ValueMember: "ReportQualityTypeID",
        NameMember: "ReportQualityTypeName"

    },

    {
        type: "MGCOOMultiTreeSelect",
        name: "cbCoordinatorGroup",
        DataSourceMember: "CoordinatorGroupID",
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
        ValueMember: "CoordinatorGroupID",
        NameMember: "CoordinatorGroupName",
        listoption: [],
        classNameCol: "col-custom",
        filterName: "cbArea",
        filterValue: "",
        filterobj: "AreaID",
        filterrest: "",
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
        Name: "CoordinatorGroupID",
        DefaultValue: "",
        BindControlName: "cbCoordinatorGroup"
    },
];


export const SearchByUserElementList = [
    {
        type: "Datetime",
        label: "Từ ngày",
        name: "cbFromDate",
        DataSourceMember: "FromDate",
        placeholder: "Từ ngày",
        value: new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        classNameCol: "col-custom",
        isValidDate: valid,
        filterrest: "cbCoordinatorGroup",
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
        type: "MultiTreeSelect",
        name: "cbArea",
        DataSourceMember: "AreaID",
        label: "Khu vực",
        rowspan: 3,
        colspan: 3,
        IsLabelDiv: true,
        value: -1,
        maxTagCount: 1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREA",
        ValueMember: "AreaID",
        NameMember: "AreaName",
        filterrest: "cbCoordinatorGroup",
    },
  
    {
        type: "ComboBox",
        name: "cbReportQualityType",
        DataSourceMember: "ReportQualityTypeID",
        label: "Loại báo cáo",
        colspan: 3,
        value: 5,
        isMultiSelect: false,
        placeholder: "--Tất cả--",
        listoption: [
            { value: 1, label: 'Báo cáo chất lượng toàn quốc' },
            { value: 2, label: 'Báo cáo tổng hợp các ngành hàng, nhóm hàng' },
            { value: 3, label: 'Báo cáo theo chi nhánh' },
            { value: 4, label: 'Báo cáo tổng hợp theo chi nhánh' },
            { value: 5, label: 'Báo cáo theo nhân viên' },
        ],
        ValueMember: "ReportQualityTypeID",
        NameMember: "ReportQualityTypeName"

    },

    {
        type: "MGCOOMultiTreeSelect",
        name: "cbCoordinatorGroup",
        DataSourceMember: "CoordinatorGroupID",
        label: "Danh sách nhóm",
        colspan: 3,
        rowspan: 3,
        value: -1,
        maxTagCount: 1,
        IsLabelDiv: true,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREA",
        ValueMember: "CoordinatorGroupID",
        NameMember: "CoordinatorGroupName",
        listoption: [],
        classNameCol: "col-custom",
        filterName: "cbArea",
        filterValue: "",
        filterobj: "AreaID",
        filterrest: "",
    },
];

export const SearchByUserMLObjectDefinition = [
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
        Name: "CoordinatorGroupID",
        DefaultValue: "",
        BindControlName: "cbCoordinatorGroup"
    },
];