export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/InstallMaterial/Search";
export const LoadAPIPath = "api/InstallMaterial/Load";
export const AddAPIPath = "api/InstallMaterial/InsertInstallMaterial";
export const UpdateAPIPath = "api/InstallMaterial/UpdateInstallMaterial";
export const DeleteAPIPath = "api/InstallMaterial/DeleteList";
export const UpdateOrderAPIPath = "api/InstallMaterial/UpdateOrder";
export const BackLink = "/InstallMaterial";
export const AddLink = "/InstallMaterial/add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "InstallMaterialID";
export const SearchMcRoleAPIPath = "api/McRole/Search";

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/InstallMaterial", Title: "Danh sách nhóm sản phẩm cần vật tư lắp đặt" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/InstallMaterial", Title: "Danh sách nhóm sản phẩm cần vật tư lắp đặt" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/InstallMaterial", Title: "Danh sách nhóm sản phẩm cần vật tư lắp đặt" },
    { Link: "", Title: "Thêm" }
];

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        validatonList: []
    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtInstallMaterialID",
        label: "mã nhóm vật tư lắp đặt",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "InstallMaterialID",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtInstallMaterialName",
        label: "tên nhóm vật tư lắp đặt",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "InstallMaterialName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "cbShipmentOrderTypeID",
        label: "loại yêu cầu vận chuyển",
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
    {
        type: "select",
        name: "cbPartnerID",
        label: "đối tác vận chuyển",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName"
    },
    {
        type: "select",
        name: "cbSubGroupID",
        label: "Nhóm hàng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        type: "select",
        name: "cbTechspecsID",
        label: "Thông số kỹ thuật",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "TechspecsID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECS",
        ValueMember: "TechSpecsID",
        NameMember: "TechSpecsName"
    },
    {
        type: "select",
        name: "cbTechspecsValueID",
        label: "giá trị thông số kỹ thuật",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "TechspecsValueID",
        readonly: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECSVALUE",
        ValueMember: "TechSpecsValueID",
        NameMember: "Value"
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        placeholder: "Mô tả",
        maxSize: "1900",
        icon: "",
        rows: "6",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: true,
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtInstallMaterialID",
        label: "mã nhóm vật tư lắp đặt",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "InstallMaterialID",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtInstallMaterialName",
        label: "tên nhóm vật tư lắp đặt",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "InstallMaterialName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "cbShipmentOrderTypeID",
        label: "loại yêu cầu vận chuyển",
        value: "",
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
    {
        type: "select",
        name: "cbPartnerID",
        label: "đối tác vận chuyển",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName"
    },
    {
        type: "select",
        name: "cbSubGroupID",
        label: "Nhóm hàng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        type: "select",
        name: "cbTechspecsID",
        label: "Thông số kỹ thuật",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "TechspecsID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECS",
        ValueMember: "TechSpecsID",
        NameMember: "TechSpecsName"
    },
    {
        type: "select",
        name: "cbTechspecsValueID",
        label: "giá trị thông số kỹ thuật",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "TechspecsValueID",
        readonly: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECSVALUE",
        ValueMember: "TechSpecsValueID",
        NameMember: "Value"
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        placeholder: "Mô tả",
        maxSize: "2000",
        icon: "",
        rows: "6",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "IsActived",
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "IsSystem",
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const MLObjectDefinition = [
    {
        Name: "InstallMaterialID",
        DefaultValue: "",
        BindControlName: "txtInstallMaterialID",
        DataSourceMember: "InstallMaterialID"
    },
    {
        Name: "InstallMaterialName",
        DefaultValue: "",
        BindControlName: "txtInstallMaterialName",
        DataSourceMember: "InstallMaterialName"
    },
    {
        Name: "ShipmentOrderTypeID",
        DefaultValue: "",
        BindControlName: "cbShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID"
    },
    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "cbPartnerID",
        DataSourceMember: "PartnerID"
    },
    {
        Name: "SubGroupID",
        DefaultValue: "",
        BindControlName: "cbSubGroupID",
        DataSourceMember: "SubGroupID"
    },
    {
        Name: "TechspecsID",
        DefaultValue: "",
        BindControlName: "cbTechspecsID",
        DataSourceMember: "TechspecsID"
    },
    {
        Name: "TechspecsValueID",
        DefaultValue: "",
        BindControlName: "cbTechspecsValueID",
        DataSourceMember: "TechspecsValueID"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
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
        DataSourceMember: "CreatedUserFullName"
    },
    {
        Name: "UpdatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "UpdatedUser"
    },
    {
        Name: "InstallMaterial_ProductList",
        DefaultValue: {},
        BindControlName: "InstallMaterial_ProductList",
        DataSourceMember: "InstallMaterial_ProductList"
    }

];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "InstallMaterialID",
        Width: 70
    },
    {
        Name: "InstallMaterialID",
        Type: "text",
        Caption: "Mã nhóm vật tư lắp đặt",
        DataSourceMember: "InstallMaterialID",
        Width: 80
    },
    {
        Name: "InstallMaterialName",
        Type: "text",
        Caption: "Tên nhóm vật tư lắp đặt",
        DataSourceMember: "InstallMaterialName",
        Width: 380
    },
    {
        Name: "PartnerName",
        Type: "text",
        Caption: "Đối tác",
        DataSourceMember: "PartnerName",
        Width: 200
    },
    {
        Name: "SubGroupName",
        Type: "text",
        Caption: "Nhóm hàng",
        DataSourceMember: "SubGroupName",
        Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 100
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "InstallMaterialID",
        Width: 80,
        Link: "/InstallMaterial/edit/",
        LinkText: "Chỉnh sửa"
    }
]
    

export const GridMLMcRoleDefinition = [

    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "ProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "IsFrequentlyUse",
        DefaultValue: "",
        BindControlName: "IsFrequentlyUse",
        DataSourceMember: "IsFrequentlyUse"
    },
    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "Note",
        DataSourceMember: "Note"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    }
];
export const InputMcRoleColumnList = [
    {
        Name: "ProductID",
        Type: "textbox",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 200,
        validatonList: ["required"]
    }
    ,
    {
        Name: "IsFrequentlyUse",
        Type: "checkbox",
        Caption: "Là vật tư thường sử dụng",
        DataSourceMember: "IsFrequentlyUse",
        Width: 70,
    },
    {
        Name: "Note",
        Type: "textbox",
        Caption: "Ghi chú",
        DataSourceMember: "Note",
        Width: 300,
    },
    {
        Name: "IsActived",
        Type: "checkbox",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 70
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
