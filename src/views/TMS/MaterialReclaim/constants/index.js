export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/MaterialReclaim/Search";
export const LoadAPIPath = "api/MaterialReclaim/Load";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "MaterialReclaimID";
export const BackLink = "/MaterialReclaim";
export const AddLink = "/MTReturnRequest/Add";

export const AddAPIPath = "api/MTReturnRequest/Add";
export const DeleteNewAPIPath = "api/MTReturnRequest/DeleteNew";
export const UpdateAPIPath = "api/MTReturnRequest/Update";


export const TitleFormSearch = "Tìm kiếm danh sách yêu cầu hoàn trả vật tư";
export const TitleFormAdd = "Thêm yêu cầu hoàn trả vật tư";
export const TitleFormEdit = "Cập nhật yêu cầu hoàn trả vật tư";
export const TitleFormDetail = "Thông tin yêu cầu thu hồi vật tư";

export const addImportMaterialModalWidth = "95%";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Yêu cầu hoàn trả vật tư " }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MaterialReclaim", Title: "Danh sách yêu cầu hoàn trả vật tư " },
    { Link: "", Title: "Cập nhật" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MaterialReclaim", Title: "Danh sách yêu cầu hoàn trả vật tư " },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MaterialReclaim", Title: "Danh sách yêu cầu hoàn trả vật tư " },
    { Link: "", Title: "Chi tiết" }
];

const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

export const InitSearchParams = [

    {
        SearchKey: "@KEYWORD",
        SearchValue: ""
    },
    {
        SearchKey: "@TYPE",
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
        SearchKey: "@RETURNSTOREID",
        SearchValue: -1
    },
    {
        SearchKey: "@AFTERRECLAIMPROCESSTYPEID",
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
        BindControlName: "txtKeywordNew"
    },
    {
        Name: "Typename",
        DefaultValue: "",
        BindControlName: "txtTypename"
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
        Name: "AfterreClaimProcessTypeID",
        DefaultValue: "",
        BindControlName: "cbAfterreClaimProcessType"
    },
    {
        Name: "RequestUser",
        DefaultValue: "",
        BindControlName: "cbRequestUser"
    }
];

export const SearchElementList = [
    {
        type: "textdropdownNew",
        dropdownName: "txtTypename",
        name: "txtKeywordNew",
        colspan: 2,
        label: "Từ khóa",
        value: "",
        colspan: 3,
        placeholder: "Từ khóa",
        icon: "",
        nameOption: "txtTypename",
        labelOption: "--Vui lòng chọn--",
        valueOption: 1,
        // validatonList:["Comborequired"],
        classNameCol: "col-custom",
        classNameDropdown: "dropdown-custom",
        listoption: [
            { value: 1, label: 'Mã vận đơn' },
            { value: 2, label: 'Mã yc thu hồi' },

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
        type: "ComboBoxNewChange",
        name: "cbAfterreClaimProcessType",
        DataSourceMember: "AfterreClaimProcessTypeID",
        label: "Xử lý thu hồi",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Xử lý thu hồi---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "MDMCOMMONCACHE.AFTER_RCPROCESSTYPE",
        ValueMember: "AfterreClaimProcessTypeID",
        NameMember: "AfterreClaimProcessTypeName",
        classNameCol: "col-custom"
    },
];


export const DataGridColumnList = [
    // {
    //     Name: "chkSelect",
    //     Type: "checkbox",
    //     Caption: "Chọn",
    //     DataSourceMember: "MaterialReclaimID",
    //     Width: 60
    // },
    {
        Name: "MaterialReclaimID",
        Type: "texttolinkNewBlank",
        Caption: "Mã yc thu hồi",
        DataSourceMember: "MaterialReclaimID",
        Link: "/MaterialReclaim/Detail/",
        Width: 140
    },
    {
        Name: "ShipmentOrderID",
        Type: "texttolinkNewBlankValue",
        Caption: "Mã vận đơn",
        Link: "/ShipmentOrder/Detail/",
        DataSourceMember: "ShipmentOrderID",
        Width: 300
    },
    {
        Name: "ReturnUserFullName",
        Type: "text",
        Caption: "Ngưởi thu hồi",
        DataSourceMember: "ReturnUserFullName",
        Width: 250
    },
    {
        Name: "CreatedDate",
        Type: "datetime",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },

    {
        Name: "ReturnStore",
        Type: "text",
        Caption: "Kho thu hồi",
        DataSourceMember: "ReturnStore",
        Width: 150
    },
    {
        Name: "AfterReclaimProcessTypeName",
        Type: "text",
        Caption: "Xử lý thu hồi",
        DataSourceMember: "AfterReclaimProcessTypeName",
        Width: 130
    },

    {
        Name: "Action",
        Type: "groupTwoAction",
        Caption: "Tác vụ",
        DataSourceMember: "MaterialReclaimID",
        Width: 100,
        ButtonTitleFirst: "Thu hồi vật tư về kho",
        IconFirst: "ti-back-left",
        ButtonTitleTwo: "Hủy vật tư",
        IconTwo: "ti-close",
    },
];

export const MaterialReclaimDetailColumnList = [
    {
        Name: "InstallProductIDName",
        Type: "text",
        Caption: "Hàng hóa",
        DataSourceMember: "InstallProductIDName",
        // Width: 140
    },
    {
        Name: "ProductIDName",
        Type: "text",
        Caption: "Vật tư",
        DataSourceMember: "ProductIDName",
        // Width: 140
    },
    {
        Name: "QuantityUnit",
        Type: "text",
        Caption: "Đơn vị tính",
        DataSourceMember: "QuantityUnit",
        // Width: 140
    },
    {
        Name: "ReturnQuantity",
        Type: "text",
        Caption: "Số lương thu hồi",
        DataSourceMember: "ReturnQuantity",
        // Width: 140
    },
    {
        Name: "ReturnRealQuantity",
        Type: "text",
        Caption: "Số lương thu hồi thực tế",
        DataSourceMember: "ReturnRealQuantity",
        // Width: 140
    },
];