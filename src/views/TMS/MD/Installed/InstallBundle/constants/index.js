export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/InstallBundle/Search";
export const LoadAPIPath = "api/InstallBundle/Load";
export const AddAPIPath = "api/InstallBundle/InsertInstallBundle";
export const UpdateAPIPath = "api/InstallBundle/UpdateInstallBundle";
export const DeleteAPIPath = "api/InstallBundle/DeleteList";
export const UpdateOrderAPIPath = "api/InstallBundle/UpdateOrder";
export const BackLink = "/InstallBundle";
export const AddLink = "/InstallBundle/add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "InstallBundleID";
export const SearchMcRoleAPIPath = "api/McRole/Search";

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/InstallBundle", Title: "Danh sách gói sản phẩm lắp đặt kèm theo" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/InstallBundle", Title: "Danh sách gói sản phẩm lắp đặt kèm theo" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/InstallBundle", Title: "Danh sách gói sản phẩm lắp đặt kèm theo" },
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
        name: "txtInstallBundleID",
        label: "mã gói sản phẩm lắp đặt",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "InstallBundleID",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtInstallBundleName",
        label: "tên gói sản phẩm lắp đặt",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "InstallBundleName",
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
        name: "txtInstallBundleID",
        label: "mã gói sản phẩm lắp đặt",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "InstallBundleID",
        readonly: true,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtInstallBundleName",
        label: "tên gói sản phẩm lắp đặt",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "InstallBundleName",
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
        Name: "InstallBundleID",
        DefaultValue: "",
        BindControlName: "txtInstallBundleID",
        DataSourceMember: "InstallBundleID"
    },
    {
        Name: "InstallBundleName",
        DefaultValue: "",
        BindControlName: "txtInstallBundleName",
        DataSourceMember: "InstallBundleName"
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
        Name: "InstallBundle_ProductList",
        DefaultValue: {},
        BindControlName: "InstallBundle_ProductList",
        DataSourceMember: "InstallBundle_ProductList"
    }

];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "InstallBundleID",
        Width: 70
    },
    {
        Name: "InstallBundleName",
        Type: "text",
        Caption: "Tên gói sản phẩm lắp đặt",
        DataSourceMember: "InstallBundleName",
        Width: 280
    },
    {
        Name: "ShipmentOrderTypeName",
        Type: "text",
        Caption: "Loại yêu cầu vận chuyển",
        DataSourceMember: "ShipmentOrderTypeName",
        Width: 200
    },
    {
        Name: "PartnerName",
        Type: "text",
        Caption: "Đối tác",
        DataSourceMember: "PartnerName",
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
        DataSourceMember: "InstallBundleID",
        Width: 80,
        Link: "/InstallBundle/edit/",
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
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "ProductName",
        DataSourceMember: "ProductName"
    },
    {
        Name: "Quantity",
        DefaultValue: "",
        BindControlName: "Quantity",
        DataSourceMember: "Quantity"
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
        Type: "ProductCombo",
        Caption: "Mã sản phẩm",
        label:"mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 200,
        validatonList: ["Comborequired"],
        namelabel:"ProductName",
        OrderIndex:1,
        Colmd:12
    
    },
    {
        Name: "ProductName",
        Type: "textbox",
        Caption: "Tên sản phẩm",
        label:"Tên sản phẩm",
        DataSourceMember: "ProductName",
        iputpop:false,
        Width: 200,
        OrderIndex:2,
        Colmd:12
      
    },
    {
        Name: "Quantity",
        Type: "TextNumber",
        label:"Số lượng",
        Caption: "Số lượng",
        DataSourceMember: "Quantity",
        Width: 200,
        validatonList: ["required","number"],
        OrderIndex:3,
        Colmd:12,
        min:1,
        max:9999
    },
    {
        Name: "Note",
        Type: "TextArea",
        label:"Ghi chú",
        Caption: "Ghi chú",
        DataSourceMember: "Note",
        Width: 300,
        OrderIndex:4,
        Colmd:12
    },
    {
        Name: "IsActived",
        Type: "checkbox",
        label:"kích hoạt",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 70,
        OrderIndex:5,
        Colmd:12
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
