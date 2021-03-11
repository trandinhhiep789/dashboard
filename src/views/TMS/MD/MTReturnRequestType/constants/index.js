export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/MTReturnRequestType/Search";
export const LoadAPIPath = "api/MTReturnRequestType/Load";
export const AddAPIPath = "api/MTReturnRequestType/Add";
export const UpdateAPIPath = "api/MTReturnRequestType/Update";
export const DeleteAPIPath = "api/MTReturnRequestType/Delete";
export const UpdateOrderAPIPath = "api/MTReturnRequestType/UpdateOrder";
export const BackLink = "/MTReturnRequestType";
export const AddLink = "/MTReturnRequestType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "MTReturnRequestTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Loại yêu cầu nhập trả vật tư" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MTReturnRequestType", Title: "Loại yêu cầu nhập trả vật tư" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MTReturnRequestType", Title: "Loại yêu cầu nhập trả vật tư" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MTReturnRequestType", Title: "Loại yêu cầu nhập trả vật tư" },
    { Link: "", Title: "Chi tiết yêu cầu nhập trả vật tư" }
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
        name: "txtMTReturnRequestTypeID",
        label: "mã loại yêu cầu nhập trả vật tư",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MTReturnRequestTypeID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtMTReturnRequestTypeName",
        label: "tên loại yêu cầu nhập trả vật tư",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MTReturnRequestTypeName",
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
        name: "IsAllowDuplicationProduct",
        label: "cho phép nhập trùng sản phẩm trên 1 yêu cầu",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    // {
    //     type: "checkbox",
    //     name: "IsAutoOutput",
    //     label: "Có tự động xuất",
    //     value: 0,
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     readonly: false,
    //     validatonList: []
    // },
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
        name: "txtMTReturnRequestTypeID",
        label: "mã loại yêu cầu nhập trả vật tư",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MTReturnRequestTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtMTReturnRequestTypeName",
        label: "tên loại yêu cầu nhập trả vật tư",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MTReturnRequestTypeName",
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
        name: "IsAllowDuplicationProduct",
        label: "cho Phép Nhập Trùng Sản Phẩm Trên 1 Yêu Cầu",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsAllowDuplicationProduct",
        readonly: false,
        validatonList: []
    },
    // {
    //     type: "checkbox",
    //     name: "IsAutoOutput",
    //     label: "Có tự động xuất",
    //     value: 0,
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "IsAutoOutput",
    //     readonly: false,
    //     validatonList: []
    // },
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
        Name: "MTReturnRequestTypeID",
        DefaultValue: "",
        BindControlName: "txtMTReturnRequestTypeID",
        DataSourceMember: "MTReturnRequestTypeID"
    },
    {
        Name: "MTReturnRequestTypeName",
        DefaultValue: "",
        BindControlName: "txtMTReturnRequestTypeName",
        DataSourceMember: "MTReturnRequestTypeName"
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
        Name: "IsAllowDuplicationProduct",
        DefaultValue: "",
        BindControlName: "IsAllowDuplicationProduct",
        DataSourceMember: "IsAllowDuplicationProduct"
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
        DataSourceMember: "MTReturnRequestTypeID",
        Width: 60
    },
    {
        Name: "MTReturnRequestTypeID",
        Type: "text",
        Caption: "Mã Loại yêu cầu nhập trả vật tư",
        DataSourceMember: "MTReturnRequestTypeID",
        Width: 220
    },
    {
        Name: "MTReturnRequestTypeName",
        Type: "texttolink",
        Link: "/MTReturnRequestType/Detail/",
        Caption: "Tên Loại yêu cầu nhập trả vật tư",
        DataSourceMember: "MTReturnRequestTypeName",
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
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "MTReturnRequestTypeID",
        Width: 100,
        Link: "/MTReturnRequestType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
