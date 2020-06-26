//----------------------------------Chi phí vận chuyển thay đổi-----------------------------------------
export const APIHostName = "PIMAPI";
export const AddAPIPath_FlexShipmentFee = "api/ShipmentOrderType_FlexShipmentFee/Add";
export const UpdateAPIPath_FlexShipmentFee = "api/ShipmentOrderType_FlexShipmentFee/Update";
export const DeleteAPIPath_FlexShipmentFee = "api/ShipmentOrderType_FlexShipmentFee/Delete";

export const FlexShipmentFeeColumnList = [
    {
        Name: "chkSelectFlexShipmentFeeID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "FlexShipmentFeeID",
        Width: 50
    },
    // {
    //     Name: "FlexShipmentFeeID",
    //     Type: "text",
    //     Caption: "Mã chi phí vận chuyển thay đổi",
    //     DataSourceMember: "FlexShipmentFeeID",
    //     Width: 200
    // },
    {
        Name: "OutputServiceProductID",
        Type: "text",
        Caption: "Mã sản phẩm dịch vụ cần xuất",
        DataSourceMember: "OutputServiceProductID",
        Width: 120
    },
    {
        Name: "TechspecsName",
        Type: "text",
        Caption: "Thông số kỹ thuật",
        DataSourceMember: "TechspecsName",
        Width: 180
    },
    {
        Name: "TechspecsValueName",
        Type: "text",
        Caption: "Giá trị tham số KT",
        DataSourceMember: "TechspecsValueName",
        Width: 140
    },
    {
        Name: "ShipmentFeeTypeName",
        Type: "text",
        Caption: "Loại chi phí vận chuyển",
        DataSourceMember: "ShipmentFeeTypeName",
        Width: 160
    },
    {
        Name: "GetFeeTypeName",
        Type: "text",
        Caption: "Kiểu lấy chi phí",
        DataSourceMember: "GetFeeTypeName",
        Width: 150
    },
    {
        Name: "FeeValue",
        Type: "text",
        Caption: "Chi phí vận chuyển",
        DataSourceMember: "FeeValue",
        Width: 140
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "EditFlexShipmentFeeID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "FlexShipmentFeeID",
        Width: 60
    }

];

