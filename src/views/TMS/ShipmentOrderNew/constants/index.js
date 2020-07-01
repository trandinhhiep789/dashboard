export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ShipmentOrder/Search";
export const LoadAPIPath = "api/ShipmentOrder/LoadInfoNew";
export const AddAPIPath = "api/ShipmentOrder/Add";
export const UpdateAPIPath = "api/ShipmentOrder/UpdateWeb";
export const DeleteAPIPath = "api/ShipmentOrder/Delete";
export const UpdateOrderAPIPath = "api/ShipmentOrder/UpdateOrder";
export const BackLink = "/ShipmentOrderNew";
export const AddLink = "/ShipmentOrder/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ShipmentOrderID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách yêu cầu vận chuyển" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentOrderNew", Title: "Danh sách yêu cầu vận chuyển" },
    { Link: "", Title: "Sửa" }
];
export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentOrderNew", Title: "Danh sách yêu cầu vận chuyển" },
    { Link: "", Title: "Chi tiết" }
];


export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentOrderNew", Title: "Danh sách yêu cầu vận chuyển" },
    { Link: "", Title: "Thêm" }
];

const dtFromdate = new Date()
dtFromdate.setDate(new Date().getDate() - 30);

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        DataSourceMember: "Keyword",
        label: "Từ khóa",
        value: "",
        colspan: 2,
        placeholder: "Từ khóa",
        icon: ""
    },
    {
        type: "ComboBox",
        name: "cbRequestPartnerID",
        DataSourceMember: "RequestPartnerID",
        label: "Công ty",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName"

    },
    {
        type: "Datetime",
        name: "dtCreatedOrderTimeFo",
        DataSourceMember: "CreatedOrderTimeFo",
        label: "Từ ngày",
        value: dtFromdate,
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtCreatedOrderTimeTo",
        DataSourceMember: "CreatedOrderTimeTo",
        label: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "ComboBox",
        name: "cbReceiverProvinceID",
        DataSourceMember: "ReceiverProvinceID",
        label: "Tỉnh /thành phố",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PROVINCE",
        ValueMember: "ProvinceID",
        NameMember: "ProvinceName",
        filterrest:"cbReceiverDistrictID,cbSenderStoreID"
    },
    {
        type: "ComboBox",
        name: "cbReceiverDistrictID",
        DataSourceMember: "ReceiverDistrictID",
        label: "Quận/huyện",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        filterName: "cbReceiverProvinceID",
        filterValue: "",
        filterobj:"ProvinceID",
        LoadItemCacheKeyID: "ERPCOMMONCACHE.DISTRICT",
        ValueMember: "DistrictID",
        NameMember: "DistrictName",
        filterrest:"cbSenderStoreID"
    },
    {
        type: "ComboBox",
        name: "cbSenderStoreID",
        DataSourceMember: "SenderStoreID",
        label: "Kho giao",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        filterName: "cbReceiverDistrictID",
        filterValue: "",
        filterobj:"DistrictID"

    },
    {
        type: "ComboBox",
        name: "cbShipmentOrderStatusID",
        DataSourceMember: "ShipmentOrderStatusID",
        label: "Trạng thái",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERSTATUS",
        ValueMember: "ShipmentOrderStatusID",
        NameMember: "ShipmentOrderStatusName",
    }
];
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@REQUESTPARTNERID",
        SearchValue: "-1"
    },
    {
        SearchKey: "@FromDate",
        SearchValue: dtFromdate
    },
    {
        SearchKey: "@ToDate",
        SearchValue: new Date()
    }
    ,
    {
        SearchKey: "@RECEIVERPROVINCEID",
        SearchValue: -1
    },
    {
        SearchKey: "@RECEIVERDISTRICTID",
        SearchValue: -1
    },
    {
        SearchKey: "@SENDERSTOREID",
        SearchValue: -1
    },
    {
        SearchKey: "@SHIPMENTORDERSTATUSID",
        SearchValue: -1
    },
    {
        SearchKey: "@PAGESIZE",
        SearchValue: 10
    },
    {
        SearchKey: "@PAGEINDEX",
        SearchValue: 0
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "RequestPartnerID",
        DefaultValue: "",
        BindControlName: "cbRequestPartnerID"
    },
    {
        Name: "CreatedOrderTimeFo",
        DefaultValue: "",
        BindControlName: "dtCreatedOrderTimeFo"
    },
    {
        Name: "CreatedOrderTimeTo",
        DefaultValue: "",
        BindControlName: "dtCreatedOrderTimeTo"
    },
    {
        Name: "ReceiverProvinceID",
        DefaultValue: "",
        BindControlName: "cbReceiverProvinceID"
    },
    {
        Name: "ReceiverDistrictID",
        DefaultValue: "",
        BindControlName: "cbReceiverDistrictID"
    },
    {
        Name: "SenderStoreID",
        DefaultValue: "",
        BindControlName: "cbSenderStoreID"
    },
    {
        Name: "ShipmentOrderStatusID",
        DefaultValue: "",
        BindControlName: "cbShipmentOrderStatusID"
    }
];

