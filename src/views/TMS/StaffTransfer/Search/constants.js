import { ERPCOMMONCACHE_STAFFTRANSFERTYPE, ERPCOMMONCACHE_USER_COOSTORE_BYUSER } from "../../../../constants/keyCache";

let dtFromDate = new Date();
dtFromDate.setDate(new Date().getDate() - 30);

export const APIHostName = "TMSAPI";
export const APISearch = "api/StaffTransfer/Search";
export const APIDelete = "api/StaffTransfer/DeleteMany";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách loại hình thuyên chuyển nhân viên" }
];

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@STAFFTRANSFERTYPEID",
        SearchValue: "-1"
    },
    {
        SearchKey: "@REQUESTSTOREID",
        SearchValue: "-1"
    },
    {
        SearchKey: "@FROMDATE",
        SearchValue: dtFromDate
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
        SearchKey: "@ISTRANSFERED",
        SearchValue: "-1"
    }

];

export const MLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "StaffTransferTypeID",
        DefaultValue: "",
        BindControlName: "cbStaffTransferTypeID"
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
        Name: "IsReviewed",
        DefaultValue: "",
        BindControlName: "cbIsReviewed"
    },
    {
        Name: "IsTransfered",
        DefaultValue: "",
        BindControlName: "cbIsTransfered"
    },
];

export const listelement = [
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
        name: "cbStaffTransferTypeID",
        DataSourceMember: "StaffTransferTypeID",
        label: "Loại yêu cầu thuyên chuyển",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_STAFFTRANSFERTYPE,
        ValueMember: "StaffTransferTypeID",
        NameMember: "StaffTransferTypeName",

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
        LoadItemCacheKeyID: ERPCOMMONCACHE_USER_COOSTORE_BYUSER,
        ValueMember: "StoreID",
        NameMember: "StoreName"

    },
    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ ngày",
        value: dtFromDate,
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
        name: "cbIsReviewed",
        DataSourceMember: "IsReviewed",
        label: "Trạng thái duyệt",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "--Tất cả--",
        listoption: [
            { value: -1, label: '--Tất cả--' },
            { value: 0, label: 'Chưa duyệt' },
            { value: 1, label: 'Đã duyệt' },
        ]
    },
    {
        type: "ComboBox",
        name: "cbIsTransfered",
        DataSourceMember: "IsTransfered",
        label: "Trạng thái thuyên chuyển",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "--Tất cả--",
        listoption: [
            { value: -1, label: '--Tất cả--' },
            { value: 0, label: 'Chưa thuyên chuyển' },
            { value: 1, label: 'Đã thuyên chuyển' },
        ]
    },
];

export const listColumn = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "StaffTransferID",
        Width: 60
    },
    {
        Name: "StaffTransferID",
        Type: "texttolink",
        Caption: "Mã thuyên chuyển",
        DataSourceMember: "StaffTransferID",
        Link: "/StaffTransfer/Detail/",
        Width: 140
    },
    {
        Name: "StaffTransferTitle",
        Type: "text",
        Caption: "Tên thuyên chuyển",
        DataSourceMember: "StaffTransferTitle",
        Width: 300
    },
    {
        Name: "RequestStoreID_Name",
        Type: "text",
        Caption: "Kho yêu cầu",
        DataSourceMember: "RequestStoreID_Name",
        Width: 180
    },
    {
        Name: "RequestUserID_Name",
        Type: "text",
        Caption: "Người yêu cầu",
        DataSourceMember: "RequestUserID_Name",
        Width: 150
    },
    {
        Name: "RequestDate",
        Type: "date",
        Caption: "Ngày yêu cầu",
        DataSourceMember: "RequestDate",
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
        Name: "TransferedStatusLable",
        Type: "text",
        Caption: "Đã thuyên chuyển",
        DataSourceMember: "TransferedStatusLable",
        Width: 130
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "InventoryRequestID",
        Width: 100,
        Link: "/StaffTransfer/Edit/",
        LinkText: "Chỉnh sửa"
    },
];