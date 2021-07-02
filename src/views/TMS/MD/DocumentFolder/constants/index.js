export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/DocumentFolder/Search";
export const ExportAPIPath = "api/DocumentFolder/Export";
export const LoadAPIPath = "api/DocumentFolder/Load";
export const AddAPIPath = "api/DocumentFolder/Add";
export const UpdateAPIPath = "api/DocumentFolder/Update";
export const DeleteAPIPath = "api/DocumentFolder/Delete";
export const UpdateOrderAPIPath = "api/DocumentFolder/UpdateOrder";
export const GetParent = "api/DocumentFolder/GetParentDocumentFolder";
export const BackLink = "/DocumentsFolder";
export const AddLink = "/DocumentsFolder/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "DocumentFolderID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh mục tài liệu" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DocumentsFolder", Title: "Danh mục tài liệu" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DocumentsFolder", Title: "Danh mục tài liệu" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DocumentsFolder", Title: "Danh mục tài liệu" },
    { Link: "", Title: "Chi tiết danh mục tài liệu" }
];

export const InitSearchParams = [
    {
        SearchKey: "@Keyword", 
        SearchValue: ""
    },
    // {
    //     SearchKey: "@DocumentFolderTypeID", 
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
    //     name: "txtDocumentFolderTypeID",
    //     label: "loại danh mục tài liệu",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "DocumentFolderTypeID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.DocumentFolderTYPE",
    //     ValueMember: "DocumentFolderTypeID",
    //     NameMember: "DocumentFolderTypeName"
    // }

];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    // {
    //     Name: "DocumentFolderTypeID",
    //     DefaultValue: "",
    //     BindControlName: "txtDocumentFolderTypeID"
    // }

];

export const AddElementList = [
    // {
    //     type: "select",
    //     name: "txtDocumentFolderTypeID",
    //     label: "loại danh mục tài liệu",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "DocumentFolderTypeID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.DocumentFolderTYPE",
    //     ValueMember: "DocumentFolderTypeID",
    //     NameMember: "DocumentFolderTypeName"
    // },
    {
        type: "text",
        name: "txtDocumentFolderName",
        label: "tên danh mục tài liệu",
        maxSize: "300",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DocumentFolderName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "treeSelect",
        name: "comboParentID",
        label: "danh mục tài liệu cha",
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
        ValueMember: "DocumentFolderID",
        NameMember: "DocumentFolderName",
    },
    {
        type: "singleFileUpload",
        name: "txtFolderImageURL",
        NameMember: "FolderImageURL",
        label: "đường dẫn hình đại diện cho danh mục tài liệu",
        value: "",
        placeholder: "",
        icon: "",
        cdn: "",
        listoption: {},
        DataSourceMember: "FolderImageURL",
        readonly: false,
        validatonList: []
    },
    // {
    //     type: "textDocumentFolder",
    //     name: "txtDescription",
    //     label: "Mô tả",
    //     value: "",
    //     maxSize: "2000",
    //     placeholder: "",
    //     icon: "",
    //     rows: "6",
    //     listoption: {},
    //     DataSourceMember: "Description",
    //     readonly: false,
    //     validatonList: []
    // },
    // {
    //     type: "text",
    //     name: "txtOrderIndex",
    //     label: "Thứ tự hiển thị",
    //     value: 0,
    //     maxSize: "9",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "OrderIndex",
    //     readonly: false,
    //     validatonList: ["number"]
    // },
    // {
    //     type: "checkbox",
    //     name: "chkIsActived",
    //     label: "Kích hoạt",
    //     value: true,
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     readonly: false,
    //     validatonList: []
    // },
    // {
    //     type: "checkbox",
    //     name: "chkIsSystem",
    //     label: "Hệ thống",
    //     value: false,
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     readonly: false,
    //     validatonList: []
    // }
];