export const AddElementList = [
    {
        type: "numeric",
        name: "txtShipmentOrderID",
        label: "Mã bước xử lý yêu cầu vận chuyển",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShipmentOrderName",
        label: "Tên bước xử lý yêu cầu vận chuyển",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderName",
        readonly: false,
        validatonList: ["required"],
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
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: []
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
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "numeric",
        name: "txtShipmentOrderID",
        label: "Mã bước xử lý yêu cầu vận chuyển",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShipmentOrderName",
        label: "Tên bước xử lý yêu cầu vận chuyển",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderName",
        readonly: false,
        validatonList: ["required"],
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
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: []
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


export const MLObjectDefinition = [
    {
        Name: "ShipmentOrderID",
        DefaultValue: "",
        BindControlName: "txtShipmentOrderID",
        DataSourceMember: "ShipmentOrderID"
    },
    {
        Name: "ShipmentOrderTypeID",
        DefaultValue: "",
        BindControlName: "txtShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID"
    },
    {
        Name: "RequestPartnerID",
        DefaultValue: "",
        BindControlName: "txtRequestPartnerID",
        DataSourceMember: "RequestPartnerID"
    },
    {
        Name: "CarrierPartnerID",
        DefaultValue: "",
        BindControlName: "txtCarrierPartnerID",
        DataSourceMember: "CarrierPartnerID"
    },
    {
        Name: "CarrierTypeID",
        DefaultValue: "",
        BindControlName: "txtCarrierTypeID",
        DataSourceMember: "CarrierTypeID"
    },
    
    {
        Name: "ShipmentServiceTypeID",
        DefaultValue: "",
        BindControlName: "txtShipmentServiceTypeID",
        DataSourceMember: "ShipmentServiceTypeID"
    },
    
    {
        Name: "ShipmentGoodsTypeID",
        DefaultValue: "",
        BindControlName: "txtShipmentGoodsTypeID",
        DataSourceMember: "ShipmentGoodsTypeID"
    },
    {
        Name: "CreatedOrderTime",
        DefaultValue: "",
        BindControlName: "dtCreatedOrderTime",
        DataSourceMember: "CreatedOrderTime"
    },
    {
        Name: "ExpectedDeliveryDate",
        DefaultValue: "",
        BindControlName: "dtExpectedDeliveryDate",
        DataSourceMember: "ExpectedDeliveryDate"
    },
    {
        Name: "EarliestPickUpTime",
        DefaultValue: "",
        BindControlName: "dtEarliestPickUpTime",
        DataSourceMember: "EarliestPickUpTime"
    },
    {
        Name: "LatestPickUpTime",
        DefaultValue: "",
        BindControlName: "dtLatestPickUpTime",
        DataSourceMember: "LatestPickUpTime"
    },
    {
        Name: "EarliestDeliveryTime",
        DefaultValue: "",
        BindControlName: "dtEarliestDeliveryTime",
        DataSourceMember: "EarliestDeliveryTime"
    },
    {
        Name: "LatestDeliveryTime",
        DefaultValue: "",
        BindControlName: "dtLatestDeliveryTime",
        DataSourceMember: "LatestDeliveryTime"
    },
    {
        Name: "SenderPartnerID",
        DefaultValue: "",
        BindControlName: "cbSenderPartnerID",
        DataSourceMember: "SenderPartnerID"
    },
    {
        Name: "SenderStoreID",
        DefaultValue: "",
        BindControlName: "cbSenderStoreID",
        DataSourceMember: "SenderStoreID"
    },
    {
        Name: "SenderFullName",
        DefaultValue: "",
        BindControlName: "txtSenderFullName",
        DataSourceMember: "SenderFullName"
    },
    {
        Name: "SenderPhoneNumber",
        DefaultValue: "",
        BindControlName: "txtSenderPhoneNumber",
        DataSourceMember: "SenderPhoneNumber"
    },
    {
        Name: "SenderEmail",
        DefaultValue: "",
        BindControlName: "txtSenderEmail",
        DataSourceMember: "SenderEmail"
    },
    {
        Name: "ReceiverStoreID",
        DefaultValue: "",
        BindControlName: "cbReceiverStoreID",
        DataSourceMember: "ReceiverStoreID"
    },
    {
        Name: "ReceiverPartnerID",
        DefaultValue: "",
        BindControlName: "cbReceiverPartnerID",
        DataSourceMember: "ReceiverPartnerID"
    },
    {
        Name: "ReceiverFullName",
        DefaultValue: "",
        BindControlName: "txtReceiverFullName",
        DataSourceMember: "ReceiverFullName"
    },
    {
        Name: "ReceiverPhoneNumber",
        DefaultValue: "",
        BindControlName: "txtReceiverPhoneNumber",
        DataSourceMember: "ReceiverPhoneNumber"
    },
    {
        Name: "ReceiverEmail",
        DefaultValue: "",
        BindControlName: "txtReceiverEmail",
        DataSourceMember: "ReceiverEmail"
    },
    {
        Name: "ShipmentGoodsTypeID",
        DefaultValue: "",
        BindControlName: "cbShipmentGoodsTypeID",
        DataSourceMember: "ShipmentGoodsTypeID"
    },
    {
        Name: "NumberOfPackages",
        DefaultValue: "",
        BindControlName: "txtNumberOfPackages",
        DataSourceMember: "NumberOfPackages"
    },
    {
        Name: "SecondaryItemCount",
        DefaultValue: "",
        BindControlName: "txtSecondaryItemCount",
        DataSourceMember: "SecondaryItemCount"
    },
    {
        Name: "Weight",
        DefaultValue: "",
        BindControlName: "txtWeight",
        DataSourceMember: "Weight"
    },
    {
        Name: "Length",
        DefaultValue: "",
        BindControlName: "txtLength",
        DataSourceMember: "Length"
    },
    {
        Name: "Width",
        DefaultValue: "",
        BindControlName: "txtWidth",
        DataSourceMember: "Width"
    },
    {
        Name: "Height",
        DefaultValue: "",
        BindControlName: "txtHeight",
        DataSourceMember: "Height"
    },
    {
        Name: "ShipmentFeePaymentMethodID",
        DefaultValue: "",
        BindControlName: "cbShipmentFeePaymentMethodID",
        DataSourceMember: "ShipmentFeePaymentMethodID"
    },
    {
        Name: "TotalShipmentFee",
        DefaultValue: "",
        BindControlName: "txtTotalShipmentFee",
        DataSourceMember: "TotalShipmentFee"
    },
    {
        Name: "TotalCOD",
        DefaultValue: "",
        BindControlName: "txtTotalCOD",
        DataSourceMember: "TotalCOD"
    },
    {
        Name: "OrderNote",
        DefaultValue: "",
        BindControlName: "txtOrderNote",
        DataSourceMember: "OrderNote"
    },
    {
        Name: "CoordinatorNote",
        DefaultValue: "",
        BindControlName: "txtCoordinatorNote",
        DataSourceMember: "CoordinatorNote"
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
    },
    {
        Name: "objSenderQHPX",
        DefaultValue: {},
        BindControlName: "objSenderQHPX",
        DataSourceMember: "objSenderQHPX"
    },
    {
        Name: "objQHPX",
        DefaultValue: {},
        BindControlName: "objQHPX",
        DataSourceMember: "objQHPX"
    },
    {
        Name: "ShipmentOrder_MaterialList",
        DefaultValue: {},
        BindControlName: "ShipmentOrder_MaterialList",
        DataSourceMember: "ShipmentOrder_MaterialList"
    },
    {
        Name: "ShipmentOrder_ItemList",
        DefaultValue: {},
        BindControlName: "ShipmentOrder_ItemList",
        DataSourceMember: "ShipmentOrder_ItemList"
    },
    {
        Name: "ShipmentOrder_DeliverUserList",
        DefaultValue: {},
        BindControlName: "ShipmentOrder_DeliverUserList",
        DataSourceMember: "ShipmentOrder_DeliverUserList"
    }
                             

];

export const DataGridColumnList = [
    {
        Name: "ShipmentOrderID",
        Type: "texttolink",
        Caption: "Mã yêu cầu",
        DataSourceMember: "ShipmentOrderID",
        Link: "/ShipmentOrderNew/Detail/",
        Width: 140
    },
    {
        Name: "CreatedOrderTime",
        Type: "date",
        Caption: "Ngày yêu cầu",
        DataSourceMember: "CreatedOrderTime",
        Width: 130
    },
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho gửi",
        DataSourceMember: "StoreName",
        Width: 250
    },
    {
        Name: "ReceiverFullName",
        Type: "text",
        Caption: "Người nhận",
        DataSourceMember: "ReceiverFullName",
        Width: 100
    },
    {
        Name: "ReceiverFullAddress",
        Type: "text",
        Caption: "Địa chỉ nhận",
        DataSourceMember: "ReceiverFullAddress",
        Width: 250
    },
    {
        Name: "ShipmentGoodsDescription",
        Type: "text",
        Caption: "Loại hàng hóa vận chuyển",
        DataSourceMember: "ShipmentGoodsDescription",
        Width: 150
    },
    {
        Name: "NumberOfPackages",
        Type: "text",
        Caption: "Số kiện",
        DataSourceMember: "NumberOfPackages",
        Width: 70
    },
    {
        Name: "ShipmentOrderStatusName",
        Type: "text",
        Caption: "Trạng thái",
        DataSourceMember: "ShipmentOrderStatusName",
        Width: 150
    }
];


export const DataGridColumnItemList = [
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 250,
        hideInput: false
    },
    {
        Name: "IsInstallItem",
        Type: "checkbox",
        Caption: "Cần lắp đặt",
        DataSourceMember: "IsInstallItem",
        Width: 80
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "ProductName",
        Width: 250
    },
    {
        Name: "PackingUnitName",
        Type: "text",
        Caption: "Kiện",
        DataSourceMember: "PackingUnitName",
        Width: 100
    },
    {
        Name: "Price",
        Type: "text",
        Caption: "Giá",
        DataSourceMember: "Price",
        Width: 250
    },
    {
        Name: "Quantity",
        Type: "text",
        Caption: "Số lượng",
        DataSourceMember: "Quantity",
        Width: 150
    },
    {
        Name: "QuantityUnitName",
        Type: "text",
        Caption: "Đơn vị tính",
        DataSourceMember: "QuantityUnitName",
        Width: 70
    },
    {
        Name: "SizeItem",
        Type: "text",
        Caption: "Kích thước",
        DataSourceMember: "SizeItem",
        Width: 150
    },
    {
        Name: "Weight",
        Type: "text",
        Caption: "Khối lượng",
        DataSourceMember: "Weight",
        Width: 150
    },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "ArticleID",
        Width: 70,
        iputpop: false
    }
];


