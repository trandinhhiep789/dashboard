export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/MTReturnRequest/Search";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "MTReturnRequestID";
export const BackLink = "/MTReturnRequest";
export const AddLink = "/MTReturnRequest/Add";

export const AddAPIPath = "api/MTReturnRequest/Add";
export const DeleteNewAPIPath = "api/MTReturnRequest/DeleteNew";
export const LoadAPIPath = "api/MTReturnRequest/Load";
export const UpdateAPIPath = "api/MTReturnRequest/Update";
export const UpdateCurrentReviewLevelAPIPath = "api/MTReturnRequest/UpdateCurrentReviewLevel";

export const UpdateCreateVocherAPIPath = "api/MTReturnRequest/UpdateCreatedInputVoucher";


export const LoadAPIByMtreturnRequestTypeIDPath = "api/MTReturnRequest_ReviewList/LoadByMTReturnRequesTypeID";
export const LoadAPIByRequestTypeIDPath = "api/MTReturnRequestType_Product/GetListByRequestTypeID";
export const LoadAPIByMTRRequestTypeIDPath = "api/CurrentAdvanceDebt/GetListByMTReturnRequestTypeID";

export const AddAPIComment = "api/MTReturnRequest_Comment/Add";

export const AddAPIAttachment = "api/MTReturnRequest_Attachment/Add";
export const DeleteAPIAttachment = "api/MTReturnRequest_Attachment/Delete";

export const cacheInventoryStatus = "ERPRELATECACHE.INVENTORYSTATUS";

export const TitleFormSearch = "Tìm kiếm danh sách yêu cầu hoàn trả vật tư";
export const TitleFormAdd = "Thêm yêu cầu hoàn trả vật tư";
export const TitleFormEdit = "Cập nhật cầu hoàn trả vật tư";

export const addImportMaterialModalWidth = "95%";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Yêu cầu hoàn trả vật tư "}
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MTReturnRequest", Title: "Danh sách yêu cầu hoàn trả vật tư " },
    { Link: "", Title: "Cập nhật" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MTReturnRequest", Title: "Danh sách yêu cầu hoàn trả vật tư " },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MTReturnRequest", Title: "Danh sách yêu cầu hoàn trả vật tư " },
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
        SearchKey: "@MTRETURNREQUESTTYPEID",
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
        SearchKey: "@ISCREATEDINPUTVOUCHERT",
        SearchValue: "-1"
    },
    {
        SearchKey: "@REQUESTUSER",
        SearchValue: "-1"
    },
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "MTReturnRequestTypeID",
        DefaultValue: "",
        BindControlName: "cbMTReturnRequestTypeID"
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
        Name: "IsCreatedInputVouchert",
        DefaultValue: "",
        BindControlName: "cbIsCreatedInputVouchert"
    },
    {
        Name: "RequestUser",
        DefaultValue: "",
        BindControlName: "cbRequestUser"
    }
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
        name: "cbMTReturnRequestTypeID",
        DataSourceMember: "MTReturnRequestTypeID",
        label: "Loại YCNT vật tư",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MTRETURNREQUESTTYPE",
        ValueMember: "MtreturnRequestTypeID",
        NameMember: "MtreturnRequestTypeName",

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
            { value: 0, label: 'Chưa duyệt' },
            { value: 1, label: 'Đã duyệt' }
        ]
    },
    {
        type: "ComboBox",
        name: "cbIsCreatedInputVouchert",
        DataSourceMember: "IsCreatedInputVouchert",
        label: "Trạng thái nhập trả",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "--Tất cả--",
        listoption: [
            { value: -1, label: '--Tất cả--' },
            { value: 0, label: 'Chưa tạo phiếu nhập' },
            { value: 1, label: 'Đã tạo phiếu nhập' },
        ],
    },
    {
        type: "MultiSelectUser",
        name: "cbRequestUser",
        DataSourceMember: "RequestUser",
        label: "Nhân viên",
        colspan: 12,
        rowspan: 2,
        labelcolspan: 12,
        IsLabelDiv: true,
        value: -1,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        isMultiSelect: false
    }
];


export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "MTReturnRequestID",
        Width: 60
    },
    {
        Name: "MTReturnRequestID",
        Type: "texttolinkNewBlank",
        Caption: "Mã yêu cầu",
        DataSourceMember: "MTReturnRequestID",
        Link: "/MTReturnRequest/Detail/",
        Width: 140
    },
    {
        Name: "MTReturnRequestTypeName",
        Type: "text",
        Caption: "Loại yêu cầu nhập trả vật tư",
        DataSourceMember: "MTReturnRequestTypeName",
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
        Type: "datetime",
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
        Name: "CreatedInputVoucherStatusLable",
        Type: "text",
        Caption: "Phiếu nhập",
        DataSourceMember: "CreatedInputVoucherStatusLable",
        Width: 130
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "MTReturnRequestID",
        Width: 100,
        Link: "/MTReturnRequest/Edit/",
        LinkText: "Chỉnh sửa"
    },
];
