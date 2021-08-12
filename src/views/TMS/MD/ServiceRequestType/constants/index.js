import { ERPCOMMONCACHE_DELIVERYTYPE, ERPCOMMONCACHE_SALEORDERTYPE, ERPCOMMONCACHE_SHIPMENTORDERTYPE, ERPCOMMONCACHE_VOUCHERTYPE, ERPUSERCACHE_OUTPUTTYPE, ERPUSERCACHE_PAYABLETYPE } from "../../../../../constants/keyCache";

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ServiceRequestType/Search";
export const LoadAPIPath = "api/ServiceRequestType/Load";
export const AddAPIPath = "api/ServiceRequestType/Add";
export const UpdateAPIPath = "api/ServiceRequestType/Update";
export const DeleteAPIPath = "api/ServiceRequestType/Delete";
export const UpdateOrderAPIPath = "api/ServiceRequestType/UpdateOrder";
export const BackLink = "/ServiceRequestType";
export const AddLink = "/ServiceRequestType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ServiceRequestTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách loại yêu cầu dịch vụ" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServiceRequestType", Title: "Danh sách loại yêu cầu dịch vụ" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServiceRequestType", Title: "Danh sách loại yêu cầu dịch vụ" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServiceRequestType", Title: "Danh sách loại yêu cầu dịch vụ" },
    { Link: "", Title: "Chi tiết loại yêu cầu dịch vụ" }
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

