export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/InventoryRequest/Search";
export const LoadAPIPath = "api/InventoryRequest/Load";
export const LoadNewAPIPath = "api/InventoryRequest/LoadInfoNew";
export const LoadInventoryRequestAdd = "api/InventoryRequest/LoadInventoryRequestAdd";
export const AddAPIPath = "api/InventoryRequest/Add";
export const UpdateAPIPath = "api/InventoryRequest/Update";
export const DeleteNewAPIPath = "api/InventoryRequest/DeleteNew";
export const DeleteAPIPath = "api/InventoryRequest/Delete";
export const BackLink = "/InventoryRequest";
export const AddLink = "/InventoryRequest/Add";
export const LoadAPIByRequestTypeIDPath = "api/CurrentAdvanceDebt/GetListByRequestTypeID";
export const LoadAPIByDestroyRequestTypeIDPath = "api/InventoryRequestType_ReviewLevel/LoadByInventoryRequestTypeID";
export const LoadUserNameAPIByStoreIDPath = "api/InventoryRequestType_ReviewLevel_User/LoadByStoreID";
export const AddLogAPIPath = "api/InventoryRequest/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "InventoryRequestID";

export const TitleFormSearch = "Tìm kiếm danh sách yêu cầu kiểm kê";
export const TitleFormAdd = "Thêm yêu cầu kiểm kê";
export const TitleFormEdit = "Cập nhật yêu cầu kiểm kê";
export const TitleFormDetail = "Thông tin yêu cầu kiểm kê";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách yêu cầu kiểm kê" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/InventoryRequest", Title: "Danh sách  yêu cầu kiểm kê" },
    { Link: "", Title: "Cập nhật" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/InventoryRequest", Title: "Danh sách  yêu cầu kiểm kê" },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/InventoryRequest", Title: "Danh sách yêu cầu kiểm kê" },
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
        SearchKey: "@InventoryRequestTYPEID",
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
        Name: "InventoryRequestTypeID",
        DefaultValue: "",
        BindControlName: "cbInventoryRequestTypeID"
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
        name: "cbInventoryRequestTypeID",
        DataSourceMember: "InventoryRequestTypeID",
        label: "Loại yêu cầu kiểm kê",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.InventoryRequestTYPE",
        ValueMember: "InventoryRequestTypeID",
        NameMember: "InventoryRequestTypeName",

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
        DataSourceMember: "InventoryRequestID",
        Width: 60
    },
    {
        Name: "InventoryRequestID",
        Type: "texttolink",
        Caption: "Mã yêu cầu",
        DataSourceMember: "InventoryRequestID",
        Link: "/InventoryRequest/Detail/",
        Width: 140
    },
    {
        Name: "InventoryRequestTypeName",
        Type: "text",
        Caption: "Loại yêu cầu kiểm kê",
        DataSourceMember: "InventoryRequestTypeName",
        Width: 300
    },
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho yêu cầu",
        DataSourceMember: "StoreName",
        Width: 180
    },
    {
        Name: "RequestDate",
        Type: "date",
        Caption: "Ngày yêu cầu",
        DataSourceMember: "RequestDate",
        Width: 150
    },

    {
        Name: "RequestUser",
        Type: "text",
        Caption: "Người yêu cầu",
        DataSourceMember: "RequestUser",
        Width: 150
    },
    {
        Name: "StatusLable1",
        Type: "text",
        Caption: "Đã duyệt",
        DataSourceMember: "StatusLable1",
        Width: 130
    },
    {
        Name: "StatusLable2",
        Type: "text",
        Caption: " Đã xuất",
        DataSourceMember: "StatusLable2",
        Width: 130
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "InventoryRequestID",
        Width: 100,
        Link: "/InventoryRequest/Edit/",
        LinkText: "Chỉnh sửa"
    },
];

export const InputInventoryRequestDetailColumnList = [
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
        Name: "RecordQuantity",
        Type: "textNew",
        Caption: "Số lượng sổ sách",
        DataSourceMember: "RecordQuantity",
        Width: 150
    },
    {
        Name: "ActualQuantity",
        Type: "textbox",
        Caption: "Số lượng thực tế",
        labelError: 'aaa',
        DataSourceMember: "ActualQuantity",
        Width: 200,
        validatonList: ["number"],
    },
    {
        Name: "UneventQuantity",
        Type: "text",
        Caption: "Chênh lệch",
        DataSourceMember: "UneventQuantity",
        Width: 150
    },
];

export const GridMLObjectDefinition = [
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
        Name: "RecordQuantity",
        DefaultValue: "",
        BindControlName: "RecordQuantity",
        DataSourceMember: "RecordQuantity"
    },
    {
        Name: "ActualQuantity",
        DefaultValue: "",
        BindControlName: "ActualQuantity",
        DataSourceMember: "ActualQuantity"
    },
    {
        Name: "UneventQuantity",
        DefaultValue: "",
        BindControlName: "UneventQuantity",
        DataSourceMember: "UneventQuantity"
    }
];


export const MLObjectDefinition = [
  
    {
        Name: "InventoryRequestTypeID",
        DefaultValue: "",
        BindControlName: "cboInventoryRequestType",
        DataSourceMember: "InventoryRequestTypeID"
    },
    {
        Name: "InventoryRequestTitle",
        DefaultValue: "",
        BindControlName: "txtInventoryRequestTitle",
        DataSourceMember: "InventoryRequestTitle"
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
        Name: "lstInventoryRequestDetail",
        DefaultValue: {},
        BindControlName: "lstInventoryRequestDetail",
        DataSourceMember: "lstInventoryRequestDetail"
    },
    {
        Name: "lstInventoryRequestReviewLevel",
        DefaultValue: {},
        BindControlName: "lstInventoryRequestReviewLevel",
        DataSourceMember: "lstInventoryRequestReviewLevel"
    }

];


export const GridInventoryRequestRLMLObjectDefinition = [
    
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
        DefaultValue: "",
        BindControlName: "cboUserName",
        DataSourceMember: "UserName"
    },
   
];

export const InputInventoryRequestRLColumnList = [
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
        listoption:[],
        validatonList: ["Comborequired"],
    },
   
];