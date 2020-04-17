export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ProductStatus/Search";
export const LoadAPIPath = "api/ProductStatus/Load";
export const AddAPIPath = "api/ProductStatus/Add";
export const UpdateAPIPath = "api/ProductStatus/Update";
export const DeleteAPIPath = "api/ProductStatus/Delete";
export const UpdateOrderAPIPath = "api/ProductStatus/UpdateOrder";
export const LoadAPIPathLanguage = "api/ProductStatus_lang/Load";
export const BackLink = "/ProductStatus";
export const AddLink = "/ProductStatus/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ProductStatusID";
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const PagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "", Title: "Trạng thái sản phẩm" }
];

export const EditPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/ProductStatus", Title: "Trạng thái sản phẩm" },
{ Link: "", Title: "Sửa" }
];

export const AddPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/ProductStatus", Title: "Trạng thái sản phẩm" },
{ Link: "", Title: "Thêm" }
];

export const SearchElementList = [
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

export const AddElementList = [
    {
        //validatonList: ["required", "number"]
        //primaryKey: true


        type: "text",
        name: "txtProductStatusID",
        label: "Mã trạng thái",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtProductStatusName",
        label: "Tên trạng thái",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        DataSourceMember: "ProductStatusName",
        listoption: {},
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "checkbox",
        name: "chkIsCanPurchase",
        label: "Có thể mua hàng",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
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
        validatonList: ["number"],
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
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
        label: "Hệ thống",
        value: false,
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
        name: "txtProductStatusID",
        label: "Mã trạng thái",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: true,
        DataSourceMember: "ProductStatusID",
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtProductStatusName",
        label: "Tên trạng thái",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "ProductStatusName",
        validatonList: ["required"]
    },
    {
        type: "checkbox",
        name: "chkIsCanPurchase",
        label: "Cho phép mua hàng",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsCanPurchase",
        validatonList: []
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
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

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const MLObjectDefinition = [
    {
        Name: "ProductStatusID",
        DefaultValue: "",
        BindControlName: "txtProductStatusID",
        DataSourceMember: "ProductStatusID"
    },
    {
        Name: "ProductStatusName",
        DefaultValue: "",
        BindControlName: "txtProductStatusName",
        DataSourceMember: "ProductStatusName"
    },
    {
        Name: "IsCanPurchase",
        DefaultValue: true,
        BindControlName: "chkIsCanPurchase",
        DataSourceMember: "IsCanPurchase"
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
        Name: "LstProductStatus_Lang",
        DefaultValue: {},
        BindControlName: "inputGridProductStatus_Lang",
        DataSourceMember: "inputGridProductStatus_Lang"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ProductStatusID",
        Width: 80
    },
    {
        Name: "ProductStatusID",
        Type: "text",
        Caption: "Trạng thái",
        DataSourceMember: "ProductStatusID",
        Width: 150
    },
    {
        Name: "ProductStatusName",
        Type: "text",
        Caption: "Tên trạng thái",
        DataSourceMember: "ProductStatusName",
        Width: 200
    },
    {
        Name: "IsCanPurchase",
        Type: "checkicon",
        Caption: " Cho phép mua hàng",
        DataSourceMember: "IsCanPurchase",
        Width: 200
    },
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
        Width: 200
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ProductStatusID",
        Width: 200,
        Link: "/ProductStatus/Edit/",
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
        Name: "ProductStatusName",
        DefaultValue: "",
        BindControlName: "ProductStatusName",
        DataSourceMember: "ProductStatusName"
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
        Width: 200
    },
    {
        Name: "ProductStatusName",
        Type: "textbox",
        Caption: "Tên trạng thái sản phẩm",
        DataSourceMember: "ProductStatusName",
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
