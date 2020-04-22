export const APIHostName = "EWalletAPI";
export const SearchAPIPath = "api/McRole/Search";
export const LoadAPIPath = "api/McRole/Load";
export const AddAPIPath = "api/McRole/Add";
export const UpdateAPIPath = "api/McRole/Update";
export const DeleteAPIPath = "api/McRole/Delete";
export const UpdateOrderAPIPath = "api/McRole/UpdateOrder";
export const BackLink = "/home/McRole";
export const AddLink = "/home/McRole/Add";
export const SearchMcRoleAPIPath = "api/McPriviledge/Search";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "McRoleID";

export const PagePath = [
    { Link: "/home/", Title: "Trang chủ" },
    { Link: "/home/McRole", Title: "Danh sách vai trò người dùng" }
];

export const EditPagePath = [
    { Link: "/home/", Title: "Trang chủ" },
    { Link: "/home/McRole", Title: "Danh sách vai trò người dùng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/home/", Title: "Trang chủ" },
    { Link: "/home/McRole", Title: "Danh sách vai trò người dùng" },
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
        type: "text",
        name: "txtMcRoleName",
        label: "Tên vai trò:",
        value: "",
        maxSize: "800",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "McRoleName",
        readonly: false,
        validatonList: ["required","special"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "2000",
        placeholder: "Mô tả",
        icon: "",
        rows: "6",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: 0,
        maxSize: "9",
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
        name: "txtMcRoleID",
        label: "Mã vai trò:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: true,
        DataSourceMember: "McRoleID",
        validatonList: []
    },
    {
        type: "text",
        name: "txtMcRoleName",
        label: "Tên vai trò:",
        value: "",
        maxSize: "800",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "McRoleName",
        validatonList: ["required","special"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "2000",
        placeholder: "Mô tả",
        icon: "",
        rows: "6",
        listoption: [],
        readonly: false,
        DataSourceMember: "Description",
        validatonList: []
    },
    {
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "9",
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
        Name: "McRoleID",
        DefaultValue: "",
        BindControlName: "txtMcRoleID",
        DataSourceMember: "McRoleID"
    },
    {
        Name: "McRoleName",
        DefaultValue: "",
        BindControlName: "txtMcRoleName",
        DataSourceMember: "McRoleName"
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
    } ,
    {
        Name: "LstMcRole_Priviledge",
        DefaultValue: {},
        BindControlName: "LstMcRole_Priviledge",
        DataSourceMember: "LstMcRole_Priviledge"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "McRoleID",
        Width: 150
    },
    {
        Name: "McRoleID",
        Type: "text",
        Caption: "Mã vai trò",
        DataSourceMember: "McRoleID",
        Width: 200
    },
    {
        Name: "McRoleName",
        Type: "text",
        Caption: "Tên vai trò",
        DataSourceMember: "McRoleName",
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
        DataSourceMember: "McRoleID",
        Width: 200,
        Link: "/home/McRole/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

//model
export const SearchMLmoldeDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const SearchElementModeList = [
    {
        type: "textType",
        name: "txtKeyword",
        label: "",
        value: "",
        placeholder: "Từ khóa ",
        icon: "",
        listoption: {}
    }
];

export const DataGridColumnListMultiple = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "McPriviledgeID",
        Width: 70
    },
    {
        Name: "McPriviledgeID",
        Type: "text",
        Caption: "Mã quyền",
        DataSourceMember: "McPriviledgeID",
        Width: 150
    },
    {
        Name: "McPriviledgeName",
        Type: "text",
        Caption: "Tên quyền",
        DataSourceMember: "McPriviledgeName",
        Width: 700
    }

];


export const GridMLMcRoleDefinition = [
    {
        Name: "McPriviledgeID",
        DefaultValue: "",
        BindControlName: "McPriviledgeID",
        DataSourceMember: "McPriviledgeID"
    },
    {
        Name: "McPriviledgeName",
        DefaultValue: "",
        BindControlName: "McPriviledgeName",
        DataSourceMember: "McPriviledgeName"
    }
];

export const InputMcRoleColumnList = [
    {
        Name: "chkSelect",
        Type: "checkboxAll",
        Caption: "",
        DataSourceMember: "McPriviledgeID",
        Width: 70
    },
    {
        Name: "McPriviledgeID",
        Type: "text",
        Caption: "Mã quyền",
        DataSourceMember: "McPriviledgeID",
        Width: 150
    },
    {
        Name: "McPriviledgeName",
        Type: "text",
        Caption: "Tên quyền",
        DataSourceMember: "McPriviledgeName",
        Width: 700
    }
];