export const GridMLObjectItem = [
    {
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "ProductName",
        DataSourceMember: "ProductName"
    },
    {
        Name: "ReceiverDistrictID",
        DefaultValue: "",
        BindControlName: "cbDistrictID",
        DataSourceMember: "ReceiverDistrictID"
    },
    {
        Name: "ReceiverWardID",
        DefaultValue: "",
        BindControlName: "cbWardID",
        DataSourceMember: "ReceiverWardID"
    },
    {
        Name: "SenderAddress",
        DefaultValue: "",
        BindControlName: "txtSenderAddress",
        DataSourceMember: "SenderAddress"
    }
]
//cobombox
export const ElementSenderQHPXList = [

    {
        type: "ComboBox",
        name: "cbProvinceID",
        DataSourceMember: "SenderProvinceID",
        label: "Tỉnh /thành phố",
        colspan: 8,
        labelcolspan: 4,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PROVINCE",
        ValueMember: "ProvinceID",
        NameMember: "ProvinceName",
        nameOption: "CountryID",
        nameValue: 2
    },
    {
        type: "ComboBox",
        name: "cbDistrictID",
        DataSourceMember: "SenderDistrictID",
        label: "Quận/huyện",
        colspan: 8,
        labelcolspan: 4,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        filterValue: "",
        LoadItemCacheKeyID: "ERPCOMMONCACHE.DISTRICT",
        ValueMember: "DistrictID",
        NameMember: "DistrictName",
        nameOption1: "cbProvinceID",
        nameOption: "ProvinceID",
        nameValue: -1
    },
    {
        type: "ComboBox",
        name: "cbWardID",
        DataSourceMember: "SenderWardID",
        label: "Phường/Xã",
        colspan: 8,
        labelcolspan: 4,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        filterValue: "",
        LoadItemCacheKeyID: "ERPCOMMONCACHE.DISTRICT",
        ValueMember: "WardID",
        NameMember: "WardName",
        nameOption1: "cbDistrictID",
        nameOption: "DistrictID",
        nameValue: -1
    },
    {
        type: "text",
        name: "txtAddress",
        colspan: "8",
        labelcolspan: "4",
        readOnly: false,
        label: "số nhà/đường",
        placeholder: "số nhà/đường",
        value: "",
        DataSourceMember: "SenderAddress",

    },
    {
        type: "textfull",
        name: "txtFullAddress",
        colspan: "10",
        labelcolspan: "2",
        readOnly: false,
        label: "địa chỉ",
        placeholder: "Địa chỉ",
        value: "",
        DataSourceMember: "SenderFullAddress",
        classNameCustom: "customcontrol"
    }
];

