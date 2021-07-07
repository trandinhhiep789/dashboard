export const listColumn = [
    {
        Name: "chkSelectUserName",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "UserName",
        Width: 60
    },
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
        Name: "FromCoordinatorGroupID_Name",
        Type: "text",
        Caption: "Nhóm quản lý hiện tại",
        DataSourceMember: "FromCoordinatorGroupID_Name"
    },
    {
        Name: "ToCoordinatorGroupID_Name",
        Type: "text",
        Caption: "Nhóm quản lý được thuyên chuyển tới",
        DataSourceMember: "ToCoordinatorGroupID_Name"
    },
    {
        Name: "ApplyDate",
        Type: "date",
        Caption: "Ngày áp dụng thuyên chuyển",
        DataSourceMember: "ApplyDate"
    }
]