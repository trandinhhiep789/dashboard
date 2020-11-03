export const APIHostName = "TMSAPI";
export const SearchComputeAPIPath = "api/TMSReward/RewardCompute";

export const PagePathCompute = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Tính chi phí thưởng theo ngày" }
];


export const SearchComputeMLObjectDefinition = [

    {
        Name: "RewardDate",
        DefaultValue: "",
        BindControlName: "dtmRewardDate"
    },
]


export const SearchComputeElementList = [
    {
        type: "Datetime",
        name: "dtmRewardDate",
        DataSourceMember: "RewardDate",
        label: "Ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },

]

