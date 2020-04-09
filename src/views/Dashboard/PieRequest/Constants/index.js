export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PieRequest/Search";
export const SearchAPINotFinishPath = "api/PieRequest/GetNotFinish";
export const AddAPIPath = "api/PieRequest/Add";
export const PKColumnName = "PieRequestID";




export const DataGridColumnList = [

    {
        Name: "PieRequestID",
        Type: "texttolink",
        Caption: "Mã Yêu cầu",
        Link: "/PieRequest/Edit/",
        DataSourceMember: "PieRequestID",
        Width: 150
    },
    {
        Name: "PieRequestName",
        Type: "texttolink",
        Caption: "Tên yêu cầu",
        Link: "/PieRequest/Edit/",
        DataSourceMember: "PieRequestName",
        Width: 400
    },
    {
        Name: "StepCompletePercent",
        Type: "progress",
        Caption: "Tiến độ",
        DataSourceMember: "StepCompletePercent",
        Width: 400
    },
    {
        Name: "CreatedFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedFullName",
        Width: 200
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Thời gian",
        DataSourceMember: "CreatedDate",
        Width: 200
    }
];