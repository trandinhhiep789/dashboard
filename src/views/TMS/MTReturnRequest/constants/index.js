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

export const TitleFormSearch = "Tìm kiếm danh sách yêu cầu nhập trả vật tư";
export const TitleFormAdd = "Thêm yêu cầu nhập trả vật tư";
export const TitleFormEdit = "Cập nhật nhập trả vật tư";
export const TitleFormDetail = "Thông tin nhập trả vật tư";

export const addImportMaterialModalWidth = "95%";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: " Yêu cầu nhập trả vật tư" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MTReturnRequest", Title: "Danh sách  yêu cầu nhập trả vật tư" },
    { Link: "", Title: "Cập nhật" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MTReturnRequest", Title: "Danh sách  yêu cầu nhập trả vật tư" },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MTReturnRequest", Title: "Danh sách yêu cầu nhập trả vật tư" },
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
        Link: "/MTReturnRequest/Edit/",
        LinkText: "Chỉnh sửa"
    },
];

export const MLObjectDefinition = [
    {
        Name: "MTReturnRequestID",
        DefaultValue: "",
        BindControlName: "txtMTReturnRequestID",
        DataSourceMember: "MTReturnRequestID"
    },
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
        Name: "IsAllowdUpliCatiOnProduct",
        DefaultValue: "",
        BindControlName: "ckIsAllowdUpliCatiOnProduct",
        DataSourceMember: "IsAllowdUpliCatiOnProduct"
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
        Width: 250
    },
    {
        Name: "QuantityUnit",
        Type: "text",
        Caption: "Đơn vị tính",
        DataSourceMember: "QuantityUnit",
        Width: 80
    },
    {
        Name: "TotalQuantity",
        Type: "textNew",
        Caption: "Số dư tạm ứng",
        DataSourceMember: "TotalQuantity",
        Width: 80
    },
    {
        Name: "Quantity",
        Type: "textNew",
        Caption: "Số lượng nhập trả",
        DataSourceMember: "Quantity",
        Width: 80
    }
];

export const InputMTReturnRequestAddColumnList = [
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
        Width: 250
    },
    {
        Name: "QuantityUnit",
        Type: "text",
        Caption: "Đơn vị tính",
        DataSourceMember: "QuantityUnit",
        Width: 80
    },
    {
        Name: "TotalQuantity",
        Type: "textNew",
        Caption: "Số dư tạm ứng",
        DataSourceMember: "TotalQuantity",
        Width: 80
    },
    {
        Name: "Quantity",
        Type: "textNew",
        Caption: "Số lượng nhập trả",
        DataSourceMember: "Quantity",
        Width: 80
    },
    {
        Name: "Action",
        // Type: "buttonDelete",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "MaterialGroupID",
        Width: 70,
        IsShowEdit: true,
    }

];


export const InputMTReturnRequestDetailColumnListNew = [
    // {
    //     Name: "chkSelect",
    //     Type: "checkbox",
    //     Caption: "Chọn",
    //     DataSourceMember: "MTReturnRequestID",
    //     Width: 60
    // },
    {
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 60
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 80
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "ProductName",
        Width: 200
    },
    {
        Name: "QuantityUnit",
        Type: "text",
        Caption: "Đơn vị",
        DataSourceMember: "QuantityUnit",
        Width: 60
    },
    {
        Name: "IsAllowdUpliCatiOnProduct",
        Type: "checkbox",
        Caption: "Thêm trùng",
        DataSourceMember: "IsAllowdUpliCatiOnProduct",
        Width: 60
    },


    {
        Name: "IsCheckMinMaxQuantity",
        Type: "checkbox",
        Caption: "Có kiểm tra SL",
        DataSourceMember: "IsCheckMinMaxQuantity",
        Width: 70
    },
    {
        Name: "MinQuantity",
        Type: "textCurrency",
        Caption: "SL nhỏ nhất",
        DataSourceMember: "MinQuantity",
        Width: 60
    },
    {
        Name: "MaxQuantity",
        Type: "textCurrency",
        Caption: "SL lớn nhất",
        DataSourceMember: "MaxQuantity",
        Width: 60
    },
    {
        Name: "TotalQuantity",
        Type: "textNew",
        Caption: "Số dư tạm ứng",
        DataSourceMember: "TotalQuantity",
        Width: 70
    },
    {
        Name: "Quantity",
        Type: "inputNumber",
        Caption: "SL nhập trả",
        DataSourceMember: "Quantity",
        Width: 100
    }
];



export const GridMLObjectDefinition = [
    {
        Name: "MTReturnRequestDetailID",
        DefaultValue: "",
        BindControlName: "MTReturnRequestDetailID",
        DataSourceMember: "MTReturnRequestDetailID"
    },
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
        Name: "QuantityUnit",
        DefaultValue: "",
        BindControlName: "QuantityUnit",
        DataSourceMember: "QuantityUnit"
    },
    {
        Name: "UsableQuantity",
        DefaultValue: "",
        BindControlName: "UsableQuantity",
        DataSourceMember: "UsableQuantity"

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
        Name: "QuantityUnit",
        Type: "textNew",
        Caption: "Đơn vị tính",
        DataSourceMember: "QuantityUnit",
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
        Caption: "Số lượng nhập trả",
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

export const MLObjectDRNoteRV = [
    {
        Name: "ReViewedNote",
        DefaultValue: "",
        BindControlName: "txtReViewedNote",
        DataSourceMember: "ReViewedNote"
    }
]

export const MLObjectMTReturnRequestDetailItem = [
    {
        Name: "MainGroupID",
        DefaultValue: "",
        BindControlName: "cbMaterialGroup",
        DataSourceMember: "MainGroupID"
    },
    {

        Name: "ProductGroupID",
        DefaultValue: "",
        BindControlName: "cbProductGroupID",
        DataSourceMember: "ProductGroupID"
    },
]