export const GridMLSenderQTQHPX = [
    {
        Name: "SenderProvinceID",
        DefaultValue: "",
        BindControlName: "cbProvinceID",
        DataSourceMember: "SenderProvinceID"
    },
    {
        Name: "SenderDistrictID",
        DefaultValue: "",
        BindControlName: "cbDistrictID",
        DataSourceMember: "SenderDistrictID"
    },
    {
        Name: "SenderWardID",
        DefaultValue: "",
        BindControlName: "cbWardID",
        DataSourceMember: "SenderWardID"
    },
    {
        Name: "SenderAddress",
        DefaultValue: "",
        BindControlName: "txtAddress",
        DataSourceMember: "SenderAddress"
    }
    ,
    {
        Name: "SenderFullAddress",
        DefaultValue: "",
        BindControlName: "txtFullAddress",
        DataSourceMember: "SenderFullAddress"
    }
]


export const ElementQHPXList = [

    {
        type: "ComboBox",
        name: "cbProvinceID",
        DataSourceMember: "ReceiverProvinceID",
        label: "Tỉnh /thành phố",
        colspan: 8,
        labelcolspan: 4,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PROVINCE",
        ValueMember: "ProvinceID",
        NameMember: "ProvinceName",
        nameOption: "CountryID",
        nameValue: 2
    },
    {
        type: "ComboBox",
        name: "cbDistrictID",
        DataSourceMember: "ReceiverDistrictID",
        label: "Quận/huyện",
        colspan: 8,
        labelcolspan: 4,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        filterValue: "",
        LoadItemCacheKeyID: "ERPCOMMONCACHE.DISTRICT",
        ValueMember: "DistrictID",
        NameMember: "DistrictName",
        nameOption1: "cbProvinceID",
        nameOption: "ProvinceID",
        nameValue: -1
    },
    {
        type: "ComboBox",
        name: "cbWardID",
        DataSourceMember: "ReceiverWardID",
        label: "Phường/Xã",
        colspan: 8,
        labelcolspan: 4,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        filterValue: "",
        LoadItemCacheKeyID: "ERPCOMMONCACHE.DISTRICT",
        ValueMember: "WardID",
        NameMember: "WardName",
        nameOption1: "cbDistrictID",
        nameOption: "DistrictID",
        nameValue: -1
    },
    {
        type: "text",
        name: "txtAddress",
        colspan: "8",
        labelcolspan: "4",
        readOnly: false,
        label: "số nhà/đường",
        placeholder: "số nhà/đường",
        value: "",
        DataSourceMember: "ReceiverAddress",

    },
    {
        type: "textfull",
        name: "txtFullAddress",
        colspan: "10",
        labelcolspan: "2",
        readOnly: false,
        label: "địa chỉ",
        placeholder: "Địa chỉ",
        value: "",
        DataSourceMember:"ReceiverFullAddress",
        classNameCustom: "customcontrol"
    }
];

