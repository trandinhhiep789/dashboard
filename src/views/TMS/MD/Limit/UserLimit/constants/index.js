export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/User_Limit/Search";
export const LoadAPIPath = "api/User_Limit/Load";
export const LoadNewAPIPath = "api/User_Limit/LoadNew";
export const AddAPIPath = "api/User_Limit/Add";
export const AddNewAPIPath = "api/User_Limit/AddNew";
export const UpdateAPIPath = "api/User_Limit/Update";
export const UpdateNewAPIPath = "api/User_Limit/UpdateNew";
export const DeleteAPIPath = "api/User_Limit/Delete";
export const DeleteNewAPIPath = "api/User_Limit/DeleteNew";
export const UpdateOrderAPIPath = "api/User_Limit/UpdateOrder";
export const BackLink = "/User_Limit";
export const AddLink = "/User_Limit/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "UserName";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách giới hạn theo người dùng" }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
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