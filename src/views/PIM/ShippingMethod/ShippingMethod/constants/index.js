export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ShippingMethod/Search";
export const LoadAPIPath = "api/ShippingMethod/Load";
export const AddAPIPath = "api/ShippingMethod/Add";
export const UpdateAPIPath = "api/ShippingMethod/Update";
export const DeleteAPIPath = "api/ShippingMethod/Delete";
export const UpdateOrderAPIPath = "api/ShippingMethod/UpdateOrder";
export const LoadAPIPathLanguage = "api/ShippingMethod_lang/Load";
export const AddLogAPIPath = "api/UserActivity/Add";

export const BackLink = "/ShippingMethod";
export const AddLink = "/ShippingMethod/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ShippingMethodID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ShippingMethod", Title: "Phương tiện vận chuyển" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ShippingMethod", Title: "Phương tiện vận chuyển" },
    { Link: "", Title: "Sửa phương tiện vận chuyển" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ShippingMethod", Title: "Phương tiện vận chuyển" },
    { Link: "", Title: "Thêm phương tiện vận chuyển" }
];

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
        listoption: []
    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtShippingMethodID",
        label: "Mã phương tiện vận chuyển",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShippingMethodID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShippingMethodName",
        label: "Tên phương tiện vận chuyển",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShippingMethodName",
        readonly: false,
        validatonList: ["required"]
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
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: 0,
        maxSize: "5",
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
        name: "txtShippingMethodID",
        label: "Mã phương tiện vận chuyển",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: true,
        DataSourceMember: "ShippingMethodID",
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShippingMethodName",
        label: "Tên phương tiện vận chuyển",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "ShippingMethodName",
        validatonList: ["required"]
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
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "5",
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
        Name: "ShippingMethodName",
        DefaultValue: "",
        BindControlName: "ShippingMethodName",
        DataSourceMember: "ShippingMethodName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "HasChanged",
        DefaultValue: "",
        BindControlName: "HasChanged",
        DataSourceMember: "HasChanged"
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
        Name: "ShippingMethodName",
        Type: "textbox",
        Caption: "Tên phương tiện vận chuyển",
        DataSourceMember: "ShippingMethodName",
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

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const MLObjectDefinition = [
    {
        Name: "ShippingMethodID",
        DefaultValue: "",
        BindControlName: "txtShippingMethodID",
        DataSourceMember: "ShippingMethodID"
    },
    {
        Name: "ShippingMethodName",
        DefaultValue: "",
        BindControlName: "txtShippingMethodName",
        DataSourceMember: "ShippingMethodName"
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
        Name: "LstShippingMethod_Lang",
        DefaultValue: {},
        BindControlName: "inputGridShippingMethod_Lang",
        DataSourceMember: "inputGridShippingMethod_Lang"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ShippingMethodID",
        Width: 50
    },
    {
        Name: "ShippingMethodID",
        Type: "text",
        Caption: "Mã phương tiện vận chuyển",
        DataSourceMember: "ShippingMethodID",
        Width: 200
    },
    {
        Name: "ShippingMethodName",
        Type: "text",
        Caption: "Tên phương tiện vận chuyển",
        DataSourceMember: "ShippingMethodName",
        Width: 400
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
        DataSourceMember: "ShippingMethodID",
        Width: 150,
        Link: "/ShippingMethod/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
