export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentOrder/Search";
export const LoadAPIPath = "api/ShipmentOrder/LoadInfoNew";
export const AddAPIPath = "api/ShipmentOrder/Add";
export const UpdateAPIPath = "api/ShipmentOrder/UpdateWeb";
export const DeleteAPIPath = "api/ShipmentOrder/Delete";
export const UpdateOrderAPIPath = "api/ShipmentOrder/UpdateOrder";
export const BackLink = "/ShipmentOrder";
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
        type: "textdropdown",
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
        classNameCol:"col-custom",
        listoption: [
            { value: -1, label: '--Vui lòng chọn--' },
            { value: 1, label: 'SĐT khách hàng' },
            { value: 2, label: 'Mã NV giao hàng' },
            { value: 3, label: 'Mã đơn hàng ' },
            { value: 4, label: 'Mã NV điều phối' },
        ]
    },
    {
        type: "ComboBox",
        name: "cbShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Loại yêu cầu vận chuyển---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
        ValueMember: "ShipmentOrderTypeID",
        NameMember: "ShipmentOrderTypeName",
        classNameCol:"col-custom"
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
        classNameCol:"col-custom"
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
        classNameCol:"col-custom"
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
        filterrest:"cbReceiverDistrictID,cbSenderStoreID",
        classNameCol:"col-custom"
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
        filterobj:"ProvinceID",
        LoadItemCacheKeyID: "ERPCOMMONCACHE.DISTRICT",
        ValueMember: "DistrictID",
        NameMember: "DistrictName",
        filterrest:"cbSenderStoreID",
        classNameCol:"col-custom"
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
        filterobj:"DistrictID",
        classNameCol:"col-custom"
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
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        filterValue: 10,
        filterobj:"CompanyID",
        classNameCol:"col-custom"
    },
    {
        type: "ComboBox",
        name: "cbShipmentOrderStatusGroupID",
        DataSourceMember: "ShipmentOrderStatusGroupID",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Trạng thái---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERSTATUSGR",
        ValueMember: "ShipmentOrderStatusGroupID",
        NameMember: "ShipmentOrderStatusGroupName",
        classNameCol:"col-custom"
    },
    {
        type: "ComboBox",
        name: "cbIsCoordinator",
        DataSourceMember: "IsCoordinator",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "--Trạng thái điều phối--",
        listoption: [{ value: -1, label: "--Điều phối--" },{ value: 1, label: "Đã điều phối" },{ value: 2, label: "Chưa điều phối" }],
        classNameCol:"col-custom"
    },
    {
        type: "ComboBox",
        name: "cbIsOrderBy",
        DataSourceMember: "IsOrderBy",
        colspan: 2,
        value: 1,
        isMultiSelect: false,
        placeholder: "",
        listoption: [{ value: 1, label: "Sắp xếp theo thời gian giao" },{ value: 2, label: "Sắp xếp theo thời gian tạo" }],
        classNameCol:"col-custom"
    }
    // {
    //     type: "MultiTreeSelect",
    //     name: "TreeSelectID",
    //     DataSourceMember: "TreeSelectID",
    //     colspan: 12,
    //     rowspan: 2,
    //     value: -1,
    //     isMultiSelect: false,
    //     placeholder: "---Loại yêu cầu vận chuyển---",
    //     listoption: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
    //     ValueMember: "ShipmentOrderTypeID",
    //     NameMember: "ShipmentOrderTypeName",
    //     classNameCol:"col-custom"
    // }
    
];
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@RECEIVERPHONENUMBER",
        SearchValue: "-1"
    },
    {
        SearchKey: "@SHIPMENTORDERTYPEID",
        SearchValue: "-1"
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
        SearchKey: "@SENDERSTOREID",
        SearchValue: -1
    },
    {
        SearchKey: "@COORDINATORSTOREID",
        SearchValue: -1
    },
    {
        SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
        SearchValue: -1
    },
    {
        SearchKey: "@IsCoordinator",
        SearchValue: -1
    },
    {
        SearchKey: "@Typename",
        SearchValue: -1
    },
    {
        SearchKey: "@IsOrderBy",
        SearchValue: 1
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
        Name: "Typename",
        DefaultValue: "",
        BindControlName: "txtTypename"
    },
    {
        Name: "IsOrderBy",
        DefaultValue: "",
        BindControlName: "cbIsOrderBy"
    }
    // ,
    // {
    //     Name: "TreeSelectID",
    //     DefaultValue: "",
    //     BindControlName: "TreeSelectID"
    // }
    
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

