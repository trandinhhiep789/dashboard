//----------------------------------Chi phí vận chuyển cố định-----------------------------------------
export const APIHostName = "PIMAPI";
export const AddAPIPath_FixShipmentFee = "api/ShipmentOrderType_FixShipmentFee/Add";
export const UpdateAPIPath_FixShipmentFee = "api/ShipmentOrderType_FixShipmentFee/Update";
export const DeleteAPIPath_FixShipmentFee = "api/ShipmentOrderType_FixShipmentFee/Delete";

export const ModalFixShipmentFeeColumnList = [
    // {
    //     Name: "ShipmentOrderTypeID",
    //     type: "numeric",
    //     label: "Mã loại yêu cầu vận chuyển",
    //     maxSize: "9",
    //     DataSourceMember: "ShipmentOrderTypeID",
    //     readonly: false,
    //     validatonList: ["required"]
    // },
    // {
    //     Name: "ShipmentFeeTypeID",
    //     type: "groupTextAndSelect",
    //     label: "Mã loại chi phí vận chuyển",
    //     maxSize: "9",
    //     DataSourceMember: "ShipmentFeeTypeID",
    //     readonly: false,
    //     validatonList: ["required"]
    // },
    {
        type: "select",
        Name: "ShipmentFeeTypeID",
        label: "Mã loại chi phí vận chuyển",
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
        Name: "OutputServiceProductID",
        type: "productbox",
        label: "Mã sản phẩm dịch vụ cần xuất",
        //maxSize: "20",
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
        readonly: true,
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


export const ModalFixShipmentFeeColumnList_Edit = [
    {
        type: "select",
        Name: "ShipmentFeeTypeID",
        label: "Mã loại chi phí vận chuyển",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ShipmentFeeTypeID",
        readonly: true,
        disabled: true,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTFEETYPE",
        ValueMember: "ShipmentFeeTypeID",
        NameMember: "ShipmentFeeTypeName"
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

export const FixShipmentFeeColumnList = [
    {
        Name: "chkSelectShipmentFeeTypeID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ShipmentFeeTypeID",
        Width: 50
    },
    {
        Name: "ShipmentFeeTypeName",
        Type: "text",
        Caption: "Loại chi phí vận chuyển",
        DataSourceMember: "ShipmentFeeTypeName",
        Width: 180
    },
    {
        Name: "OutputServiceProductID",
        Type: "text",
        Caption: "Mã sản phẩm dịch vụ cần xuất",
        DataSourceMember: "OutputServiceProductID",
        Width: 200
    },
    {
        Name: "GetFeeTypeName",
        Type: "text",
        Caption: "Kiểu lấy chi phí",
        DataSourceMember: "GetFeeTypeName",
        Width: 160
    },
    {
        Name: "FeeValue",
        Type: "text",
        Caption: "Chi phí vận chuyển",
        DataSourceMember: "FeeValue",
        Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100
    },
    {
        Name: "EditShipmentFeeTypeID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "ShipmentFeeTypeID",
        Width: 100
    }

];

export const MLObjectShipmentOrderType_FixShipmentFee = [
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