export const GridMLObjectQTQHPX = [
    {
        Name: "ReceiverProvinceID",
        DefaultValue: "",
        BindControlName: "cbProvinceID",
        DataSourceMember: "ReceiverProvinceID"
    },
    {
        Name: "ReceiverDistrictID",
        DefaultValue: "",
        BindControlName: "cbDistrictID",
        DataSourceMember: "ReceiverDistrictID"
    },
    {
        Name: "ReceiverWardID",
        DefaultValue: "",
        BindControlName: "cbWardID",
        DataSourceMember: "ReceiverWardID"
    },
    {
        Name: "ReceiverFullAddress",
        DefaultValue: "",
        BindControlName: "txtFullAddress",
        DataSourceMember: "ReceiverFullAddress"
    }
    ,
    {
        Name: "ReceiverAddress",
        DefaultValue: "",
        BindControlName: "txtAddress",
        DataSourceMember: "ReceiverAddress"
    }
]

/// ShipmentOrder_Item
export const MLObjectShipmentOrderItem = [
    {
        Name: "ShipmentOrderItemID",
        DefaultValue: "",
        BindControlName: "txtShipmentOrderItemID",
        DataSourceMember: "txtShipmentOrderItemID"
    },
    {
        Name: "ShipmentOrderPackingUnitID",
        DefaultValue: "",
        BindControlName: "cbShipmentOrderPackingUnitID",
        DataSourceMember: "ShipmentOrderPackingUnitID"
    },
    {
        Name: "PackingUnitName",
        DefaultValue: "",
        BindControlName: "PackingUnitName",
        DataSourceMember: "PackingUnitName"
    },
    {
        Name: "QuantityUnitName",
        DefaultValue: "",
        BindControlName: "QuantityUnitName",
        DataSourceMember: "QuantityUnitName"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "txtProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "txtProductName",
        DataSourceMember: "ProductName"
    },
    {
        Name: "Price",
        DefaultValue: "",
        BindControlName: "txtPrice",
        DataSourceMember: "Price"
    },
    {
        Name: "Quantity",
        DefaultValue: "",
        BindControlName: "txtQuantity",
        DataSourceMember: "Quantity"
    },
    {
        Name: "QuantityUnitID",
        DefaultValue: "",
        BindControlName: "cbQuantityUnitID",
        DataSourceMember: "QuantityUnitID"
    },
    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "txtNote",
        DataSourceMember: "Note"
    },
    {
        Name: "IsInstallItem",
        DefaultValue: "",
        BindControlName: "ckIsInstallItem",
        DataSourceMember: "IsInstallItem"
    },
    {
        Name: "Length",
        DefaultValue: "",
        BindControlName: "txtLength",
        DataSourceMember: "Length"
    },
    {
        Name: "Width",
        DefaultValue: "",
        BindControlName: "txtWidth",
        DataSourceMember: "Width"
    },
    {
        Name: "Height",
        DefaultValue: "",
        BindControlName: "txtHeight",
        DataSourceMember: "Height"
    }

]

