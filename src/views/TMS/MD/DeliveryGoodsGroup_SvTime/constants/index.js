import { ERPRELATECACHE_DELIVERYTIMEFRAME } from "../../../../../constants/keyCache";

export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/DeliveryGoodsGroup_SvTime/Add";
export const UpdateAPIPath = "api/DeliveryGoodsGroup_SvTime/Update";
export const DeleteAPIPath = "api/DeliveryGoodsGroup_SvTime/Delete";

export const ModalColumnList_Insert = [
    {
        type: "multiselect",
        Name: "DeliveryTimeFrameID",
        label: "Khung thời gian lấy tải",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "DeliveryTimeFrameID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPRELATECACHE_DELIVERYTIMEFRAME,
        ValueMember: "DeliveryTimeFrameID",
        NameMember: "DeliveryTimeFrame"
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
    // {
    //     Name: "IsSystem",
    //     type: "checkbox",
    //     label: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     readonly: false,
    //     validatonList: [],
    //     value: false
    // }
];

export const ModalColumnList_Edit = [
    {
        type: "multiselect",
        Name: "DeliveryTimeFrameID",
        label: "Khung thời gian lấy tải",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "DeliveryTimeFrameID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPRELATECACHE_DELIVERYTIMEFRAME,
        ValueMember: "DeliveryTimeFrameID",
        NameMember: "DeliveryTimeFrame"
    },   
    {
        Name: "Note",
        type: "textarea",
        label: "Note",
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
        value: ""
    },
    // {
    //     Name: "IsSystem",
    //     type: "checkbox",
    //     label: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     readonly: false,
    //     validatonList: [],
    //     value: ""
    // }
];

export const DataGridColumnList = [
    {
        Name: "chkSelectDeliveryTimeFrameID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "DeliveryTimeFrameID",
        Width: 60
    },
    {
        Name: "DeliveryTimeFrameID",
        Type: "text",
        Caption: "Mã khung thời gian lấy tải",
        DataSourceMember: "DeliveryTimeFrameID",
        Width: 350
    },
    {
        Name: "DeliveryTimeFrame",
        Type: "text",
        Caption: "Tên khung thời gian lấy tải",
        DataSourceMember: "DeliveryTimeFrame",
        Width: 350
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "DeliveryTimeFrameID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "DeliveryTimeFrameID",
        Width: 80
    }

];

export const MLObjectDefinition = [
    {
        Name: "DeliveryGoodsGroupID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "DeliveryGoodsGroupID"
    },
    {
        Name: "DeliveryTimeFrameID",
        DefaultValue: "",
        BindControlName: "DeliveryTimeFrameID",
        DataSourceMember: "DeliveryTimeFrameID"
    },
    {
        Name: "DeliveryTimeFrame",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "DeliveryTimeFrame"
    },
    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "Note",
        DataSourceMember: "Note",
        // Label: "Kiểu lấy chi phí",
        // ValidationList: ["required"]
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
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