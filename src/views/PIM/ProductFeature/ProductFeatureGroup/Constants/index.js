export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ProductFeatureGroup/Search";
export const LoadAPIPath = "api/ProductFeatureGroup/Load";
export const AddAPIPath = "api/ProductFeatureGroup/Add";
export const UpdateAPIPath = "api/ProductFeatureGroup/Update";
export const DeleteAPIPath = "api/ProductFeatureGroup/Delete";
export const UpdateOrderAPIPath = "api/ProductFeatureGroup/UpdateOrder";
export const LoadAPIPathLanguage = "api/ProductFeatureGroup_lang/Load";
export const BackLink = "/ProductFeatureGroup";
export const AddLink = "/ProductFeatureGroup/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ProductFeatureGroupID";
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];
export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "", Title: "Nhóm đặc điểm sản phẩm" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductFeatureGroup", Title: "Nhóm đặc điểm sản phẩm" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductFeatureGroup", Title: "Nhóm đặc điểm sản phẩm" },
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
        name: "txtProductFeatureGroupID",
        label: "Mã Nhóm đặc điểm:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ProductFeatureGroupID",
        readonly: false,
        validatonList: ["number", "required"]
    },
    {
        type: "text",
        name: "txtProductFeatureGroupName",
        label: "Tên nhóm đặc điểm:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ProductFeatureGroupName",
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
        value: "true",
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
        name: "txtProductFeatureGroupID",
        label: "Mã nhóm đặc điểm:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: true,
        DataSourceMember: "ProductFeatureGroupID",
        validatonList: ["number", "required"]
    },
    {
        type: "text",
        name: "txtProductFeatureGroupName",
        label: "Tên nhóm đặc điểm:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "ProductFeatureGroupName",
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
        Name: "ProductFeatureGroupID",
        DefaultValue: "",
        BindControlName: "txtProductFeatureGroupID",
        DataSourceMember: "ProductFeatureGroupID"
    },
    {
        Name: "ProductFeatureGroupName",
        DefaultValue: "",
        BindControlName: "txtProductFeatureGroupName",
        DataSourceMember: "ProductFeatureGroupName"
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
        Name: "LstProductFeatureGroup_Lang",
        DefaultValue: {},
        BindControlName: "inputGridProductFeatureGroup_Lang",
        DataSourceMember: "inputGridProductFeatureGroup_Lang"
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
        Name: "ProductFeatureGroupName",
        DefaultValue: "",
        BindControlName: "ProductFeatureGroupName",
        DataSourceMember: "ProductFeatureGroupName"
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
        Name: "ProductFeatureGroupName",
        Type: "textbox",
        Caption: "Tên nhóm đặc điểm",
        DataSourceMember: "ProductFeatureGroupName",
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
        DataSourceMember: "ProductFeatureGroupID",
        Width: 80
    },
    {
        Name: "ProductFeatureGroupID",
        Type: "text",
        Caption: "Nhóm đặc điểm",
        DataSourceMember: "ProductFeatureGroupID",
        Width: 150
    },
    {
        Name: "ProductFeatureGroupName",
        Type: "text",
        Caption: "Tên nhóm đặc điểm",
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
        DataSourceMember: "ProductFeatureGroupID",
        Width: 150,
        Link: "/ProductFeatureGroup/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
