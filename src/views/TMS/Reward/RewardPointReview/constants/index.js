export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/TMSRewardDetail/SearchRewardPointReview";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Kiểm tra điểm thưởng" }
];

let currentDate = new Date()
currentDate.setMonth(currentDate.getMonth() - 1)
export const SearchElementList = [

    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ Ngày",
        // value: new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()),
        value: new Date(`${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`),
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
    {
        type: "ProductComboBoxCustom",
        name: "cbProductID",
        DataSourceMember: "ProductID",
        label: "Sản phẩm",
        colspan: 12,
        rowspan: 3,
        labelcolspan: 12,
        IsLabelDiv: true,
        value: "",
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        isMultiSelect: false,
        isMulti: false

    },
    {
        type: "text",
        name: "txtShipmentOderId",
        DataSourceMember: "ShipmentOderId",
        label: "Mã vận đơn",
        value: "",
        colspan: 2,
        placeholder: "Nhập mã vận đơn",
        icon: ""
    },

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
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "cbProductID"
    },
    {
        Name: "ShipmentOderId",
        DefaultValue: "",
        BindControlName: "txtShipmentOderId"
    },

]

export const GridColumnList = [

    {
        Name: "RewardTypeName",
        Type: "text",
        Caption: "Loại thưởng",
        DataSourceMember: "RewardTypeName",
        Width: 100
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 100
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "ProductName",
        Width: 200
    },
    {

        Name: "ShipmentOrderID",
        Type: "texttolinkNewBlank",
        Caption: "Mã vận đơn",
        DataSourceMember: "ShipmentOrderID",
        Link: "/ShipmentOrder/Detail/",
        Width: 100
    },
    {
        Name: "Quantity",
        Type: "text",
        Caption: "Số lượng",
        DataSourceMember: "Quantity",
        Width: 100
    },
    {
        Name: "DeliveryDistance",
        Type: "text",
        Caption: "Số Km",
        DataSourceMember: "DeliveryDistance",
        Width: 100
    },

    {
        Name: "RewardPrice",
        Type: "textCurrency",
        Caption: "Đơn giá thưởng",
        DataSourceMember: "RewardPrice",
        Width: 100
    },
    {
        Name: "TotalReward",
        Type: "textCurrency",
        Caption: "Số tiền thưởng",
        DataSourceMember: "TotalReward",
        Width: 100
    },
]
