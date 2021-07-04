export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/Document/Search";
export const LoadAPIPath = "api/Document/Load";
export const AddAPIPath = "api/Document/Add";
export const UpdatePulishAPIPath = "api/Document/UpdatePulished";
export const UpdateAPIPath = "";
export const DeleteNewAPIPath = "api/Document/Delete";
export const BackLink = "/Documents";
export const AddLink = "/Documents/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "DocumentID";

export const TitleFormSearch = "Tìm kiếm danh sách tài liệu";
export const TitleFormAdd = "Thêm tài liệu";
export const TitleFormEdit = "Cập nhật tài liệu";
export const TitleFormDetail = "Thông tin tài liệu";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách tài liệu" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Documents", Title: "Danh sách tài liệu" },
    { Link: "", Title: "Cập nhật" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Documents", Title: "Danh sách tài liệu" },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Documents", Title: "Danh sách tài liệu" },
    { Link: "", Title: "Chi tiết" }
];


const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@DOCUMENTTYPEID",
        SearchValue: "-1"
    },
    {
        SearchKey: "@FROMDATE",
        SearchValue: dtFromdate
    },
    {
        SearchKey: "@TODATE",
        SearchValue: new Date()
    },
    {
        SearchKey: "@PAGESIZE",
        SearchValue: 50
    },
    {
        SearchKey: "@PAGEINDEX",
        SearchValue: 1
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "DocumentID",
        Width: 60
    },
    {
        Name: "DocumentName",
        Type: "texttolink",
        Caption: "Tên tài liệu",
        DataSourceMember: "DocumentName",
        Link: "/Documents/Detail/",
        Width: 70
    },

    {
        Name: "DocumentFolderName",
        Type: "text",
        Caption: "Danh mục",
        DataSourceMember: "DocumentFolderName",
        Width: 150
    },
    {
        Name: "IsPublished",
        Type: "checkicon",
        Caption: "Công bố",
        DataSourceMember: "IsPublished",
        Width: 100
    },
    {
        Name: "PublishedDate",
        Type: "date",
        Caption: "Ngày xuất bản",
        DataSourceMember: "PublishedDate",
        Width: 100
    },
    {
        Name: "DocumentTypeName",
        Type: "text",
        Caption: "Loại tài liệu",
        DataSourceMember: "DocumentTypeName",
        Width: 130
    },
    {
        Name: "FileName",
        Type: "text",
        Caption: "Tập tin",
        DataSourceMember: "FileName",
        Width: 130
    },
    {
        Name: "ExtendLable",
        Type: "text",
        Caption: "Thông tin tài liệu",
        DataSourceMember: "ExtendLable",
        Width: 150
    },
    {
        Name: "ModifyDate",
        Type: "date",
        Caption: "Cập nhật lần cuối",
        DataSourceMember: "ModifyDate",
        Width: 100
    },

    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "DocumentID",
        Width: 100,
        Link: "/Documents/Edit/",
        LinkText: "Chỉnh sửa"
    },
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "DocumentTypeID",
        DefaultValue: "",
        BindControlName: "cbDocumentTypeID"
    },

    {
        Name: "FromDate",
        DefaultValue: "",
        BindControlName: "dtFromDate"
    },
    {
        Name: "ToDate",
        DefaultValue: "",
        BindControlName: "dtToDate"
    },

];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        DataSourceMember: "Keyword",
        label: "Từ khóa",
        value: "",
        colspan: 2,
        placeholder: "Từ khóa",
        icon: ""
    },
    {
        type: "ComboBox",
        name: "cbDocumentTypeID",
        DataSourceMember: "DocumentTypeID",
        label: "Loại tài liệu",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.DOCUMENTTYPE",
        ValueMember: "DocumentTypeID",
        NameMember: "DocumentTypeName",

    },
    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtToDate",
        DataSourceMember: "ToDate",
        label: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },

];


export const MLObjectDefinition = [
    {
        Name: "DocumentID",
        DefaultValue: "",
        BindControlName: "txtDocumentID",
        DataSourceMember: "DocumentID"
    },
    {
        Name: "DocumentName",
        DefaultValue: "",
        BindControlName: "txtDocumentName",
        DataSourceMember: "DocumentName"
    },
    {
        Name: "SearchKeyword",
        DefaultValue: "",
        BindControlName: "txtSearchKeyword",
        DataSourceMember: "SearchKeyword"
    },

    {
        Name: "DocumentFolderID",
        DefaultValue: "",
        BindControlName: "cbDocumentFolderID",
        DataSourceMember: "DocumentFolderID"
    },

    {
        Name: "DocumentTypeID",
        DefaultValue: "",
        BindControlName: "cbDocumentTypeID",
        DataSourceMember: "DocumentTypeID"
    },

    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },

    {
        Name: "FileContent1",
        DefaultValue: "",
        BindControlName: "txtEditorFileContent1",
        DataSourceMember: "FileContent1"
    },

    {
        Name: "DocumentImageURL",
        DefaultValue: "",
        BindControlName: "txtDocumentImageURL",
        DataSourceMember: "DocumentImageURL"
    },
    {
        Name: "FileName",
        DefaultValue: "",
        BindControlName: "txtFileName",
        DataSourceMember: "FileName"
    },
    {
        Name: "FileContent2",
        DefaultValue: "",
        BindControlName: "txtEditorFileContent2",
        DataSourceMember: "FileContent2"
    },
    {
        Name: "IsLockComment",
        DefaultValue: false,
        BindControlName: "chkIsLockComment",
        DataSourceMember: "IsLockComment"
    },

];


export const listColumnDocument_CommentList = [
    {
        Name: "Content",
        Type: "text",
        Caption: "Nội dung",
        DataSourceMember: "Content"
    },
    {
        Name: "CommentedUser",
        Type: "text",
        Caption: "Mã nhân viên",
        DataSourceMember: "CommentedUser"
    },
    {
        Name: "CommentedFullName",
        Type: "text",
        Caption: "Tên nhân viên",
        DataSourceMember: "CommentedFullName"
    },
    {
        Name: "CommentedDate",
        Type: "datetime",
        Caption: "Ngày bình luận",
        DataSourceMember: "CommentedDate"
    },
]


export const listColumnDocument_LikeList = [
    {
        Name: "LikeID",
        Type: "text",
        Caption: "LikeID",
        DataSourceMember: "LikeID"
    },
    {
        Name: "LikedUser",
        Type: "text",
        Caption: "Mã nhân viên",
        DataSourceMember: "LikedUser"
    },
    {
        Name: "LikedFullName",
        Type: "text",
        Caption: "Tên nhân viên",
        DataSourceMember: "LikedFullName"
    },
    {
        Name: "LikedDate",
        Type: "datetime",
        Caption: "Ngày like",
        DataSourceMember: "LikedDate"
    },
]