export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ServiceAgreement_FeeAppendixDetail/SearchNew";
export const BackLink = "/ServiceAgreement/FeeAppendix/Detail/";
export const TitleFromFeeAppendixDetail = "Thông tin chi tiết phụ lục biểu phí";

export const LoadNewAPIPath = "api/ServiceAgreement_FeeAppendixDetail/LoadNew";

export const PKColumnName = "FeeAppendixDetailID";
export const IDSelectColumnName= "chkSelect";



export const SearchPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/", Title: "Danh sách chi tiết phụ lục biểu phí" },
];

export const InitSearchParams =[
    {
        SearchKey: "@SUBGROUPID",
        SearchValue: "-1"
    },
    {
        SearchKey: "@TECHSPECSID",
        SearchValue: "-1"
    },
    {
        SearchKey: "@TECHSPECSVALUEID",
        SearchValue: "-1"
    },
    {
        SearchKey: "@PRODUCTID",
        SearchValue: ""
    },
    {
        SearchKey: "@SERVICEFEE",
        SearchValue: "-1"
    },
]

export const SearchMLObjectDefinition=[
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "ServiceTypeID",
        DefaultValue: "",
        BindControlName: "cbServiceTypeID"
    },
    {
        Name: "AreaID",
        DefaultValue: "",
        BindControlName: "cbAreaID"
    },
    {
        Name: "SignedDate",
        DefaultValue: "",
        BindControlName: "dtSignedDate"
    },
    {
        Name: "ExpiredDate",
        DefaultValue: "",
        BindControlName: "dtExpiredDate"
    },
]

export const SearchElementList = [

    {
        type: "ComboBox",
        name: "cbSubGroupID",
        DataSourceMember: "SubGroupID",
        label: "Nhóm hàng",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName",

    },
    {
        type: "ComboBox",
        name: "cbATechSpecsID",
        DataSourceMember: "TechSpecsID",
        label: "Thông số kỹ thuật",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECS",
        ValueMember: "TechSpecsID",
        NameMember: "TechSpecsName"

    },
    {
        type: "ComboBox",
        name: "cbTechSpecsValueID",
        DataSourceMember: "TechSpecsValueID",
        label: "Thông số kỹ thuật",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECSVALUE",
        ValueMember: "TechSpecsValueID",
        NameMember: "Value"

    },
    {
        type: "text",
        name: "txtProductID",
        DataSourceMember: "ProductID",
        label: "sản phẩm",
        value: "",
        colspan: 2,
        placeholder: "Sản Phẩm",
        icon: ""
    },
    {
        type: "text",
        name: "txtServiceFee",
        DataSourceMember: "ServiceFee",
        label: "giá dịch vụ",
        value: "",
        colspan: 2,
        placeholder: "Giá dịch vụ",
        icon: ""
    },
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Mã",
        DataSourceMember: "FeeAppendixDetailID",
        Width: 150,
    },
    {
        Name: "SubGroupName",
        Type: "texttolink",
        Caption: "Nhóm hàng",
        DataSourceMember: "SubGroupName",
        Link: "/ServiceAgreement/FeeAppendixDetail/Detail/",
        Width: 150,
    },
    {
        Name: "TechspecsName",
        Type: "text",
        Caption: "Thông số kỹ thuật",
        DataSourceMember: "TechspecsName",
        Width: 250,
    },
    {
        Name: "TechspecsValue",
        Type: "text",
        Caption: " Giá trị",
        DataSourceMember: "TechspecsValue",
        Width: 250,
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Sản phẩm",
        DataSourceMember: "ProductName",
        Width: 250,
    },
    {
        Name: "ServiceFee",
        Type: "text",
        Caption: "Giá dịch vụ",
        DataSourceMember: "ServiceFee",
        Width: 250,
    },
    {

        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "FeeAppendixID",
        Width: 70,
        Link: "/ServiceAgreement/FeeAppendix/Edit/",
        LinkText: "Chỉnh sửa"
    }
];