export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentOrder/SearchInvestigationStatus";
export const SearchPartnerSaleOrderAPIPath = "api/ShipmentOrder/SearchInvestigationByPartnerSaleOrder";



export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Tra cứu trạng thái vận đơn" }
];

export const SearchElementList = [
    // {
    //     type: "text",
    //     // subLabel: "Nhập mã đơn hàng/ Mã vận đơn",
    //     name: "txtKeyword",
    //     label: "",
    //     value: "",
    //     placeholder: "Nhập mã đơn hàng/ Mã vận đơn",
    //     icon: "",
    //     listoption: {}
    // },
    {
        type: "textdropdownNew",
        dropdownName: "txtTypename",
        name: "txtKeywordNew",
        colspan: 2,
        label: "",
        value: "",
        colspan: 4,
        placeholder: "Từ khóa",
        icon: "",
        nameOption: "txtTypename",
        labelOption: "--Vui lòng chọn--",
        valueOption:  1,
        // validatonList:["Comborequired"],
        classNameCol: "col-custom",
        classNameDropdown: "dropdown-custom",
        listoption: [
            { value: 1, label: 'Mã vận đơn' },
            { value: 2, label: 'Mã ycx của đối tác' },

        ]
    },
];

export const SearchMLObjectDefinition = [
    // {
    //     Name: "Keyword",
    //     DefaultValue: "",
    //     BindControlName: "txtKeyword"
    // },
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
];

export const GridColumnList = [
    {
        Name: "ProcessDate",
        Type: "datetime",
        Caption: "Thời gian xử lý",
        DataSourceMember: "ProcessDate",
        Width: 200
    },
    {
        Name: "ShipmentOrderStepName",
        Type: "text",
        Caption: "Bước xử lý",
        DataSourceMember: "ShipmentOrderStepName",
        Width: 200
    },
    {
        Name: "ProcessFullName",
        Type: "text",
        Caption: "Nhân viên xử lý",
        DataSourceMember: "ProcessFullName",
        Width: 200
    },
    {
        Name: "ImageFileURL",
        Type: "images",
        Caption: "Hình ảnh",
        DataSourceMember: "ImageFileURL",
        Width: 200
    },
];

export const GridColumnListShipmentOrder = [
    {
        Name: "UserName",
        Type: "text",
        Caption: "Mã nhân viên",
        DataSourceMember: "UserName",
        Width: 200
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Nhân viên",
        DataSourceMember: "FullName",
        Width: 200
    },
    {
        Name: "PhoneNumber",
        Type: "text",
        Caption: "Số điện thoại",
        DataSourceMember: "PhoneNumber",
        Width: 200
    }
]