export const EditElementList = [
    // {
    //     type: "select",
    //     name: "txtDocumentFolderTypeID",
    //     label: "loại danh mục tài liệu",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "DocumentFolderTypeID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.DocumentFolderTYPE",
    //     ValueMember: "DocumentFolderTypeID",
    //     NameMember: "DocumentFolderTypeName"
    // },
    {
        type: "text",
        name: "txtDocumentFolderID",
        label: "mã danh mục tài liệu",
        maxSize: "300",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DocumentFolderID",
        readonly: true,
        validatonList: []
    },
    {
        type: "text",
        name: "txtDocumentFolderName",
        label: "tên danh mục tài liệu",
        maxSize: "300",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DocumentFolderName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "treeSelect",
        name: "comboParentID",
        label: "danh mục tài liệu cha",
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
        ValueMember: "DocumentFolderID",
        NameMember: "DocumentFolderName",
    },
    {
        type: "singleFileUpload",
        name: "txtFolderImageURL",
        NameMember: "FolderImageURL",
        label: "đường dẫn hình đại diện cho danh mục tài liệu",
        value: "",
        placeholder: "",
        icon: "",
        cdn: "",
        listoption: {},
        DataSourceMember: "FolderImageURL",
        readonly: false,
        validatonList: []
    },
    // {
    //     type: "textDocumentFolder",
    //     name: "txtDescription",
    //     label: "Mô tả",
    //     value: "",
    //     maxSize: "2000",
    //     placeholder: "",
    //     icon: "",
    //     rows: "6",
    //     listoption: {},
    //     DataSourceMember: "Description",
    //     readonly: false,
    //     validatonList: []
    // },
    // {
    //     type: "text",
    //     name: "txtOrderIndex",
    //     label: "Thứ tự hiển thị",
    //     value: "",
    //     maxSize: "9",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "OrderIndex",
    //     readonly: false,
    //     validatonList: ["number"]
    // },
    // {
    //     type: "checkbox",
    //     name: "chkIsActived",
    //     label: "Kích hoạt",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "IsActived",
    //     readonly: false,
    //     validatonList: []
    // },
    // {
    //     type: "checkbox",
    //     name: "chkIsSystem",
    //     label: "Hệ thống",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "IsSystem",
    //     readonly: false,
    //     validatonList: []
    // }
];



export const MLObjectDefinition = [
    {
        Name: "DocumentFolderID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "DocumentFolderID"
    },
    {
        Name: "DocumentFolderTypeID",
        DefaultValue: "",
        BindControlName: "txtDocumentFolderTypeID",
        DataSourceMember: "DocumentFolderTypeID"
    },
    {
        Name: "FolderImageURL",
        DefaultValue: "",
        BindControlName: "txtFolderImageURL",
        DataSourceMember: "FolderImageURL"
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
        Name: "DocumentFolderName",
        DefaultValue: "",
        BindControlName: "txtDocumentFolderName",
        DataSourceMember: "DocumentFolderName"
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
        DataSourceMember: "DocumentFolderID",
        Width: 60
    },
    {
        Name: "DocumentFolderID",
        Type: "text",
        Caption: "Mã danh mục tài liệu",
        DataSourceMember: "DocumentFolderID",
        Width: 80
    },
    {
        Name: "DocumentFolderName",
        Type: "text",
        Caption: "Tên danh mục tài liệu",
        DataSourceMember: "DocumentFolderName",
        Width: 160
    },
    {
        Name: "ParentName",
        Type: "text",
        Caption: "danh mục tài liệu cha",
        DataSourceMember: "ParentName",
        Width: 120
    },
   
    // {
    //     Name: "DocumentFolderName",
    //     Type: "texttolink",
    //     Caption: "Tên danh mục tài liệu",
    //     Link: "/DocumentFolder/Detail/",
    //     DataSourceMember: "DocumentFolderName",
    //     Width: 120
    // },
    
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     Width: 250
    // },
    // {
    //     Name: "IsActived",
    //     Type: "checkicon",
    //     Caption: "Kích hoạt",
    //     DataSourceMember: "IsActived",
    //     Width: 80
    // },
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 200
    // },
    {
        Name: "UpdatedDate",
        Type: "date",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
        Width: 140
    },
    {
        Name: "UpdatedUserFullName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserFullName",
        Width: 140
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "DocumentFolderID",
        Width: 80,
        Link: "/DocumentsFolder/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
