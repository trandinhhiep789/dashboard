export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/LeadOrderType/Search";
export const LoadAPIPath = "api/LeadOrderType/Load";
export const AddAPIPath = "api/LeadOrderType/Add";
export const UpdateAPIPath = "api/LeadOrderType/Update";
export const DeleteAPIPath = "api/LeadOrderType/Delete";
export const BackLink = "/LeadOrderType";
export const AddLink = "/LeadOrderType/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "LeadOrderTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách loại mối bán hàng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadOrderType", Title: "Danh sách loại mối bán hàng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadOrderType", Title: "Danh sách loại mối bán hàng" },
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
        DataSourceMember: "LeadOrderTypeProcessID",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Phương thức xử lý của mối bán hàng",
        listoption: [],
        LoadItemCacheKeyID: "",
        name: "cbLeadOrderTypeProcessID",
        NameMember: "LeadOrderTypeProcessName",
        placeholder: "Phương thức xử lý của mối bán hàng",
        value: -1,
        ValueMember: "LeadOrderTypeProcessID",
        validatonList: ["Comborequired"],
    },
    {
        type: "text",
        name: "txtLeadOrderName",
        label: "Tên loại mỗi bán hàng",
        value: "",
        maxSize: "150",
        placeholder: "Tên loại mối bán hàng",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "450",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        name: "cbAddFunctionID",
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
        // KeyFilter: "FunctionCategoryID",
        // ValueFilter: "1,2"
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
        name: "txtLeadOrderTypeID",
        label: "Mã loại mỗi bán hàng",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderTypeID",
        disabled: true,
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "multiselect",
        DataSourceMember: "LeadOrderTypeProcessID",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Phương thức xử lý của mối bán hàng",
        listoption: [],
        LoadItemCacheKeyID: "",
        name: "cbLeadOrderTypeProcessID",
        NameMember: "LeadOrderTypeProcessName",
        placeholder: "Phương thức xử lý của mối bán hàng",
        value: -1,
        ValueMember: "LeadOrderTypeProcessID",
        validatonList: ["Comborequired"],
    },
    {
        type: "text",
        name: "txtLeadOrderName",
        label: "Tên loại mối bán hàng",
        value: "",
        maxSize: "150",
        placeholder: "Tên loại mối bán hàng",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "450",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        name: "cbAddFunctionID",
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
        // KeyFilter: "FunctionCategoryID",
        // ValueFilter: "1,2"
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
        Name: "LeadOrderTypeID",
        DefaultValue: "",
        BindControlName: "txtLeadOrderTypeID",
        DataSourceMember: "LeadOrderTypeID"
    },
    {
        Name: "LeadOrderName",
        DefaultValue: "",
        BindControlName: "txtLeadOrderName",
        DataSourceMember: "LeadOrderName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "AddFunctionID",
        DefaultValue: "",
        BindControlName: "cbAddFunctionID",
        DataSourceMember: "AddFunctionID"
    },
    {
        Name: "LeadOrderTypeProcessID",
        DefaultValue: "",
        BindControlName: "txtLeadOrderTypeProcessID",
        DataSourceMember: "LeadOrderTypeProcessID"
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
        DataSourceMember: "LeadOrderTypeID",
        Width: 50
    },
    {
        Name: "LeadOrderTypeID",
        Type: "text",
        Caption: "Mã loại mỗi bán hàng",
        DataSourceMember: "LeadOrderTypeID",
        Width: 70,
    },
    {
        Name: "LeadOrderName",
        Type: "text",
        Caption: "Tên loại mối bán hàng",
        DataSourceMember: "LeadOrderName",
        Width: 170
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        Width: 150
    },
    {
        Name: "LeadOrderTypeProcessID",
        Type: "text",
        Caption: "Phương thức xử lý của loại mỗi bán hàng",
        DataSourceMember: "LeadOrderTypeProcessID",
        Width: 120
    },
    {
        Name: "LeadOrderTypeProcessName",
        Type: "text",
        Caption: "Phương thức xử lý của loại mỗi bán hàng",
        DataSourceMember: "LeadOrderTypeProcessName",
        Width: 120
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 150
    },
    {
        Name: "CreatedDate",
        Type: "datetime",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
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
        DataSourceMember: "LeadOrderTypeID",
        Width: 80,
        Link: "/LeadOrderType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];