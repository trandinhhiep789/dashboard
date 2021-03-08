export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/MTReturnRequest/Search";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "MTReturnRequestID";
export const BackLink = "/RefundSupplies";
export const AddLink = "/RefundSupplies/Add";

export const AddAPIPath = "api/MTReturnRequest/Add";
export const DeleteNewAPIPath = "api/MTReturnRequest/DeleteNew";
export const LoadAPIPath = "api/MTReturnRequest/Load";


export const LoadAPIByMtreturnRequestTypeIDPath = "api/MTReturnRequest_ReviewList/LoadByMTReturnRequesTypeID";
export const LoadAPIByRequestTypeIDPath = "api/MTReturnRequestType_Product/GetListByRequestTypeID";

export const TitleFormSearch = "Tìm kiếm danh sách yêu cầu nhập trả vật tư";
export const TitleFormAdd = "Thêm yêu cầu nhập trả vật tư";
export const TitleFormEdit = "Cập nhật nhập trả vật tư";
export const TitleFormDetail = "Thông tin nhập trả vật tư";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: " Yêu cầu nhập trả vật tư" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RefundSupplies", Title: "Danh sách  yêu cầu nhập trả vật tư" },
    { Link: "", Title: "Cập nhật" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RefundSupplies", Title: "Danh sách  yêu cầu nhập trả vật tư" },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RefundSupplies", Title: "Danh sách yêu cầu nhập trả vật tư" },
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
    }
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
        label: "Loại yêu cầu hủy vật tư",
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
            { value: 1, label: 'Hết hạn' },
            { value: 2, label: 'Còn hạn' },
        ],


    },
    {
        type: "ComboBox",
        name: "cbIsCreatedInputVouchert",
        DataSourceMember: "IsCreatedInputVouchert",
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
        Type: "texttolink",
        Caption: "Mã yêu cầu",
        DataSourceMember: "MTReturnRequestID",
        Link: "/RefundSupplies/Detail/",
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
        Link: "/RefundSupplies/Edit/",
        LinkText: "Chỉnh sửa"
    },
];

export const MLObjectDefinition = [

    {
        Name: "MtreturnRequestTypeID",
        DefaultValue: "",
        BindControlName: "cboMtreturnRequestType",
        DataSourceMember: "MtreturnRequestTypeID"
    },
    {
        Name: "MTReturnRequestTitle",
        DefaultValue: "",
        BindControlName: "txtMTReturnRequestTitle",
        DataSourceMember: "MTReturnRequestTitle"
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
        Name: "lstMTReturnRequestDetail",
        DefaultValue: {},
        BindControlName: "lstMTReturnRequestDetail",
        DataSourceMember: "lstMTReturnRequestDetail"
    },
    {
        Name: "lstMTReturnRequestReviewLevel",
        DefaultValue: {},
        BindControlName: "lstMTReturnRequestReviewLevel",
        DataSourceMember: "lstMTReturnRequestReviewLevel"
    }
];

export const InputMTReturnRequestDetailColumnList = [
    {
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 100
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
        Width: 300
    },
    {
        Name: "QuantityUnitName",
        Type: "text",
        Caption: "Đơn vị tính",
        DataSourceMember: "QuantityUnitName",
        Width: 100
    },
    {
        Name: "Quantity",
        Type: "textbox",
        // Type: "textboxNewGroup",
        Caption: "Số lượng nhập trả",
        Value: '',
        labelError: 'số lượng nhập trả',
        DataSourceMember: "Quantity",
        Width: 150,
        // validatonList: [ "number"],
        IsNoneZero: false
    },

];


export const GridMLObjectDefinition = [
    {
        Name: "MtreturnRequestTypeID",
        DefaultValue: "",
        BindControlName: "MtreturnRequestTypeID",
        DataSourceMember: "MtreturnRequestTypeID"
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
        Name: "QuantityUnitName",
        DefaultValue: "",
        BindControlName: "QuantityUnitName",
        DataSourceMember: "QuantityUnitName"
    },
    {
        Name: "QuantityUnitID",
        DefaultValue: "",
        BindControlName: "QuantityUnitID",
        DataSourceMember: "QuantityUnitID"
    },
    {
        Name: "Quantity",
        DefaultValue: "",
        BindControlName: "Quantity",
        DataSourceMember: "Quantity"
    }
];

export const GirdMTReturnRequestDetailColumnList = [
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
        Name: "UsableQuantity",
        Type: "textNew",
        Caption: "Số dư tạm ứng",
        DataSourceMember: "UsableQuantity",
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

export const GirdMTReturnRequestReviewLevelColumnList = [
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