export const APIHostName = "TMSAPI";
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
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/InstallBundle", Title: "Danh sách gói sản phẩm lắp đặt kèm theo" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/InstallBundle", Title: "Danh sách gói sản phẩm lắp đặt kèm theo" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
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
        maxsize: "20",
        placeholder: "Mã gói sản phẩm lắp đặt",
        datasourcemember: "InstallBundleID",
        readonly: false,
        validatonList: ["required"],
        OrderIndex:1
    },
    {
        type: "text",
        name: "txtInstallBundleName",
        label: "tên gói sản phẩm lắp đặt",
        value: "",
        maxsize: "175",
        placeholder: "Tên gói sản phẩm lắp đặt",
        datasourcemember: "InstallBundleName",
        readonly: false,
        validatonList: ["required"],
        OrderIndex:2
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
        OrderIndex:3
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
        OrderIndex:4
    },
    {
        type: "TextArea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        placeholder: "Mô tả",
        maxSize: "1900",
        rows: "6",
        datasourcemember: "Description",
        readonly: false,
        Colmd:12,
        labelcolspan:2,
        colspan:10,
        OrderIndex:5
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        datasourcemember:"IsActived",
        label: "Kích hoạt:",
        value: true,
        readonly: false,
        OrderIndex:6
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        datasourcemember:"IsSystem",
        label: "Hệ thống:",
        value: false,
        readonly: false,
        OrderIndex:7
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtInstallBundleID",
        label: "mã gói sản phẩm lắp đặt",
        value: "",
        maxsize: "20",
        placeholder: "Mã gói sản phẩm lắp đặt",
        datasourcemember: "InstallBundleID",
        readonly: true,
        validatonList: ["required"],
        OrderIndex:1

    },
    {
        type: "text",
        name: "txtInstallBundleName",
        label: "tên gói sản phẩm lắp đặt",
        value: "",
        maxsize: "175",
        placeholder: "Tên gói sản phẩm lắp đặt",
        datasourcemember: "InstallBundleName",
        readonly: false,
        validatonList: ["required"],
        OrderIndex:2
    },
    {
        type: "select",
        name: "cbShipmentOrderTypeID",
        label: "loại yêu cầu vận chuyển",
        value: "",
        listoption: [],
        datasourcemember: "ShipmentOrderTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
        valuemember: "ShipmentOrderTypeID",
        nameMember: "ShipmentOrderTypeName",
        OrderIndex:3
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
        OrderIndex:4
    },
    {
        type: "TextArea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        placeholder: "Mô tả",
        maxSize: "1900",
        rows: "6",
        datasourcemember: "Description",
        readonly: false,
        Colmd:12,
        labelcolspan:2,
        colspan:10,
        OrderIndex:5
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
        datasourcemember: "IsActived",
        OrderIndex:6
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
        datasourcemember: "IsSystem",
        OrderIndex:7
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
        Name: "InstallBundle_MaterialList",
        DefaultValue: {},
        BindControlName: "InstallBundle_MaterialList",
        DataSourceMember: "InstallBundle_MaterialList"
    }

];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "InstallBundleID",
        Width: 60
    },
    {
        Name: "InstallBundleID",
        Type: "text",
        Caption: "Mã gói sản phẩm lắp đặt",
        DataSourceMember: "InstallBundleID",
        Width: 150
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
        Width: 120
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
    

export const GridInstallBundle_Materia = [

    {
        Name: "InstallBundleID",
        DefaultValue: "",
        BindControlName: "InstallBundleID",
        DataSourceMember: "InstallBundleID"
    },
    {
        Name: "MaterialGroupID",
        DefaultValue: "",
        BindControlName: "MaterialGroupID",
        DataSourceMember: "MaterialGroupID"
    },
    {
        Name: "MaterialGroupName",
        DefaultValue: "",
        BindControlName: "MaterialGroupName",
        DataSourceMember: "MaterialGroupName"
    },
    {
        Name: "StandardUsAgeQuantity",
        DefaultValue: "",
        BindControlName: "StandardUsAgeQuantity",
        DataSourceMember: "StandardUsAgeQuantity"
    },
    {
        Name: "MaxUsAgeQuantity",
        DefaultValue: "",
        BindControlName: "MaxUsAgeQuantity",
        DataSourceMember: "MaxUsAgeQuantity"
    },
    {
        Name: "UsAgeRecordType",
        DefaultValue: -1,
        BindControlName: "UsAgeRecordType",
        DataSourceMember: "UsAgeRecordType"
    },
    {
        Name: "ConvertToMaterialGroupID",
        DefaultValue: "",
        BindControlName: "ConvertToMaterialGroupID",
        DataSourceMember: "ConvertToMaterialGroupID"
    },
    {
        Name: "OutputUsAgeType",
        DefaultValue: "",
        BindControlName: "OutputUsAgeType",
        DataSourceMember: "OutputUsAgeType"
    },
    {
        Name: "ConvertRatio",
        DefaultValue: '',
        BindControlName: "ConvertRatio",
        DataSourceMember: "ConvertRatio"
    },
    {
        Name: "IsHasPromotion",
        DefaultValue: false,
        BindControlName: "IsHasPromotion",
        DataSourceMember: "IsHasPromotion"
    },
    {
        Name: "PromotionQuantity",
        DefaultValue: "",
        BindControlName: "PromotionQuantity",
        DataSourceMember: "PromotionQuantity"
    },
    {
        Name: "AdvanceLimitType",
        DefaultValue: '',
        BindControlName: "AdvanceLimitType",
        DataSourceMember: "AdvanceLimitType"
    },
    {
        Name: "AdvanceLimitQuantity",
        DefaultValue: '',
        BindControlName: "AdvanceLimitQuantity",
        DataSourceMember: "AdvanceLimitQuantity"
    },
    {
        Name: "IsRoundIngQuantity",
        DefaultValue: false,
        BindControlName: "IsRoundIngQuantity",
        DataSourceMember: "IsRoundIngQuantity"
    },
    {
        Name: "Note",
        DefaultValue: '',
        BindControlName: "Note",
        DataSourceMember: "Note"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
   
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "CreatedUserFullName"
    },
    {
        Name: "UpdatedUser",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "UpdatedUser"
    },
    {
        Name: "InstallBundle_MaterialList",
        DefaultValue: {},
        BindControlName: "InstallBundle_MaterialList",
        DataSourceMember: "InstallBundle_MaterialList"
    }
];
export const InstallBundle_MateriaColumnList = [
    {
        name: "MaterialGroupID",
        Type: "ComboBox",
        Caption: "nhóm vật tư",
        label: "nhóm vật tư",
        datasourcemember: "MaterialGroupID",
        validatonList:["Comborequired"],
        isautoloaditemfromcache:true,
        loaditemcachekeyid:"ERPCOMMONCACHE.MATERIALGROUP",
        valuemember:"MaterialGroupID",
        nameMember:"MaterialGroupName",
        namelabel:"MaterialGroupName",
        OrderIndex: 1,
        hideInput: false,
        Colmd:12,
        labelcolspan:2,
        colspan:10
    },
    {
        name: "MaterialGroupName",
        Type: "text",
        Caption: "nhóm vật tư",
        label: "nhóm vật tư",
        datasourcemember: "MaterialGroupName",
        Width: 100,
        OrderIndex: 1
    },
    {
        name: "ConvertToMaterialGroupID",
        Type: "ComboBox",
        Caption: "nhóm vật tư quy đổi",
        label: "nhóm vật tư quy đổi",
        datasourcemember: "ConvertToMaterialGroupID",
        isautoloaditemfromcache:true,
        loaditemcachekeyid:"ERPCOMMONCACHE.MATERIALGROUP",
        valuemember:"MaterialGroupID",
        nameMember:"MaterialGroupName",
        OrderIndex: 2,
        hideInput: false
    },
    {
        name: "ConvertRatio",
        Type: "TextNumber",
        Caption: "Tỷ lệ quy đổi",
        label:"Tỷ lệ quy đổi",
        validatonList: ["required","number"],
        datasourcemember: "ConvertRatio",
        OrderIndex:3,
        hideInput: false,
        min:1,
        max:9999
    },
    {
        name: "StandardUsAgeQuantity",
        Type: "TextNumber",
        label:"Số lượng chuẩn",
        Caption: "Số lượng chuẩn",
        datasourcemember: "StandardUsAgeQuantity",
        Width: 200,
        validatonList: ["required","number"],
        OrderIndex:4,
        min:1,
        max:9999
    },
    {
        name: "MaxUsAgeQuantity",
        Type: "TextNumber",
        label:"Số lượng tối đa",
        Caption: "Số lượng tối đa",
        datasourcemember: "MaxUsAgeQuantity",
        Width: 200,
        validatonList: ["required","number"],
        OrderIndex:5,
        min:1,
        max:9999
    },
    {
        name: "UsAgeRecordType",
        Type: "ComboBox",
        Caption: "Hình thức sử dụng",
        label: "Hình thức sử dụng",
        datasourcemember: "UsAgeRecordType",
        isautoloaditemfromcache:false,
        listoption:[{ value: -1, label: "--Vui lòng chọn--" },{ value: 1, label: "Nhập tay" },{ value: 2, label: "Quy đổi" }],
        OrderIndex: 6,
        hideInput: false
    },
    {
        name: "OutputUsAgeType",
        Type: "ComboBox",
        Caption: "Hình thức xuất",
        label: "Hình thức xuất",
        datasourcemember: "OutputUsAgeType",
        validatonList:["Comborequired"],
        isautoloaditemfromcache:false,
        listoption:[{ value: -1, label: "--Vui lòng chọn--" },{ value: 1, label: "Xuất tiêu hao" },{ value: 2, label: "Xuất bán" }],
        OrderIndex: 7,
        hideInput: false
    },
    {
        name: "IsHasPromotion",
        Type: "checkbox",
        label:"Có khuyến mãi",
        Caption: "Có khuyến mãi",
        datasourcemember: "IsHasPromotion",
        OrderIndex:8,
        hideInput: false
    },
    {
        name: "PromotionQuantity",
        Type: "TextNumber",
        label:"Số lượng khuyến mãi",
        Caption: "Số lượng khuyến mãi",
        datasourcemember: "PromotionQuantity",
        validatonList: ["required","number"],
        OrderIndex:9,
        min:1,
        max:9999,
        hideInput: false
    },
    {
        name: "AdvanceLimitType",
        Type: "ComboBox",
        Caption: "Loại giới hạn tạm ứng",
        label: "Loại giới hạn tạm ứng",
        datasourcemember: "AdvanceLimitType",
        validatonList:["Comborequired"],
        isautoloaditemfromcache:false,
        listoption:[{ value: -1, label: "--Vui lòng chọn--" },{ value: 1, label: "Giới hạn theo số lượng" },{ value: 2, label: "Giới hạn theo tổng tiền"},{ value: 3, label: "Không giới hạn"}],
        OrderIndex: 10,
        hideInput: false
    },
    {
        name: "AdvanceLimitQuantity",
        Type: "TextNumber",
        label:"Số lượng giới hạn tạm ứng",
        Caption: "Số lượng giới hạn tạm ứng",
        datasourcemember: "AdvanceLimitQuantity",
        validatonList: ["number"],
        OrderIndex:11,
        min:1,
        max:9999,
        hideInput: false
    },
    {
        name: "IsRoundIngQuantity",
        Type: "checkbox",
        label:"Có làm tròn số lượng",
        datasourcemember: "IsRoundIngQuantity",
        OrderIndex:12,
        hideInput: false
    },
    {
        name: "IsActived",
        Type: "checkbox",
        label:"kích hoạt",
        Caption: "Kích hoạt",
        datasourcemember: "IsActived",
        Width: 70,
        OrderIndex:13
    },
    {
        name: "Note",
        Type: "TextArea",
        label:"Ghi chú",
        Caption: "Ghi chú",
        datasourcemember: "Note",
        OrderIndex:14,
        Colmd:12,
        hideInput: false,
        labelcolspan:2,
        colspan:10
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
