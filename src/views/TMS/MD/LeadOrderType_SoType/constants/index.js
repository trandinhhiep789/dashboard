import { ERPCOMMONCACHE_LEADORDERTYPE, ERPCOMMONCACHE_SALEORDERTYPE } from './../../../../../constants/keyCache';

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/LeadOrderTypeSoType/Search";
export const LoadAPIPath = "api/LeadOrderTypeSoType/Load";
export const AddAPIPath = "api/LeadOrderTypeSoType/Add";
export const UpdateAPIPath = "api/LeadOrderTypeSoType/Update";
export const DeleteAPIPath = "api/LeadOrderTypeSoType/Delete";
export const BackLink = "/LeadOrderTypeSoType";
export const AddLink = "/LeadOrderTypeSoType/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "LeadOrderTyped,SaleOrderTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh mục loại mối bán hàng - loại đơn hàng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadOrderTypeSoType", Title: "Danh mục loại mối bán hàng - loại đơn hàng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadOrderTypeSoType", Title: "Danh mục loại mối bán hàng - loại đơn hàng" },
    { Link: "", Title: "Thêm" }
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
        DataSourceMember: "LeadOrderTyped",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Loại mối bán hàng",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_LEADORDERTYPE,
        name: "cbLeadOrderTyped",
        NameMember: "LeadOrderName",
        placeholder: "Loại mối bán hàng",
        value: -1,
        ValueMember: "LeadOrderTypeID",
        validatonList: ["Comborequired"],
    },
    {
        type: "multiselect",
        DataSourceMember: "SaleOrderTypeID",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Loại đơn hàng",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_SALEORDERTYPE,
        name: "cbSaleOrderTypeID",
        NameMember: "SaleOrderTypeName",
        placeholder: "Loại đơn hàng",
        value: -1,
        ValueMember: "SaleOrderTypeID",
        validatonList: ["Comborequired"],
    },
    {
        type: "text",
        name: "txtNumberOfExpectDeliveryDay",
        label: "Số ngày xử lý:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "NumberOfExpectDeliveryDay",
        disabled: false,
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "checkbox",
        name: "chkIsDefault",
        label: "Mặc định:",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: [],
        DataSourceMember: "IsDefault",
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
        type: "multiselect",
        DataSourceMember: "LeadOrderTyped",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Loại mối bán hàng",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_LEADORDERTYPE,
        name: "cbLeadOrderTyped",
        NameMember: "LeadOrderName",
        placeholder: "Loại mối bán hàng",
        value: -1,
        ValueMember: "LeadOrderTypeID",
        validatonList: ["Comborequired"],
        readonly: true,
        disabled: true
    },
    {
        type: "multiselect",
        DataSourceMember: "SaleOrderTypeID",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Loại đơn hàng",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_SALEORDERTYPE,
        name: "cbSaleOrderTypeID",
        NameMember: "SaleOrderTypeName",
        placeholder: "Loại đơn hàng",
        value: -1,
        ValueMember: "SaleOrderTypeID",
        validatonList: ["Comborequired"],
        readonly: true,
        disabled: true
    },
    
    {
        type: "text",
        name: "txtNumberOfExpectDeliveryDay",
        label: "Số ngày xử lý:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "NumberOfExpectDeliveryDay",
        disabled: false,
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "checkbox",
        name: "chkIsDefault",
        label: "Mặc định:",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: [],
        DataSourceMember: "IsDefault",
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
        Name: "LeadOrderTyped",
        DefaultValue: "",
        BindControlName: "cbLeadOrderTyped",
        DataSourceMember: "LeadOrderTyped"
    },
    {
        Name: "SaleOrderTypeID",
        DefaultValue: "",
        BindControlName: "cbSaleOrderTypeID",
        DataSourceMember: "SaleOrderTypeID"
    },
    {
        Name: "IsDefault",
        DefaultValue: "",
        BindControlName: "chkIsDefault",
        DataSourceMember: "IsDefault"
    },
    {
        Name: "NumberOfExpectDeliveryDay",
        DefaultValue: "",
        BindControlName: "txtNumberOfExpectDeliveryDay",
        DataSourceMember: "NumberOfExpectDeliveryDay"
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
        DataSourceMember: "LeadOrderTyped,SaleOrderTypeID",
        Width: 50
    },
    {
        Name: "LeadOrderTypedName",
        Type: "text",
        Caption: "Tên loại mối bán hàng",
        DataSourceMember: "LeadOrderTypedName",
        Width: 120
    },
    {
        Name: "SaleOrderTypeName",
        Type: "text",
        Caption: "Tên loại đơn hàng",
        DataSourceMember: "SaleOrderTypeName",
        Width: 120
    },
    {
        Name: "IsDefault",
        Type: "checkicon",
        Caption: "Mặc định",
        DataSourceMember: "IsDefault",
        Width: 40
    },
    {
        Name: "NumberOfExpectDeliveryDay",
        Type: "text",
        Caption: "Số ngày xử lý",
        DataSourceMember: "NumberOfExpectDeliveryDay",
        Width:70
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
        Width: 100
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
        DataSourceMember: "LeadOrderTypeSoType",
        Width: 80,
        Link: "/LeadOrderTypeSoType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
