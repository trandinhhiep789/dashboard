export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PieRequest_Product_OutAst/Search";
export const LoadAPIPath = "api/PieRequest_Product_OutAst/Load";
export const AddAPIPath = "api/PieRequest_Product_OutAst/Add";
export const UpdateAPIPath = "api/PieRequest_Product_OutAst/Update";
export const DeleteAPIPath = "api/PieRequest_Product_OutAst/Delete";


export const BackLink = "/PartnerProductMapType";
export const AddLink = "/PartnerProductMapType/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "OutAstKey";
export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}
];

export const PagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "", Title: "Cập nhật xuất khác nơi tồn kho" }
];

export const EditPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/OutAst", Title: "Cập nhật xuất khác nơi tồn kho" }
];

export const AddPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩmc" },
{ Link: "/PieRequestProduct/OutAst", Title: "Thêm xuất khác nơi tồn kho" }
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

export const AddElementList = [
    {
        type: "text",
        name: "txtPartnerProductMapTypeID",
        label: "Mã loại bảng mã sản phẩm của đối tác:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerProductMapTypeID",
        readonly: false,
        validatonList: ["number", "required"]

    },
    {
        type: "text",
        name: "txtPartnerProductMapTypeName",
        label: "Tên loại bảng mã sản phẩm của đối tác:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerProductMapTypeName",
        readonly: false,
        validatonList: []

    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []


    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []

    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []

    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const EditObjectDefinition = [

    {
        name: "OutputTypeID",
        DefaultValue: "",
        BindControlName: "OutputTypeID",
        DataSourceMember: "OutputTypeID"
    },
    {
        name: "CompanyID",
        DefaultValue: "",
        BindControlName: "CompanyID",
        DataSourceMember: "CompanyID"
    },
    {
        name: "InStockStoreID",
        DefaultValue: "",
        BindControlName: "InStockStoreID",
        DataSourceMember: "InStockStoreID"
    },
    {
        name: "IsRequireVoucher",
        DefaultValue: "",
        BindControlName: "IsRequireVoucher",
        DataSourceMember: "IsRequireVoucher"
    }



];

export const GridProductOutAstColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "OutAstKey",
        Width: 50
    },
    {
        Name: "OutputTypeName",
        Type: "text",
        Caption: "Hình thức sản xuất",
        DataSourceMember: "OutputTypeName",
        Width: 100
    },
    {
        Name: "CompanyName",
        Type: "text",
        Caption: "Công ty",
        DataSourceMember: "CompanyName",
        Width: 120
    },
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho tồn",
        DataSourceMember: "StoreName",
        Width: 150
    },
    {
        Name: "IsRequireVoucher",
        Type: "checkicon",
        Caption: "Yêu cầu chứng từ",
        DataSourceMember: "IsRequireVoucher",
        Width: 150
    },
    {
        Name: "Action",
        Type: "edit",
        Caption: "Tác vụ",
        DataSourceMember: "OutAstKey",
        Width: 100,
        Link: "",
        LinkText: "Chỉnh sửa"
    }
];