export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/AdvanceRequestType/Search";
export const LoadAPIPath = "api/AdvanceRequestType/Load";
export const AddAPIPath = "api/AdvanceRequestType/Add";
export const UpdateAPIPath = "api/AdvanceRequestType/Update";
export const DeleteAPIPath = "api/AdvanceRequestType/Delete";
export const UpdateOrderAPIPath = "api/AdvanceRequestType/UpdateOrder";
export const BackLink = "/AdvanceRequestType";
export const AddLink = "/AdvanceRequestType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AdvanceRequestTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Loại yêu cầu tạm ứng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AdvanceRequestType", Title: "Loại yêu cầu tạm ứng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AdvanceRequestType", Title: "Loại yêu cầu tạm ứng" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AdvanceRequestType", Title: "Loại yêu cầu tạm ứng" },
    { Link: "", Title: "Chi tiết loại yêu cầu tạm ứng" }
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
        type: "text",
        name: "txtAdvanceRequestTypeID",
        label: "mã loại yêu cầu tạm ứng",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AdvanceRequestTypeID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAdvanceRequestTypeName",
        label: "tên loại yêu cầu tạm ứng",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AdvanceRequestTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        name: "AddFunctionID",
        type: "multiselect",
        label: "Quyền thêm",
        DataSourceMember: "AddFunctionID",
        readonly: false,
        value: -1,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.FUNCTION",
        ValueMember: "FunctionID",
        NameMember: "FunctionName",
        KeyFilter: "FunctionCategoryID",
        ValueFilter: "1,2"
    },
    {
        type: "checkbox",
        name: "IsAutoReview",
        label: "Có tự động duyệt",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "IsAutoOutput",
        label: "Có tự động xuất",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "IsAdvanceByShipmentOrder",
        label: "Tạm ứng theo vận đơn",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "select",
        name: "InstallBundleID",
        label: "gói lắp đặt cần tạm ứng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "InstallBundleID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.INSTALLBUNDLE",
        ValueMember: "InstallBundleID",
        NameMember: "InstallBundleName"
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
        value: "0",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: 1,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtAdvanceRequestTypeID",
        label: "mã loại yêu cầu tạm ứng",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AdvanceRequestTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAdvanceRequestTypeName",
        label: "tên loại yêu cầu tạm ứng",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AdvanceRequestTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        name: "AddFunctionID",
        type: "multiselect",
        label: "Quyền thêm",
        DataSourceMember: "AddFunctionID",
        readonly: false,
        value: -1,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.FUNCTION",
        ValueMember: "FunctionID",
        NameMember: "FunctionName",
        KeyFilter: "FunctionCategoryID",
        ValueFilter: "1,2"
    },
    {
        type: "checkbox",
        name: "IsAutoReview",
        label: "Có tự động duyệt",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsAutoReview",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "IsAutoOutput",
        label: "Có tự động xuất",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsAutoOutput",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "IsAdvanceByShipmentOrder",
        label: "Tạm ứng theo vận đơn",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsAdvanceByShipmentOrder",
        readonly: false,
        validatonList: []
    },
    {
        type: "select",
        name: "InstallBundleID",
        label: "gói lắp đặt cần tạm ứng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "InstallBundleID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.INSTALLBUNDLE",
        ValueMember: "InstallBundleID",
        NameMember: "InstallBundleName"
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: []
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
        Name: "AdvanceRequestTypeID",
        DefaultValue: "",
        BindControlName: "txtAdvanceRequestTypeID",
        DataSourceMember: "AdvanceRequestTypeID"
    },
    {
        Name: "AdvanceRequestTypeName",
        DefaultValue: "",
        BindControlName: "txtAdvanceRequestTypeName",
        DataSourceMember: "AdvanceRequestTypeName"
    },
    {
        Name: "AddFunctionID",
        DefaultValue: "",
        BindControlName: "AddFunctionID",
        DataSourceMember: "AddFunctionID"
    },
    {
        Name: "IsAutoReview",
        DefaultValue: "",
        BindControlName: "IsAutoReview",
        DataSourceMember: "IsAutoReview"
    },
    {
        Name: "IsAutoOutput",
        DefaultValue: "",
        BindControlName: "IsAutoOutput",
        DataSourceMember: "IsAutoOutput"
    },
    {
        Name: "IsAdvanceByShipmentOrder",
        DefaultValue: "",
        BindControlName: "IsAdvanceByShipmentOrder",
        DataSourceMember: "IsAdvanceByShipmentOrder"
    },
    {
        Name: "InstallBundleID",
        DefaultValue: "",
        BindControlName: "InstallBundleID",
        DataSourceMember: "InstallBundleID"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "txtOrderIndex",
        DataSourceMember: "OrderIndex"
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
        DataSourceMember: "AdvanceRequestTypeID",
        Width: 60
    },
    {
        Name: "AdvanceRequestTypeID",
        Type: "text",
        Caption: "Mã loại yêu cầu tạm ứng",
        DataSourceMember: "AdvanceRequestTypeID",
        Width: 200
    },
    {
        Name: "AdvanceRequestTypeName",
        Type: "texttolink",
        Caption: "Tên loại yêu cầu tạm ứng",
        Link: "/AdvanceRequestType/Detail/",
        DataSourceMember: "AdvanceRequestTypeName",
        Width: 250
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        //Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "UpdatedDate",
        Type: "date",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
        Width: 140
    },
    {
        Name: "UpdatedUserFullName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserFullName",
        Width: 140
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "AdvanceRequestTypeID",
        Width: 100,
        Link: "/AdvanceRequestType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
