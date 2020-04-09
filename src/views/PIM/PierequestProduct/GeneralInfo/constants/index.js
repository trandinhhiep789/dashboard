export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PieRequest_Product/Search";
export const LoadAPIPath = "api/PieRequest_Product/Load";
export const AddAPIPath = "api/PieRequest_Product/Add";
export const UpdateAPIPath = "api/PieRequest_Product/Update";
export const DeleteAPIPath = "api/PieRequest_Product/Delete";
export const UpdateOrderAPIPath = "api/PieRequest_Product/UpdateOrder";
export const BackLink = "/PieRequest_Product";
export const AddLink = "/PieRequest_Product/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ProductID";
export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}
];

export const PagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "", Title: "Cập nhật bài viết sản phẩm" }
];

export const EditPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/PieRequest_Product", Title: "Cập nhật  sản phẩm" }
];

export const AddPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/PieRequest_Product", Title: "Thêm sản phẩm" }

]

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
];
export const EditElementList = [
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
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "txtProductName",
        DataSourceMember: "ProductName"
    },
    {
        Name: "ProductShortName",
        DefaultValue: "",
        BindControlName: "txtProductShortName",
        DataSourceMember: "ProductShortName"
    },
    {
        Name: "ProductTypeID",
        DefaultValue: "0",
        BindControlName: "cboProductTypeID",
        DataSourceMember: "ProductTypeID"
    },
    {
        Name: "DefaultCategoryID",
        DefaultValue: "0",
        BindControlName: "cboDefaultCategoryID",
        DataSourceMember: "DefaultCategoryID"
    },
    {
        Name: "BrandID",
        DefaultValue: "0",
        BindControlName: "cboBrandID",
        DataSourceMember: "BrandID"
    },
    {
        Name: "DefaultQuantityUnitID",
        DefaultValue: "0",
        BindControlName: "cboDefaultQuantityUnitID",
        DataSourceMember: "DefaultQuantityUnitID"
    },
    {
        Name: "Age",
        DefaultValue: "0",
        BindControlName: "cboAge",
        DataSourceMember: "Age"
    },
    {
        Name: "ArryProduct_Feature",
        DefaultValue: "",
        BindControlName: "ArryProduct_Feature",
        DataSourceMember: "ArryProduct_Feature"
    },
    {
        Name: "ArryProduct_Ship",
        DefaultValue: "",
        BindControlName: "ArryProduct_Ship",
        DataSourceMember: "ArryProduct_Ship"
    },
    {
        Name: "Vat",
        DefaultValue: "0",
        BindControlName: "cboVat",
        DataSourceMember: "Vat"
    },
    {
        Name: "Povat",
        DefaultValue: "0",
        BindControlName: "cboPovat",
        DataSourceMember: "Povat"
    },
    {
        Name: "Isnovat",
        DefaultValue: true,
        BindControlName: "chkIsnovat",
        DataSourceMember: "Isnovat"
    },
    {
        Name: "Isnopovat",
        DefaultValue: false,
        BindControlName: "chkIsnopovat",
        DataSourceMember: "Isnopovat"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUser"
    }
];