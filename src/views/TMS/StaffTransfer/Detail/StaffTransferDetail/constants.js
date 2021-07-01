export const listColumn = [
    {
        Name: "UserName",
        Type: "text",
        Caption: "Mã nhân viên giao hàng",
        DataSourceMember: "UserName"
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Tên nhân viên giao hàng",
        DataSourceMember: "FullName"
    },
    {
        Name: "FromCoordinatorGroupID",
        Type: "text",
        Caption: "Nhóm quản lý hiện tại",
        DataSourceMember: "FromCoordinatorGroupID"
    },
    {
        Name: "ToCoordinatorGroupID",
        Type: "text",
        Caption: "Nhóm quản lý được thuyên chuyển tới",
        DataSourceMember: "ToCoordinatorGroupID"
    },
    {
        Name: "ApplyDate",
        Type: "date",
        Caption: "Ngày áp dụng thuyên chuyển",
        DataSourceMember: "ApplyDate"
    }
]