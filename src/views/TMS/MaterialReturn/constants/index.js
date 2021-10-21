const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/MaterialReturn/Search";
export const LoadAPIPath = "api/MaterialReturn/Load";
export const CreateInputVoucherAPIPath = "api/MaterialReturn/CreateInputVoucher";

export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "MaterialReturnID";

export const TitleFormSearch = "Tìm kiếm danh sách yêu cầu nhập xác linh kiện";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Yêu cầu nhập xác linh kiện" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MaterialReturn", Title: "Danh sách yêu cầu nhập xác linh kiện" },
    { Link: "", Title: "Chi tiết" }
];

export const InitSearchParams = [
    {
        SearchKey: "@KEYWORD",
        SearchValue: ""
    },
    {
        SearchKey: "@SRHTYPE",
        SearchValue: 1
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
        SearchKey: "@RETURNSTORE",
        SearchValue: -1
    },
    {
        SearchKey: "@ISCREATEDINPUTVOUCHER",
        SearchValue: -1
    },
    {
        SearchKey: "@RETURNUSER",
        SearchValue: ""
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "srhType",
        DefaultValue: "",
        BindControlName: "txtSrhType"
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
        Name: "StoreID",
        DefaultValue: "",
        BindControlName: "cbStoreID"
    },
    {
        Name: "IsCreatedInputVoucher",
        DefaultValue: "",
        BindControlName: "cbIsCreatedInputVoucher"
    },
    {
        Name: "RequestUser",
        DefaultValue: "",
        BindControlName: "cbRequestUser"
    }
];

export const SearchElementList = [
    {
        // validatonList:["Comborequired"],
        classNameCol: "col-custom",
        classNameDropdown: "dropdown-custom",
        colspan: 2,
        colspan: 3,
        dropdownName: "txtSrhType",
        icon: "",
        label: "Từ khóa",
        labelOption: "--Vui lòng chọn--",
        name: "txtKeyword",
        nameOption: "txtSrhType",
        placeholder: "Từ khóa",
        type: "textdropdownNew",
        value: "",
        valueOption: 1,
        listoption: [
            { value: 1, label: 'Mã yêu cầu nhập xác' },
            { value: 2, label: 'Mã vận đơn' },
        ]
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
        type: "ComboBoxNewChange",
        name: "cbStoreID",
        DataSourceMember: "StoreID",
        label: "Kho",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Kho---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORETMS",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        filterValue: 10,
        filterobj: "CompanyID",
        classNameCol: "col-custom"
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
    },
    {
        type: "ComboBox",
        name: "cbIsCreatedInputVoucher",
        DataSourceMember: "IsCreatedInputVoucher",
        label: "Đã tạo phiếu nhập",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "--Tất cả--",
        listoption: [
            { value: -1, label: '--Tất cả--' },
            { value: 0, label: 'Chưa tạo phiếu nhập' },
            { value: 1, label: 'Đã tạo phiếu nhập' },
        ]
    }
];

export const DataGridColumnList = [
    {
        Name: "ShipmentOrderID",
        Type: "texttolinkNewBlankValue",
        Caption: "Mã vận đơn",
        Link: "/ShipmentOrder/Detail/",
        DataSourceMember: "ShipmentOrderID"
    },
    {
        Name: "MaterialReturnID",
        Type: "texttolinkNewBlank",
        Caption: "Mã yêu cầu nhập xác",
        DataSourceMember: "MaterialReturnID",
        Link: "/MaterialReturn/Detail/",
        Width: 200
    },
    {
        Name: "ReturnDate",
        Type: "datetime",
        Caption: "Ngày nhập",
        DataSourceMember: "ReturnDate",
    },
    {
        Name: "ReturnUserIDName",
        Type: "text",
        Caption: "Người nhập",
        DataSourceMember: "ReturnUserIDName",
    },
    {
        Name: "ReturnStoreIDName",
        Type: "text",
        Caption: "Kho",
        DataSourceMember: "ReturnStoreIDName",
    },
    {
        Name: "IsCreatedInputVoucher",
        Type: "checkicon",
        Caption: "Đã tạo phiếu nhập",
        DataSourceMember: "IsCreatedInputVoucher"
    },
    {
        Name: "Action",
        Type: "buttonStyle",
        Caption: "Tác vụ",
        DataSourceMember: "MaterialReturnID",
        Width: 100,
        ButtonTitleFirst: "Nhập trả xác linh kiện",
        IconFirst: "ti-back-left",
        keyDisabledBtnFirst: "IsCreatedInputVoucher"
    },
];

export const MaterialReturnDetailColumnList = [
    {
        Name: "MTProductIDName",
        Type: "text",
        Caption: "Mã vật tư",
        DataSourceMember: "MTProductIDName",
        Width: 200
    },
    {
        Name: "IMEI",
        Type: "text",
        Caption: "IMEI",
        DataSourceMember: "IMEI",
        Width: 100
    },
    {
        Name: "QuantityUnit",
        Type: "text",
        Caption: "Đơn vị tính",
        DataSourceMember: "QuantityUnit",
        Width: 100
    },
    {
        Name: "ReturnQuantity",
        Type: "text",
        Caption: "Số lượng linh kiện nhập xác",
        DataSourceMember: "ReturnQuantity",
        Width: 100
    },
]