export const DataGridColumnMaterialList = [

    {
        name: "IsSaleMaterial",
        Type: "checkbox",
        Caption: "Xuất bán",
        label: "xuất bán",
        datasourcemember: "IsSaleMaterial",
        Width: 80,
        OrderIndex: 4
    },
    {
        name: "ProductID",
        Type: "ProductCombo",
        Caption: "Mã sản phẩm",
        label: "mã sản phẩm",
        datasourcemember: "ProductID",
        namelabel: "ProductName",
        OrderIndex: 1,
        Width: 150,
        Colmd: 12,
        labelcolspan:2,
        colspan:10,
    },
    {
        name: "ProductName",
        Type: "textbox",
        Caption: "Tên sản phẩm",
        label: "tên sản phẩm",
        datasourcemember: "ProductName",
        Width: 300,
        validatonList: ["required"],
        OrderIndex: 2,
        Colmd: 12,
        labelcolspan:2,
        colspan:10,
    },
    {
        name: "Quantity",
        Type: "TextNumber",
        Caption: "Số lượng",
        label: "số lượng",
        datasourcemember: "Quantity",
        Width: 100,
        min:1,
        max:9999,
        OrderIndex: 3
    },
    {
        name: "QuantityUnitID",
        Type: "ComboBox",
        Caption: "Đơn vị tính",
        label: "Đơn vị tính",
        datasourcemember: "QuantityUnitID",
        validatonList:["Comborequired"],
        isautoloaditemfromcache:true,
        loaditemcachekeyid:"ERPCOMMONCACHE.QUANTITYUNIT",
        valuemember:"QuantityUnitID",
        nameMember:"QuantityUnit",
        namelabel:"QuantityUnitName",
        OrderIndex: 4,
        hideInput: false
    },
    {
        name: "QuantityUnitName",
        Type: "text",
        Caption: "Đơn vị tính",
        label: "đơn vị tính",
        datasourcemember: "QuantityUnitName",
        Width: 100,
        OrderIndex: 4
    },
    {
        name: "Price",
        Type: "textbox",
        Caption: "Giá",
        label: "giá",
        datasourcemember: "Price",
        Width: 150,
        OrderIndex: 5
    },
    {
        name: "Note",
        Type: "TextArea",
        label: "ghi chú",
        Caption: "Ghi chú",
        datasourcemember: "Note",
        Width: 150,
        hideInput: false,
        OrderIndex: 6,
        Colmd: 12,
        labelcolspan:2,
        colspan:10
    },
    {
        name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        label: "tác vụ",
        datasourcemember: "",
        Width: 70,
        iputpop: false,
        OrderIndex: 7
    }
];
export const GridMLMaterialDefinition = [
    {
        Name: "ShipmentOrderItemID",
        DefaultValue: "",
        BindControlName: "ShipmentOrderItemID",
        DataSourceMember: "ShipmentOrderItemID"
    },
    {
        Name: "ShipmentOrderMaterialID",
        DefaultValue: "",
        BindControlName: "ShipmentOrderMaterialID",
        DataSourceMember: "ShipmentOrderMaterialID"
    },
    {
        Name: "CreatedOrderTime",
        DefaultValue: "",
        BindControlName: "CreatedOrderTime",
        DataSourceMember: "CreatedOrderTime"
    },
    {
        Name: "QuantityUnitName",
        DefaultValue: "",
        BindControlName: "QuantityUnitName",
        DataSourceMember: "QuantityUnitName"
    },
    {
        Name: "IsSaleMaterial",
        DefaultValue: false,
        BindControlName: "IsSaleMaterial",
        DataSourceMember: "IsSaleMaterial"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "ProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "ProductName",
        DataSourceMember: "ProductName"
    },
    {
        Name: "Price",
        DefaultValue: "",
        BindControlName: "Price",
        DataSourceMember: "Price"
    },
    {
        Name: "Quantity",
        DefaultValue: "",
        BindControlName: "Quantity",
        DataSourceMember: "Quantity"
    },
    {
        Name: "QuantityUnitID",
        DefaultValue: "",
        BindControlName: "QuantityUnitID",
        DataSourceMember: "QuantityUnitID"
    },
    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "Note",
        DataSourceMember: "Note"
    }
]


