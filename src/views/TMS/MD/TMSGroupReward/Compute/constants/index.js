export const APIHostName = "TMSAPI";
export const SearchComputeAPIPath = "api/TMSGroupReward/Compute";

export const PagePathCompute = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Tính thưởng nhóm điều phối" }
];


export const SearchComputeMLObjectDefinition = [

    {
        Name: "ComputeDate",
        DefaultValue: "",
        BindControlName: "dtmComputeDate"
    },
]


export const SearchComputeElementList = [
    // {
    //     type: "Datetime",
    //     name: "dtmComputeDate",
    //     DataSourceMember: "ComputeDate",
    //     label: "Ngày",
    //     value: new Date(),
    //     timeFormat: false,
    //     dateFormat: "MM/YYYY",
    //     colspan: 2,
    // },

    {
        type: "MonthPicker",
        name: "dtmComputeDate",
        DataSourceMember: "ComputeDate",
        label: "Tháng thưởng",
        //value: new Date((new Date().getMonth()) + "/" + '01' + "/" + new Date().getFullYear()),
        value: new Date(),
        format: "MM-YYYY",
        colspan: 2,
        placeholder: "MM-YYYY",
    },

]

