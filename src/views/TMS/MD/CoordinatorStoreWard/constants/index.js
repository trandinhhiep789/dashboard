export const AddAPIPath = "api/Partner_CoordinatorStore/Add";
export const UpdateAPIPath = "api/Partner_CoordinatorStore/Update";
export const DeleteAPIPath = "api/Partner_CoordinatorStore/Delete";

export const ModalColumnList_Insert = [

    {
        type: "select",
        Name: "CoordinatorStoreID",
        label: "kho điều phối",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "CoordinatorStoreID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName"
    },
    {
        type: "select",
        Name: "PartnerStoreID",
        label: "kho đối tác",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerStoreID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName"
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

export const ModalColumnList_Edit = [
    // {
    //     Name: "CoordinatorStoreID",
    //     type: "text",
    //     label: "Mã kho điều phối",
    //     maxSize: "10",
    //     DataSourceMember: "CoordinatorStoreID",
    //     readonly: true,
    //     validatonList: ["required","number"]
    // },
    {
        type: "select",
        Name: "CoordinatorStoreID",
        label: "kho điều phối",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "CoordinatorStoreID",
        readonly: true,
        disabled: true,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName"
    },
    {
        type: "select",
        Name: "PartnerStoreID",
        label: "Kho đối tác",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerStoreID",
        readonly: true,
        disabled: true,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName"
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

export const DataGridColumnList = [
    {
        Name: "chkSelectPartnerCSID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PartnerCSID",
        Width: 60
    },

    {
        Name: "CoordinatorStoreName",
        Type: "text",
        Caption: "phường/xã",
        DataSourceMember: "CoordinatorStoreName",
        Width: 350
    },
  
    {
        Name: "EditPartnerCoordinatorStore",
        Type: "edit",
        Caption: "Tác vụ",
        DataSourceMember: "CoordinatorStoreID",
        Width: 100
    }

];

export const MLObjectDefinition = [
    {
        Name: "CoordinatorStoreID",
        DefaultValue: "",
        BindControlName: "CoordinatorStoreID",
        DataSourceMember: "PartnerCSID"
    },
    {
        Name: "WardID",
        DefaultValue: "",
        BindControlName: "WardID",
        DataSourceMember: "WardID"
    },
 
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "CreatedUser",
        DataSourceMember: "CreatedUser"
    },
    {
        Name: "LoginlogID",
        DefaultValue: "",
        BindControlName: "LoginlogID",
        DataSourceMember: "LoginlogID"
    }
    
];

export const MLObjectStoreWardItem= [
    {
        Name: "ProvinceID",
        DefaultValue: "",
        BindControlName: "cbProvinceID",
        DataSourceMember: "ProvinceID"
    },
    {
        Name: "DistrictID",
        DefaultValue: "",
        BindControlName: "cbDistrictID",
        DataSourceMember: "DistrictID"
    },
    {
        Name: "WardID",
        DefaultValue: "",
        BindControlName: "cbWardID",
        DataSourceMember: "WardID"
    },
 
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