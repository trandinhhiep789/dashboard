export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/PartnerPayable/Search";
export const SearchPayableDetailAPIPath = "api/PartnerPayableDetail/Search";
export const SearchByPartnerAPIPath = "api/PartnerPayable/SearchByPartner";
export const AddAPIPath = "api/PartnerPayable/Add";
export const UpdateDeleteAPIPath = "api/PartnerPayable/UpdateDelete";
export const DeleteAPIPath = "api/PartnerPayable/Delete";
export const UpdateOrderAPIPath = "api/PartnerPayable/UpdateOrder";
export const BackLink = "/PartnerPayable";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PartnerID";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách tiền phải trả cho nhà cung cấp dịch vụ theo tháng" }
];

export const PagePathPartner = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách tiền phải trả cho nhà cung cấp dịch vụ theo đối tác" }
];

export const PagePathDate = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách tiền phải trả cho nhà cung cấp dịch vụ theo ngày" }
];

export const InitSearchParams = [
    {
        SearchKey: "@MONTH",
        SearchValue: new Date()
    },
    {
        SearchKey: "@PARTNERID",
        SearchValue: -1
    },
]

export const InitSearchByDateParams = [
    {
        SearchKey: "@PAYABLEDATE",
        SearchValue: ""
    },
    {
        SearchKey: "@PARTNERID",
        SearchValue: -1
    },
]

export const InitSearchByPartnerParams = [
    {
        SearchKey: "@PARTNERID",
        SearchValue: -1
    },


]

export const SearchElementList = [
    {
        type: "MonthPicker",
        name: "dtPayableDate",
        DataSourceMember: "PayableDate",
        label: "Tháng",
        value: "",
        format: "MM-YYYY",
        colspan: 2,
        placeholder: "MM-YYYY",
    },
    {
        type: "ComboBox",
        name: "cbPartnerID",
        DataSourceMember: "PartnerID",
        label: "Đối tác",
        colspan: 3,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName",
        filterValue: 2,
        filterobj: "PartnerTypeID",

    },

]

export const SearchByPartnerElementList = [
    {
        type: "ComboBox",
        name: "cbPartnerID",
        DataSourceMember: "PartnerID",
        label: "Đối tác",
        colspan: 3,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName",
        filterValue: 2,
        filterobj: "PartnerTypeID",

    },

]

export const SearchByPartnerMLObjectDefinition = [

    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "cbPartnerID"
    },
]

export const SearchMLObjectDefinition = [

    {
        Name: "PayableDate",
        DefaultValue: "",
        BindControlName: "dtPayableDate"
    },

    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "cbPartnerID"
    },
]

export const DataGridColumnList = [

    {
        Name: "PartnerName",
        Type: "texttolink",
        Caption: "Đối tác",
        DataSourceMember: "PartnerName",
        Link: "/PartnerPayable/DetailByPartner/",
        Width: 300
    },
    {
        Name: "PayableAmount",
        Type: "textCurrency",
        Caption: "Số tiền trả",
        DataSourceMember: "PayableAmount",
        Width: 300
    },

];

export const DataGridByPartnerColumnList = [

    {
        Name: "PayableDate",
        Type: "texttolinkdate",
        Caption: "Đối tác",
        DataSourceMember: "PayableDate",
        Link: "/PartnerPayable/DetailByDate/",
        Width: 300
    },
    {
        Name: "PayableAmount",
        Type: "textCurrency",
        Caption: "Số tiền trả",
        DataSourceMember: "PayableAmount",
        Align: "text-right",
        Width: 300

    },

];
export const SearchByDateMLObjectDefinition = [
    {
        Name: "PayableDate",
        DefaultValue: "",
        BindControlName: "dtPayableDate"
    },
]

export const SearchByDateElementList = [
    {
        type: "Datetime",
        name: "dtPayableDate",
        DataSourceMember: "PayableDate",
        label: "Từ ngày",
        value: "",
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },

]


export const DataGridByDateColumnList = [

    {
        Name: "PayableDate",
        Type: "date",
        Caption: "Ngày",
        DataSourceMember: "PayableDate",
        Width: 100
    },
    {
        Name: "PartnerName",
        Type: "text",
        Caption: "Đối tác",
        DataSourceMember: "PartnerName",
        Width: 100
    },
    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Mã vẫn đơn",
        DataSourceMember: "ShipmentOrderID",
        Width: 100
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Sản phẩm",
        DataSourceMember: "ProductName",
        Width: 100
    },
    {
        Name: "DeliveryUser",
        Type: "text",
        Caption: "Nhân viên",
        DataSourceMember: "DeliveryUser",
        Width: 100
    },
    {
        Name: "ServiceFee",
        Type: "textCurrency",
        Caption: "Phí dịch vụ",
        DataSourceMember: "ServiceFee",
        Align: "text-right",
        Width: 100

    },
    {
        Name: "PayableAmount",
        Type: "textCurrency",
        Caption: "Số tiền trả",
        DataSourceMember: "PayableAmount",
        Align: "text-right",
        Width: 100

    },

];