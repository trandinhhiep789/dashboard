export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/AppFeedBackCategory/Search";
export const LoadAPIPath = "api/AppFeedBackCategory/Load";
export const AddAPIPath = "api/AppFeedBackCategory/Add";
export const UpdateAPIPath = "api/AppFeedBackCategory/Update";
export const DeleteAPIPath = "api/AppFeedBackCategory/Delete";
export const UpdateOrderAPIPath = "api/AppFeedBackCategory/UpdateOrder";
export const GetParent = "api/AppFeedBackCategory/GetParentAppFeedBackCategory";
export const BackLink = "/AppFeedBackCategory";
export const AddLink = "/AppFeedBackCategory/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AppFeedBackCategoryID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách danh mục phản hồi" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppFeedBackCategory", Title: "Danh sách danh mục phản hồi" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppFeedBackCategory", Title: "Danh sách danh mục phản hồi" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppFeedBackCategory", Title: "Danh sách danh mục phản hồi" },
    { Link: "", Title: "Chi tiết danh mục phản hồi" }
];

export const InitSearchParams = [
    {
        SearchKey: "@Keyword", 
        SearchValue: ""
    },
    // {
    //     SearchKey: "@AppFeedBackCategoryTypeID", 
    //     SearchValue: -1
    // }
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
    // {
    //     type: "select",
    //     name: "txtAppFeedBackCategoryTypeID",
    //     label: "loại danh mục phản hồi",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "AppFeedBackCategoryTypeID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.AppFeedBackCategoryTYPE",
    //     ValueMember: "AppFeedBackCategoryTypeID",
    //     NameMember: "AppFeedBackCategoryTypeName"
    // }

];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    // {
    //     Name: "AppFeedBackCategoryTypeID",
    //     DefaultValue: "",
    //     BindControlName: "txtAppFeedBackCategoryTypeID"
    // }

];

export const AddElementList = [
    {
        type: "text",
        name: "txtAppFeedBackCategoryID",
        label: "mã danh mục phản hồi",
        maxSize: "10",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackCategoryID",
        readonly: false,
        validatonList: ["required","number"]
    },
    {
        type: "text",
        name: "txtAppFeedBackCategoryName",
        label: "tên danh mục phản hồi",
        maxSize: "200",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackCategoryName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "treeSelect",
        name: "comboParentID",
        label: "danh mục phản hồi cha",
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
        ValueMember: "AppFeedBackCategoryID",
        NameMember: "AppFeedBackCategoryName",
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
        name: "txtAppFeedBackCategoryID",
        label: "mã danh mục phản hồi",
        maxSize: "10",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackCategoryID",
        readonly: true,
        validatonList: ["required","number"]
    },
    {
        type: "text",
        name: "txtAppFeedBackCategoryName",
        label: "tên danh mục phản hồi",
        maxSize: "200",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppFeedBackCategoryName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "treeSelect",
        name: "comboParentID",
        label: "danh mục phản hồi cha",
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
        ValueMember: "AppFeedBackCategoryID",
        NameMember: "AppFeedBackCategoryName",
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
        Name: "AppFeedBackCategoryID",
        DefaultValue: "",
        BindControlName: "txtAppFeedBackCategoryID",
        DataSourceMember: "AppFeedBackCategoryID"
    },
    {
        Name: "AppFeedBackCategoryName",
        DefaultValue: "",
        BindControlName: "txtAppFeedBackCategoryName",
        DataSourceMember: "AppFeedBackCategoryName"
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
        DataSourceMember: "AppFeedBackCategoryID",
        Width: 60
    },
    {
        Name: "AppFeedBackCategoryID",
        Type: "text",
        Caption: "Mã danh mục phản hồi",
        DataSourceMember: "AppFeedBackCategoryID",
        Width: 150
    },
    {
        Name: "AppFeedBackCategoryName",
        Type: "text",
        Caption: "Tên danh mục phản hồi",
        DataSourceMember: "AppFeedBackCategoryName",
        Width: 150
    },
    // {
    //     Name: "AppFeedBackCategoryName",
    //     Type: "texttolink",
    //     Caption: "Tên danh mục phản hồi",
    //     Link: "/AppFeedBackCategory/Detail/",
    //     DataSourceMember: "AppFeedBackCategoryName",
    //     Width: 120
    // },
    {
        Name: "ParentName",
        Type: "text",
        Caption: "Danh mục phản hồi cha",
        DataSourceMember: "ParentName",
        Width: 120
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
        Width: 80
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
        Width: 120
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 120
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "AppFeedBackCategoryID",
        Width: 80,
        Link: "/AppFeedBackCategory/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
