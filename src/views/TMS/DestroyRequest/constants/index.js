export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/DestroyRequest/Search";
export const LoadAPIPath = "api/DestroyRequest/Load";
export const LoadNewAPIPath = "api/DestroyRequest/LoadInfoNew";
export const AddAPIPath = "api/DestroyRequest/Add";
export const UpdateAPIPath = "api/DestroyRequest/UpdateNew";
export const UpdateCreateSaleOrderAPIPath = "api/DestroyRequest/UpdateCreateSaleOrder";

export const UpdateCurrentReviewLevelAPIPath = "api/DestroyRequest/UpdateCurrentReviewLevel";
export const DeleteNewAPIPath = "api/DestroyRequest/DeleteNew";
export const DeleteAPIPath = "api/DestroyRequest/Delete";
export const BackLink = "/DestroyRequest";
export const AddLink = "/DestroyRequest/Add";
export const LoadAPIByRequestTypeIDPath = "api/CurrentAdvanceDebt/GetListByRequestTypeID";
export const LoadAPIByDestroyRequestTypeIDPath = "api/DestroyRequestType_ReviewLevel/LoadByDestroyRequestTypeID";
export const LoadUserNameAPIByStoreIDPath = "api/DestroyRequestType_ReviewLevel_User/LoadByStoreID";
export const AddLogAPIPath = "api/DestroyRequest/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "DestroyRequestID";

export const AddAPIAttachment = "api/DestroyRequest_Attachment/UploadFile";
export const DeleteAPIAttachment = "api/DestroyRequest_Attachment/DeleteNew";


export const AddAPIComment = "api/DestroyRequest_Comment/Add";



export const TitleFormSearch = "Tìm kiếm danh sách yêu cầu hủy vật tư";
export const TitleFormAdd = "Thêm yêu cầu hủy vật tư";
export const TitleFormEdit = "Cập nhật yêu cầu hủy vật tư";
export const TitleFormDetail = "Thông tin yêu cầu hủy vật tư";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách yêu cầu hủy vật tư" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DestroyRequest", Title: "Danh sách  yêu cầu hủy vật tư" },
    { Link: "", Title: "Cập nhật" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DestroyRequest", Title: "Danh sách  yêu cầu hủy vật tư" },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DestroyRequest", Title: "Danh sách yêu cầu hủy vật tư" },
    { Link: "", Title: "Chi tiết" }
];

const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

const dtTodate = new Date();
dtTodate.setDate(new Date().getDate() + 1);

