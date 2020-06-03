export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ShipmentOrder/Search";
export const LoadAPIPath = "api/ShipmentOrder/LoadInfoNew";
export const AddAPIPath = "api/ShipmentOrder/Add";
export const UpdateAPIPath = "api/ShipmentOrder/Update";
export const DeleteAPIPath = "api/ShipmentOrder/Delete";
export const UpdateOrderAPIPath = "api/ShipmentOrder/UpdateOrder";
export const BackLink = "/ShipmentOrder";
export const AddLink = "/ShipmentOrder/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ShipmentOrderID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "", Title: "Danh sách yêu cầu vận chuyển" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ShipmentOrder", Title: "Danh sách yêu cầu vận chuyển" },
    { Link: "", Title: "Sửa" }
];
export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ShipmentOrder", Title: "Danh sách yêu cầu vận chuyển" },
    { Link: "", Title: "Chi tiết" }
];


export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ShipmentOrder", Title: "Danh sách yêu cầu vận chuyển" },
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
        NameMember: "ProvinceName"
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
        LoadItemCacheKeyID: "ERPCOMMONCACHE.DISTRICT",
        ValueMember: "DistrictID",
        NameMember: "DistrictName"
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
        listoption: [
            { value: -1, label: '---Vui lòng chọn---' },
            { value: 1, label: 'Việt Nam' },
            { value: 2, label: 'Hoa kỳ' },
            { value: 3, label: 'Trung Quốc' }],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName"

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
        listoption: [
            { value: -1, label: '---Vui lòng chọn---' },
            { value: 1, label: 'Khởi tạo' },
            { value: 2, label: 'Giao hàng' },
            { value: 3, label: 'Hoàn thành' }
        ]
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
    }
];

export const DataGridColumnList = [
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "ShipmentOrderID",
        Width: 70,
        Link: "/ShipmentOrder/Edit/",
        LinkText: "Chỉnh sửa"
    },
    {
        Name: "ShipmentOrderID",
        Type: "texttolink",
        Caption: "Mã yêu cầu",
        DataSourceMember: "ShipmentOrderID",
        Link: "/ShipmentOrder/Detail/",
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
        Name: "ShipmentGoodsTypeName",
        Type: "text",
        Caption: "Loại sản phẩm",
        DataSourceMember: "ShipmentGoodsTypeName",
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
        hideInput:false
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
        name: "txtSenderAddress",
        colspan: "8",
        labelcolspan: "4",
        readOnly: false,
        label: "số nhà/đường",
        placeholder: "số nhà/đường",
        value: "",
        DataSourceMember: "SenderAddress",
      
    }
    // ,
    // {
    //     type: "textfull",
    //     name: "txtFullAddressFull",
    //     colspan: "10",
    //     labelcolspan: "2",
    //     readOnly: false,
    //     label: "địa chỉ",
    //     placeholder: "Địa chỉ",
    //     value: "",
    //     datasourcemember: "FullAddressFull",
    //     classNameCustom: "customcontrol"
    // }
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
        Name: "SenderAddress",
        DefaultValue: "",
        BindControlName: "txtSenderAddress",
        DataSourceMember: "SenderAddress"
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
    } ,
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


