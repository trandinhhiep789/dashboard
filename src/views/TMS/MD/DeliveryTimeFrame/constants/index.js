export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/DeliveryTimeFrame/Search";
export const LoadAPIPath = "api/DeliveryTimeFrame/Load";
export const LoadNewAPIPath = "api/DeliveryTimeFrame/LoadNew";
export const AddAPIPath = "api/DeliveryTimeFrame/Add";
export const AddNewAPIPath = "api/DeliveryTimeFrame/AddNew";
export const UpdateAPIPath = "api/DeliveryTimeFrame/Update";
export const UpdateNewAPIPath = "api/DeliveryTimeFrame/UpdateNew";
export const DeleteAPIPath = "api/DeliveryTimeFrame/Delete";
export const DeleteNewAPIPath = "api/DeliveryTimeFrame/DeleteNew";
export const UpdateOrderAPIPath = "api/DeliveryTimeFrame/UpdateOrder";
export const BackLink = "/DeliveryTimeFrame";
export const AddLink = "/DeliveryTimeFrame/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "DeliveryTimeFrameID";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách khung thời gian vận chuyển" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DeliveryTimeFrame", Title: "Danh sách khung thời gian vận chuyển" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DeliveryTimeFrame", Title: "Danh sách khung thời gian vận chuyển" },
    { Link: "", Title: "Thêm" }
];

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const MLObjectDefinition = [
    {
        Name: "DeliveryTimeFrameID",
        DefaultValue: {},
        BindControlName: "txtDeliveryTimeFrameID",
        DataSourceMember: "DeliveryTimeFrameID"
    },
    {
        Name: "DeliveryTimeFrameName",
        DefaultValue: {},
        BindControlName: "txtDeliveryTimeFrameName",
        DataSourceMember: "DeliveryTimeFrameName"
    },
    {
        Name: "FromTime",
        DefaultValue: {},
        BindControlName: "txtFromTime",
        DataSourceMember: "FromTime"
    },
    {
        Name: "ToTime",
        DefaultValue: {},
        BindControlName: "txtToTime",
        DataSourceMember: "ToTime"
    },
    {
        Name: "CarrierTypeID",
        DefaultValue: {},
        BindControlName: "txtCarrierTypeID",
        DataSourceMember: "CarrierTypeID"
    },
    {
        Name: "OrderIndex",
        DefaultValue: {},
        BindControlName: "txtOrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "Description",
        DefaultValue: {},
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

]


export const AddElementList = [
    {
        type: "select",
        name: "cbShipmentOrderTypeID",
        label: "loại yêu cầu xuất",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "ShipmentOrderTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
        valuemember: "ShipmentOrderTypeID",
        nameMember: "ShipmentOrderTypeName",
        OrderIndex:1
    },
    {
        type: "select",
        name: "cbPartnerID",
        label: "đối tác",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "PartnerID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.PARTNER",
        valuemember: "PartnerID",
        nameMember: "PartnerName",
        OrderIndex:2
    },
    {
        type: "select",
        name: "cbStoreID",
        label: "kho điều phối",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "StoreID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.STORE",
        valuemember: "StoreID",
        nameMember: "StoreName",
        filterValue: 10,
        filterobj: "CompanyID",
        OrderIndex:3
    },
    {
        type: "select",
        name: "cbSenderStoreID",
        label: "kho gửi",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "SenderStoreID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.STORE",
        valuemember: "StoreID",
        nameMember: "StoreName",
        filterValue: 1,
        filterobj: "CompanyID",
        OrderIndex:4
    },
    {
        type: "checkbox",
        name: "chkIsCheckCustomerAddress",
        datasourcemember:"IsCheckCustomerAddress",
        label: "kiểm tra địa chỉ khách hàng",
        value: false,
        readonly: false,
        OrderIndex:5
    }

];


export const EditElementList = [

];

export const DataGridColumnList=[
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "DeliveryTimeFrameID",
        Width: 60
    },
    {
        Name: "DeliveryTimeFrameName",
        Type: "text",
        Caption: "Tên khung thời gian vận chuyển",
        DataSourceMember: "DeliveryTimeFrameName",
        Width: 250
    },
    {
        Name: "FromTime",
        Type: "text",
        Caption: "Từ thời gian",
        DataSourceMember: "FromTime",
        Width: 250
    },
    {
        Name: "ToTime",
        Type: "text",
        Caption: "Đến thời gian",
        DataSourceMember: "ToTime",
        Width: 250
    },
    {
        Name: "CarrierTypeName",
        Type: "text",
        Caption: "Phương tiện vận chuyển",
        DataSourceMember: "CarrierTypeName",
        Width: 250
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "DeliveryTimeFrameID",
        Width: 100,
        Link: "/DeliveryTimeFrame/Edit/",
        LinkText: "Chỉnh sửa"
    },
]