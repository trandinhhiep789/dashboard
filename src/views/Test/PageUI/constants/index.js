
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
    
];