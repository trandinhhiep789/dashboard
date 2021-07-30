

export const BackLink = "/PartnerUI";
export const AddLink = "/PartnerUI/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "";


export const PagePath = [
    { Link: "/", Title: "Trang chủ",  icon: "fa fa-home"  },
    { Link: "", Title: "Danh sách vận đơn" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ",  icon: "fa fa-home"  },
    { Link: "/PartnerUI", Title: "Danh sách vận đơn" },
    { Link: "", Title: "Cập nhật" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ",  icon: "fa fa-home"  },
    { Link: "/PartnerUI", Title: "Danh sách vận đơn" },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerUI", Title: "Danh sách vận đơn" },
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
    },
];

export const SearchMLObjectDefinition = [
    {
        SearchKey: "@Keyword", 
        SearchValue: ""
    },
    
];



export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ID",
        Width: 60
    },
    {
        Name: "ID",
        Type: "texttolink",
        Caption: "Mã vận đơn",
        DataSourceMember: "ServiceAgreementID",
        Link: "/PartnerUI/Detail/",
        Width: 70
    },
    {
        Name: "1",
        Type: "date",
        Caption: "Ngày hẹn giao",
        DataSourceMember: "1",
        Width: 200
    },
    {
        Name: "2",
        Type: "text",
        Caption: "Địa chỉ",
        DataSourceMember: "2",
        Width: 340
    },
    {
        Name: "3",
        Type: "text",
        Caption: "Loại dịch vụ",
        DataSourceMember: "3",
        Width:  200
    },
    {
        Name: "4",
        Type: "text",
        Caption: "Sản phẩm",
        DataSourceMember: "4",
        Width: 100
    },
    {
        Name: "5",
        Type: "date",
        Caption: "Trạng thái",
        DataSourceMember: "5",
        Width: 130
    },

];