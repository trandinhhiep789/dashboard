export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/InstallMaterial/Search";
export const LoadAPIPath = "api/InstallMaterial/Load";
export const AddAPIPath = "api/InstallMaterial/Add";
export const UpdateAPIPath = "api/InstallMaterial/Update";
export const DeleteAPIPath = "api/InstallMaterial/Delete";
export const UpdateOrderAPIPath = "api/InstallMaterial/UpdateOrder";
export const BackLink = "/InstallMaterial";
export const AddLink = "/InstallMaterial/add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "InstallMaterialID";

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@InstallMaterialGroupID",
        SearchValue: -1
    }
];
export const PagePath = [
    { Link: "/home/", Title: "Trang chủ" },
    { Link: "", Title: "Danh sách quyền nhà cung cấp" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/InstallMaterial", Title: "Danh sách quyền nhà cung cấp" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/InstallMaterial", Title: "Danh sách quyền nhà cung cấpn" },
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
        name: "txtInstallMaterialGroupID",
        label: "Nhóm quyền:",
        value: -1,
        listoption: [],
        css: "col-md-4",
        DataSourceMember: "InstallMaterialGroupID",
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
        SearchKey: "@InstallMaterialGroupID",
        SearchValue: -1
    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtInstallMaterialID",
        label: "mã quyền",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "InstallMaterialID",
        readonly: false,
        validatonList: ["required","touppercase"]
    },
    {
        type: "select",
        name: "selInstallMaterialGroupID",
        label: "Mã nhóm quyền:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [{value: -1, label: "--Vui lòng chọn--" }],
        DataSourceMember: "InstallMaterialGroupID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.InstallMaterialGROUP",
        ValueMember: "InstallMaterialGroupID",
        NameMember: "InstallMaterialGroupName"
    },
    {
        type: "text",
        name: "txtInstallMaterialName",
        label: "tên quyền",
        value: "",
        maxSize: "800",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "InstallMaterialName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "1900",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
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
        name: "txtInstallMaterialID",
        label: "Mã quyền",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "InstallMaterialID",
        readonly: true,
        validatonList: ["required","touppercase"]
    },
    {
        type: "select",
        name: "selInstallMaterialGroupID",
        label: "Mã nhóm quyền:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "InstallMaterialGroupID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.InstallMaterialGROUP",
        ValueMember: "InstallMaterialGroupID",
        NameMember: "InstallMaterialGroupName"
    },
    {
        type: "text",
        name: "txtInstallMaterialName",
        label: "Tên quyền",
        value: "",
        maxSize: "800",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "InstallMaterialName",
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
        Name: "InstallMaterialID",
        DefaultValue: "",
        BindControlName: "txtInstallMaterialID",
        DataSourceMember: "InstallMaterialID"
    },
    {
        Name: "InstallMaterialGroupID",
        DefaultValue: "",
        BindControlName: "selInstallMaterialGroupID",
        DataSourceMember: "InstallMaterialGroupID"
    },
    {
        Name: "InstallMaterialGroupName",
        DefaultValue: "",
        BindControlName: "txtInstallMaterialGroupName",
        DataSourceMember: "InstallMaterialGroupName"
    },
    {
        Name: "InstallMaterialName",
        DefaultValue: "",
        BindControlName: "txtInstallMaterialName",
        DataSourceMember: "InstallMaterialName"
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
        DataSourceMember: "InstallMaterialID",
        Width: 60
    },
    {
        Name: "InstallMaterialID",
        Type: "text",
        Caption: "Mã  quyền",
        DataSourceMember: "InstallMaterialID",
        Width: 100
    },
    {
        Name: "InstallMaterialName",
        Type: "text",
        Caption: "Tên quyền",
        DataSourceMember: "InstallMaterialName",
        Width: 150
    },
    {
        Name: "InstallMaterialGroupName",
        Type: "text",
        Caption: "Tên nhóm quyền",
        DataSourceMember: "InstallMaterialGroupName",
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
        DataSourceMember: "InstallMaterialID",
        Width: 80,
        Link: "/InstallMaterial/edit/",
        LinkText: "Chỉnh sửa"
    }
];
