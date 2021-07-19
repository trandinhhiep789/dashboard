export const APIHostName = "TMSAPI";
export const APILoad = "api/ShipmentQualityAssess/Load";

export const PagePathEdit = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentQualityAssess", Title: "Đánh giá chất lượng giao hàng" },
    { Link: "", Title: "Chỉnh sửa" }
];

export const MLObjectDefinition = [
    {
        Name: "ShipmentOrderID",
        DefaultValue: "",
        BindControlName: "txtShipmentOrderID"
    },
    {
        Name: "QualityAssessTypeID",
        DefaultValue: "",
        BindControlName: "cboQualityAssessTypeID"
    },
    // {
    //     Name: "QualityAssessGroupID",
    //     DefaultValue: "",
    //     BindControlName: "txtQualityAssessGroupID"
    // },
    {
        Name: "QualityAssessValue",
        DefaultValue: "",
        BindControlName: "txtQualityAssessValue"
    },
    {
        Name: "QualityAssessNote",
        DefaultValue: "",
        BindControlName: "txtQualityAssessNote"
    },
]