export const InitSearchParams = [


    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@DESTROYREQUESTTYPEID",
        SearchValue: "-1"
    },
    {
        SearchKey: "@REQUESTSTOREID",
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
        SearchKey: "@ISREVIEWED",
        SearchValue: "-1"
    },
    {
        SearchKey: "@ISOUTPUT",
        SearchValue: "-1"
    }

];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "DestroyRequestTypeID",
        DefaultValue: "",
        BindControlName: "cbDestroyRequestTypeID"
    },
    {
        Name: "RequestStoreID",
        DefaultValue: "",
        BindControlName: "cbRequestStoreID"
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
    {
        Name: "IsreViewed",
        DefaultValue: "",
        BindControlName: "cbIsreViewed"
    },
    {
        Name: "IsOutput",
        DefaultValue: "",
        BindControlName: "cbIsOutput"
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
        name: "cbDestroyRequestTypeID",
        DataSourceMember: "DestroyRequestTypeID",
        label: "Loại yêu cầu hủy vật tư",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.DESTROYREQUESTTYPE",
        ValueMember: "DestroyRequestTypeID",
        NameMember: "DestroyRequestTypeName",

    },
    {
        type: "ComboBox",
        name: "cbRequestStoreID",
        DataSourceMember: "RequestStoreID",
        label: "Kho yêu cầu",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.USER_COOSTORE_BYUSER",
        ValueMember: "StoreID",
        NameMember: "StoreName"

    },
    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ ngày",
        value: dtFromdate,
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
    {
        type: "ComboBox",
        name: "cbIsreViewed",
        DataSourceMember: "IsreViewed",
        label: "Trạng thái duyệt",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "--Tất cả--",
        listoption: [
            { value: -1, label: '--Tất cả--' },
            { value: 1, label: 'Hết hạn' },
            { value: 2, label: 'Còn hạn' },
        ],


    },
    {
        type: "ComboBox",
        name: "cbIsOutput",
        DataSourceMember: "IsOutput",
        label: "Trạng thái xuất",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "--Tất cả--",
        listoption: [
            { value: -1, label: '--Tất cả--' },
            { value: 1, label: 'Chưa Xuất hủy vật tư' },
            { value: 2, label: 'Đã xuất hủy vật tư' },
        ],


    },
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "DestroyRequestID",
        Width: 60
    },
    {
        Name: "DestroyRequestID",
        Type: "texttolinkNewBlank",
        Caption: "Mã yêu cầu",
        DataSourceMember: "DestroyRequestID",
        Link: "/DestroyRequest/Detail/",
        Width: 140
    },
    {
        Name: "DestroyRequestTypeName",
        Type: "text",
        Caption: "Loại yêu cầu hủy vật tư",
        DataSourceMember: "DestroyRequestTypeName",
        Width: 300
    },
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho yêu cầu",
        DataSourceMember: "StoreName",
        Width: 250
    },
    {
        Name: "RequestDate",
        Type: "date",
        Caption: "Ngày yêu cầu",
        DataSourceMember: "RequestDate",
        Width: 150
    },

    {
        Name: "ApproverName",
        Type: "text",
        Caption: "Người yêu cầu",
        DataSourceMember: "ApproverName",
        Width: 150
    },
    {
        Name: "ReviewStatusLable",
        Type: "text",
        Caption: "Đã duyệt",
        DataSourceMember: "ReviewStatusLable",
        Width: 130
    },
    {
        Name: "OutputStatusLable",
        Type: "text",
        Caption: " Đã xuất",
        DataSourceMember: "OutputStatusLable",
        Width: 130
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "DestroyRequestID",
        Width: 100,
        Link: "/DestroyRequest/Edit/",
        LinkText: "Chỉnh sửa"
    },
];

export const InputDestroyRequestDetailColumnList = [
    {
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 150
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 150
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "ProductName",
        Width: 150
    },
    {
        Name: "TotalQuantity",
        Type: "textNew",
        Caption: "Số dư tạm ứng",
        DataSourceMember: "TotalQuantity",
        Width: 150
    },
    {
        Name: "Quantity",
        Type: "textbox",
        // Type: "textboxNewGroup",
        Caption: "Số lượng hủy",
        Value: '',
        labelError: 'số lượng hủy',
        DataSourceMember: "Quantity",
        Width: 200,
        // validatonList: [ "number"],
        IsNoneZero: false
    },

];

export const GridMLObjectDefinition = [
    {
        Name: "DestroyRequestDetailID",
        DefaultValue: "",
        BindControlName: "DestroyRequestDetailID",
        DataSourceMember: "DestroyRequestDetailID"
    },
    {
        Name: "MaterialGroupID",
        DefaultValue: "",
        BindControlName: "MaterialGroupID",
        DataSourceMember: "MaterialGroupID"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "ProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "ProductName",
        DataSourceMember: "ProductName"
    },
    {
        Name: "TotalQuantity",
        DefaultValue: "",
        BindControlName: "TotalQuantity",
        DataSourceMember: "TotalQuantity"
    },
    {
        Name: "Quantity",
        DefaultValue: "",
        BindControlName: "Quantity",
        DataSourceMember: "Quantity"
    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtDestroyRequestID",
        label: "mã yêu cầu",
        value: "",
        maxSize: "200",
        placeholder: "Mã yêu cầu",
        icon: "",
        listoption: {},
        DataSourceMember: "DestroyRequestID",
        readonly: false,
        validatonList: ["required"]
    },
];

