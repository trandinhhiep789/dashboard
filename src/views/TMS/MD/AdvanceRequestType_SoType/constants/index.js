export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/AdvanceRequestType_SoType/Add";
export const UpdateAPIPath = "api/AdvanceRequestType_SoType/Update";
export const DeleteAPIPath = "api/AdvanceRequestType_SoType/Delete";

export const ModalColumnList_Insert = [
    {
        type: "select",
        Name: "ShipmentOrderTypeID",
        label: "Loại yêu cầu vận chuyển",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ShipmentOrderTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
        ValueMember: "ShipmentOrderTypeID",
        NameMember: "ShipmentOrderTypeName"
    },
];

export const ModalColumnList_Edit = [
    {
        Name: "ProductID",
        type: "productbox",
        label: "Mã sản phẩm vật tư",
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: true,
        disabled: true,
        validatonList: ["Comborequired"]
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelectShipmentOrderTypeID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ShipmentOrderTypeID",
        Width: 60
    },
    {
        Name: "ShipmentOrderTypeID",
        Type: "text",
        Caption: "Mã loại yêu cầu vận chuyển",
        DataSourceMember: "ShipmentOrderTypeID",
        Width: 500
    },
    {
        Name: "ShipmentOrderTypeName",
        Type: "text",
        Caption: "Tên loại yêu cầu vận chuyển",
        DataSourceMember: "ShipmentOrderTypeName",
        Width: 500
    },
    

];

export const MLObjectDefinition = [
    {
        Name: "ShipmentOrderTypeID",
        DefaultValue: "",
        BindControlName: "ShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID"
    },
    {
        Name: "ShipmentOrderTypeName",
        DefaultValue: "",
        BindControlName: "ShipmentOrderTypeName",
        DataSourceMember: "ShipmentOrderTypeName"
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