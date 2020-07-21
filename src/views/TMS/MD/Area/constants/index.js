export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/Area/Search";
export const LoadAPIPath = "api/Area/Load";
export const AddAPIPath = "api/Area/Add";
export const UpdateAPIPath = "api/Area/Update";
export const DeleteAPIPath = "api/Area/Delete";
export const UpdateOrderAPIPath = "api/Area/UpdateOrder";
export const GetParent = "api/Area/GetParentArea";
export const BackLink = "/Area";
export const AddLink = "/Area/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AreaID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách khu vực" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Area", Title: "Danh sách khu vực" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Area", Title: "Danh sách khu vực" },
    { Link: "", Title: "Thêm" }
];

export const InitSearchParams = [
    {
        SearchKey: "@Keyword", 
        SearchValue: ""
    },
    {
        SearchKey: "@AreaTypeID", 
        SearchValue: -1
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
        listoption: {}
    },
    {
        type: "select",
        name: "txtAreaTypeID",
        label: "loại khu vực",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AreaTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREATYPE",
        ValueMember: "AreaTypeID",
        NameMember: "AreaTypeName"
    }

];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "AreaTypeID",
        DefaultValue: "",
        BindControlName: "txtAreaTypeID"
    }

];

export const AddElementList = [
    {
        type: "select",
        name: "txtAreaTypeID",
        label: "loại khu vực",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AreaTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREATYPE",
        ValueMember: "AreaTypeID",
        NameMember: "AreaTypeName"
    },
    {
        type: "treeSelect",
        name: "comboParentID",
        label: "khu vực cha",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        treeData: [],
        rootID: -1,
        rootKey: "ParentID",
        DataSourceMember: "ParentID",
        validatonList: [],
        LoadItemCacheKeyID: "",
        IsAutoLoadItemFromCache: false,
        ValueMember: "AreaID",
        NameMember: "AreaName",
    },
    {
        type: "text",
        name: "txtAreaName",
        label: "tên khu vực",
        maxSize: "200",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AreaName",
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
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
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
        type: "select",
        name: "txtAreaTypeID",
        label: "loại khu vực",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AreaTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREATYPE",
        ValueMember: "AreaTypeID",
        NameMember: "AreaTypeName"
    },
    {
        type: "treeSelect",
        name: "comboParentID",
        label: "khu vực cha",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        treeData: [],
        rootID: -1,
        rootKey: "ParentID",
        DataSourceMember: "ParentID",
        validatonList: [],
        LoadItemCacheKeyID: "",
        IsAutoLoadItemFromCache: false,
        ValueMember: "AreaID",
        NameMember: "AreaName",
    },
    {
        type: "text",
        name: "txtAreaName",
        label: "tên khu vực",
        maxSize: "200",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AreaName",
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
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
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
        label: "Kích hoạt",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsActived",
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
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: []
    }
];



export const MLObjectDefinition = [
    {
        Name: "AreaID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "AreaID"
    },
    {
        Name: "AreaTypeID",
        DefaultValue: "",
        BindControlName: "txtAreaTypeID",
        DataSourceMember: "AreaTypeID"
    },
    {
        Name: "AreaTypeName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "AreaTypeName"
    },
    {
        Name: "ParentID",
        DefaultValue: -1,
        BindControlName: "comboParentID",
        DataSourceMember: "ParentID"
    },
    {
        Name: "ParentName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "ParentName"
    },
    {
        Name: "AreaName",
        DefaultValue: "",
        BindControlName: "txtAreaName",
        DataSourceMember: "AreaName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: 0,
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
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "AreaID",
        Width: 60
    },
    {
        Name: "AreaID",
        Type: "text",
        Caption: "Mã khu vực",
        DataSourceMember: "AreaID",
        Width: 150
    },
    {
        Name: "AreaTypeName",
        Type: "text",
        Caption: "Loại khu vực",
        DataSourceMember: "AreaTypeName",
        Width: 150
    },
    {
        Name: "AreaName",
        Type: "text",
        Caption: "Tên khu vực",
        DataSourceMember: "AreaName",
        Width: 150
    },
    {
        Name: "ParentName",
        Type: "text",
        Caption: "Khu vực cha",
        DataSourceMember: "ParentName",
        Width: 150
    },
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     Width: 250
    // },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100
    },
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 200
    // },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "AreaID",
        Width: 100,
        Link: "/Area/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
