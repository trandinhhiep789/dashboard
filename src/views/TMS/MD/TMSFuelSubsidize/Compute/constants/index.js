export const APIHostName = "TMSAPI";
export const SearchComputeAPIPath = "api/TMSFuelSubsidize/Compute";

export const PagePathCompute = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Tính phụ cấp xăng" }
];


export const SearchComputeMLObjectDefinition = [

    {
        Name: "ComputeDate",
        DefaultValue: "",
        BindControlName: "dtmComputeDate"
    },
]


export const SearchComputeElementList = [
    {
        type: "Datetime",
        name: "dtmComputeDate",
        DataSourceMember: "ComputeDate",
        label: "Ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },

]

