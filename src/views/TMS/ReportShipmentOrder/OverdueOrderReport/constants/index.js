export const APIHostName = "TMSAPI";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo chi tiết vận đơn quá hạn" }
];

export const SearchMLObjectDefinition = [
    {
        Name: "StartDate",
        DefaultValue: "",
        BindControlName: "cbStartDate"
    },
    {
        Name: "EndDate",
        DefaultValue: "",
        BindControlName: "cbEndDate"
    },
    {
        Name: "ShipmentOrderStatusGroupID",
        DefaultValue: "",
        BindControlName: "cbShipmentOrderStatusGroupID"
    },
    {
        Name: "AreaID",
        DefaultValue: "",
        BindControlName: "cbAreaID"
    },
    {
        Name: "User",
        DefaultValue: "",
        BindControlName: "cbUser"
    }
];

export const SearchElementList = [
    {
        type: "Datetime",
        label: "Từ ngày",
        name: "cbStartDate",
        DataSourceMember: "StartDate",
        placeholder: "Từ ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        classNameCol: "col-custom"
    },
    {
        type: "Datetime",
        label: "Đến ngày",
        name: "cbEndDate",
        DataSourceMember: "EndDate",
        placeholder: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        classNameCol: "col-custom"
    },
    {
        type: "MultiTreeSelect",
        IsLabelDiv: true,
        labelcolspan: 10,
        label: 'Trạng thái vận đơn',
        name: "cbShipmentOrderStatusGroupID",
        DataSourceMember: "ShipmentOrderStatusGroupID",
        colspan: 10,
        rowspan: 2,
        value: "1,2,3",
        maxTagCount: 1,
        isMultiSelect: true,
        placeholder: "---Trạng thái---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERSTATUSGR",
        ValueMember: "ShipmentOrderStatusGroupID",
        NameMember: "ShipmentOrderStatusGroupName",
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        name: "cbCOD",
        DataSourceMember: "COD",
        label: "COD",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [
            { value: -1, label: "---Vui lòng chọn---" },
            { value: 0, label: "COD bằng 0" },
            { value: 1, label: "COD khác 0" },
        ]
    },
    {
        type: "textdropdownNew",
        label: "Đơn hàng/ Vận đơn",
        dropdownName: "txtTypename",
        name: "txtKeyword",
        colspan: 4,
        value: "",
        placeholder: "Từ khóa",
        icon: "",
        nameOption: "txtTypename",
        labelOption: "--Vui lòng chọn--",
        valueOption: -1,
        classNameCol: "col-custom",
        classNameDropdown: "dropdown-custom",
        listoption: [
            { value: -1, label: "--Vui lòng chọn--" },
            { value: 1, label: "Mã đơn hàng" },
            { value: 2, label: "Mã vận đơn" }
        ]
    }
];

export const GridColumnList = [
    {
        Name: "fulNameStore",
        Type: "text",
        Caption: "Mã đơn hàng",
        DataSourceMember: "fulNameStore",
        Width: "9.09%"
    },
    {
        Name: "1",
        Type: "text",
        Caption: "Mã vận đơn",
        DataSourceMember: "1",
        Width: "9.09%"
    },
    {
        Name: "2",
        Type: "text",
        Caption: "Thời gian xuất hàng",
        DataSourceMember: "2",
        Width: "9.09%"
    },
    {
        Name: "3",
        Type: "text",
        Caption: "Số tiền COD",
        DataSourceMember: "3",
        Width: "9.09%"
    },
    {
        Name: "4",
        Type: "text",
        Caption: "Số tiền phải thu vật tư",
        DataSourceMember: "4",
        Width: "9.09%"
    },
    {
        Name: "5",
        Type: "text",
        Caption: "Tổng tiền phải thu của vận đơn",
        DataSourceMember: "5",
        Width: "9.09%"
    },
    {
        Name: "6",
        Type: "text",
        Caption: "Nhân viên giao",
        DataSourceMember: "6",
        Width: "9.09%"
    },
    {
        Name: "7",
        Type: "text",
        Caption: "TN điều phối",
        DataSourceMember: "7",
        Width: "9.09%"
    },
    {
        Name: "8",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "8",
        Width: "9.09%"
    },
    {
        Name: "9",
        Type: "text",
        Caption: "Trạng thái vận đơn",
        DataSourceMember: "9",
        Width: "9.09%"
    },
    {
        Name: "10",
        Type: "text",
        Caption: "Số ngày trễ so với ngày xuất hàng",
        DataSourceMember: "10",
        Width: "9.09%"
    }
]