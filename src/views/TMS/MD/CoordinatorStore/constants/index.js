export const APIHostName = "TMSAPI";
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
        SearchKey: "@ShipmentOrderTypeID",
        SearchValue: ""
    },
    {
        SearchKey: "@StoreID",
        SearchValue: ""
    }
];

export const SearchElementList = [

    {
        type: "ComboBoxNewChange",
        name: "cbShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID",
        label: "loại yêu cầu vận chuyển",
        colspan: 3,
        value: "",
        isMultiSelect: false,
        placeholder: "---Loại yêu cầu vận chuyển---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
        ValueMember: "ShipmentOrderTypeID",
        NameMember: "ShipmentOrderTypeName",
        classNameCol: "col-custom",
        validatonList: ["Comborequired"]
    },

    {
        type: "ComboBoxNewChange",
        name: "cbStoreID",
        DataSourceMember: "StoreID",
        label: "Kho",
        colspan: 3,
        value: "",
        isMultiSelect: false,
        placeholder: "---Kho---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORETMS",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        // filterValue: 1,
        // filterobj:"CompanyID",
        classNameCol: "col-custom"
    },

];

export const SearchMLObjectDefinition = [
    {
        Name: "ShipmentOrderTypeID",
        DefaultValue: -1,
        BindControlName: "cbShipmentOrderTypeID"
    },
    {
        Name: "StoreID",
        DefaultValue: -1,
        BindControlName: "cbStoreID"
    },
];

export const DataGridColumnList = [

    {
        Name: "ProvinceName",
        Type: "text",
        Caption: "Tỉnh/thành phố",
        DataSourceMember: "ProvinceName",
        Width: 200
    },

    {
        Name: "DistrictName",
        Type: "text",
        Caption: "Quận/huyện",
        DataSourceMember: "DistrictName",
        Width: 200
    },

    {
        Name: "WardName",
        Type: "text",
        Caption: "Phường/xã",
        DataSourceMember: "WardName",
        Width: 200
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
        Name: "DistrictID",
        DefaultValue: {},
        BindControlName: "cbDistrictID",
        DataSourceMember: "DistrictID"
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
        OrderIndex: 1
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
        OrderIndex: 2
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
        OrderIndex: 3
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
        OrderIndex: 4
    },
    {
        type: "checkbox",
        name: "chkIsCheckCustomerAddress",
        datasourcemember: "IsCheckCustomerAddress",
        label: "kiểm tra địa chỉ khách hàng",
        value: false,
        readonly: false,
        OrderIndex: 5
    }

];

export const InputCoordinatorStoreWardColumnList = [

];

export const GridMLCoordinatorStoreWardDefinition = []

export const EditElementList = [

];

export const DataGridCoordinatorStoreColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "CoordinatorStoreID",
        Width: 60
    },
    {
        Name: "ShipmentOrderTypeLable",
        Type: "text",
        Caption: "Loại yêu cầu xuất",
        DataSourceMember: "ShipmentOrderTypeLable",
        Width: 250
    },
    {
        Name: "PartnerLable",
        Type: "text",
        Caption: "Đối tác",
        DataSourceMember: "PartnerLable",
        Width: 250
    },
    {
        Name: "StoreNameLable",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "StoreNameLable",
        Width: 250
    },
    {
        Name: "SenderStoreNameLable",
        Type: "text",
        Caption: "Kho gửi",
        DataSourceMember: "SenderStoreNameLable",
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


export const schema = {
    'ProvinceID': {
        prop: 'ProvinceID',
        type: String
    },
    'ProvinceName': {
        prop: 'ProvinceName',
        type: String
    },
    'DistrictID': {
        prop: 'DistrictID',
        type: String
    },
    'DistrictName': {
        prop: 'DistrictName',
        type: String
    },
    'WardName': {
        prop: 'WardName',
        type: String
    },
    'WardID': {
        prop: 'WardID',
        type: String
    },
    'IsSystem': {
        prop: 'IsSystem',
        type: Number
    },
}