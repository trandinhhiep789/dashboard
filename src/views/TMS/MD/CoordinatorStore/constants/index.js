export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/CoordinatorStore/Search";
export const LoadAPIPath = "api/CoordinatorStore/Load";
export const AddAPIPath = "api/CoordinatorStore/Add";
export const UpdateAPIPath = "api/CoordinatorStore/Update";
export const DeleteAPIPath = "api/CoordinatorStore/Delete";
export const UpdateOrderAPIPath = "api/CoordinatorStore/UpdateOrder";
export const BackLink = "/CoordinatorStore";
export const AddLink = "/CoordinatorStore/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "CoordinatorStoreID";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách định nghĩa kho điều phối giao hàng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/CoordinatorStore", Title: "Danh sách định nghĩa kho điều phối giao hàng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/CoordinatorStore", Title: "Danh sách định nghĩa kho điều phối giao hàng" },
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

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "CoordinatorStoreID",
        Width: 60
    },
    {
        Name: "CoordinatorStoreID",
        Type: "text",
        Caption: "Mã định nghĩa",
        DataSourceMember: "CoordinatorStoreID",
        Width: 150
    },
    {
        Name: "ShipmentOrderTypeID",
        Type: "text",
        Caption: "Tên loại yêu cầu xuất",
        DataSourceMember: "ShipmentOrderTypeID",
        Width: 250
    },

    {
        Name: "PartnerID",
        Type: "text",
        Caption: "Tên đối tác",
        DataSourceMember: "PartnerID",
        Width: 250
    },
    {
        Name: "StoreID",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "StoreID",
        Width: 250
    },
    {
        Name: "SenderStoreID",
        Type: "text",
        Caption: "Kho gửi",
        DataSourceMember: "SenderStoreID",
        Width: 250
    },
    {
        Name: "IsCheckCustomerAddress",
        Type: "text",
        Caption: "Mã phường",
        DataSourceMember: "IsCheckCustomerAddress",
        Width: 250
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "CarrierTypeID",
        Width: 100,
        Link: "/Partner/Edit/",
        LinkText: "Chỉnh sửa"
    }
]

export const MLObjectDefinition = [

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

export const InputCoordinatorStoreWardColumnList = [

];

export const GridMLCoordinatorStoreWardDefinition = []

export const EditElementList = [

];