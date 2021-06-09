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



export const SearchElementDetailList = [
    {
        type: "checkbox",
        name: "ckDifferenceDetail",
        DataSourceMember: "DifferenceDetail",
        label: "Chỉ xem dữ liệu chênh lệch",
        value: true,
        colspan: 2,
        classNameCol: "checkboxSelectCustom"
    },
]

export const SearchMLObjectDefinitionDetail = [

    {
        Name: "DifferenceDetail",
        DefaultValue: false,
        BindControlName: "ckDifferenceDetail"
    },
]


export const SearchElementList = [

    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ Ngày",
        value: new Date(),//new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()),
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
        isMultiSelect: false,
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
    // {
    //     type: "ComboBox",
    //     name: "cbBusinessID",
    //     DataSourceMember: "BusinessID",
    //     label: "Nghiệp vụ",
    //     colspan: 2,
    //     value: -1,
    //     isMultiSelect: false,
    //     placeholder: "--Tất cả--",
    //     listoption: [
    //         { value: 1, label: 'Tạm ứng vật tư' },
    //         { value: 2, label: 'Nhập trả tạm ứng' },
    //         { value: 3, label: 'Xuất tiêu hao vật tư' },
    //         { value: 4, label: 'Xuất bán vật tư cho khách' },
    //     ],
    //     ValueMember: "ServiceStatusID",
    //     NameMember: "ServiceStatusName"

    // },
    {
        type: "checkbox",
        name: "ckDifference",
        DataSourceMember: "Difference",
        label: "Chỉ xem dữ liệu chênh lệch",
        value: true,
        colspan: 2,
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
        DefaultValue: false,
        BindControlName: "ckDifference"
    },
]

export const GridColumnList = [
    {
        Name: "BusinessID",
        Type: "popupTextNumber",
        Caption: "Nghiệp vụ",
        DataSourceMember: "BusinessID",
        Width: "10%"
    },

    {
        Name: "DateData",
        Type: "date",
        Caption: "Ngày",
        DataSourceMember: "DateData",
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



export const DataGridModalAdvanceMaterial = [
    {
        Name: "date",
        Type: "date",
        Caption: "Ngày",
        DataSourceMember: "date",
        Width: "10%"
    },
    {
        Name: "voucherconcern",
        Type: "text",
        Caption: "Mã Y/C tạm ứng VT",
        DataSourceMember: "voucherconcern",
        Width: "10%"
    },
    {
        Name: "ovtms",
        Type: "text",
        Caption: "Mã phiếu xuất (TMS)",
        DataSourceMember: "ovtms",
        Width: "20%"
    },
    {
        Name: "overp",
        Type: "text",
        Caption: "Mã phiếu xuất (ERP)",
        DataSourceMember: "overp",
        Width: "20%"
    },
    {
        Name: "quantitytms",
        Type: "text",
        Caption: "Số lượng TMS",
        DataSourceMember: "quantitytms",
        Width: "10%"
    },
    {
        Name: "quantityerp",
        Type: "text",
        Caption: "Số lượng ERP",
        DataSourceMember: "quantityerp",
        Width: "10%"
    },
    {
        Name: "differencequantity",
        Type: "text",
        Caption: "Chênh lệch",
        DataSourceMember: "differencequantity",
        Width: "10%"
    },
]