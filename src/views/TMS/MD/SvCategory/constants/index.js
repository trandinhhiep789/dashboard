export const APIHostName = "TMSAPI";
export const API_SvCategory_Add = "api/svCategory/Add";
export const API_SvCategory_DeleteList = "api/svCategory/DeleteList";
export const API_SvCategory_Load = "api/svCategory/Load";
export const API_SvCategory_Search = "api/svCategory/Search";
export const API_SvCategory_Update = "api/svCategory/Update";
export const API_SvCategoryType_Search = "api/svCategoryType/Search";

export const initSearchData = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
]

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách danh mục dịch vụ" }
];

export const PagePath_Add = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SvCategory", Title: "Danh sách danh mục dịch vụ" },
    { Link: "", Title: "Thêm" },
];

export const PagePath_Edit = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SvCategory", Title: "Danh sách danh mục dịch vụ" },
    { Link: "", Title: "Chỉnh sửa" },
];

export const listColumn_SvCategory = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "svCategoryID",
        Width: 60
    },
    {
        Name: "svCategoryIDName",
        Type: "text",
        Caption: "Danh mục dịch vụ",
        DataSourceMember: "svCategoryIDName"
    },
    {
        Name: "svCategoryTypeIDName",
        Type: "text",
        Caption: "Loại danh mục dịch vụ",
        DataSourceMember: "svCategoryTypeIDName"
    },
    {
        Name: "ParentIDName",
        Type: "text",
        Caption: "Danh mục dịch vụ cha",
        DataSourceMember: "ParentIDName"
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        Type: "text",
        Caption: "Thứ tự hiển thị",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "CreatedUserIDName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserIDName"
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "svCategoryID",
        Width: 100,
        Link: "/SvCategory/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const listColumn_SvCategoryProduct = [
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm/dịch vụ",
        DataSourceMember: "ProductID",
        Width: 70
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm/dịch vụ",
        DataSourceMember: "ProductName",
        Width: 260
    },
    {
        Name: "OrderIndex",
        Type: "text",
        Caption: "Thứ tự hiển thị",
        DataSourceMember: "OrderIndex",
        Width: 70
    },
    {
        Name: "Comments",
        Type: "text",
        Caption: "Ghi chú",
        DataSourceMember: "Comments",
        Width: 260
    },
    {
        Name: "Action",
        Type: "edit",
        Caption: "Tác vụ",
        DataSourceMember: "ProductID",
        Width: 60
    }
];

export const listelement_Search = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}
    }
];

export const listelement_Add = [
    {
        DataSourceMember: "svCategoryName",
        icon: "",
        label: "tên danh mục dịch vụ",
        listoption: {},
        maxSize: "200",
        name: "txtsvCategoryName",
        placeholder: "",
        readonly: false,
        type: "text",
        validatonList: ["required"],
        value: ""
    },
    {
        DataSourceMember: "svCategoryTypeID",
        icon: "",
        IsAutoLoadItemFromCache: false,
        label: "Mã loại danh mục dịch vụ",
        listoption: [],
        LoadItemCacheKeyID: "",
        name: "cbsvCategoryTypeID",
        NameMember: "svCategoryTypeName",
        placeholder: "",
        readonly: false,
        type: "select",
        ValidationErrorMessage: "",
        validatonList: ["Comborequired"],
        value: -1,
        ValueMember: "svCategoryTypeID"
    },
    {
        DataSourceMember: "OrderIndex",
        label: "thứ tự hiện thị",
        max: 9999999999,
        min: 0,
        name: "numOrderIndex",
        readonly: false,
        type: "number",
        validatonList: ["required"],
        value: ""
    },
    {
        DataSourceMember: "Description",
        icon: "",
        label: "mô tả",
        maxSize: "2000",
        name: "txtDescription",
        placeholder: "",
        readonly: false,
        type: "textarea",
        validatonList: [],
        value: ""
    },
    {
        DataSourceMember: "ParentID",
        icon: "",
        IsAutoLoadItemFromCache: false,
        label: "danh mục tài liệu cha",
        listoption: [],
        LoadItemCacheKeyID: "",
        name: "cbParentID",
        NameMember: "svCategoryName",
        placeholder: "",
        readonly: false,
        rootID: -1,
        rootKey: "ParentID",
        treeData: [],
        type: "treeSelect",
        validatonList: [],
        value: "",
        ValueMember: "svCategoryID"
    },
    {
        cdn: "",
        DataSourceMember: "svCategoryImageURL",
        icon: "",
        label: "hình ảnh đại diện danh mục dịch vụ",
        listoption: {},
        name: "txtsvCategoryImageURL",
        NameMember: "svCategoryImageURL",
        placeholder: "",
        readonly: false,
        type: "singleFileUpload",
        validatonList: [],
        value: ""
    },
    {
        DataSourceMember: "IsActived",
        label: "kích hoạt",
        name: "chkIsActived",
        type: "checkbox",
        value: true
    },
    {
        DataSourceMember: "IsSystem",
        label: "hệ thống",
        name: "chkIsSystem",
        type: "checkbox",
        value: false
    }
];

export const listelement_svCategoryProduct = [
    // {
    //     DataSourceMember: "ProductID",
    //     icon: "",
    //     label: "mã sản phẩm",
    //     listoption: {},
    //     maxSize: "20",
    //     name: "ProductID",
    //     placeholder: "",
    //     readonly: false,
    //     type: "ProductCombo",
    //     validatonList: ["required"],
    //     value: ""
    // },
    {
        DataSourceMember: "OrderIndex",
        label: "thứ tự hiển thị",
        max: 9999999999,
        min: 0,
        name: "OrderIndex",
        readonly: false,
        type: "number",
        validatonList: ["required"],
        value: ""
    },
    {
        DataSourceMember: "Comments",
        icon: "",
        label: "ghi chú",
        listoption: {},
        maxSize: "2000",
        name: "Comments",
        placeholder: "",
        readonly: false,
        type: "text",
        validatonList: [],
        value: ""
    },
]

export const MLObjectDefinition_Search = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const MLObjectDefinition_Add = [
    {
        Name: "ParentID",
        DefaultValue: "",
        BindControlName: "cbParentID",
        DataSourceMember: "ParentID"
    },
    {
        Name: "svCategoryName",
        DefaultValue: "",
        BindControlName: "txtsvCategoryName",
        DataSourceMember: "svCategoryName"
    },
    {
        Name: "svCategoryTypeID",
        DefaultValue: "",
        BindControlName: "cbsvCategoryTypeID",
        DataSourceMember: "svCategoryTypeID"
    },
    {
        Name: "svCategoryImageURL",
        DefaultValue: "",
        BindControlName: "txtsvCategoryImageURL",
        DataSourceMember: "svCategoryImageURL"
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
        BindControlName: "numOrderIndex",
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
    }
];

export const MLObjectDefinitionSvCategoryProductModal = [
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "ProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "ProductName",
        DataSourceMember: "ProductName"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "OrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "Comments",
        DefaultValue: "",
        BindControlName: "Comments",
        DataSourceMember: "Comments"
    }
]