export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ProductImageType/Search";
export const LoadAPIPath = "api/ProductImageType/Load";
export const AddAPIPath = "api/ProductImageType/Add";
export const UpdateAPIPath = "api/ProductImageType/Update";
export const DeleteAPIPath = "api/ProductImageType/Delete";
export const UpdateOrderAPIPath = "api/ProductImageType/UpdateOrder";
export const BackLink = "/ProductImageType";
export const AddLink = "/ProductImageType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ProductImageTypeID";
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductImageType", Title: "Loại ảnh sản phẩm" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductImageType", Title: "Loại ảnh sản phẩm" },
    { Link: "", Title: "Sửa loại ảnh sản phẩm" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductImageType", Title: "Loại ảnh sản phẩm" },
    { Link: "", Title: "Thêm loại ảnh sản phẩm" }
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
        type: "text",
        name: "txtProductImageTypeID",
        label: "Mã loại ảnh",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ProductImageTypeID",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtProductImageTypeName",
        label: "Tên loại ảnh",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ProductImageTypeName",
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
        value: "true",
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
        name: "txtProductImageTypeID",
        label: "Mã loại ảnh",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: true,
        DataSourceMember: "ProductImageTypeID",
        validatonList: []
    },
    {
        type: "text",
        name: "txtProductImageTypeName",
        label: "Tên loại ảnh",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "ProductImageTypeName",
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
        value: "true",
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
        Name: "ProductImageTypeID",
        DefaultValue: "",
        BindControlName: "txtProductImageTypeID",
        DataSourceMember: "ProductImageTypeID"
    },
    {
        Name: "ProductImageTypeName",
        DefaultValue: "",
        BindControlName: "txtProductImageTypeName",
        DataSourceMember: "ProductImageTypeName"
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
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ProductImageTypeID",
        Width: 100
    },
    {
        Name: "ProductImageTypeID",
        Type: "text",
        Caption: "Mã loại ảnh",
        DataSourceMember: "ProductImageTypeID",
        Width: 150
    },
    {
        Name: "ProductImageTypeName",
        Type: "text",
        Caption: "Tên loại ảnh",
        DataSourceMember: "ProductImageTypeName",
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
        DataSourceMember: "ProductImageTypeID",
        Width: 200,
        Link: "/ProductImageType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
