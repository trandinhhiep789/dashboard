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
        maxsize: "20",
        placeholder: "Mã nhóm vật tư lắp đặt",
        datasourcemember: "InstallMaterialID",
        readonly: false,
        validatonList: ["required"],
        OrderIndex: 1
    },
    {
        type: "text",
        name: "txtInstallMaterialName",
        label: "tên nhóm vật tư lắp đặt",
        value: "",
        maxsize: "175",
        placeholder: "Tên nhóm vật tư lắp đặt",
        datasourcemember: "InstallMaterialName",
        readonly: false,
        validatonList: ["required"],
        OrderIndex: 2
    },
    {
        type: "select",
        name: "cbShipmentOrderTypeID",
        label: "loại yêu cầu vận chuyển",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "ShipmentOrderTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
        valuemember: "ShipmentOrderTypeID",
        nameMember: "ShipmentOrderTypeName",
        OrderIndex: 3
    },
    {
        type: "select",
        name: "cbPartnerID",
        label: "đối tác vận chuyển",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "PartnerID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.PARTNER",
        valuemember: "PartnerID",
        nameMember: "PartnerName",
        OrderIndex: 4
    },
    {
        type: "select",
        name: "cbSubGroupID",
        label: "Nhóm hàng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "SubGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.SUBGROUP",
        valuemember: "SubGroupID",
        nameMember: "SubGroupName",
        OrderIndex: 5
    },
    {
        type: "select",
        name: "cbTechspecsID",
        label: "Thông số kỹ thuật",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "TechspecsID",
        readonly: false,
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.TECHSPECS",
        valuemember: "TechSpecsID",
        nameMember: "TechSpecsName",
        filterrest: "cbTechspecsValueID",
        OrderIndex: 6
    },
    {
        type: "select",
        name: "cbTechspecsValueID",
        label: "giá trị thông số kỹ thuật",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "TechspecsValueID",
        readonly: false,
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.TECHSPECSVALUE",
        valuemember: "TechSpecsValueID",
        nameMember: "Value",
        filterName: "cbTechspecsID",
        filterValue: "",
        filterobj: "TechSpecsID",
        OrderIndex: 7
    },
    {
        type: "TextArea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        placeholder: "Mô tả",
        maxsize: "1900",
        rows: "6",
        datasourcemember: "Description",
        readonly: false,
        Colmd:12,
        labelcolspan:2,
        colspan:10,
        OrderIndex: 8
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: true,
        datasourcemember: "IsActived",
        readonly: false,
        OrderIndex: 9
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: "",
        readonly: false,
        datasourcemember: "IsSystem",
        OrderIndex: 10
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
        datasourcemember: "InstallMaterialID",
        readonly: true,
        validatonList: ["required"],
        OrderIndex: 1
    },
    {
        type: "text",
        name: "txtInstallMaterialName",
        label: "tên nhóm vật tư lắp đặt",
        value: "",
        maxSize: "20",
        placeholder: "",
        datasourcemember: "InstallMaterialName",
        readonly: false,
        validatonList: ["required"],
        OrderIndex: 2
    },
    {
        type: "select",
        name: "cbShipmentOrderTypeID",
        label: "loại yêu cầu vận chuyển",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "ShipmentOrderTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
        valuemember: "ShipmentOrderTypeID",
        nameMember: "ShipmentOrderTypeName",
        OrderIndex: 3
    },
    {
        type: "select",
        name: "cbPartnerID",
        label: "đối tác vận chuyển",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "PartnerID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.PARTNER",
        valuemember: "PartnerID",
        nameMember: "PartnerName",
        OrderIndex: 4
    },
    {
        type: "select",
        name: "cbSubGroupID",
        label: "Nhóm hàng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "SubGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.SUBGROUP",
        valuemember: "SubGroupID",
        nameMember: "SubGroupName",
        OrderIndex: 5
    },
    {
        type: "select",
        name: "cbTechspecsID",
        label: "Thông số kỹ thuật",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "TechspecsID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.TECHSPECS",
        valuemember: "TechSpecsID",
        nameMember: "TechSpecsName",
        filterrest: "cbTechspecsValueID",
        OrderIndex: 6
    },
    {
        type: "select",
        name: "cbTechspecsValueID",
        label: "giá trị thông số kỹ thuật",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "TechspecsValueID",
        readonly: false,
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.TECHSPECSVALUE",
        valuemember: "TechSpecsValueID",
        nameMember: "Value",
        filterName: "cbTechspecsID",
        filterValue: "",
        filterobj: "TechSpecsID",
        OrderIndex: 7
    },
    {
        type: "TextArea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        placeholder: "Mô tả",
        maxSize: "2000",
        rows: "6",
        datasourcemember: "Description",
        readonly: false,
        Colmd:12,
        labelcolspan:2,
        colspan:10,
        OrderIndex: 8
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: "",
        readonly: false,
        datasourcemember: "IsActived",
        OrderIndex: 9
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: "",
        readonly: false,
        datasourcemember: "IsSystem",
        OrderIndex: 10
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
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "ProductName",
        DataSourceMember: "ProductName"
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
        name: "ProductID",
        Type: "ProductCombo",
        Caption: "Mã sản phẩm",
        label: "mã sản phẩm",
        datasourcemember: "ProductID",
        Width: 100,
        validatonList: ["Comborequired"],
        namelabel: "ProductName",
        OrderIndex: 1,
        Colmd: 12
    },
    {
        name: "ProductName",
        Type: "textbox",
        Caption: "Tên sản phẩm",
        label: "Tên sản phẩm",
        datasourcemember: "ProductName",
        iputpop:false,
        Width: 300,
        OrderIndex: 2,
        Colmd: 12

    },
    {
        name: "IsFrequentlyUse",
        Type: "checkbox",
        label: "là vật tư thường sử dụng",
        Caption: "Là vật tư thường sử dụng",
        datasourcemember: "IsFrequentlyUse",
        Width: 150,
        OrderIndex: 3,
        Colmd: 12
    },
    {
        name: "Note",
        Type: "TextArea",
        label: "ghi chú",
        Caption: "Ghi chú",
        datasourcemember: "Note",
        Width: 300,
        OrderIndex: 4,
        Colmd: 12
    },
    {
        name: "IsActived",
        Type: "checkbox",
        label: "kích hoạt",
        Caption: "Kích hoạt",
        datasourcemember: "IsActived",
        Width: 70,
        OrderIndex: 5,
        Colmd: 12
    },
    {
        name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        datasourcemember: "ArticleID",
        Width: 70,
        iputpop: false
    }
];
