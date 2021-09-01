export const APIHostName = "TMSAPI";
export const API_SvCategoryType_Add = "api/svCategoryType/Add";
export const API_SvCategoryType_DeleteList = "api/svCategoryType/DeleteList";
export const API_SvCategoryType_Load = "api/svCategoryType/Load";
export const API_SvCategoryType_Search = "api/svCategoryType/Search";
export const API_SvCategoryType_Update = "api/svCategoryType/Update";

export const initSearchData = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
]

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách loại danh mục dịch vụ" }
];

export const PagePath_Add = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SvCategoryType", Title: "Danh sách loại danh mục dịch vụ" },
    { Link: "", Title: "Thêm" },
];

export const PagePath_Edit = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SvCategoryType", Title: "Danh sách loại danh mục dịch vụ" },
    { Link: "", Title: "Chỉnh sửa" },
];

export const listColumn_Search = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "svCategoryTypeID",
        Width: 60
    },
    {
        Name: "svCategoryTypeID",
        Type: "text",
        Caption: "Mã loại danh mục dịch vụ",
        DataSourceMember: "svCategoryTypeID"
    },
    {
        Name: "svCategoryTypeName",
        Type: "text",
        Caption: "Tên loại danh mục dịch vụ",
        DataSourceMember: "svCategoryTypeName"
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        Type: "text",
        Caption: "Thứ tự hiển thị",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "CreatedUserIDName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserIDName"
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "svCategoryTypeID",
        Width: 100,
        Link: "/SvCategoryType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const MLObjectDefinition_Search = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const listelement_Search = [
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

export const MLObjectDefinition_Add = [
    {
        Name: "svCategoryTypeName",
        DefaultValue: "",
        BindControlName: "txtsvCategoryTypeName",
        DataSourceMember: "svCategoryTypeName"
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
    }
]