export const AddElementList = [
    // {
    //     type: "text",
    //     name: "txtServiceRequestTypeID",
    //     label: "mã loại",
    //     value: "",
    //     maxSize: "5",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "ServiceRequestTypeID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "text",
        name: "txtServiceRequestTypeName",
        label: "tên loại yêu cầu dịch vụ",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ServiceRequestTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "txtSaleOrderTypeID",
        label: "loại yêu cầu xuất",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SaleOrderTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_SALEORDERTYPE,
        ValueMember: "SaleOrderTypeID",
        NameMember: "SaleOrderTypeName"
    },
    {
        type: "select",
        name: "txtOutputTypeID",
        label: "hình thức xuất",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "OutputTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPUSERCACHE_OUTPUTTYPE,
        ValueMember: "OutputTypeID",
        NameMember: "OutputTypeName"
    },
    {
        type: "select",
        name: "txtPayableTypeID",
        label: "hình thức thanh toán",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PayableTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPUSERCACHE_PAYABLETYPE,
        ValueMember: "PayableTypeID",
        NameMember: "PayableTypeName"
    },
    {
        type: "select",
        name: "txtDeliveryTypeID",
        label: "hình thức giao hàng",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "DeliveryTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_DELIVERYTYPE,
        ValueMember: "DeliveryTypeID",
        NameMember: "DeliveryTypeName"
    },
    {
        type: "select",
        name: "txtVoucherTypeID",
        label: "hình thức thu chi",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "VoucherTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_VOUCHERTYPE,
        ValueMember: "VoucherTypeID",
        NameMember: "VoucherTypeName"
    },
    {
        type: "select",
        name: "txtShipmentOrderTypeID",
        label: "loại yêu cầu vận chuyển",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ShipmentOrderTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_SHIPMENTORDERTYPE,
        ValueMember: "ShipmentOrderTypeID",
        NameMember: "ShipmentOrderTypeName"
    },
    {
        type: "singleFileUpload",
        name: "txtImageUrl",
        NameMember: "ImageUrl",
        label: "đường dẫn hình đại diện",
        value: "",
        placeholder: "",
        icon: "",
        cdn: "",
        listoption: {},
        DataSourceMember: "ImageUrl",
        readonly: false,
        validatonList: []
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "0",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: 1,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtServiceRequestTypeID",
        label: "mã loại yêu cầu dịch vụ",
        value: "",
        //maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ServiceRequestTypeID",
        readonly: true,
        validatonList: []
    },
    {
        type: "text",
        name: "txtServiceRequestTypeName",
        label: "tên loại yêu cầu dịch vụ",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ServiceRequestTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "txtSaleOrderTypeID",
        label: "loại yêu cầu xuất",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SaleOrderTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_SALEORDERTYPE,
        ValueMember: "SaleOrderTypeID",
        NameMember: "SaleOrderTypeName"
    },
    {
        type: "select",
        name: "txtOutputTypeID",
        label: "hình thức xuất",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "OutputTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPUSERCACHE_OUTPUTTYPE,
        ValueMember: "OutputTypeID",
        NameMember: "OutputTypeName"
    },
    {
        type: "select",
        name: "txtPayableTypeID",
        label: "hình thức thanh toán",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PayableTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPUSERCACHE_PAYABLETYPE,
        ValueMember: "PayableTypeID",
        NameMember: "PayableTypeName"
    },
    {
        type: "select",
        name: "txtDeliveryTypeID",
        label: "hình thức giao hàng",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "DeliveryTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_DELIVERYTYPE,
        ValueMember: "DeliveryTypeID",
        NameMember: "DeliveryTypeName"
    },
    {
        type: "select",
        name: "txtVoucherTypeID",
        label: "hình thức thu chi",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "VoucherTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_VOUCHERTYPE,
        ValueMember: "VoucherTypeID",
        NameMember: "VoucherTypeName"
    },
    {
        type: "select",
        name: "txtShipmentOrderTypeID",
        label: "loại yêu cầu vận chuyển",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ShipmentOrderTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_SHIPMENTORDERTYPE,
        ValueMember: "ShipmentOrderTypeID",
        NameMember: "ShipmentOrderTypeName"
    },
    {
        type: "singleFileUpload",
        name: "txtImageUrl",
        NameMember: "ImageUrl",
        label: "đường dẫn hình đại diện",
        value: "",
        placeholder: "",
        icon: "",
        cdn: "",
        listoption: {},
        DataSourceMember: "ImageUrl",
        readonly: false,
        validatonList: []
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: []
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
        Name: "ServiceRequestTypeID",
        DefaultValue: "",
        BindControlName: "txtServiceRequestTypeID",
        DataSourceMember: "ServiceRequestTypeID"
    },
    {
        Name: "ServiceRequestTypeName",
        DefaultValue: "",
        BindControlName: "txtServiceRequestTypeName",
        DataSourceMember: "ServiceRequestTypeName"
    },
    {
        Name: "SaleOrderTypeID",
        DefaultValue: "-1",
        BindControlName: "txtSaleOrderTypeID",
        DataSourceMember: "SaleOrderTypeID"
    },
    {
        Name: "OutputTypeID",
        DefaultValue: "",
        BindControlName: "txtOutputTypeID",
        DataSourceMember: "OutputTypeID"
    },
    {
        Name: "PayableTypeID",
        DefaultValue: "",
        BindControlName: "txtPayableTypeID",
        DataSourceMember: "PayableTypeID"
    },
    {
        Name: "DeliveryTypeID",
        DefaultValue: "",
        BindControlName: "txtDeliveryTypeID",
        DataSourceMember: "DeliveryTypeID"
    },
    {
        Name: "VoucherTypeID",
        DefaultValue: "",
        BindControlName: "txtVoucherTypeID",
        DataSourceMember: "VoucherTypeID"
    },
    {
        Name: "ShipmentOrderTypeID",
        DefaultValue: "",
        BindControlName: "txtShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID"
    },
    {
        Name: "ImageUrl",
        DefaultValue: "",
        BindControlName: "txtImageUrl",
        DataSourceMember: "ImageUrl"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "GetFeeType",
        DefaultValue: "",
        BindControlName: "GetFeeType",
        DataSourceMember: "GetFeeType"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "txtOrderIndex",
        DataSourceMember: "OrderIndex"
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
    {
        Name: "UpdatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "UpdatedUser"
    },
    {
        Name: "LoginLogID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: ""
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ServiceRequestTypeID",
        Width: 60
    },
    {
        Name: "ServiceRequestTypeID",
        Type: "text",
        Caption: "Mã loại yêu cầu dịch vụ",
        DataSourceMember: "ServiceRequestTypeID",
        Width: 150
    },
    {
        Name: "ServiceRequestTypeName",
        Type: "texttolink",
        Link: "/ServiceRequestType/Detail/",
        Caption: "Tên loại yêu cầu dịch vụ",
        DataSourceMember: "ServiceRequestTypeName",
        Width: 200
    },
    // {
    //     Name: "QualityAssessGroupName",
    //     Type: "text",
    //     Caption: "Nhóm tiêu chí",
    //     DataSourceMember: "QualityAssessGroupName",
    //     Width: 200
    // },
    
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     //Width: 200
    // },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "UpdatedDate",
        Type: "date",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
        Width: 140
    },
    {
        Name: "UpdatedUserFullName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserFullName",
        Width: 140
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ServiceRequestTypeID",
        Width: 100,
        Link: "/ServiceRequestType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
