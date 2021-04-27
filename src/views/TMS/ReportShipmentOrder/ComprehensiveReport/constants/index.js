import { USER_PERMISSION_VIEW } from '../../../../../constants/functionLists';

export const APIHostName = "TMSAPI";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo tổng hợp" }
];

export const ListColumnGrid = [
    {
        Name: "RequestUser",
        Type: "text",
        Caption: "Nhân viên",
        DataSourceMember: "RequestUser",
        Width: 100
    },
    {
        Name: "TotalQuantity",
        Type: "text",
        Caption: "Số lượng tồn ống đồng (m)",
        DataSourceMember: "TotalQuantity",
        Width: 100
    },
    {
        Name: "SalePriceVAT",
        Type: "text",
        Caption: "Vật tư (tổng VND)",
        DataSourceMember: "SalePriceVAT",
        Width: 100
    },
]

export const SearchMLObjectDefinition = [

    {
        Name: "Month",
        DefaultValue: "",
        BindControlName: "dtMonth"
    },
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "cbUserName"
    }
]

export const SearchElementList = [
    // {
    //     type: "Datetime",
    //     name: "bcFromDate",
    //     DataSourceMember: "FromDate",
    //     label: "Từ Ngày",
    //     value: new Date(),
    //     timeFormat: false,
    //     dateFormat: "DD/MM/YYYY",
    //     colspan: 2,
    // },
    // {
    //     type: "Datetime",
    //     name: "bcToDate",
    //     DataSourceMember: "ToDate",
    //     label: "Đến Ngày",
    //     value: new Date(),
    //     timeFormat: false,
    //     dateFormat: "DD/MM/YYYY",
    //     colspan: 2,
    // },
    // {
    //     type: "ComboBox",
    //     name: "bcArea",
    //     DataSourceMember: "Area",
    //     label: "Khu vực",
    //     colspan: 2,
    //     value: -1,
    //     isMultiSelect: false,
    //     placeholder: "---Chọn khu vực---",
    //     listoption: [],
    //     IsAutoLoadItemFromCache: true,
    //     // LoadItemCacheKeyID: "",
    //     // ValueMember: "",
    //     // NameMember: "",
    //     classNameCol: "col-custom"
    // },
    // {
    //     type: "ComboBox",
    //     name: "bcUserName",
    //     DataSourceMember: "UserName",
    //     label: "Trưởng nhóm",
    //     colspan: 2,
    //     value: -1,
    //     isMultiSelect: false,
    //     placeholder: "---Chọn trưởng nhóm---",
    //     listoption: [],
    //     IsAutoLoadItemFromCache: true,
    //     // LoadItemCacheKeyID: "",
    //     // ValueMember: "",
    //     // NameMember: "",
    //     classNameCol: "col-custom"
    // },
    {
        type: "MonthPicker",
        name: "dtMonth",
        DataSourceMember: "Month",
        label: "Tháng",
        value: new Date(),
        format: "MM-YYYY",
        colspan: 2,
        placeholder: "MM-YYYY",
    },
    {
        type: "MultiSelectUser",
        name: "cbUserName",
        DataSourceMember: "UserName",
        label: "Nhân viên",
        colspan: 12,
        rowspan: 3,
        labelcolspan: 12,
        IsLabelDiv: true,
        value: -1,
        placeholder: "---Chọn nhân viên---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        isMultiSelect: true,
        IsPermission: true,
        PermissionKey: USER_PERMISSION_VIEW
    },
]