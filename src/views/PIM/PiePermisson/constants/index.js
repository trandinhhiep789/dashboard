export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PiePermission/Search";
export const LoadAPIPath = "api/PiePermission/Load";
export const AddAPIPath = "api/PiePermission/Add";
export const UpdateAPIPath = "api/PiePermission/Update";
export const DeleteAPIPath = "api/PiePermission/Delete";
export const UpdateOrderAPIPath = "api/PiePermission/UpdateOrder";
export const BackLink = "/PiePermission";
export const AddLink = "/PiePermission/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PiePermissionID";
export const AddLogAPIPath = "api/UserActivity/Add";

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/PiePermission", Title: "Quyền" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/PiePermission", Title: "Quyền" },
    { Link: "", Title: "Sửa quyền" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/PiePermission", Title: "Quyền" },
    { Link: "", Title: "Thêm quyền" }
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
        listoption: [],
        validatonList: []
    }
];

export const AddElementList = [
    {
        type: "numeric",
        name: "txtPiePermissionID",
        label: "Mã quyền:",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PiePermissionID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtPiePermissionName",
        label: "Tên quyền:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PiePermissionName",
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
        name: "txtPiePermissionID",
        label: "Mã quyền:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: true,
        DataSourceMember: "PiePermissionID",
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtPiePermissionName",
        label: "Tên quyền:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "PiePermissionName",
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
        Name: "PiePermissionID",
        DefaultValue: "",
        BindControlName: "txtPiePermissionID",
        DataSourceMember: "PiePermissionID"
    },
    {
        Name: "PiePermissionName",
        DefaultValue: "",
        BindControlName: "txtPiePermissionName",
        DataSourceMember: "PiePermissionName"
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
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PiePermissionID",
        Width: 100
    },
    {
        Name: "PiePermissionID",
        Type: "text",
        Caption: "Mã quyền",
        DataSourceMember: "PiePermissionID",
        Width: 100
    },
    {
        Name: "PiePermissionName",
        Type: "text",
        Caption: "Tên quyền",
        DataSourceMember: "PiePermissionName",
        Width: 600
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
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
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "PiePermissionID",
        Width: 150,
        Link: "/PiePermission/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
