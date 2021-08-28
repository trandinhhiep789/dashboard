export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentOrder/SearchShipmentOrder";
export const SearchShipmentRouteAPIPath = "api/ShipmentRoute/Search";

export const LoadAPIPath = "api/ShipmentOrder/LoadInfoNew";
export const AddAPIPath = "api/ShipmentOrder/Add";
export const UpdateAPIPath = "api/ShipmentOrder/UpdateWeb";
export const DeleteAPIPath = "api/ShipmentRoute/Delete";
export const UpdateOrderAPIPath = "api/ShipmentOrder/UpdateOrder";
export const BackLink = "/ShipmentOrder";
export const AddLink = "/ShipmentOrder/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ShipmentRouteID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách yêu cầu vận chuyển" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentOrder", Title: "Danh sách yêu cầu vận chuyển" },
    { Link: "", Title: "Sửa" }
];
export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentOrder", Title: "Danh sách yêu cầu vận chuyển" },
    { Link: "", Title: "Chi tiết" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentOrder", Title: "Danh sách yêu cầu vận chuyển" },
    { Link: "", Title: "Thêm" }
];

const dtFromdate = new Date()
dtFromdate.setDate(new Date().getDate() - 30);

export const SearchElementList = [
    {
        type: "textdropdownNew",
        dropdownName: "txtTypename",
        name: "txtKeyword",
        colspan: 2,
        label: "",
        value: "",
        colspan: 4,
        placeholder: "Từ khóa",
        icon: "",
        nameOption: "txtTypename",
        labelOption: "--Vui lòng chọn--",
        valueOption: -1,
        // validatonList:["Comborequired"],
        classNameCol: "col-custom",
        classNameDropdown: "dropdown-custom",
        listoption: [
            { value: -1, label: '--Vui lòng chọn--' },
            { value: 1, label: 'SĐT người nhận hàng' },
            { value: 2, label: 'Mã NV giao hàng' },
            { value: 3, label: 'Mã ycx của đối tác' },
            { value: 4, label: 'Mã vận đơn' },
            { value: 5, label: 'Tên sản phảm' },
            { value: 6, label: 'Mã NV điều phối' }
        ]
    },
    {
        type: "MultiTreeSelect",
        name: "cbShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID",
        colspan: 12,
        rowspan: 2,
        value: "",
        maxTagCount: 1,
        isMultiSelect: true,
        placeholder: "---Loại yêu cầu vận chuyển---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
        ValueMember: "ShipmentOrderTypeID",
        NameMember: "ShipmentOrderTypeName",
        classNameCol: "col-custom"
    },
    {
        type: "Datetime",
        name: "dtCreatedOrderTimeFo",
        DataSourceMember: "CreatedOrderTimeFo",
        placeholder: "Từ ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 1,
        classNameCol: "col-custom"
    },
    {
        type: "Datetime",
        name: "dtCreatedOrderTimeTo",
        DataSourceMember: "CreatedOrderTimeTo",
        placeholder: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 1,
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        name: "cbReceiverProvinceID",
        DataSourceMember: "ReceiverProvinceID",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Tỉnh /thành phố---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PROVINCE",
        ValueMember: "ProvinceID",
        NameMember: "ProvinceName",
        filterrest: "cbReceiverDistrictID,cbSenderStoreID",
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        name: "cbReceiverDistrictID",
        DataSourceMember: "ReceiverDistrictID",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Quận/huyện---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        filterName: "cbReceiverProvinceID",
        filterValue: "",
        filterobj: "ProvinceID",
        LoadItemCacheKeyID: "ERPCOMMONCACHE.DISTRICT",
        ValueMember: "DistrictID",
        NameMember: "DistrictName",
        filterrest: "cbReceiverWardID,cbSenderStoreID",
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        name: "cbReceiverWardID",
        DataSourceMember: "ReceiverWardID",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Phường/Xã---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        filterName: "cbReceiverDistrictID",
        filterValue: "",
        filterobj: "DistrictID",
        LoadItemCacheKeyID: "ERPCOMMONCACHE.WARD",
        ValueMember: "WardID",
        NameMember: "WardName",
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        name: "cbSenderStoreID",
        DataSourceMember: "SenderStoreID",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Kho gửi---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        filterName: "cbReceiverDistrictID",
        filterValue: "",
        filterobj: "DistrictID",
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        name: "cbCoordinatorStoreID",
        DataSourceMember: "CoordinatorStoreID",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Kho điều phối---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.USER_COOSTORE_BYUSER",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        classNameCol: "col-custom"
    },
    {
        type: "MultiTreeSelect",
        name: "cbShipmentOrderStatusGroupID",
        DataSourceMember: "ShipmentOrderStatusGroupID",
        colspan: 12,
        rowspan: 2,
        value: "1,2,3",
        maxTagCount: 1,
        isMultiSelect: true,
        placeholder: "---Trạng thái---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERSTATUSGR",
        ValueMember: "ShipmentOrderStatusGroupID",
        NameMember: "ShipmentOrderStatusGroupName",
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        name: "cbIsCoordinator",
        DataSourceMember: "IsCoordinator",
        colspan: 1,
        value: 2,
        isMultiSelect: false,
        placeholder: "--Trạng thái điều phối--",
        listoption: [{ value: -1, label: "--Điều phối--" }, { value: 1, label: "Đã điều phối" }, { value: 2, label: "Chưa điều phối" }],
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        name: "cbCarrierTypeID",
        DataSourceMember: "CarrierTypeID",
        colspan: 1,
        value: -1,
        isMultiSelect: false,
        placeholder: "--Phương tiện--",
        listoption: [{ value: -1, label: "--Phương tiện--" }, { value: 1, label: "Xe máy" }, { value: 2, label: "Xe tải" }],
        classNameCol: "col-custom"
    }


];
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@RECEIVERPHONENUMBER",
        SearchValue: ""
    },
    {
        SearchKey: "@SHIPMENTORDERTYPEID",
        SearchValue: ""
    },
    {
        SearchKey: "@FromDate",
        SearchValue: new Date()
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
        SearchKey: "@RECEIVERWARDID",
        SearchValue: -1
    },
    {
        SearchKey: "@SENDERSTOREID",
        SearchValue: -1
    },
    {
        SearchKey: "@COORDINATORSTOREID",
        SearchValue: -1
    },
    {
        SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
        SearchValue: "1,2,3"
    },
    {
        SearchKey: "@IsCoordinator",
        SearchValue: 2
    },
    {
        SearchKey: "@Typename",
        SearchValue: -1
    },
    {
        SearchKey: "@RequestStoreID",
        SearchValue: -1
    },
    {
        SearchKey: "@CarrierTypeID",
        SearchValue: -1
    },
    {
        SearchKey: "@PAGESIZE",
        SearchValue: 100
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
        Name: "ShipmentOrderTypeID",
        DefaultValue: "",
        BindControlName: "cbShipmentOrderTypeID"
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
        Name: "ReceiverWardID",
        DefaultValue: "",
        BindControlName: "cbReceiverWardID"
    },
    {
        Name: "SenderStoreID",
        DefaultValue: "",
        BindControlName: "cbSenderStoreID"
    },
    {
        Name: "CoordinatorStoreID",
        DefaultValue: "",
        BindControlName: "cbCoordinatorStoreID"
    },
    {
        Name: "ShipmentOrderStatusGroupID",
        DefaultValue: "",
        BindControlName: "cbShipmentOrderStatusGroupID"
    },
    {
        Name: "IsCoordinator",
        DefaultValue: "",
        BindControlName: "cbIsCoordinator"
    },
    {
        Name: "CarrierTypeID",
        DefaultValue: "",
        BindControlName: "cbCarrierTypeID"
    },
    {
        Name: "Typename",
        DefaultValue: "",
        BindControlName: "txtTypename"
    },
    // {
    //     Name: "RequestStoreID",
    //     DefaultValue: "-1",
    //     BindControlName: "cbRequestStoreID"
    // }
];

