export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/CategoryType/Search";
export const LoadAPIPath = "api/CategoryType/Load";
export const AddAPIPath = "api/CategoryType/Add";
export const UpdateAPIPath = "api/CategoryType/Update";
export const DeleteAPIPath = "api/CategoryType/Delete";
export const UpdateOrderAPIPath = "api/CategoryType/UpdateOrder";
export const BackLink = "/CategoryType";
export const AddLink = "/CategoryType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "CategoryTypeID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/CategoryType", Title: "Loại danh mục sản phẩm" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/CategoryType", Title: "Loại danh mục sản phẩm" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/CategoryType", Title: "Loại danh mục sản phẩm" },
    { Link: "", Title: "Thêm" }
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
        name: "txtCategoryTypeID",
        label: "Mã loại danh mục",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "CategoryTypeID",
        readonly: false,
        showMask: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtCategoryTypeName",
        label: "Tên loại danh mục",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "CategoryTypeName",
        readonly: false,
        validatonList: ["required"]
    },
    // {
    //     type: "text",
    //     name: "txtParentID",
    //     label: "Mã loại danh mục cha:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "ParentID",
    //     readonly: false,
    //     validatonList: []

    // },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
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
        name: "txtCategoryTypeID",
        label: "Mã loại danh mục",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: true,
        DataSourceMember: "CategoryTypeID",
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtCategoryTypeName",
        label: "Tên loại danh mục",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "CategoryTypeName",
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
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
        Name: "CategoryTypeID",
        DefaultValue: "",
        BindControlName: "txtCategoryTypeID",
        DataSourceMember: "CategoryTypeID"
    },
    {
        Name: "CategoryTypeName",
        DefaultValue: "",
        BindControlName: "txtCategoryTypeName",
        DataSourceMember: "CategoryTypeName"
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
        DataSourceMember: "CategoryTypeID",
        Width: 150
    },
    {
        Name: "CategoryTypeID",
        Type: "text",
        Caption: "Mã loại danh mục",
        DataSourceMember: "CategoryTypeID",
        Width: 150
    },
    {
        Name: "CategoryTypeName",
        Type: "text",
        Caption: "Tên loại danh mục",
        DataSourceMember: "CategoryTypeName",
        Width: 500
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
        DataSourceMember: "CategoryTypeID",
        Width: 200,
        Link: "/CategoryType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
