export const APIHostName = "TMSAPI";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "MTReturnRequestID";
export const BackLink = "/RefundSupplies";
export const AddLink = "/RefundSupplies/Add";

export const AddAPIPath = "api/MTReturnRequest/Add";

export const LoadAPIByMtreturnRequestTypeIDPath = "api/MTReturnRequest_ReviewList/LoadByMTReturnRequesTypeID";
export const LoadAPIByRequestTypeIDPath = "api/MTReturnRequestType_Product/GetListByRequestTypeID";

export const TitleFormSearch = "Tìm kiếm danh sách yêu cầu nhập trả vật tư";
export const TitleFormAdd = "Thêm yêu cầu nhập trả vật tư";
export const TitleFormEdit = "Cập nhật nhập trả vật tư";
export const TitleFormDetail = "Thông tin nhập trảy vật tư";

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

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "RequestStoreID",
        DefaultValue: "",
        BindControlName: "cbRequestStoreID"
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
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 140
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên vật tư",
        DataSourceMember: "ProductName",
        Width: 300
    },
    {
        Name: "QuantityUnit",
        Type: "text",
        Caption: "Đơn vị tính",
        DataSourceMember: "QuantityUnit",
        Width: 250
    },
    {
        Name: "Quantity",
        Type: "text",
        Caption: "Số lượng",
        DataSourceMember: "Quantity",
        Width: 150
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

export const MLObjectDefinition = [
    {
        Name: "MtreturnRequestTypeID",
        DefaultValue: "",
        BindControlName: "cboMtreturnRequestType",
        DataSourceMember: "MtreturnRequestTypeID"
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
        Name: "Quantity",
        DefaultValue: "",
        BindControlName: "Quantity",
        DataSourceMember: "Quantity"
    }
];
