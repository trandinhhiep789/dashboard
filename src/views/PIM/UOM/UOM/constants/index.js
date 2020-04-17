export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/UOM/Search";
export const LoadAPIPath = "api/UOM/Load";
export const AddAPIPath = "api/UOM/Add";
export const UpdateAPIPath = "api/UOM/Update";
export const DeleteAPIPath = "api/UOM/Delete";
export const UpdateOrderAPIPath = "api/UOM/UpdateOrder";
export const LoadAPIPathLanguage = "api/UOM_lang/Load";
export const BackLink = "/UOM";
export const AddLink = "/UOM/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "UOMID";
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];
export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/UOM", Title: "Đơn vị" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/UOM", Title: "Đơn vị" },
    { Link: "", Title: "Sửa đơn vị" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/UOM", Title: "Đơn vị" },
    { Link: "", Title: "Thêm đơn vị" }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa ",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}
    }
];

export const AddElementList = [
    // {
    //     type: "text",
    //     name: "txtUOMID",
    //     label: "Mã đơn vị",
    //     value: "",
    //     placeholder: "(ID tạo tự động)",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "UOMID",
    //     readonly: true,
    //     validatonList: []
    // },
    {
        type: "text",
        name: "txtUOMName",
        label: "Tên đơn vị",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "UOMName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "txtUOMTypeID",
        label: "Mã loại đơn vị",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "UOMTypeID",
        readonly: false,
        validatonList: ["required", "number"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.UOMTYPE",
        ValueMember: "UOMTypeID",
        NameMember: "UOMTypeName"
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: [],
        rows: "6"
    },
    {
        type: "checkbox",
        name: "chkIsAllowDecimal",
        label: "Cho phép nhập số lẻ",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: 0,
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"],
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: [],
        value: "true"
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống",
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
        name: "txtUOMID",
        label: "Mã đơn vị",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: true,
        DataSourceMember: "UOMID",
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtUOMName",
        label: "Tên đơn vị",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "UOMName",
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "txtUOMTypeID",
        label: "Mã loại đơn vị",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "UOMTypeID",
        validatonList: ["required", "number"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.UOMTYPE",
        ValueMember: "UOMTypeID",
        NameMember: "UOMTypeName"
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "Description",
        validatonList: [],
        rows: "6"
    },
    {
        type: "checkbox",
        name: "chkIsAllowDecimal",
        label: "Cho phép nhập số lẻ",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsAllowDecimal",
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: 0,
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"],
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsActived",
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsSystem",
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
        Name: "UOMID",
        DefaultValue: "",
        BindControlName: "txtUOMID",
        DataSourceMember: "UOMID"
    },
    {
        Name: "UOMName",
        DefaultValue: "",
        BindControlName: "txtUOMName",
        DataSourceMember: "UOMName"
    },
    {
        Name: "UOMTypeID",
        DefaultValue: "",
        BindControlName: "txtUOMTypeID",
        DataSourceMember: "UOMTypeID"
    },
    {
        Name: "UOMTypeName",
        DefaultValue: "",
        BindControlName: "txtUOMTypeName",
        DataSourceMember: "UOMTypeName"
    },
    {
        Name: "IsAllowDecimal",
        DefaultValue: true,
        BindControlName: "chkIsAllowDecimal",
        DataSourceMember: "IsAllowDecimal"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "0",
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
        Name: "lstUOM_Lang",
        DefaultValue: {},
        BindControlName: "inputGridUOMName_lang",
        DataSourceMember: "inputGridUOMName_lang"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "UOMID",
        Width: 50
    },
    {
        Name: "UOMID",
        Type: "text",
        Caption: "Mã đơn vị",
        DataSourceMember: "UOMID",
        Width: 150
    },
    {
        Name: "UOMName",
        Type: "text",
        Caption: "Tên đơn vị",
        DataSourceMember: "UOMName",
        Width: 200
    },
    {
        Name: "UOMTypeID",
        Type: "text",
        Caption: "Loại đơn vị",
        DataSourceMember: "UOMTypeName",
        Width: 250
    },
    {
        Name: "IsAllowDecimal",
        Type: "checkicon",
        Caption: "Cho phép nhập số lẻ",
        DataSourceMember: "IsAllowDecimal",
        Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 200
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 200
    },
    {
        Name: "CreatedFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedFullName",
        Width: 200
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "UOMID",
        Width: 200,
        Link: "/UOM/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const InputLanguageColumnList = [
    {
        Name: "LanguageName",
        Type: "text",
        Caption: "Tên ngôn ngữ",
        DataSourceMember: "LanguageName",
        Width: 150
    },

    {
        Name: "UOMName",
        Type: "textbox",
        Caption: "Tên kết hợp sản phẩm",
        DataSourceMember: "UOMName",
        Width: 200,
        //validatonList: ["required"]
    },
    {
        Name: "Description",
        Type: "textbox",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        Width: 250
    }
];

export const GridMLObjectDefinition = [
    {
        Name: "LanguageID",
        DefaultValue: "",
        BindControlName: "LanguageID",
        DataSourceMember: "LanguageID"
    },
    {
        Name: "LanguageName",
        DefaultValue: "",
        BindControlName: "LanguageName",
        DataSourceMember: "LanguageName"
    },
    {
        Name: "UOMName",
        DefaultValue: "",
        BindControlName: "UOMName",
        DataSourceMember: "UOMName"
    },

    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    }
];
