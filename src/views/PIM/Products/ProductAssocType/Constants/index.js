export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ProductAssocType/Search";
export const LoadAPIPath = "api/ProductAssocType/Load";
export const AddAPIPath = "api/ProductAssocType/Add";
export const UpdateAPIPath = "api/ProductAssocType/Update";
export const DeleteAPIPath = "api/ProductAssocType/Delete";
export const UpdateOrderAPIPath = "api/ProductAssocType/UpdateOrder";
export const BackLink = "/ProductAssocType";
export const AddLink = "/ProductAssocType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ProductAssocTypeID";
export const LoadAPIPathLanguage = "api/ProductassocType_lang/GetAll";

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductAssocType", Title: "Loại kết hợp sản phẩm" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductAssocType", Title: "Loại kết hợp sản phẩm" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductAssocType", Title: "Loại kết hợp sản phẩm" },
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
        type: "numeric",
        name: "txtProductAssocTypeID",
        label: "Mã loại kết:",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ProductAssocTypeID",
        readonly: false,
        validatonList: ["number", "required"]
    },
    {
        type: "select",
        name: "txtParentID",
        label: "Loại kết hợp cha:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "ParentID",
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PRODUCTASSOCTYPE",
        ValueMember: "ProductAssocTypeID",
        NameMember: "ProductAssocTypeName"
    },
    {
        type: "text",
        name: "txtProductAssocTypeName",
        label: "Tên loại kết hợp:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ProductAssocTypeName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "2000",
        rows: "6",
        placeholder: "Mô tả",
        icon: "",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: 0,
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
        value: true,
        placeholder: "",
        icon: "",
        listoption: {},
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
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtProductAssocTypeID",
        label: "Mã loại kết hợp sản phẩm:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: true,
        DataSourceMember: "ProductAssocTypeID",
        validatonList: ["number", "required"]
    },
    {
        type: "select",
        name: "txtParentID",
        label: "Loại kết hợp sản phẩm cha:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "ParentID",
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PRODUCTASSOCTYPE",
        ValueMember: "ProductAssocTypeID",
        NameMember: "ProductAssocTypeName"
    },
    {
        type: "text",
        name: "txtProductAssocTypeName",
        label: "Tên loại kết hợp sản phẩm:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "ProductAssocTypeName",
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "2000",
        rows: "6",
        placeholder: "Mô tả",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "Description",
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
        readonly: false,
        DataSourceMember: "IsActived",
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
        readonly: false,
        DataSourceMember: "IsSystem",
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
        Name: "ProductAssocTypeName",
        DefaultValue: "",
        BindControlName: "ProductAssocTypeName",
        DataSourceMember: "ProductAssocTypeName"
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
        Caption: "Tên ngôn ngữ",
        DataSourceMember: "LanguageName",
        Width: 150
    },

    {
        Name: "ProductAssocTypeName",
        Type: "textbox",
        Caption: "Tên kết hợp sản phẩm",
        DataSourceMember: "ProductAssocTypeName",
        maxSize: "200",
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

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const MLObjectDefinition = [
    {
        Name: "ProductAssocTypeID",
        DefaultValue: "",
        BindControlName: "txtProductAssocTypeID",
        DataSourceMember: "ProductAssocTypeID"
    },
    {
        Name: "ProductAssocTypeName",
        DefaultValue: "",
        BindControlName: "txtProductAssocTypeName",
        DataSourceMember: "ProductAssocTypeName"
    },
    {
        Name: "ParentID",
        DefaultValue: "",
        BindControlName: "txtParentID",
        DataSourceMember: "ParentID"
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
        Name: "LstProductAssocType_lang",
        DefaultValue: "administrator",
        BindControlName: "inputGridProductAssocType_lang",
        DataSourceMember: "inputGridProductAssocType_lang"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ProductAssocTypeID",
        Width: 150
    },
    {
        Name: "ProductAssocTypeID",
        Type: "text",
        Caption: "Mã loại kết hợp",
        DataSourceMember: "ProductAssocTypeID",
        Width: 150
    },
    {
        Name: "ParentName",
        Type: "text",
        Caption: "Loại kết hợp cha",
        DataSourceMember: "ParentName",
        Width: 200
    },
    {
        Name: "ProductAssocTypeName",
        Type: "text",
        Caption: "Tên loại kết hợp",
        DataSourceMember: "ProductAssocTypeName",
        Width: 600
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
        DataSourceMember: "ProductAssocTypeID",
        Width: 200,
        Link: "/ProductAssocType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const InputLanguageDataSource = [
    {
        LanguageID: 1,
        LanguageName: "English",
        CategoryName: "",
        Description: ""
    },
    {
        LanguageID: 2,
        LanguageName: "Khmer",
        CategoryName: "",
        Description: ""
    }
];
