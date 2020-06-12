export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ServiceAgreement_FeeAppendix/Search";
export const LoadAPIPath = "api/ServiceAgreement_FeeAppendix/Load";
export const LoadNewAPIPath = "api/ServiceAgreement_FeeAppendix/LoadNew";
export const AddAPIPath = "api/ServiceAgreement_FeeAppendix/Add";
export const UpdateAPIPath = "api/ServiceAgreement_FeeAppendix/Update";
export const DeleteAPIPath = "api/ServiceAgreement_FeeAppendix/Delete";
export const UpdateOrderAPIPath = "api/ServiceAgreement_FeeAppendix/UpdateOrder";
export const BackLink = "/ServiceAgreement";
export const AddLink = "/ServiceAgreement/FeeAppendix/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "FeeAppendixID";

export const TitleFormAdd = "Thêm chi tiết phụ lục biểu phí";
export const TitleFormEdit = "Cập nhật chi tiết phụ lục biểu phí";
export const TitleFormSearch = "Danh sách chi tiết phụ lục biểu phí";
export const TitleFormDetail = "Danh sách chi tiết phụ lục biểu phí";
export const TitleFromFeeAppendixDetail = "Chi tiết biểu phí";

export const AddLinkFeeAppendixDetail = "/ServiceAgreement/FeeAppendix/Add";
export const IDSelectColumnNameFeeAppendixDetail = "chkSelect";
export const PKColumnNameFeeAppendixDetail = "FeeAppendixDetailID"

export const AddFeeAppendixDetailPath ="api/ServiceAgreement_FeeAppendixDetail/Add";
export const  EditFeeAppendixDetailPath="api/ServiceAgreement_FeeAppendixDetail/Update";
export const  DeleteFeeAppendixDetailPath="api/ServiceAgreement_FeeAppendixDetail/Delete";



export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];



export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ServiceAgreement", Title: "Danh sách hợp đồng dịch vụ" },
    { Link: "/ServiceAgreement/FeeAppendix", Title: "Danh sách phụ lục biểu phí" },
    { Link: "", Title: "Sửa" }
];
export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ServiceAgreement", Title: "Danh sách hợp đồng dịch vụ" },
    { Link: "/ServiceAgreement/FeeAppendix", Title: "Danh sách phụ lục biểu phí" },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ServiceAgreement", Title: "Danh sách hợp đồng dịch vụ" },
    { Link: "/ServiceAgreement/FeeAppendix", Title: "Danh sách phụ lục biểu phí" },
    { Link: "", Title: "Chi tiết" }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
]


export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        DataSourceMember: "Keyword",
        label: "Từ Khóa",
        value: "",
        colspan: 2,
        placeholder: "Từ Khóa",
        icon: ""
    },

];

export const MLObjectDefinition = [
    {
        Name: "FeeAppendixID",
        DefaultValue: "",
        BindControlName: "txtFeeAppendixID",
        DataSourceMember: "FeeAppendixID"
    },
    {
        Name: "ServiceSeasonTypeID",
        DefaultValue: "",
        BindControlName: "selServiceSeasonTypeID",
        DataSourceMember: "ServiceSeasonTypeID"
    },
    {
        Name: "FeeAppendixName",
        DefaultValue: "",
        BindControlName: "txtFeeAppendixName",
        DataSourceMember: "FeeAppendixName"
    },

    {
        Name: "ApplyToDate",
        DefaultValue: "",
        BindControlName: "txtApplyToDate",
        DataSourceMember: "ApplyToDate"
    },
    {
        Name: "ApplyFromDate",
        DefaultValue: "",
        BindControlName: "txtApplyFromDate",
        DataSourceMember: "ApplyFromDate"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUser"
    },
]

export const AddElementList = [
    {
        type: "text",
        name: "txtFeeAppendixID",
        label: "mã phụ lục",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FeeAppendixID",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "selServiceSeasonTypeID",
        label: "loại thời vụ",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ServiceSeasonTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SERVICESEASONTYPE",
        ValueMember: "ServiceSeasonTypeID",
        NameMember: "ServiceSeasonTypeName"
    },
    {
        type: "text",
        name: "txtFeeAppendixName",
        label: "tên phụ lục",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FeeAppendixName",
        readonly: false,
        validatonList: ["required"]
    },

    {
        type: "datetime",
        name: "txtApplyToDate",
        label: "từ ngày",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ApplyToDate",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "datetime",
        name: "txtApplyFromDate",
        label: "đến ngày",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ApplyFromDate",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "mô tả",
        value: "",
        maxSize: "1900",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "kích hoạt:",
        value: true,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsActived",
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "hệ thống:",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsSystem",
        validatonList: []
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "FeeAppendixID",
        Width: 60
    },
    {
        Name: "FeeAppendixName",
        Type: "texttolink",
        Caption: "Tên phụ lục",
        DataSourceMember: "FeeAppendixName",
        Link: "/ServiceAgreement/FeeAppendix/",
        Width: 140
    },
    {
        Name: "ServiceSeasonTypeName",
        Type: "text",
        Caption: "Loại thời vụ",
        DataSourceMember: "ServiceSeasonTypeName",
        Width: 230
    },
    {
        Name: "ApplyFromDate",
        Type: "date",
        Caption: " Từ ngày",
        DataSourceMember: "ApplyFromDate",
        Width: 150
    },
    {
        Name: "ApplyToDate",
        Type: "date",
        Caption: "Đến ngày",
        DataSourceMember: "ApplyToDate",
        Width: 170
    },
    {
        Name: "IsActived",
        Type: "text",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 150
    },

    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "FeeAppendixID",
        Width: 70,
        Link: "/ServiceAgreement/FeeAppendix/Edit/",
        LinkText: "Chỉnh sửa"
    },
]

export const DataGridColumnItemListFeeAppendixDetail = [
    // {
    //     Name: "FeeAppendixDetailID",
    //     Type: "checkbox",
    //     Caption: "Mã",
    //     DataSourceMember: "FeeAppendixDetailID",
    //     Width: 150,
    // },
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
        Type: "groupAction",
        Caption: "Tác vụ",
        DataSourceMember: "FeeAppendixID",
        Width: 70,
        Link: "/ServiceAgreement/FeeAppendix/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const MLObjectFeeAppendixDetailItem = [
    {

        Name: "MainGroupID",
        DefaultValue: "",
        BindControlName: "cbMainGroupID",
        DataSourceMember: "MainGroupID"
    },
    {

        Name: "SubGroupID",
        DefaultValue: "",
        BindControlName: "cbSubGroupID",
        DataSourceMember: "SubGroupID"
    },
    {
        Name: "TechSpecsID",
        DefaultValue: "",
        BindControlName: "cbTechSpecsID",
        DataSourceMember: "TechSpecsID"
    },
    {
        Name: "TechSpecsValueID",
        DefaultValue: "",
        BindControlName: "cbTechSpecsValueID",
        DataSourceMember: "TechSpecsValueID"
    },
    {
        
        Name: "Product",
        DefaultValue: "",
        BindControlName: "cbProductID",
        DataSourceMember: "Product"
    },
    {
        
        Name: "ServiceFee",
        DefaultValue: "",
        BindControlName: "txtServiceFee",
        DataSourceMember: "ServiceFee"
    },
    {
        
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "ckIsActived",
        DataSourceMember: "IsActived"
    },
    {
        
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "ckIsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "txtNote",
        DataSourceMember: "Note"
    },

]

export const MLObjectAbilityItem = [

    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "txtNote",
        DataSourceMember: "Note"
    },

]