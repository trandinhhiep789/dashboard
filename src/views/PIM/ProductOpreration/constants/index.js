export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ProductOperation/Search";
export const LoadAPIPath = "api/ProductOperation/Load";
export const AddAPIPath = "api/ProductOperation/Add";
export const UpdateAPIPath = "api/ProductOperation/Update";
export const DeleteAPIPath = "api/ProductOperation/Delete";
export const UpdateOrderAPIPath = "api/ProductOperation/UpdateOrder";
export const LoadAPIPathLanguage = "api/ProductOperation_lang/Load";
export const BackLink = "/ProductOperation";
export const AddLink = "/ProductOperation/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ProductOperationID";


export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductOperation", Title: "Tác vụ liên quan" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductOperation", Title: "Tác vụ liên quan" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductOperation", Title: "Tác vụ liên quan" },
    { Link: "", Title: "Thêm" }
];
1;
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
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
        listoption: [],
        validatonList: []
    }
];

export const AddElementList = [
    {
        type: "numeric",
        name: "txtProductOperationID",
        label: "Mã tác vụ:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProductOperationID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtProductOperationName",
        label: "Tên tác vụ:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProductOperationName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "2000",
        placeholder: "Mô tả",
        icon: "",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        rows: "6",
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
        listoption: [],
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
        listoption: [],
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: false,
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
        name: "txtProductOperationID",
        label: "Mã tác vụ:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: true,
        DataSourceMember: "ProductOperationID",
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtProductOperationName",
        label: "Tên tác vụ:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "ProductOperationName",
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "2000",
        placeholder: "Mô tả",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "Description",
        rows: "6",
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
        listoption: [],
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
        listoption: [],
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
        Name: "ProductOperationID",
        DefaultValue: "",
        BindControlName: "txtProductOperationID",
        DataSourceMember: "ProductOperationID"
    },
    {
        Name: "ProductOperationName",
        DefaultValue: "",
        BindControlName: "txtProductOperationName",
        DataSourceMember: "ProductOperationName"
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
        Name: "lstProductOperation_lang",
        DefaultValue: {},
        BindControlName: "inputGridProductOperation_Lang",
        DataSourceMember: "inputGridProductOperation_Lang"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ProductOperationID",
        Width: 150
    },
    {
        Name: "ProductOperationID",
        Type: "text",
        Caption: "Mã tác vụ",
        DataSourceMember: "ProductOperationID",
        Width: 200
    },
    {
        Name: "ProductOperationName",
        Type: "text",
        Caption: "Tên tác vụ",
        DataSourceMember: "ProductOperationName",
        Width: 800
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
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ProductOperationID",
        Width: 200,
        Link: "/ProductOperation/Edit/",
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
        Name: "ProductOperationName",
        DefaultValue: "",
        BindControlName: "ProductOperationName",
        DataSourceMember: "ProductOperationName"
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
        Name: "ProductOperationName",
        Type: "textbox",
        Caption: "Tên tác vụ",
        DataSourceMember: "ProductOperationName",
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
