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

export const MLObjectDefinition_Search = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
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

export const listelement_Add = [
    {
        type: "text",
        name: "txtsvCategoryName",
        label: "tên danh mục dịch vụ",
        maxSize: "200",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "svCategoryName",
        readonly: false,
        validatonList: ["required"]
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
        type: "number",
        name: "numOrderIndex",
        label: "thứ tự hiện thị",
        max: 9999999999,
        min: 0,
        value: "",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "mô tả",
        maxSize: "2000",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
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
        type: "checkbox",
        name: "chkIsActived",
        label: "kích hoạt",
        value: true,
        DataSourceMember: "IsActived"
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "hệ thống",
        value: false,
        DataSourceMember: "IsSystem"
    },
];