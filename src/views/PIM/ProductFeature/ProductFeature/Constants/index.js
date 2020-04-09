export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ProductFeature/Search";
export const LoadAPIPath = "api/ProductFeature/Load";
export const AddAPIPath = "api/ProductFeature/Add";
export const UpdateAPIPath = "api/ProductFeature/Update";
export const DeleteAPIPath = "api/ProductFeature/Delete";
export const UpdateOrderAPIPath = "api/ProductFeature/UpdateOrder";
export const LoadAPIPathLanguage = "api/ProductFeature_lang/Load";
export const BackLink = "/ProductFeature";
export const AddLink = "/ProductFeature/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ProductFeatureID";
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "", Title: "Đặc điểm sản phẩm" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductFeature", Title: "Đặc điểm sản phẩm" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductFeature", Title: "Đặc điểm sản phẩm" },
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
    // {
    //     type: "text",
    //     name: "txtProductFeatureID",
    //     label: "Đặc điểm sản phẩm:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "ProductFeatureID",
    //     readonly: false,
    //     validatonList: ["number", "required"]
    // },
    {
        type: "select",
        name: "txtProductFeatureGroupID",
        label: "Nhóm đặc điểm sản phẩm :",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ProductFeatureGroupID",
        readonly: false,
        validatonList: ["number", "required"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PRODUCTFEATUREGROUP",
        ValueMember: "ProductFeatureGroupID",
        NameMember: "ProductFeatureGroupName"
    },
    {
        type: "text",
        name: "txtProductFeatureName",
        label: "Tên đặc điểm sản phẩm:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ProductFeatureName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        rows: "6",
        value: "",
        maxSize: "2000",
        placeholder: "",
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
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "IsActived",
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
        name: "txtProductFeatureID",
        label: "Mã đặc điểm sản phẩm:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: true,
        DataSourceMember: "ProductFeatureID",
        validatonList: ["number", "required"]
    },
    {
        type: "select",
        name: "txtProductFeatureGroupID",
        label: "Nhóm đặc điểm sản phẩm:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ProductFeaturegroupID",
        readonly: false,
        validatonList: ["number", "required"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PRODUCTFEATUREGROUP",
        ValueMember: "ProductFeatureGroupID",
        NameMember: "ProductFeatureGroupName"
    },
    {
        type: "text",
        name: "txtProductFeatureName",
        label: "Tên đặc điểm sản phẩm:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "ProductFeatureName",
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        rows: "6",
        value: "",
        maxSize: "2000",
        placeholder: "",
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

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const MLObjectDefinition = [
    {
        Name: "ProductFeatureID",
        DefaultValue: "",
        BindControlName: "txtProductFeatureID",
        DataSourceMember: "ProductFeatureID"
    },
    {
        Name: "ProductFeatureGroupID",
        DefaultValue: "",
        BindControlName: "txtProductFeatureGroupID",
        DataSourceMember: "ProductFeatureGroupID"
    },
    {
        Name: "ProductFeatureName",
        DefaultValue: "",
        BindControlName: "txtProductFeatureName",
        DataSourceMember: "ProductFeatureName"
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
        Name: "LstProductFeature_Lang",
        DefaultValue: {},
        BindControlName: "inputGridProductFeature_Lang",
        DataSourceMember: "inputGridProductFeature_Lang"
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
        Name: "ProductFeatureName",
        DefaultValue: "",
        BindControlName: "ProductFeatureName",
        DataSourceMember: "ProductFeatureName"
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
        Name: "ProductFeatureName",
        Type: "textbox",
        Caption: "Tên nhóm đặc điểm",
        DataSourceMember: "ProductFeatureName",
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
export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ProductFeatureID",
        Width: 80
    },
    {
        Name: "ProductFeatureID",
        Type: "text",
        Caption: "Đặc điểm sản phẩm",
        DataSourceMember: "ProductFeatureID",
        Width: 150
    },

    {
        Name: "ProductFeatureName",
        Type: "text",
        Caption: "Tên đặc điểm sản phẩm",
        DataSourceMember: "ProductFeatureName",
        Width: 250
    },
    {
        Name: "ProductFeatureGroupName",
        Type: "text",
        Caption: "Nhóm đặc điểm sản phẩm ",
        DataSourceMember: "ProductFeatureGroupName",
        Width: 200
    },
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     Width: 200
    // },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 150
    },
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
        DataSourceMember: "ProductFeatureID",
        Width: 150,
        Link: "/ProductFeature/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
