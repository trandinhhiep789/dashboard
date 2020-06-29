export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PartnerRole/Search";
export const LoadAPIPath = "api/PartnerRole/Load";
export const AddAPIPath = "api/PartnerRole/Add";
export const UpdateAPIPath = "api/PartnerRole/Update";
export const DeleteAPIPath = "api/PartnerRole/Delete";
export const UpdateOrderAPIPath = "api/PartnerRole/UpdateOrder";
export const BackLink = "/PartnerRole";
export const AddLink = "/PartnerRole/Add";
export const SearchPartnerRoleAPIPath = "api/PartnerPriviledge/Search2";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PartnerRoleID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách vai trò nhà cung cấp" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerRole", Title: "Danh sách vai trò nhà cung cấp" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerRole", Title: "Danh sách vai trò nhà cung cấp" },
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
        name: "txtPartnerRoleID",
        label: "Mã vai trò:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerRoleID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtPartnerRoleName",
        label: "tên vai trò:",
        value: "",
        maxSize: "700",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerRoleName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "1900",
        placeholder: "Mô tả",
        icon: "",
        rows: "6",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: 0,
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
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
        name: "txtPartnerRoleID",
        label: "mã vai trò:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: true,
        DataSourceMember: "PartnerRoleID",
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtPartnerRoleName",
        label: "tên vai trò:",
        value: "",
        maxSize: "700",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "PartnerRoleName",
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "1900",
        placeholder: "Mô tả",
        icon: "",
        rows: "6",
        listoption: [],
        readonly: false,
        DataSourceMember: "Description",
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
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
        Name: "PartnerRoleID",
        DefaultValue: "",
        BindControlName: "txtPartnerRoleID",
        DataSourceMember: "PartnerRoleID"
    },
    {
        Name: "PartnerRoleName",
        DefaultValue: "",
        BindControlName: "txtPartnerRoleName",
        DataSourceMember: "PartnerRoleName"
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
        Name: "LstPartnerRole_Priviledge",
        DefaultValue: {},
        BindControlName: "LstPartnerRole_Priviledge",
        DataSourceMember: "LstPartnerRole_Priviledge"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PartnerRoleID",
        Width: 150
    },
    {
        Name: "PartnerRoleID",
        Type: "text",
        Caption: "Mã vai trò",
        DataSourceMember: "PartnerRoleID",
        Width: 200
    },
    {
        Name: "PartnerRoleName",
        Type: "text",
        Caption: "Tên vai trò",
        DataSourceMember: "PartnerRoleName",
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
        DataSourceMember: "PartnerRoleID",
        Width: 200,
        Link: "/PartnerRole/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

//model
export const InitSearchParamsModeList = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
    // {
    //     SearchKey: "@PartnerPriviledgeGroupID",
    //     SearchValue: -1
    // }
];

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
        DataSourceMember: "PartnerPriviledgeID",
        Width: 70
    },
    {
        Name: "PartnerPriviledgeID",
        Type: "text",
        Caption: "Mã quyền",
        DataSourceMember: "PartnerPriviledgeID",
        Width: 150
    },
    {
        Name: "PartnerPriviledgeName",
        Type: "text",
        Caption: "Tên quyền",
        DataSourceMember: "PartnerPriviledgeName",
        Width: 700
    }

];


export const GridMLPartnerRoleDefinition = [
    {
        Name: "PartnerPriviledgeID",
        DefaultValue: "",
        BindControlName: "PartnerPriviledgeID",
        DataSourceMember: "PartnerPriviledgeID"
    },
    {
        Name: "PartnerPriviledgeName",
        DefaultValue: "",
        BindControlName: "PartnerPriviledgeName",
        DataSourceMember: "PartnerPriviledgeName"
    }
];

export const InputPartnerRoleColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "PartnerPriviledgeID",
        Width: 70
    },
    {
        Name: "PartnerPriviledgeID",
        Type: "text",
        Caption: "Mã quyền",
        DataSourceMember: "PartnerPriviledgeID",
        Width: 150
    },
    {
        Name: "PartnerPriviledgeName",
        Type: "text",
        Caption: "Tên quyền",
        DataSourceMember: "PartnerPriviledgeName",
        Width: 700
    }
];