export const MLObjectDefinition = [
    {
        Name: "DestroyRequestID",
        DefaultValue: "",
        BindControlName: "txtDestroyRequestID",
        DataSourceMember: "DestroyRequestID"
    },
    {
        Name: "DestroyRequestTypeID",
        DefaultValue: "",
        BindControlName: "cboDestroyRequestType",
        DataSourceMember: "DestroyRequestTypeID"
    },
    {
        Name: "DestroyRequestTitle",
        DefaultValue: "",
        BindControlName: "txtDestroyRequestTitle",
        DataSourceMember: "DestroyRequestTitle"
    },
    {
        Name: "RequestStoreID",
        DefaultValue: "",
        BindControlName: "cboRequestStore",
        DataSourceMember: "RequestStoreID"
    },
    {
        Name: "RequestDate",
        DefaultValue: "",
        BindControlName: "dtRequestDate",
        DataSourceMember: "RequestDate"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "lstDestroyRequestDetail",
        DefaultValue: {},
        BindControlName: "lstDestroyRequestDetail",
        DataSourceMember: "lstDestroyRequestDetail"
    },
    {
        Name: "lstDestroyRequestReviewLevel",
        DefaultValue: {},
        BindControlName: "lstDestroyRequestReviewLevel",
        DataSourceMember: "lstDestroyRequestReviewLevel"
    }

];


export const GridDestroyRequestRLMLObjectDefinition = [

    {
        Name: "ReviewLevelID",
        DefaultValue: "",
        BindControlName: "ReviewLevelID",
        DataSourceMember: "ReviewLevelID"
    },
    {
        Name: "ReviewLevelName",
        DefaultValue: "",
        BindControlName: "ReviewLevelName",
        DataSourceMember: "ReviewLevelName"
    },
    {
        Name: "UserName",
        DefaultValue: "-1",
        BindControlName: "cboUserName",
        DataSourceMember: "UserName"
    },

];

export const InputDestroyRequestRLColumnList = [
    {
        Name: "ReviewLevelName",
        Type: "text",
        Caption: "Mức duyệt",
        DataSourceMember: "ReviewLevelName",
        Width: 100
    },
    {
        Name: "cboUserName",
        Type: "combobox",
        Caption: "Người duyệt",
        DataSourceMember: "UserName",
        Width: 250,
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SERVICETYPE",
        ValueMember: "ServiceTypeID",
        NameMember: "ServiceTypeName",
        listoption: [],
        validatonList: ["Comborequired"],
    },

];

export const GirdDestroyRequestDetailColumnList = [
    {
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 150
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 150
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "ProductName",
        Width: 150
    },
    {
        Name: "TotalQuantity",
        Type: "textNew",
        Caption: "Số dư tạm ứng",
        DataSourceMember: "TotalQuantity",
        Width: 150
    },
    {
        Name: "Quantity",
        Type: "text",
        Caption: "Số lượng hủy",
        labelError: 'aaa',
        DataSourceMember: "Quantity",
        Width: 200,
    },
]

export const GirdDestroyRequestRLColumnList = [
    {
        Name: "ReviewLevelName",
        Type: "text",
        Caption: "Mức duyệt",
        DataSourceMember: "ReviewLevelName",
        Width: 100
    },
    {
        Name: "ApproverName",
        Type: "text",
        Caption: "Người duyệt",
        DataSourceMember: "ApproverName",
        Width: 100
    },
    {
        Name: "ReviewStatusLable",
        Type: "text",
        Caption: "Trạng thái duyệt",
        DataSourceMember: "ReviewStatusLable",
        Width: 100
    },
    {
        Name: "reViewedDate",
        Type: "date",
        Caption: "Ngày duyệt",
        DataSourceMember: "reViewedDate",
        Width: 100
    },
    {
        Name: "reViewedNote",
        Type: "text",
        Caption: "Ghi chú duyệt",
        DataSourceMember: "reViewedNote",
        Width: 100
    },
]

export const MLObjectDRNoteRV = [
    {
        Name: "ReViewedNote",
        DefaultValue: "",
        BindControlName: "txtReViewedNote",
        DataSourceMember: "ReViewedNote"
    },

]