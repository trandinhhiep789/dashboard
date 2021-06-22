import { toIsoStringCus } from '../../../../../utils/function';

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/StaffDebt/Search";
export const SearchUnlockLogAPIPath = "api/StaffDebt_unLockLog/Search";
export const SearchExportAPIPath = "api/StaffDebt/SearchExport";
export const SearchWithinPaginationAPI = "api/StaffDebt/SearchNew";
export const UpdateUnlockAPIPath = "api/StaffDebt/UpdateUnlock";
export const SearchDetailAPIPath = "api/StaffDebtDetail/Search";

export const UpdateUnlockDetailAPIPath = "api/StaffDebtDetail/UpdateUnlock";


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
        SearchValue: -1
    },
    {
        SearchKey: "@STOREID",
        SearchValue: -1
    },
    {
        SearchKey: "@ISLOCKDELIVERY",
        SearchValue: -1
    },
    {
        SearchKey: "@PAGESIZE",
        SearchValue: 20
    },
    {
        SearchKey: "@PAGEINDEX",
        SearchValue: 0
    }

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
        classNameCol: "col-custom"
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
    {
        type: "ComboBox",
        name: "cbDeliveryStatus",
        DataSourceMember: "DeliveryStatus",
        label: "Trạng thái khóa",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "--Tất cả--",
        listoption: [
            { value: -1, label: '--Tất cả--' },
            { value: 1, label: 'Đã khóa' },
            { value: 0, label: 'Hoạt động' }
        ],
    }
]

export const SearchMLObjectDefinition = [
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
    {
        Name: "DeliveryStatus",
        DefaultValue: "",
        BindControlName: "cbDeliveryStatus"
    }
]

export const GridColumnList = [
    {
        Name: "FullNameMember",
        Type: "text",
        Caption: "Mã NV nợ",
        DataSourceMember: "FullNameMember",
        Width: "15%"
    },
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "StoreName",
        Width: "15%"
    },
    {
        Name: "TotalCOD",
        Type: "textCurrency",
        Caption: "Tổng tiền phải thu hộ",
        DataSourceMember: "TotalCOD",
        Width: "8%"
    },
    {
        Name: "TotalSaleMaterialMoney",
        Type: "textCurrency",
        Caption: "Tổng tiền phải thu vật tư",
        DataSourceMember: "TotalSaleMaterialMoney",
        Width: "8%"
    },
    {
        Name: "TotalMoney",
        Type: "textCurrency",
        Caption: "Tổng tiền phải thu",
        DataSourceMember: "TotalMoney",
        Width: "8%"
    },
    {
        Name: "CollectedTotalMoney",
        Type: "textCurrency",
        Caption: "Tổng tiền đã thu của khách hàng",
        DataSourceMember: "CollectedTotalMoney",
        Width: "12%"
    },
    {
        Name: "TotalDebtOrders",
        Type: "text",
        Caption: "Tổng vận đơn còn nợ",
        DataSourceMember: "TotalDebtOrders",
        Width: "8%"
    },
    {
        Name: "TotALoverDueDebtOrders",
        Type: "text",
        Caption: "Tổng vận đơn nợ quá hạn",
        DataSourceMember: "TotALoverDueDebtOrders",
        Width: "8%"
    },
    {
        Name: "DeliveryStatus",
        Type: "textCustom",
        Caption: "Tình trạng",
        DataSourceMember: "DeliveryStatus",
        Width: "8%"
    },
    {
        Name: "History",
        Type: "btnHistory",
        Caption: "Lịch sử",
        DataSourceMember: "History",
        Width: "5%"
    },
    {
        Name: "Note",
        Type: "popupNew",
        Caption: "Ghi chú",
        DataSourceMember: "Note",
        Width: "5%"
    },
]

export const DataGirdStaffDebtColumnList = [
    {
        Name: "ShipmentOrderID",
        Type: "texttolinkNewBlankValue",
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
        Width: "8%"
    },
    {
        Name: "CollectedTime",
        Type: "date",
        Caption: "Thời gian thu",
        DataSourceMember: "CollectedTime",
        Width: "8%"
    },
    {
        Name: "TotalCOD",
        Type: "textCurrency",
        Caption: "Tiền COD",
        DataSourceMember: "TotalCOD",
        Width: "8%"
    },
    {
        Name: "TotalSaleMaterialMoney",
        Type: "textCurrency",
        Caption: "Tiền vật tư",
        DataSourceMember: "TotalSaleMaterialMoney",
        Width: "8%"
    },
    {
        Name: "TotalMoney",
        Type: "textCurrency",
        Caption: "Tổng tiền phải thu",
        DataSourceMember: "TotalMoney",
        Width: "8%"
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
        Width: "8%"
    },
    {
        Name: "IsOverDueDebt",
        Type: "checkicon",
        Caption: "Đã quá hạn nộp tiền",
        DataSourceMember: "IsOverDueDebt",
        Width: "10%"
    },
    // {
    //     Name: "DeliveryStatus",
    //     Type: "textCustom",
    //     Caption: "Tình trạng",
    //     DataSourceMember: "DeliveryStatus",
    //     Width: "8%"
    // },
    // {
    //     Name: "History",
    //     Type: "btnHistory",
    //     Caption: "Lịch sử",
    //     DataSourceMember: "History",
    //     Width: "4%"
    // },
]

export const DataGirdStaffDebtHistoryColumnList = [
    {
        Name: "FullName",
        Type: "text",
        Caption: "Mã NV",
        DataSourceMember: "FullName",
        Width: "10%"
    },
    {
        Name: "StoreFullName",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "StoreFullName",
        Width: "10%"
    },
    {
        Name: "UnLockFullName",
        Type: "text",
        Caption: "Người mở khóa",
        DataSourceMember: "UnLockFullName",
        Width: "10%"
    },
    {
        Name: "unLockDeliveryDate",
        Type: "datetime",
        Caption: "Ngày mở khóa",
        DataSourceMember: "unLockDeliveryDate",
        Width: "10%"
    },
    {
        Name: "UnLockDeliveryNote",
        Type: "text",
        Caption: "Ghi chú",
        DataSourceMember: "UnLockDeliveryNote",
        Width: "10%"
    },
];

export const MLObjectChangeActiveModal = [
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription"
    }
]

export const DataGirdStaffDebtDetailHistoryColumnList = [
    {
        Name: "FullName",
        Type: "text",
        Caption: "Mã NV",
        DataSourceMember: "FullName",
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
        Name: "UnLockDeliveryFullName",
        Type: "text",
        Caption: "Người mở khóa",
        DataSourceMember: "UnLockDeliveryFullName",
        Width: "10%"
    },
    {
        Name: "UnLockDeliveryDate",
        Type: "datetime",
        Caption: "Ngày mở khóa",
        DataSourceMember: "UnLockDeliveryDate",
        Width: "10%"
    },
    {
        Name: "UnLockDeliveryNote",
        Type: "text",
        Caption: "Ghi chú",
        DataSourceMember: "UnLockDeliveryNote",
        Width: "10%"
    },
];