export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/LeadAdvice/Search";
export const LoadAPIPath = "api/LeadAdvice/Load";
export const AddAPIPath = "api/LeadAdvice/Add";
export const UpdateAPIPath = "api/LeadAdvice/Update";
export const DeleteAPIPath = "api/LeadAdvice/Delete";
export const BackLink = "/LeadAdvice";
export const AddLink = "/LeadAdvice/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "LeadAdviceID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh mục sản phẩm tư vấn ứng với loại yêu cầu vận chuyển (cùng loại )" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadAdvice", Title: "Danh mục sản phẩm tư vấn ứng với loại yêu cầu vận chuyển (cùng loại )" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadAdvice", Title: "Danh mục sản phẩm tư vấn ứng với loại yêu cầu vận chuyển (cùng loại )" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadAdvice", Title: "Danh mục sản phẩm tư vấn ứng với loại yêu cầu vận chuyển (cùng loại )" },
    { Link: "", Title: "Chi tiết" }
];


export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}
    }
];

export const AddElementList = [
    {
        type: "multiselect",
        DataSourceMember: "ShipmentOrderTypeID",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Loại yêu cầu vận chuyển",
        listoption: [],
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
        name: "cbShipmentOrderTypeID",
        NameMember: "ShipmentOrderTypeName",
        placeholder: "Loại yêu cầu vận chuyển",
        value: -1,
        ValueMember: "ShipmentOrderTypeID",
        validatonList: ["Comborequired"],
    },
    {
        type: "multiselect",
        DataSourceMember: "MainGroupID",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Ngành hàng",
        listoption: [],
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        name: "cbMainGroupID",
        NameMember: "MainGroupName",
        placeholder: "Ngành hàng",
        value: -1,
        ValueMember: "MainGroupID",
        validatonList: ["Comborequired"],
    },
    {
        type: "multiselect",
        DataSourceMember: "SubGroupID",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Nhóm hàng",
        listoption: [],
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        name: "cbSubGroupID",
        NameMember: "SubGroupName",
        placeholder: "Nhóm hàng",
        value: -1,
        ValueMember: "SubGroupID",
        validatonList: ["Comborequired"],
    },
    {
        name: "cbProductID",
        type: "productbox",
        label: "Mã sản phẩm",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: ["Comborequired"],
    },
    {
        type: "checkbox",
        name: "chkIsAdviceOtherProduct",
        label: "Tư vấn sản phẩm khác:",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: [],
        DataSourceMember: "IsAdviceOtherProduct",
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: true,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: [],
        DataSourceMember: "IsActived",
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: [],
        DataSourceMember: "IsSystem",
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtLeadAdviceID",
        label: "Mã tư vấn mối bán hàng",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadAdviceID",
        disabled:true,
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "multiselect",
        DataSourceMember: "ShipmentOrderTypeID",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Loại yêu cầu vận chuyển",
        listoption: [],
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
        name: "cbShipmentOrderTypeID",
        NameMember: "ShipmentOrderTypeName",
        placeholder: "Loại yêu cầu vận chuyển",
        value: -1,
        ValueMember: "ShipmentOrderTypeID",
        validatonList: ["Comborequired"],
    },
    {
        type: "multiselect",
        DataSourceMember: "MainGroupID",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Ngành hàng",
        listoption: [],
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        name: "cbMainGroupID",
        NameMember: "MainGroupName",
        placeholder: "Ngành hàng",
        value: -1,
        ValueMember: "MainGroupID",
        validatonList: ["Comborequired"],
    },
    {
        type: "multiselect",
        DataSourceMember: "SubGroupID",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Nhóm hàng",
        listoption: [],
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        name: "cbSubGroupID",
        NameMember: "SubGroupName",
        placeholder: "Nhóm hàng",
        value: -1,
        ValueMember: "SubGroupID",
        validatonList: ["Comborequired"],
    },
    {
        name: "cbProductID",
        type: "productbox",
        label: "Mã sản phẩm",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: ["Comborequired"]
    },
    {
        type: "checkbox",
        name: "chkIsAdviceOtherProduct",
        label: "Tư vấn sản phẩm khác:",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: [],
        DataSourceMember: "IsAdviceOtherProduct",
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: true,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: [],
        DataSourceMember: "IsActived",
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: [],
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
        Name: "LeadAdviceID",
        DefaultValue: "",
        BindControlName: "txtLeadAdviceID",
        DataSourceMember: "LeadAdviceID"
    },
    {
        Name: "ShipmentOrderTypeID",
        DefaultValue: "",
        BindControlName: "cbShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID"
    },
    {
        Name: "MainGroupID",
        DefaultValue: "",
        BindControlName: "cbMainGroupID",
        DataSourceMember: "MainGroupID"
    },
    {
        Name: "SubGroupID",
        DefaultValue: "",
        BindControlName: "cbSubGroupID",
        DataSourceMember: "SubGroupID"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "cbProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "IsAdviceOtherProduct",
        DefaultValue: false,
        BindControlName: "chkIsAdviceOtherProduct",
        DataSourceMember: "IsAdviceOtherProduct"
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
        DataSourceMember: "CreatedUser"
    },
    {
        Name: "UpdatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "UpdatedUser"
    },
    {
        Name: "LoginLogID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: ""
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "LeadAdviceID",
        Width: 50
    },
    {
        Name: "LeadAdviceID",
        Type: "texttolink",
        Caption: "Mã tư vấn bán hàng",
        DataSourceMember: "LeadAdviceID",
        Width: 120,
        Link: "/LeadAdvice/Detail/",
    },
    {
        Name: "ShipmentOrderTypeName",
        Type: "text",
        Caption: "Loại yêu cầu vận chuyển",
        DataSourceMember: "ShipmentOrderTypeName",
        Width: 170
    },
    {
        Name: "SubGroupName",
        Type: "text",
        Caption: "Nhóm hàng",
        DataSourceMember: "SubGroupName",
        Width: 150
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Sản phẩm",
        DataSourceMember: "ProductName",
        Width: 150
    },
    {
        Name: "IsAdviceOtherProduct",
        Type: "checkicon",
        Caption: "Tư vấn sản phẩm khác",
        DataSourceMember: "IsAdviceOtherProduct",
        Width: 130
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 120
    },
    {
        Name: "CreatedDate",
        Type: "datetime",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 120
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 60
    },
    {
        Name: "IsSystem",
        Type: "checkicon",
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Width: 60
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "LeadAdviceID",
        Width: 80,
        Link: "/LeadAdvice/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
