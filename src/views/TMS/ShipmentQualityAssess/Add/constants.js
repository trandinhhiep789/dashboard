export const APIHostName = "TMSAPI";
export const APIAdd = "api/ShipmentQualityAssess/Add";
export const APIQualityAssessTypeLoad = "api/QualityAssessType/Load";
export const APIQualityAssessTypeRVLLoadList = "api/QualityAssessType_ReviewLevel/LoadList";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentQualityAssess", Title: "Đánh giá chất lượng giao hàng" },
    { Link: "", Title: "Thêm" }
];

// export const listElement = [
//     {
//         type: "text",
//         name: "txtShipmentOrderID",
//         label: "mã yêu cầu vận chuyển",
//         value: "",
//         maxSize: "20",
//         placeholder: "",
//         icon: "",
//         listoption: {},
//         DataSourceMember: "ShipmentOrderID",
//         readonly: false,
//         validatonList: ["required", "number"]
//     },
//     {
//         type: "select",
//         name: "txtQualityAssessTypeID",
//         label: "loại tiêu chí đánh giá chất lượng",
//         value: "",
//         placeholder: "",
//         icon: "",
//         listoption: [],
//         DataSourceMember: "QualityAssessTypeID",
//         readonly: false,
//         validatonList: ["required"],
//         IsAutoLoadItemFromCache: true,
//         LoadItemCacheKeyID: "ERPCOMMONCACHE.QUALITYASSESSTYPE",
//         ValueMember: "QualityAssessTypeID",
//         NameMember: "QualityAssessTypeName"
//     },
// {
//     type: "select",
//     name: "txtQualityAssessGroupID",
//     label: "loại tiêu chí đánh giá chất lượng",
//     value: "",
//     placeholder: "",
//     icon: "",
//     listoption: [],
//     DataSourceMember: "QualityAssessGroupID",
//     readonly: false,
//     validatonList: ["required"],
//     IsAutoLoadItemFromCache: true,
//     LoadItemCacheKeyID: "ERPCOMMONCACHE.QUALITYASSESSGROUP",
//     ValueMember: "QualityAssessGroupID",
//     NameMember: "QualityAssessGroupName"
// },
//     {
//         type: "text",
//         name: "txtQualityAssessValue",
//         label: "giá trị đánh giá",
//         value: "",
//         maxSize: "10",
//         placeholder: "Nằm trong khoảng từ 4 đến 10",
//         icon: "",
//         listoption: {},
//         DataSourceMember: "QualityAssessValue",
//         readonly: false,
//         validatonList: ["required", "number"]
//     },
//     {
//         type: "textarea",
//         name: "txtQualityAssessNote",
//         label: "Ghi chú đánh giá",
//         value: "",
//         maxSize: "400",
//         placeholder: "",
//         icon: "",
//         listoption: {},
//         DataSourceMember: "QualityAssessNote",
//         readonly: false,
//         validatonList: ["required"]
//     },
// ];

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