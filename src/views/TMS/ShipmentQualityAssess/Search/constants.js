export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Đánh giá chất lượng giao hàng" }
];

export const APIHostName = "TMSAPI";
export const APISearch = "api/ShipmentQualityAssess/Search";
export const APIDeleteList = "api/ShipmentQualityAssess/DeleteList";
export const APIExportExcel = "api/ShipmentQualityAssess/ExportExcel";

export const dataSearch = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@TYPENAME",
        SearchValue: ""
    },
    {
        SearchKey: "@CREATEDUSER",
        SearchValue: ""
    },
    {
        SearchKey: "@PAGENUMBER",
        SearchValue: 1
    },
    {
        SearchKey: "@PAGESIZE",
        SearchValue: 50
    }
]

export const listElement = [
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
            { value: 1, label: "Mã vận đơn" },
            { value: 2, label: "Mã đơn hàng" }
        ]
    },
    {
        type: "MultiSelectUser",
        name: "cbCreatedUser",
        DataSourceMember: "CreatedUser",
        label: "Nhân viên tạo",
        colspan: 12,
        rowspan: 2,
        labelcolspan: 12,
        IsLabelDiv: true,
        value: -1,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        isMultiSelect: false,
        isClearable: true
    },
]

export const MLObjectDefinition = [
    {
        Name: "Typename",
        DefaultValue: "",
        BindControlName: "txtTypename"
    },
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "cbCreatedUser",
    }
]

