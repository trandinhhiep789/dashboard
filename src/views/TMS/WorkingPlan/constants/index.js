export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/WorkingPlan/Search";
export const AddAPIPath = "api/WorkingPlan/Add";
export const DeleteAPIPath = "api/WorkingPlan/Delete";
export const UpdateOrderAPIPath = "api/WorkingPlan/UpdateOrder";
export const BackLink = "/WorkingPlan";
export const AddLink = "/WorkingPlan/Add";
export const AddLogAPIPath = "api/WorkingPlan/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ShipmentOrderID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách ca làm việc" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/WorkingPlan", Title: "Danh sách ca làm việc" },
    { Link: "", Title: "Sửa" }
];
export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/WorkingPlan", Title: "Danh sách ca làm việc" },
    { Link: "", Title: "Chi tiết" }
];


export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/WorkingPlan", Title: "Danh sách ca làm việc" },
    { Link: "", Title: "Thêm" }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        DataSourceMember: "Keyword",
        value: "",
        colspan: 2,
        placeholder: "Từ khóa",
        icon: "",
        classNameCol:"col-custom"
        
    }
]

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
]

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
]

export const MLObjectDefinition = [

]

export const DataGridColumnList = [
  
    {
        Name: "WorkingDate",
        Type: "date",
        Caption: "Ngày làm việc",
        DataSourceMember: "WorkingDate",
        Width: 130
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ServiceAgreementID",
        Width: 100,
        Link: "/WorkingPlan/Edit/",
        LinkText: "Chỉnh sửa"
    },
]