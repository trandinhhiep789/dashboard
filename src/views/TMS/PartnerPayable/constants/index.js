export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/PartnerPayable/Search";
export const SearchByDateAPIPath = "api/PartnerPayableDetail/SearchByDate";
export const SearchComputeAPIPath = "api/PartnerPayable/Compute";

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

const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

export const SearchPartnerPayableDetailElementList = [

    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ ngày",
        value:  dtFromdate,
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtToDate",
        DataSourceMember: "ToDate",
        label: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
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

export const SearchComputeElementList = [
    {
        type: "MonthPicker",
        name: "dtmPayableMonth",
        DataSourceMember: "PayableMonth",
        label: "Tháng",
        value: "",
        format: "MM-YYYY",
        colspan: 2,
        placeholder: "MM-YYYY",
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

export const SearchPartnerPayableDetailMLObjectDefinition=[
    
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
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "cbPartnerID"
    },
]

export const SearchComputeMLObjectDefinition = [

    {
        Name: "PayableMonth",
        DefaultValue: "",
        BindControlName: "dtmPayableMonth"
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

export const DataPartnerPayableDetailGridColumnList = [

    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Mã vẫn đơn",
        DataSourceMember: "ShipmentOrderID",
        Width: 100
    },

    {
        Name: "PartnerSaleOrderID",
        Type: "text",
        Caption: "Mã đơn hàng",
        DataSourceMember: "PartnerSaleOrderID",
        Width: 100
    },

    {
        Name: "ActualEndDeliveryTime",
        Type: "date",
        Caption: "Thời gian giao",
        DataSourceMember: "ActualEndDeliveryTime",
        Width: 100
    },
    {
        Name: "ReceiverFullName",
        Type: "text",
        Caption: "Khách hàng",
        DataSourceMember: "ReceiverFullName",
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
        Name: "SubGroupName",
        Type: "text",
        Caption: "Nhóm hàng",
        DataSourceMember: "SubGroupName",
        Width: 100
    },
    {
        Name: "SenderFullAddress",
        Type: "text",
        Caption: "Kho xuất",
        DataSourceMember: "SenderFullAddress",
        Width: 200
    },
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho tạo",
        DataSourceMember: "StoreName",
        Width: 200
    },
    {
        Name: "CoordinatorUser",
        Type: "text",
        Caption: "NV điều phối",
        DataSourceMember: "CoordinatorUser",
        Width: 100
    },
    {
        Name: "DeliveryUser",
        Type: "text",
        Caption: "NV giao",
        DataSourceMember: "DeliveryUser",
        Width: 100
    },
    {
        Name: "Quantity",
        Type: "text",
        Caption: "SL",
        DataSourceMember: "Quantity",
        Width: 70
    },
    {
        Name: "ServiceFee",
        Type: "textCurrency",
        Caption: "Đơn giá",
        DataSourceMember: "ServiceFee",
        Width: 100
    },
    {
        Name: "PayableAmount",
        Type: "textCurrency",
        Caption: "Thành tiền",
        DataSourceMember: "PayableAmount",
        Width: 100
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