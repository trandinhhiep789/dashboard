export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/Category/Search";
export const LoadAPIPath = "api/Category/Load";
export const AddAPIPath = "api/Category/Add";
export const UpdateAPIPath = "api/Category/Update";
export const DeleteAPIPath = "api/Category/Delete";
export const UpdateOrderAPIPath = "api/Category/UpdateOrder";
export const LoadAPIPathLanguage = "api/Category_lang/Load";
export const BackLink = "/Category";
export const AddLink = "/Category/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "CategoryID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/Category", Title: "Danh mục sản phẩm" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/Category", Title: "Danh mục sản phẩm" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/Category", Title: "Danh mục sản phẩm" },
    { Link: "", Title: "Thêm" }
];

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@CategoryTypeID",
        SearchValue: -1
    }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa",
        value: "",
        placeholder: "",
        icon: "",
        listoption: []
    },
    {
        type: "select",
        name: "slCategoryTypeID",
        label: "Loại danh mục",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "CategoryTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CATEGORYTYPE",
        ValueMember: "CategoryTypeID",
        NameMember: "CategoryTypeName"
    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtCategoryID",
        label: "Mã danh mục",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "CategoryID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtCategoryName",
        label: "Tên danh mục",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "CategoryName",
        readonly: false,
        validatonList: ["required"]
    },
    // {
    //     type: "text",
    //     name: "txtParentID",
    //     label: "Mã danh mục cha",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "ParentID",
    //     readonly: false,
    //     validatonList: []
    // },
    {
        type: "select",
        name: "txtParentID",
        label: "Danh mục cha",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ParentID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CATEGORY",
        ValueMember: "CategoryID",
        NameMember: "CategoryName"
    },
    {
        type: "select",
        name: "txtCategoryTypeID",
        label: "Loại danh mục",
        labelError: "Vui lòng nhập Không tồn tại Loại danh mục. Vui lòng tạo trước khi tiếp tục", 
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "CategoryTypeID",
        readonly: false,
        validatonList: ["required", "number"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CATEGORYTYPE",
        ValueMember: "CategoryTypeID",
        NameMember: "CategoryTypeName"
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        rows: "6",
        placeholder: "Mô tả",
        icon: "",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
        value: 0,
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: [ "number"]
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: true,
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtCategoryID",
        label: "Mã danh mục",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: true,
        DataSourceMember: "CategoryID",
        validatonList: ["required", "number"]
    },
    // {
    //     type: "text",
    //     name: "txtCategoryTypeID",
    //     label: "Mã loại danh mục:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     readonly: false,
    //     DataSourceMember: "CategoryTypeID",
    //     validatonList: ["required"]

    // },
    {
        type: "select",
        name: "txtCategoryTypeID",
        label: "Loại danh mục",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "CategoryTypeID",
        readonly: false,
        validatonList: ["required", "number"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CATEGORYTYPE",
        ValueMember: "CategoryTypeID",
        NameMember: "CategoryTypeName"
    },
    {
        type: "select",
        name: "txtParentID",
        label: "Danh mục cha",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ParentID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CATEGORY",
        ValueMember: "CategoryID",
        NameMember: "CategoryName"
    },
    {
        type: "text",
        name: "txtCategoryName",
        label: "Tên danh mục",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "CategoryName",
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        rows: "6",
        placeholder: "Mô tả",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "Description",
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
        value: "",
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
        listoption: [],
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
        listoption: [],
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
        Name: "CategoryID",
        DefaultValue: "",
        BindControlName: "txtCategoryID",
        DataSourceMember: "CategoryID"
    },
    {
        Name: "CategoryTypeID",
        DefaultValue: "",
        BindControlName: "txtCategoryTypeID",
        DataSourceMember: "CategoryTypeID"
    },
    {
        Name: "ParentID",
        DefaultValue: "0",
        BindControlName: "txtParentID",
        DataSourceMember: "ParentID"
    },
    {
        Name: "CategoryName",
        DefaultValue: "",
        BindControlName: "txtCategoryName",
        DataSourceMember: "CategoryName"
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
        Name: "CategoryLangs",
        DefaultValue: {},
        BindControlName: "inputGridCategoryLang",
        DataSourceMember: "inputGridCategoryLang"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "CategoryID",
        Width: 150
    },
    {
        Name: "CategoryID",
        Type: "text",
        Caption: "Mã danh mục",
        DataSourceMember: "CategoryID",
        Width: 150
    },
    {
        Name: "CategoryName",
        Type: "text",
        Caption: "Tên danh mục",
        DataSourceMember: "CategoryName",
        Width: 600
    },
    {
        Name: "CategoryTypeName",
        Type: "text",
        Caption: "Loại danh mục",
        DataSourceMember: "CategoryTypeName",
        Width: 300
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
        DataSourceMember: "CategoryID",
        Width: 200,
        Link: "/Category/Edit/",
        LinkText: "Chỉnh sửa"
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
        Name: "CategoryName",
        DefaultValue: "",
        BindControlName: "CategoryName",
        DataSourceMember: "CategoryName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    }
];

export const InputLanguageColumnList = [
    {
        Name: "LanguageName",
        Type: "text",
        Caption: "Ngôn ngữ",
        DataSourceMember: "LanguageName",
        Width: 200
    },
    {
        Name: "CategoryName",
        Type: "textbox",
        Caption: "Tên danh mục",
        DataSourceMember: "CategoryName",
        Width: 200
    },
    {
        Name: "Description",
        Type: "textbox",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        Width: 200
    }
];