export const APIHostName = "TMSAPI";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "DestroyRequestID";


export const TitleFormSearch = "Tìm kiếm danh sách nhập trả vật tư";
export const TitleFormAdd = "Thêm nhập trả vật tư";
export const TitleFormEdit = "Cập nhật nhập trả vật tư";
export const TitleFormDetail = "Thông tin nhập trảy vật tư";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Nhập trả vật tư" }
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