// phân tuyến
export const SearchElementRouteList = [
    {
        type: "text",
        name: "txtKeyword",
        colspan: 2,
        label: "",
        value: "",
        colspan: 4,
        placeholder: "Từ khóa",
        icon: "",
        listoption: {}
    },
    {
        type: "Datetime",
        name: "dtCreatedOrderTimeFo",
        DataSourceMember: "CreatedOrderTimeFo",
        placeholder: "Từ ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 1,
        classNameCol: "col-custom"
    },
    {
        type: "Datetime",
        name: "dtCreatedOrderTimeTo",
        DataSourceMember: "CreatedOrderTimeTo",
        placeholder: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 1,
        classNameCol: "col-custom"
    }
];
export const SearchMLObjectRouteDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
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
    }
    
];
export const InitSearchShipmentRouteParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@FromDate",
        SearchValue: new Date()
    },
    {
        SearchKey: "@ToDate",
        SearchValue: new Date()
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


export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ShipmentRouteID",
        Width: 60
    },
    {
        Name: "ShipmentRouteID",
        Type: "texttolink",
        Caption: "Mã yêu cầu phân tuyến",
        DataSourceMember: "ShipmentRouteID",
        Link: "/ShipmentRouteID/Detail/",
        Width: 140
    },
    {
        Name: "CreatedDate",
        Type: "datetime",
        Caption: "Ngày phân tuyến",
        DataSourceMember: "CreatedDate",
        Width: 130
    },
    {
        Name: "ActualDeliveryDistance",
        Type: "text",
        Caption: "Kho gửi",
        DataSourceMember: "ActualDeliveryDistance",
        Width: 250
    },
    {
        Name: "ExpectedBeginDeliveryDate",
        Type: "datetime",
        Caption: "Người nhận",
        DataSourceMember: "ExpectedBeginDeliveryDate",
        Width: 100
    },
    {
        Name: "RouteNote",
        Type: "text",
        Caption: "tuyến đường phần tuyến",
        DataSourceMember: "RouteNote",
        Width: 250
    }
];
