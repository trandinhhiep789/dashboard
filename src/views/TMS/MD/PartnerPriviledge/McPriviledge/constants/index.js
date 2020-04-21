export const APIHostName = "EWalletAPI";
export const SearchAPIPath = "api/McPriviledge/Search";
export const LoadAPIPath = "api/McPriviledge/Load";
export const AddAPIPath = "api/McPriviledge/Add";
export const UpdateAPIPath = "api/McPriviledge/Update";
export const DeleteAPIPath = "api/McPriviledge/Delete";
export const UpdateOrderAPIPath = "api/McPriviledge/UpdateOrder";
export const BackLink = "/home/McPriviledge";
export const AddLink = "/home/McPriviledge/add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "McPriviledgeID";

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];
export const PagePath = [
    { Link: "/home/", Title: "Trang chủ" },
    { Link: "", Title: "Danh sách quyền nhà cung cấp" }
];

export const EditPagePath = [
    { Link: "/home/", Title: "Trang chủ" },
    { Link: "/home/McPriviledge", Title: "Danh sách quyền nhà cung cấp" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/home/", Title: "Trang chủ" },
    { Link: "/home/McPriviledge", Title: "Danh sách quyền nhà cung cấpn" },
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
    },
    {
        type: "select",
        name: "txtMcPriviledgeGroupID",
        label: "Nhóm quyền:",
        value: -1,
        listoption: [],
        css: "col-md-4",
        DataSourceMember: "McPriviledgeGroupID",
        isCategory: true,
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "",
        ValueMember: "",
        NameMember: ""
    }
];
export const SearchMLObjectDefinition = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@McPriviledgeGroupID",
        SearchValue: -1
    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtMcPriviledgeID",
        label: "Mã quyền",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "McPriviledgeID",
        readonly: false,
        validatonList: ["required","touppercase"]
    },
    {
        type: "select",
        name: "selMcPriviledgeGroupID",
        label: "Mã nhóm quyền:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [{value: -1, label: "--Vui lòng chọn--" }],
        DataSourceMember: "McPriviledgeGroupID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "",
        ValueMember: "McPriviledgeGroupID",
        NameMember: "McPriviledgeGroupName"
    },
    {
        type: "text",
        name: "txtMcPriviledgeName",
        label: "Tên quyền",
        value: "",
        maxSize: "800",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "McPriviledgeName",
        readonly: false,
        validatonList: ["required","special"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
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
        listoption: {},
        readonly: false,
        DataSourceMember: "IsActived",
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsSystem",
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtMcPriviledgeID",
        label: "Mã quyền",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "McPriviledgeID",
        readonly: true,
        validatonList: ["required","touppercase"]
    },
    {
        type: "select",
        name: "selMcPriviledgeGroupID",
        label: "Mã nhóm quyền:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "McPriviledgeGroupID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "",
        ValueMember: "McPriviledgeGroupID",
        NameMember: "McPriviledgeGroupName"
    },
    {
        type: "text",
        name: "txtMcPriviledgeName",
        label: "Tên quyền",
        value: "",
        maxSize: "800",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "McPriviledgeName",
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
        rows: "6",
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


export const MLObjectDefinition = [
    {
        Name: "McPriviledgeID",
        DefaultValue: "",
        BindControlName: "txtMcPriviledgeID",
        DataSourceMember: "McPriviledgeID"
    },
    {
        Name: "McPriviledgeGroupID",
        DefaultValue: "",
        BindControlName: "selMcPriviledgeGroupID",
        DataSourceMember: "McPriviledgeGroupID"
    },
    {
        Name: "McPriviledgeGroupName",
        DefaultValue: "",
        BindControlName: "txtMcPriviledgeGroupName",
        DataSourceMember: "McPriviledgeGroupName"
    },
    {
        Name: "McPriviledgeName",
        DefaultValue: "",
        BindControlName: "txtMcPriviledgeName",
        DataSourceMember: "McPriviledgeName"
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
        Name: "CreatedUserFullName",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUserFullName"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUserFullName"
    },
    {
        Name: "UpdatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "UpdatedUser"
    },
    {
        Name: "LoginLogID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: ""
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "McPriviledgeID",
        Width: 60
    },
    {
        Name: "McPriviledgeID",
        Type: "text",
        Caption: "Mã  quyền",
        DataSourceMember: "McPriviledgeID",
        Width: 100
    },
    {
        Name: "McPriviledgeName",
        Type: "text",
        Caption: "Tên quyền",
        DataSourceMember: "McPriviledgeName",
        Width: 150
    },
    {
        Name: "McPriviledgeGroupName",
        Type: "text",
        Caption: "Tên nhóm quyền",
        DataSourceMember: "McPriviledgeGroupName",
        Width: 150
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "McPriviledgeID",
        Width: 80,
        Link: "/home/McPriviledge/edit/",
        LinkText: "Chỉnh sửa"
    }
];
