export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/Vehicle/Search";
export const LoadAPIPath = "api/Vehicle/Load";
export const LoadNewAPIPath = "api/Vehicle/LoadNew";
export const AddAPIPath = "api/Vehicle/Add";
export const AddNewAPIPath = "api/Vehicle/AddNew";
export const UpdateAPIPath = "api/Vehicle/Update";
export const UpdateNewAPIPath = "api/Vehicle/UpdateNew";
export const DeleteAPIPath = "api/Vehicle/Delete";
export const DeleteNewAPIPath = "api/Vehicle/DeleteNew";
export const UpdateOrderAPIPath = "api/Vehicle/UpdateOrder";
export const BackLink = "/Vehicle";
export const AddLink = "/Vehicle/Add";
export const AddLogAPIPath = "api/Vehicle/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "VehicleID";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách định nghĩa kho điều phối giao hàng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Vehicle", Title: "Danh sách định nghĩa kho điều phối giao hàng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Vehicle", Title: "Danh sách định nghĩa kho điều phối giao hàng" },
    { Link: "", Title: "Thêm" }
];

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const DataGridColumnList = [

]

export const MLObjectDefinition = [
   
]


export const AddElementList = [
  

];

export const InputCoordinatorStoreWardColumnList = [

];

export const GridMLCoordinatorStoreWardDefinition = []

export const EditElementList = [

];