//Update Expected Delivery Date
export const MLObjectExpectedDelivery = [
    {
        Name: "DeliverydateUpdateTypeID",
        DefaultValue: "",
        BindControlName: "DeliverydateUpdateTypeID",
        DataSourceMember: "DeliverydateUpdateTypeID"
    },
    {
        Name: "DeliverydateUpdateReasonID",
        DefaultValue: "",
        BindControlName: "DeliverydateUpdateReasonID",
        DataSourceMember: "DeliverydateUpdateReasonID"
    }
    ,
    {
        Name: "OldExpectedDeliveryDate",
        DefaultValue: "",
        BindControlName: "OldExpectedDeliveryDate",
        DataSourceMember: "OldExpectedDeliveryDate"
    }
    ,
    {
        Name: "NewExpectedDeliveryDate",
        DefaultValue: "",
        BindControlName: "NewExpectedDeliveryDate",
        DataSourceMember: "NewExpectedDeliveryDate"
    },
    {
        Name: "DeliverydateUpdateReasonNote",
        DefaultValue: "",
        BindControlName: "DeliverydateUpdateReasonNote",
        DataSourceMember: "DeliverydateUpdateReasonNote"
    }
    
]
export const ExpectedDeliveryDateEdit = [
    // {
    //     name: "DeliverydateUpdateTypeID",
    //     Type: "ComboBoxEdit",
    //     Caption: "Loại cập nhật giờ giao",
    //     label: "Loại cập nhật giờ giao",
    //     value:-1,
    //     datasourcemember: "DeliverydateUpdateTypeID",
    //     validatonList:["Comborequired"],
    //     isautoloaditemfromcache:true,
    //     loaditemcachekeyid:"ERPCOMMONCACHE.DELIVERYDATEUPDATETYPE",
    //     valuemember:"DeliverydateUpdateTypeID",
    //     nameMember:"DeliverydateUpdateTypeName",
    //     OrderIndex: 1
    // },
    {
        name: "DeliverydateUpdateReasonID",
        Type: "ComboBoxEdit",
        Caption: "Lý do thay đổi",
        label: "Lý do thay đổi",
        value:-1,
        datasourcemember: "DeliverydateUpdateReasonID",
        validatonList:["Comborequired"],
        isautoloaditemfromcache:true,
        loaditemcachekeyid:"ERPCOMMONCACHE.DELIVERYDATEUPDATEREASON",
        valuemember:"DeliverydateUpdateReasonID",
        nameMember:"DeliverydateUpdateReasonName",
        OrderIndex: 2
    },
    // {
    //     name: "OldExpectedDeliveryDate",
    //     Type: "Datetime",
    //     Caption: "Ngày hẹn giao cũ",
    //     label: "Ngày hẹn giao cũ",
    //     datasourcemember: "OldExpectedDeliveryDate",
    //     timeFormat:false,
    //     disabled:true,
    //     dateFormat:"DD-MM-YYYY HH:mm",//"YYYY-MM-DD HH:mm"
    //     IsGetTime:true,
    //     OrderIndex: 3
    // },
    {
        name: "NewExpectedDeliveryDate",
        Type: "Datetime",
        Caption: "Ngày hẹn giao",
        label: "Ngày hẹn giao",
        datasourcemember: "NewExpectedDeliveryDate",
        validatonList:["required"],
        timeFormat:false,
        ISdisabledDate:true,
        dateFormat:"DD-MM-YYYY HH:mm",//"YYYY-MM-DD HH:mm"
        IsGetTime:true,
        OrderIndex: 4
    },
    {
        name: "DeliverydateUpdateReasonNote",
        Type: "TextArea",
        label:"Ghi chú",
        Caption: "Ghi chú",
        datasourcemember: "DeliverydateUpdateReasonNote",
        OrderIndex:5,
        Colmd:12,
        hideInput: false,
        labelcolspan:2,
        colspan:10
    },
];

export const MLObjectUpdateCoordinatorStore = [
    {
        Name: "CoordinatorStoreID",
        DefaultValue: "",
        BindControlName: "CoordinatorStoreID",
        DataSourceMember: "CoordinatorStoreID"
    },
    {
        Name: "CoordinatorStoreNewID",
        DefaultValue: "",
        BindControlName: "CoordinatorStoreNewID",
        DataSourceMember: "CoordinatorStoreNewID"
    },
    {
        Name: "CoordinatorNote",
        DefaultValue: "",
        BindControlName: "CoordinatorNote",
        DataSourceMember: "CoordinatorNote"
    }

    
    
]
export const UpdateCoordinatorStoreEdit = [
    {
        name: "CoordinatorStoreID",
        Type: "ComboBoxStore",
        Caption: "Kho điều phối",
        label: "Kho điều phối",
        value:-1,
        datasourcemember: "CoordinatorStoreID",
        validatonList:["Comborequired"],
        isautoloaditemfromcache:true,
        loaditemcachekeyid:"ERPCOMMONCACHE.STORE",
        filterobj:"CompanyID",
        filterValue:10,
        valuemember:"StoreID",
        nameMember:"StoreName",
        Disabled:true,
        OrderIndex: 1
    },
    {
        name: "CoordinatorStoreNewID",
        Type: "ComboBoxStore",
        Caption: "Kho cần chuyển",
        label: "Kho cần chuyển",
        value:-1,
        datasourcemember: "CoordinatorStoreNewID",
        validatonList:["Comborequired"],
        isautoloaditemfromcache:true,
        loaditemcachekeyid:"ERPCOMMONCACHE.STORE",
        valuemember:"StoreID",
        nameMember:"StoreName",
        filterobj:"CompanyID",
        othername:"CoordinatorStoreID",
        filterValue:10,
        OrderIndex: 2
    },
    {
        name: "CoordinatorNote",
        Type: "TextArea",
        label:"Nội dung điều phối",
        Caption: "Nội dung điều phối",
        datasourcemember: "CoordinatorNote",
        OrderIndex:5,
        Colmd:12,
        hideInput: false,
        labelcolspan:2,
        colspan:10
    }
   
];


