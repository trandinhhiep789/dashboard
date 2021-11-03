export const APIHostName = "TMSAPI";
export const SearchComputeAPIPath = "api/BaseDeliveryAbility/BaseDeliveryAbilityCompute";

export const PagePathCompute = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Tính tải chuẩn theo ngày" }
];


export const SearchComputeMLObjectDefinition = [

    {
        Name: "BaseDeliveryAbilityDate",
        DefaultValue: "",
        BindControlName: "dtBaseDeliveryAbilityDate"
    },
]


export const SearchComputeElementList = [
    {
        type: "Datetime",
        name: "dtBaseDeliveryAbilityDate",
        DataSourceMember: "BaseDeliveryAbilityDate",
        label: "Ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },

]

