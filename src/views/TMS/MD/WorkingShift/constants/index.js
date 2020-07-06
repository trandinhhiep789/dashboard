export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/CoordinatorStore/Search";
export const LoadAPIPath = "api/CoordinatorStore/Load";
export const LoadNewAPIPath = "api/CoordinatorStore/LoadNew";
export const AddAPIPath = "api/CoordinatorStore/Add";
export const AddNewAPIPath = "api/CoordinatorStore/AddNew";
export const UpdateAPIPath = "api/CoordinatorStore/Update";
export const UpdateNewAPIPath = "api/CoordinatorStore/UpdateNew";
export const DeleteAPIPath = "api/CoordinatorStore/Delete";
export const DeleteNewAPIPath = "api/CoordinatorStore/DeleteNew";
export const UpdateOrderAPIPath = "api/CoordinatorStore/UpdateOrder";
export const BackLink = "/CoordinatorStore";
export const AddLink = "/CoordinatorStore/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "CoordinatorStoreID";
export const PKColumnNameWard = "WardID";


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
        Name: "WardName",
        Type: "text",
        Caption: "Phường/xã",
        DataSourceMember: "WardName",
        Width: 350
    },
    

    {
        Name: "chkIsSystem",
        Type: "checkbox",
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Width: 70
    },
  
    {

        Name: "Action",
        Type: "groupAction",
        Caption: "Tác vụ",
        DataSourceMember: "WardID",
        Width: 50,
        Link: "/ServiceAgreement/FeeAppendix/Edit/",
        LinkText: "Chỉnh sửa"
    }
]

export const MLObjectDefinition = [
    {
        Name: "ShipmentOrderTypeID",
        DefaultValue: {},
        BindControlName: "cbShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID"
    },
    {
        Name: "PartnerID",
        DefaultValue: {},
        BindControlName: "cbPartnerID",
        DataSourceMember: "PartnerID"
    },
    {
        Name: "StoreID",
        DefaultValue: {},
        BindControlName: "cbStoreID",
        DataSourceMember: "StoreID"
    },
    {
        Name: "SenderStoreID",
        DefaultValue: {},
        BindControlName: "cbSenderStoreID",
        DataSourceMember: "SenderStoreID"
    },
    {
        Name: "IsCheckCustomerAddress",
        DefaultValue: {},
        BindControlName: "chkIsCheckCustomerAddress",
        DataSourceMember: "IsCheckCustomerAddress"
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
        Name: "CoordinatorStoreWard_ItemList",
        DefaultValue: {},
        BindControlName: "CoordinatorStoreWard_ItemList",
        DataSourceMember: "CoordinatorStoreWard_ItemList"
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

export const InputCoordinatorStoreWardColumnList = [

];

export const GridMLCoordinatorStoreWardDefinition = []

export const EditElementList = [

];

export const DataGridCoordinatorStoreColumnList=[
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "CoordinatorStoreID",
        Width: 60
    },
    {
        Name: "ShipmentOrderTypeName",
        Type: "text",
        Caption: "Loại yêu cầu xuất",
        DataSourceMember: "ShipmentOrderTypeName",
        Width: 250
    },
    {
        Name: "PartnerName",
        Type: "text",
        Caption: "Đối tác",
        DataSourceMember: "PartnerName",
        Width: 250
    },
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "StoreName",
        Width: 250
    },
    {
        Name: "SenderStoreName",
        Type: "text",
        Caption: "Kho gửi",
        DataSourceMember: "SenderStoreName",
        Width: 250
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "CoordinatorStoreID",
        Width: 100,
        Link: "/CoordinatorStore/Edit/",
        LinkText: "Chỉnh sửa"
    },
]