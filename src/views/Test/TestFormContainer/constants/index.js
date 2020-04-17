export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/Category/Search";
export const LoadAPIPath = "api/Category/Load";
export const AddAPIPath = "api/Category/Add";
export const UpdateAPIPath = "api/Category/Update";
export const DeleteAPIPath = "api/Category/Delete";
export const UpdateOrderAPIPath = "api/Category/UpdateOrder";
export const BackLink = "/Category";
export const AddLink = "/Category/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "CategoryID";

export const PagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/Category", Title: "Danh mục sản phẩm" }
];

export const EditPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/Category", Title: "Danh mục sản phẩm" },
{ Link: "", Title: "Sửa Danh mục sản phẩm" }

];

export const AddPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/Category", Title: "Danh mục sản phẩm" },
{ Link: "", Title: "Thêm danh mục sản phẩm" }

]

export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
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

    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtCategoryID",
        label: "Mã danh mục",
        value: "",
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
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "CategoryName",
        readonly: false,
        validatonList: ["required"]

    },
    {
        type: "text",
        name: "txtParentID",
        label: "Mã danh mục cha",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ParentID",
        readonly: false,
        validatonList: []
    },
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
        validatonList: [],
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
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []


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
        validatonList: []

    },
    {
        type: "text",
        name: "txtCategoryTypeID",
        label: "Mã loại danh mục",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "CategoryTypeID",
        validatonList: ["required"]

    },
    {
        type: "text",
        name: "txtCategoryName",
        label: "Tên danh mục",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "CategoryName",
        validatonList: []

    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "Description",
        validatonList: []

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
        BindControlName: "",
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
        Name: "CategoryLang",
        DefaultValue: {},
        BindControlName: "inputGridCategoryLang",
        DataSourceMember: "inputGridCategoryLang"
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