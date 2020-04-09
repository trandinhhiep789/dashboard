export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/AttributeCategory/Search";
export const LoadAPIPath = "api/AttributeCategory/Load";
export const LoadAPIPathLanguage = "api/AttributeCategory_Lang/Load";
export const AddAPIPath = "api/AttributeCategory/Add";
export const UpdateAPIPath = "api/AttributeCategory/Update";
export const DeleteAPIPath = "api/AttributeCategory/Delete";
export const UpdateOrderAPIPath = "api/AttributeCategory/UpdateOrder";
export const BackLink = "/AttributeCategory";
export const AddLink = "/AttributeCategory/Add";
export const ComboAttributeCategoryTypeID = "api/AttributeCategoryType/Search";
export const GetAttributeCategoryParentAPIPath = "api/AttributeCategory/GetParentAttributeCategory";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AttributeCategoryID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "", Title: "Danh mục thuộc tính" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/AttributeCategory", Title: "Danh mục thuộc tính" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/AttributeCategory", Title: "Danh mục thuộc tính" },
    { Link: "", Title: "Thêm" }
];

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@AttributeCategoryTypeID",
        SearchValue: -1
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
        listoption: {}
    },
    {
        type: "select",
        name: "slAttributeCategoryTypeID",
        label: "Loại danh mục:",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AttributeCategoryTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIMATTRIBUTECATEGORYTYPE",
        ValueMember: "AttributeCategoryTypeID",
        NameMember: "AttributeCategoryTypeName"
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "AttributeCategoryTypeID",
        DefaultValue: -1,
        BindControlName: "slAttributeCategoryTypeID"
    }
];

export const AddElementList = [
    {
        type: "numeric",
        name: "txtAttributeCategoryID",
        label: "Mã danh mục thuộc tính",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeCategoryID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "select",
        name: "comboParentID",
        label: "Danh mục cha:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ParentID",
        readonly: false,
        IsAutoLoadItemFromCache: false,
        validatonList: ["required", "number"]
        // LoadItemCacheKeyID: "PIMCACHE.ATTRIBUTECATEGORY",
        // ValueMember: "AttributeCategoryID",
        // NameMember: "AttributeCategoryName"
    },
    {
        type: "text",
        name: "txtAttributeCategoryName",
        label: "Tên danh mục thuộc tính",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeCategoryName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "comboAttributeCategoryTypeID",
        label: "Loại danh mục thuộc tính:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AttributeCategoryTypeID",
        readonly: false,
        validatonList: ["required", "number"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIMATTRIBUTECATEGORYTYPE",
        ValueMember: "AttributeCategoryTypeID",
        NameMember: "AttributeCategoryTypeName"
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
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: []
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

export const EditElementList = [
    {
        type: "numeric",
        name: "txtAttributeCategoryID",
        label: "Mã danh mục thuộc tính:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeCategoryID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "select",
        name: "comboParentID",
        label: "Danh mục cha:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ParentID",
        readonly: false,
        IsAutoLoadItemFromCache: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAttributeCategoryName",
        label: "Tên danh mục thuộc tính:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeCategoryName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "comboAttributeCategoryTypeID",
        label: "Mã loại danh mục thuộc tính:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeCategoryTypeID",
        readonly: false,
        validatonList: ["required", "number"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIMATTRIBUTECATEGORYTYPE",
        ValueMember: "AttributeCategoryTypeID",
        NameMember: "AttributeCategoryTypeName"
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
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: []
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
        Name: "AttributeCategoryName",
        DefaultValue: "",
        BindControlName: "AttributeCategoryName",
        DataSourceMember: "AttributeCategoryName"
    },

    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    }
];

export const InputLanguageColumnList = [
    // {
    //     Name: "LanguageID",
    //     Type: "text",
    //     Caption: "Mã ngôn ngữ",
    //     DataSourceMember: "LanguageID",
    //     Width: 150
    // },
    {
        Name: "LanguageName",
        Type: "text",
        Caption: "Tên ngôn ngữ",
        DataSourceMember: "LanguageName",
        Width: 150
    },

    {
        Name: "AttributeCategoryName",
        Type: "textbox",
        Caption: "Tên danh mục thuộc tính",
        DataSourceMember: "AttributeCategoryName",
        maxSize: "400",
        Width: 200
    },
    {
        Name: "Description",
        Type: "textbox",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        maxSize: "2000",
        Width: 250
    }
];

export const MLObjectDefinition = [
    {
        Name: "AttributeCategoryID",
        DefaultValue: "",
        BindControlName: "txtAttributeCategoryID",
        DataSourceMember: "AttributeCategoryID"
    },
    {
        Name: "ParentID",
        DefaultValue: "",
        BindControlName: "comboParentID",
        DataSourceMember: "ParentID"
    },

    {
        Name: "AttributeCategoryName",
        DefaultValue: "",
        BindControlName: "txtAttributeCategoryName",
        DataSourceMember: "AttributeCategoryName"
    },
    {
        Name: "AttributeCategoryTypeID",
        DefaultValue: "",
        BindControlName: "comboAttributeCategoryTypeID",
        DataSourceMember: "AttributeCategoryTypeID"
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
    },
    {
        Name: "LstAttributeCategory_Lang",
        DefaultValue: {},
        BindControlName: "inputGridAttributeCategory_Lang",
        DataSourceMember: "inputGridAttributeCategory_Lang"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "AttributeCategoryID",
        Width: 80
    },
    {
        Name: "AttributeCategoryID",
        Type: "text",
        Caption: "Mã danh mục thuộc tính",
        DataSourceMember: "AttributeCategoryID",
        Width: 160
    },
    // {
    //     Name: "ParentName",
    //     Type: "text",
    //     Caption: "Danh mục cha",
    //     DataSourceMember: "ParentName",
    //     Width: 150
    // },
    {
        Name: "AttributeCategoryName",
        Type: "text",
        Caption: "Tên danh mục thuộc tính",
        DataSourceMember: "AttributeCategoryName",
        Width: 300
    },
    {
        Name: "AttributeCategoryTypeName",
        Type: "text",
        Caption: "Loại danh mục thuộc tính",
        DataSourceMember: "AttributeCategoryTypeName",
        Width: 200
    },
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     Width: 200
    // },
    // {
    //     Name: "OrderIndex",
    //     Type: "text",
    //     Caption: "Thứ tự hiển thị",
    //     DataSourceMember: "OrderIndex",
    //     Width: 200
    // },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100
    },
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 200
    // },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "CreatedFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "AttributeCategoryID",
        Width: 100,
        Link: "/AttributeCategory/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
