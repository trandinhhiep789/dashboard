export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/Partner_CoordinatorStore/Add";
export const UpdateAPIPath = "api/Partner_CoordinatorStore/Update";
export const DeleteAPIPath = "api/Partner_CoordinatorStore/Delete";
export const GetCreateAdSaleOrderAPIPath = "api/AdvanceRequest/CreateAdvanceRequestSaleOrder";
export const BackLink = "/AdvanceRequest";

export const ModalColumnList_Insert = [
    // {
    //     Name: "CoordinatorStoreID",
    //     type: "text",
    //     label: "Mã kho điều phối",
    //     maxSize: "10",
    //     DataSourceMember: "CoordinatorStoreID",
    //     readonly: false,
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
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        KeyFilter: "CompanyID",
        ValueFilter: 10

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
        NameMember: "StoreName",
        KeyFilter: "CompanyID",
        ValueFilter: 10
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
        Name: "chkSelectAdvanceRequestDetailID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "AdvanceRequestDetailID",
        Width: 60
    },
    {
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Mã nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 350
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 350
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "ProductName",
        Width: 350
    },
    {
        Name: "Quantity",
        Type: "text",
        Caption: "Số lượng tạm ứng",
        DataSourceMember: "Quantity",
        Width: 350
    },
    {
        Name: "QuantityUnitID",
        Type: "text",
        Caption: "Đơn vị tính",
        DataSourceMember: "QuantityUnitID",
        Width: 350
    },
    // {
    //     Name: "IsActived",
    //     Type: "checkicon",
    //     Caption: "Kích hoạt",
    //     DataSourceMember: "IsActived",
    //     Width: 150
    // },
    {
        Name: "EditPartnerCoordinatorStore",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "CoordinatorStoreID",
        Width: 100
    }

];

export const MLObjectDefinition = [
    {
        Name: "PartnerCSID",
        DefaultValue: "",
        BindControlName: "PartnerCSID",
        DataSourceMember: "PartnerCSID"
    },
    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "PartnerID",
        DataSourceMember: "PartnerID"
    },
    {
        Name: "CoordinatorStoreID",
        DefaultValue: "",
        BindControlName: "CoordinatorStoreID",
        DataSourceMember: "CoordinatorStoreID"
    },
    {
        Name: "CoordinatorStoreName",
        DefaultValue: "",
        BindControlName: "CoordinatorStoreName",
        DataSourceMember: "CoordinatorStoreName"
    },
    {
        Name: "PartnerStoreID",
        DefaultValue: "",
        BindControlName: "PartnerStoreID",
        DataSourceMember: "PartnerStoreID"
    },
    {
        Name: "PartnerStoreName",
        DefaultValue: "",
        BindControlName: "PartnerStoreName",
        DataSourceMember: "PartnerStoreName",
        // Label: "Kiểu lấy chi phí",
        // ValidationList: ["required"]
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