export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ServicePriceTable/Search";
export const LoadAPIPath = "api/ServicePriceTable/Load";
export const AddAPIPath = "api/ServicePriceTable/Add";
export const UpdateAPIPath = "api/ServicePriceTable/Update";
export const DeleteAPIPath = "api/ServicePriceTable/Delete";
export const BackLink = "/ServicePriceTable";
export const AddLink = "/ServicePriceTable/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ServicePriceTableID";

export const InitSearchParams = [
    { 
        SearchKey: "@Keyword", 
        SearchValue: "" 
    }
];


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách bảng giá dịch vụ" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServicePriceTable", Title: "Danh sách bảng giá dịch vụ" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServicePriceTable", Title: "Danh sách bảng giá dịch vụ" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServicePriceTable", Title: "Danh sách bảng giá dịch vụ" },
    { Link: "", Title: "Chi tiết" }
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




export const MLObjectDefinition = [
    {
        Name: "ServicePriceTableID",
        DefaultValue: "",
        BindControlName: "txtServicePriceTableID",
        DataSourceMember: "ServicePriceTableID"
    },
    {
        Name: "ServicePriceTableName",
        DefaultValue: "",
        BindControlName: "txtServicePriceTableName",
        DataSourceMember: "ServicePriceTableName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    }
 
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ServicePriceTableID",
        Width: 100
    },
    {
        Name: "ServicePriceTableID",
        Type: "texttolink",
        Caption: "Mã bảng giá dịch vụ",
        DataSourceMember: "ServicePriceTableID",
        Link: "/ServicePriceTable/Detail/",
        Width: 150
    },
    {
        Name: "ServicePriceTableName",
        Type: "text",
        Caption: "Tên bảng giá dịch vụ",
        DataSourceMember: "ServicePriceTableName",
        Width: 300
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 200
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ServicePriceTableID",
        Width: 150,
        Link: "/ServicePriceTable/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
