import { toIsoStringCus } from '../../../../../utils/function';

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/StaffDebt/Search";
export const UpdateUnlockAPIPath = "api/StaffDebt/UpdateUnlock";
export const SearchDetailAPIPath = "api/StaffDebtDetail/Search";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách quản lý công nợ" }
];


export const InitSearchParams = [
    {
        SearchKey: "@FROMDATE",
        SearchValue: toIsoStringCus(new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()).toISOString())
    },
    {
        SearchKey: "@TODATE",
        SearchValue: new Date()
    },
    {
        SearchKey: "@USERNAME",
        SearchValue:-1
    },
    {
        SearchKey: "@STOREID",
        SearchValue: -1
    },
    // {
    //     SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
    //     SearchValue: -1
    // },
    // {
    //     SearchKey: "@RECEIVERDISTRICTID",
    //     SearchValue: -1
    // },
  
];

export const SearchElementList = [
    
    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ Ngày",
        value: new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtToDate",
        DataSourceMember: "ToDate",
        label: "Đến Ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    // {
    //     type: "ComboBox",
    //     name: "cbReceiverProvinceID",
    //     DataSourceMember: "ReceiverProvinceID",
    //     label: "Tỉnh/thành phố",
    //     colspan: 2,
    //     value: -1,
    //     isMultiSelect: false,
    //     placeholder: "---Tỉnh /thành phố---",
    //     listoption: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.PROVINCE",
    //     ValueMember: "ProvinceID",
    //     NameMember: "ProvinceName",
    //     classNameCol:"col-custom"
    // },
    {
        type: "ComboBoxNewChange",
        name: "cbCoordinatorStoreID",
        DataSourceMember: "CoordinatorStoreID",
        label: "kho điều phối",
        colspan: 2,
        value: "",
        isMultiSelect: false,
        placeholder: "---Kho điều phối---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.USER_COOSTORE_BYUSER",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        // filterValue: 10,
        // filterobj:"CompanyID",
        classNameCol:"col-custom"
    },
    // {
    //     type: "ComboBox",
    //     name: "cbShipmentOrderStatusGroupID",
    //     DataSourceMember: "ShipmentOrderStatusGroupID",
    //     label: "Trạng thái",
    //     colspan: 2,
    //     value: -1,
    //     isMultiSelect: false,
    //     placeholder: "---Trạng thái---",
    //     listoption: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERSTATUSGR",
    //     ValueMember: "ShipmentOrderStatusGroupID",
    //     NameMember: "ShipmentOrderStatusGroupName",
    //     classNameCol:"col-custom"
    // },
    {
        type: "MultiSelectUser",
        name: "cbUserName",
        DataSourceMember: "UserName",
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

    },

]

export const  SearchMLObjectDefinition = [
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
    // {
    //     Name: "ReceiverProvinceID",
    //     DefaultValue: "",
    //     BindControlName: "cbReceiverProvinceID"
    // },
    {
        Name: "CoordinatorStoreID",
        DefaultValue: "-1",
        BindControlName: "cbCoordinatorStoreID"
    },
    // {
    //     Name: "ShipmentOrderStatusGroupID",
    //     DefaultValue: "",
    //     BindControlName: "cbShipmentOrderStatusGroupID"
    // },
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "cbUserName"
    },
]

export const GridColumnList = [
    {
        Name: "FullNameMember",
        Type: "text",
        Caption: "Mã NV nợ",
        DataSourceMember: "FullNameMember",
        Width: "12%"
    },
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "StoreName",
        Width: "14%"
    },
    {
        Name: "TotalCOD",
        Type: "textCurrency",
        Caption: "Tổng tiền phải thu hộ",
        DataSourceMember: "TotalCOD",
        Width: "10%"
    },
    {
        Name: "TotalSaleMaterialMoney",
        Type: "textCurrency",
        Caption: "Tổng tiền phải thu vật tư",
        DataSourceMember: "TotalSaleMaterialMoney",
        Width: "10%"
    },
    {
        Name: "TotalMoney",
        Type: "textCurrency",
        Caption: "Tổng tiền phải thu",
        DataSourceMember: "TotalMoney",
        Width: "10%"
    },
    {
        Name: "CollectedTotalMoney",
        Type: "textCurrency",
        Caption: "Tổng tiền đã thu của khách hàng",
        DataSourceMember: "CollectedTotalMoney",
        Width: "10%"
    },
    {
        Name: "TotalDebtOrders",
        Type: "text",
        Caption: "Tổng vận đơn còn nợ",
        DataSourceMember: "TotalDebtOrders",
        Width: "10%"
    },
    {
        Name: "TotALoverDueDebtOrders",
        Type: "text",
        Caption: "Tổng vận đơn nợ quá hạn",
        DataSourceMember: "TotALoverDueDebtOrders",
        Width: "10%"
    },
    {
        Name: "DeliveryStatus",
        Type: "textCustom",
        Caption: "Tình trạng",
        DataSourceMember: "DeliveryStatus",
        Width: "7%"
    },
    {
        Name: "Note",
        Type: "popupNew",
        Caption: "Ghi chú",
        DataSourceMember: "Note",
        Width: "7%"
    },
]

export const  DataGirdStaffDebtColumnList=[
    {
        Name: "ShipmentOrderID",
        Type: "texttolinkNewBlank",
        Caption: "Mã vận đơn",
        Link: "/ShipmentOrder/Detail/",
        DataSourceMember: "ShipmentOrderID",
        Width: "10%"
    },

    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "StoreName",
        Width: "10%"
    },
    {
        Name: "OutputDate",
        Type: "date",
        Caption: "Thời gian xuất hàng",
        DataSourceMember: "OutputDate",
        Width: "10%"
    },
    {
        Name: "CollectedTime",
        Type: "date",
        Caption: "Thời gian thu",
        DataSourceMember: "CollectedTime",
        Width: "10%"
    },
    {
        Name: "TotalCOD",
        Type: "textCurrency",
        Caption: "Tiền COD",
        DataSourceMember: "TotalCOD",
        Width: "10%"
    },
    {
        Name: "TotalSaleMaterialMoney",
        Type: "textCurrency",
        Caption: "Tiền vật tư",
        DataSourceMember: "TotalSaleMaterialMoney",
        Width: "10%"
    },
    {
        Name: "TotalMoney",
        Type: "textCurrency",
        Caption: "Tổng tiền phải thu",
        DataSourceMember: "TotalMoney",
        Width: "10%"
    },
    {
        Name: "CollectedTotalMoney",
        Type: "textCurrency",
        Caption: "Tiền đã thu KH",
        DataSourceMember: "CollectedTotalMoney",
        Width: "10%"
    },
    {
        Name: "DebtInterval",
        Type: "text",
        Caption: "Số giờ nợ",
        DataSourceMember: "DebtInterval",
        Width: "10%"
    },
    {
        Name: "IsOverDueDebt",
        Type: "checkicon",
        Caption: "Đã quá hạn nộp tiền",
        DataSourceMember: "IsOverDueDebt",
        Width: "10%"
    },
]
