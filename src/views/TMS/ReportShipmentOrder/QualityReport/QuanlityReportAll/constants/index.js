export const APIHostName = "TMSAPI";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo chất lượng toàn quốc" }
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

export const InitSearchParams = [
    {
        SearchKey: "@FROMDATE",
        SearchValue: new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()),
    },
    {
        SearchKey: "@TODATE",
        SearchValue:  new Date(),
    },
    {
        SearchKey: "@AREAIDLIST",
        SearchValue: ""
    },
    {
        SearchKey: "@COORDINATORGROUPIDLIST",
        SearchValue: ""
    },

    {
        SearchKey: "@MAINGROUPIDLIST",
        SearchValue: ""
    },
    {
        SearchKey: "@SUBGROUPIDLIST",
        SearchValue: ""
    },
    {
        SearchKey: "@ISDETAIL",
        SearchValue: 1
    },
    {
        SearchKey: "@PAGESIZE",
        SearchValue: 50
    },
    {
        SearchKey: "@PAGEINDEX",
        SearchValue: 1
    },
];

const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 1);


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
        value: dtFromdate,
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        isValidDate: valid,
        classNameCol: "col-custom"
    },

    // {
    //     type: "MultiTreeSelect",
    //     name: "cbArea",
    //     DataSourceMember: "AreaID",
    //     label: "Khu vực",
    //     rowspan: 2,
    //     colspan: 2,
    //     IsLabelDiv: true,
    //     value: 0,
    //     maxTagCount: 1,
    //     isMultiSelect: false,
    //     placeholder: "---Vui lòng chọn---",
    //     listoption: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.AREA",
    //     ValueMember: "AreaID",
    //     NameMember: "AreaName",
    //     filterrest: "cbCoordinatorGroup",
    // },

    {
        type: "ComboBoxNewChange",
        name: "cbArea",
        label: "Khu vực",
        value: -1,
        colspan: 3,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "AreaID",
        placeholder: "---Vui lòng chọn---",
        readonly: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREATT",
        ValueMember: "AreaID",
        NameMember: "AreaName",
        filterrest: "cbCoordinatorGroup",
        OrderIndex: 5
    },
    {
        type: "ComboBoxNewChange",
        name: "cbCoordinatorGroup",
        label: "Danh sách nhóm",
        value: -1,
        colspan: 3,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "CoordinatorGroupID",
        readonly: false,
        isMultiSelect: true,
        placeholder: "---Vui lòng chọn---",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.COORDINATORGROUP",
        ValueMember: "CoordinatorGroupID",
        NameMember: "CoordinatorGroupName",
        filterName: "cbArea",
        filterValue: "",
        filterobj: "AreaID",
        filterrest: "",
        OrderIndex: 6
    },
    {
        type: "ComboBoxNewChange",
        name: "cbMainGroup",
        label: "Ngành hàng",
        value: -1,
        colspan: 3,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "MainGroupID",
        placeholder: "---Vui lòng chọn---",
        readonly: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        ValueMember: "MainGroupID",
        NameMember: "MainGroupName",
        filterrest: "cbSubGroup",
        OrderIndex: 5
    },
    {
        type: "ComboBoxNewChange",
        name: "cbSubGroup",
        label: "Nhóm hàng",
        value: -1,
        colspan: 3,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "SubGroupID",
        readonly: false,
        isMultiSelect: true,
        placeholder: "---Vui lòng chọn---",
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

