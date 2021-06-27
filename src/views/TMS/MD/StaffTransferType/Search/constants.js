export const APIHostName = "TMSAPI";
export const APISearch = "api/StaffTransferType/Search";

export const AddLink = "/StaffTransferType/Add";

export const IDSelectColumnName = "chkSelect";

export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Loại hình thuyên chuyển nhân viên" }
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
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "StaffTransferTypeID",
        Width: 60
    },
    {
        Name: "StaffTransferTypeID",
        Type: "text",
        Caption: "Mã loại yêu cầu thuyên chuyển",
        DataSourceMember: "StaffTransferTypeID",
        Width: 200
    },
    {
        Name: "StaffTransferTypeName",
        Type: "texttolink",
        Link: "/StaffTransferType/Detail/",
        Caption: "Tên loại yêu cầu thuyên chuyển",
        DataSourceMember: "StaffTransferTypeName",
        Width: 250
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        //Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "UpdatedDate",
        Type: "date",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
        Width: 140
    },
    {
        Name: "UpdatedUserFullName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserFullName",
        Width: 140
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "StaffTransferTypeID",
        Width: 100,
        Link: "/StaffTransferType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];