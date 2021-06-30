export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/Document/Search";
export const LoadAPIPath = "";
export const LoadNewAPIPath = "";
export const AddAPIPath = "";
export const AddAutoAPIPath = "";
export const UpdateAPIPath = "";
export const DeleteNewAPIPath = "";
export const DeleteAPIPath = "";
export const DeleteAbilityAPIPath = "";
export const UpdateOrderAPIPath = "";
export const BackLink = "/Documents";
export const AddLink = "/Documents/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "Documents";

export const TitleFormSearch = "Tìm kiếm danh sách tài liệu";
export const TitleFormAdd = "Thêm tài liệu";
export const TitleFormEdit = "Cập nhật tài liệu";
export const TitleFormDetail = "Thông tin tài liệu";


export const PagePath = [
    { Link: "/", Title: "Trang chủ",  icon: "fa fa-home"  },
    { Link: "", Title: "Danh sách tài liệu" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ",  icon: "fa fa-home"  },
    { Link: "/Documents", Title: "Danh sách tài liệu" },
    { Link: "", Title: "Cập nhật" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ",  icon: "fa fa-home"  },
    { Link: "/Documents", Title: "Danh sách tài liệu" },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Documents", Title: "Danh sách tài liệu" },
    { Link: "", Title: "Chi tiết" }
];


const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 365);

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
        SearchValue: new Date()
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
        DataSourceMember: "ServiceAgreementID",
        Width: 60
    },
    {
        Name: "ServiceAgreementID",
        Type: "texttolink",
        Caption: "Tên tài liệu",
        DataSourceMember: "ServiceAgreementID",
        Link: "/Documents/Detail/",
        Width: 70
    },
   
    {
        Name: "PartnerName",
        Type: "text",
        Caption: "Danh mục",
        DataSourceMember: "PartnerName",
        Width: 150
    },
    {
        Name: "ServiceTypeName",
        Type: "text",
        Caption: "Công bố",
        DataSourceMember: "ServiceTypeName",
        Width:  200
    },
    {
        Name: "AreaName",
        Type: "text",
        Caption: "Ngày xuất bản",
        DataSourceMember: "AreaName",
        Width: 100
    },
    {
        Name: "SignedDate",
        Type: "text",
        Caption: "Loại tài liệu",
        DataSourceMember: "SignedDate",
        Width: 130
    },
    {
        Name: "ExpiredDate",
        Type: "text",
        Caption: "Tập tin",
        DataSourceMember: "ExpiredDate",
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
        Name: "DepositedLable",
        Type: "text",
        Caption: "Cập nhật lần cuối",
        DataSourceMember: "DepositedLable",
        Width: 100
    },
  
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ServiceAgreementID",
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
        Name: "ServiceTypeID",
        DefaultValue: "",
        BindControlName: "cbServiceTypeID"
    },
    {
        Name: "AreaID",
        DefaultValue: "",
        BindControlName: "cbAreaID"
    },
    {
        Name: "SignedDate",
        DefaultValue: "",
        BindControlName: "dtSignedDate"
    },
    {
        Name: "ExpiredDate",
        DefaultValue: "",
        BindControlName: "dtExpiredDate"
    },
    {
        Name: "ServiceStatusID",
        DefaultValue: "",
        BindControlName: "cbServiceStatusID"
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
        name: "dtSignedDate",
        DataSourceMember: "SignedDate",
        label: "Từ ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtExpiredDate",
        DataSourceMember: "ExpiredDate",
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
        BindControlName: "txtFileContent1",
        DataSourceMember: "FileContent1"
    },

    {
        Name: "FileContent2",
        DefaultValue: "",
        BindControlName: "txtFileContent2",
        DataSourceMember: "FileContent2"
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
        Name: "IsLockComment",
        DefaultValue: false,
        BindControlName: "chkIsLockComment",
        DataSourceMember: "IsLockComment"
    },

];