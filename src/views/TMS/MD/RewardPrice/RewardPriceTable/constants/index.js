export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/RewardPriceTable/Search";
export const LoadAPIPath = "api/RewardPriceTable/Load";
export const AddAPIPath = "api/RewardPriceTable/Add";
export const UpdateAPIPath = "api/RewardPriceTable/Update";
export const DeleteAPIPath = "api/RewardPriceTable/Delete";
export const BackLink = "/RewardPriceTable";
export const AddLink = "/RewardPriceTable/Add";
export const AddLogAPIPath = "api/RewardPriceTable/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "RewardPriceTableID";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách đơn giá thưởng giao hàng và lắp đặt" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardPriceTable", Title: "Danh sách đơn giá thưởng giao hàng và lắp đặt" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardPriceTable", Title: "Danh sách đơn giá thưởng giao hàng và lắp đặt" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardPriceTable", Title: "Danh sách đơn giá thưởng giao hàng và lắp đặt" },
    { Link: "", Title: "Chi tiết" }
];


export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
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

export const DataGridColumnList=[
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "RewardPriceTableID",
        Width: 60
    },
    {
        Name: "RewardPriceTableName",
        Type: "text",
        Caption: "Tên bảng đơn giá thưởng",
        DataSourceMember: "RewardPriceTableName",
        Width: 250
    },
    {
        Name: "RewardPriceTypeID",
        Type: "text",
        Caption: "Loại đơn giá thưởng",
        DataSourceMember: "RewardPriceTypeID",
        Width: 250
    },
    {
        Name: "AreaID",
        Type: "text",
        Caption: "Khu vực áp dụng",
        DataSourceMember: "AreaID",
        Width: 250
    },
    {
        Name: "CarrierTypeID",
        Type: "text",
        Caption: "Loại phương tiện vận chuyển",
        DataSourceMember: "CarrierTypeID",
        Width: 250
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "RewardPriceTableID",
        Width: 100,
        Link: "/RewardPriceTable/Edit/",
        LinkText: "Chỉnh sửa"
    },
]