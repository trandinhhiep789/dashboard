export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/UserActivity/GetAll";
export const PKColumnName = "UserActivityID";



export const DataGridColumnList = [
   
    {
        Name: "ActivityDate",
        Type: "date",
        Caption: "Thời gian",
        DataSourceMember: "ActivityDate",
        Width: 150
    },
    {
        Name: "ActivityDetail",
        Type: "popuplink",
        PopupContent: "ActivityDetail",
        Caption: "Nội dung",
        DataSourceMember: "ActivityTitle",
        Width: 400
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Người xử lý",
        DataSourceMember: "FullName",
        Width: 150
    }
];