export const ModalFlexShipmentFeeColumnList = [
    {
        type: "select",
        Name: "ShipmentFeeTypeID",
        label: "Loại chi phí vận chuyển",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ShipmentFeeTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTFEETYPE",
        ValueMember: "ShipmentFeeTypeID",
        NameMember: "ShipmentFeeTypeName"
    },
    {
        type: "multiselect",
        Name: "MainGroupID",
        label: "Ngành hàng áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "MainGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        ValueMember: "MainGroupID",
        NameMember: "MainGroupName"
    },
    {
        type: "multiselect",
        Name: "SubGroupID",
        label: "Nhóm hàng áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        type: "multiselect",
        Name: "TechspecsID",
        label: "Thông số kỹ thuật áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "TechspecsID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUPTECHSPECS",
        ValueMember: "TechspecsID",
        NameMember: "TechspecsName"
    },
    {
        type: "multiselect",
        Name: "TechspecsValueID",
        label: "Giá trị tham số KT áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "TechspecsValueID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECSVALUE",
        ValueMember: "TechSpecsValueID",
        NameMember: "Value"
    },
    // {
    //     type: "select",
    //     Name: "TechspecsValueID",
    //     label: "Giá trị tham số KT áp dụng",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "TechspecsValueID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECSVALUE",
    //     ValueMember: "TechSpecsValueID",
    //     NameMember: "Value"
    // },
    {
        Name: "ProductID",
        type: "productbox",
        label: "Mã sản phẩm áp dụng",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: []
    },
    {
        Name: "OutputServiceProductID",
        type: "productbox",
        label: "Mã sản phẩm dịch vụ cần xuất",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "OutputServiceProductID",
        readonly: false,
        validatonList: []
    },
    {
        type: "select",
        Name: "GetFeeType",
        label: "Kiểu lấy chi phí",
        value: "1",
        placeholder: "",
        icon: "",
        listoption: [{ value: 1, label: "Lấy giá trị cố định" }, { value: 2, label: "Lấy từ bảng làm giá" }],
        DataSourceMember: "GetFeeType",
        readonly: false,
        disabled: true,
        validatonList: [],
        IsAutoLoadItemFromCache: false
    },
    {
        Name: "FeeValue",
        type: "numeric",
        label: "Chi phí",
        maxSize: "19",
        DataSourceMember: "FeeValue",
        readonly: false,
        validatonList: []
    },
    {
        Name: "Note",
        type: "textarea",
        label: "Ghi chú",
        maxSize: "2000",
        DataSourceMember: "Note",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];


export const ModalFlexShipmentFeeColumnList_Edit = [
    // {
    //     Name: "FlexShipmentFeeID",
    //     type: "text",
    //     label: "Mã chi phí vận chuyển thay đổi",
    //     DataSourceMember: "FlexShipmentFeeID",
    //     readonly: true,
    //     validatonList: []
    // },
    {
        type: "select",
        Name: "ShipmentFeeTypeID",
        label: "Loại chi phí vận chuyển",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ShipmentFeeTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTFEETYPE",
        ValueMember: "ShipmentFeeTypeID",
        NameMember: "ShipmentFeeTypeName"
    },
    {
        type: "multiselect",
        Name: "MainGroupID",
        label: "Ngành hàng áp dụng",
        value: "",
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "MainGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        ValueMember: "MainGroupID",
        NameMember: "MainGroupName"
    },
    {
        type: "multiselect",
        Name: "SubGroupID",
        label: "Nhóm hàng áp dụng",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        type: "multiselect",
        Name: "TechspecsID",
        label: "Thông số kỹ thuật áp dụng",
        value: "",
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "TechspecsID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUPTECHSPECS",
        ValueMember: "TechspecsID",
        NameMember: "TechspecsName"
    },
    {
        type: "multiselect",
        Name: "TechspecsValueID",
        label: "Giá trị tham số KT áp dụng",
        value: "",
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "TechspecsValueID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECSVALUE",
        ValueMember: "TechSpecsValueID",
        NameMember: "Value"
    },
    {
        Name: "ProductID",
        type: "productbox",
        label: "Mã sản phẩm áp dụng",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: []
    },
    {
        Name: "OutputServiceProductID",
        type: "productbox",
        label: "Mã sản phẩm dịch vụ cần xuất",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "OutputServiceProductID",
        readonly: false,
        validatonList: []
    },
    {
        type: "select",
        Name: "GetFeeType",
        label: "Kiểu lấy chi phí",
        value: "1",
        placeholder: "",
        icon: "",
        listoption: [{ value: 1, label: "Lấy giá trị cố định" }, { value: 2, label: "Lấy từ bảng làm giá" }],
        DataSourceMember: "GetFeeType",
        readonly: false,
        disabled: true,
        validatonList: [],
        IsAutoLoadItemFromCache: false
    },
    {
        Name: "FeeValue",
        type: "numeric",
        label: "Chi phí",
        maxSize: "19",
        DataSourceMember: "FeeValue",
        readonly: false,
        validatonList: []
    },
    {
        Name: "Note",
        type: "textarea",
        label: "Ghi chú",
        maxSize: "2000",
        DataSourceMember: "Note",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];

export const MLObjectShipmentOrderType_FlexShipmentFee = [
    {
        Name: "FlexShipmentFeeID",
        DefaultValue: "",
        BindControlName: "FlexShipmentFeeID",
        DataSourceMember: "FlexShipmentFeeID"
    },
    {
        Name: "ShipmentOrderTypeID",
        DefaultValue: "",
        BindControlName: "ShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID"
    },
    {
        Name: "ShipmentFeeTypeID",
        DefaultValue: "",
        BindControlName: "ShipmentFeeTypeID",
        DataSourceMember: "ShipmentFeeTypeID"
    },
    {
        Name: "ShipmentFeeTypeName",
        DefaultValue: "",
        BindControlName: "ShipmentFeeTypeName",
        DataSourceMember: "ShipmentFeeTypeName"
    },
    {
        Name: "MainGroupID",
        DefaultValue: "",
        BindControlName: "MainGroupID",
        DataSourceMember: "MainGroupID"
    },
    {
        Name: "SubGroupID",
        DefaultValue: "",
        BindControlName: "SubGroupID",
        DataSourceMember: "SubGroupID"
    },
    {
        Name: "TechspecsID",
        DefaultValue: "",
        BindControlName: "TechspecsID",
        DataSourceMember: "TechspecsID"
    },
    {
        Name: "TechspecsName",
        DefaultValue: "",
        BindControlName: "TechspecsName",
        DataSourceMember: "TechspecsName"
    },
    {
        Name: "TechspecsValueID",
        DefaultValue: "",
        BindControlName: "TechspecsValueID",
        DataSourceMember: "TechspecsValueID"
    },
    {
        Name: "TechspecsValueName",
        DefaultValue: "",
        BindControlName: "TechspecsValueName",
        DataSourceMember: "TechspecsValueName"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "ProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "OutputServiceProductID",
        DefaultValue: "",
        BindControlName: "OutputServiceProductID",
        DataSourceMember: "OutputServiceProductID"
    },
    {
        Name: "GetFeeType",
        DefaultValue: "",
        BindControlName: "GetFeeType",
        DataSourceMember: "GetFeeType",
        // Label: "Kiểu lấy chi phí",
        // ValidationList: ["required"]
    },
    {
        Name: "FeeValue",
        DefaultValue: "",
        BindControlName: "FeeValue",
        DataSourceMember: "FeeValue"
    },
    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "Note",
        DataSourceMember: "Note"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedDate",
        DefaultValue: "",
        BindControlName: "CreatedDate",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "CreatedUser",
        DataSourceMember: "CreatedUser"
    }
];