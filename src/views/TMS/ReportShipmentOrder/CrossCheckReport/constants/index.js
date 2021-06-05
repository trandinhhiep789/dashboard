import { USER_PERMISSION_VIEW } from '../../../../../constants/functionLists'

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/BeginTermAdvanceDebt/LoadBADByUserName";
export const LoadByProductIDAPIPath = "api/AdvanceDebtFlow/LoadBADByProductID";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách báo cáo đối soát" }
];


const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);


export const SearchElementList = [

    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ Ngày",
        value: new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtToDate",
        DataSourceMember: "ToDate",
        label: "Đến Ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "MultiTreeSelect",
        name: "cbBusinessID",
        DataSourceMember: "BusinessID",
        label: "Nghiệp vụ",
        colspan: 12,
        IsLabelDiv: true,
        labelcolspan: 12,
        rowspan: 2,
        maxTagCount: 1,
        value: -1,
        isMultiSelect: true,
        placeholder: "--Tất cả--",
        listoption: [
            { value: 1, label: 'Tạm ứng vật tư' },
            { value: 2, label: 'Nhập trả tạm ứng' },
            { value: 3, label: 'Xuất tiêu hao vật tư' },
            { value: 4, label: 'Xuất bán vật tư cho khách' },
        ],
        ValueMember: "BusinessID",
        NameMember: "BusinessName",
        classNameCol: "multiTreeSelectCustom"

    },
    {
        type: "checkbox",
        name: "ckDifference",
        DataSourceMember: "Difference",
        label: "Chênh lệch",
        value: true,
        colspan: 1,
        classNameCol: "checkboxSelectCustom"
    },
]

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
        Name: "BusinessID",
        DefaultValue: "",
        BindControlName: "cbBusinessID"
    },
    {
        Name: "Difference",
        DefaultValue: "",
        BindControlName: "ckDifference"
    },
]

export const GridColumnList = [
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Nghiệp vụ",
        DataSourceMember: "ProductID",
        Width: "10%"
    },

    {
        Name: "Date",
        Type: "date",
        Caption: "Ngày",
        DataSourceMember: "Date",
        Width: "20%"
    },
    {
        Name: "TMS",
        Type: "text",
        Caption: "TMS",
        DataSourceMember: "TMS",
        Width: "25%"
    },
    {
        Name: "ERP",
        Type: "text",
        Caption: "ERP",
        DataSourceMember: "ERP",
        Width: "25%"
    },
    {
        Name: "Difference",
        Type: "text",
        Caption: "Chênh lệch",
        DataSourceMember: "Difference",
        Width: "20%"
    },
    
]
