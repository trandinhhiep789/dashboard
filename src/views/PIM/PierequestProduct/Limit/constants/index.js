export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PieRequest_Product_Limit/Search";
export const SearchAPIPathLimit = "api/Limit/Search";

export const LoadAPIPath = "api/PieRequest_Product_Limit/Load";
export const AddAPIPath = "api/PieRequest_Product_Limit/Add";
export const UpdateAPIPath = "api/PieRequest_Product_Limit/Update";
export const DeleteAPIPath = "api/PieRequest_Product_Limit/Delete";
export const UpdateOrderAPIPath = "api/PieRequest_Product_Limit/UpdateOrder";

export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "CustomerID";
export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}];

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/PieRequest", Title: "Yêu cầu chỉnh sửa thông tin sản phẩm" },
    { Link: "", Title: "Chỉnh sửa Giới hạn sản phẩm theo công ty" }
];

export const GridColumnList = [
    {
        Name: "CompanyName",
        Type: "text",
        Caption: "Công ty",
        DataSourceMember: "CompanyName",
        Width: 250
    },
    {
        Name: "MinStockQuantity",
        Type: "number",
        Caption: "TK tối thiểu",
        DataSourceMember: "MinStockQuantity",
        Width: 100,
        Min: 0,
    },
    {
        Name: "MaxStockQuantity",
        Type: "number",
        Caption: "TK tối đa",
        DataSourceMember: "MaxStockQuantity",
        Width: 100,
        Min: 0,
    },
    {
        Name: "MinOrderQuantity",
        Type: "number",
        Caption: "Đặt hàng tối thiểu",
        DataSourceMember: "MinOrderQuantity",
        Width: 100,
        Min: 0,
    },
    {
        Name: "MaxOrderQuantity",
        Type: "number",
        Caption: "Đặt hàng tối đa",
        DataSourceMember: "MaxOrderQuantity",
        Width: 100,
        Min: 0,
    },
    {
        Name: "MinSaleQuantity",
        Type: "number",
        Caption: "Bán tối thiểu",
        DataSourceMember: "MinSaleQuantity",
        Width: 100,
        Min: 0,
    },
    {
        Name: "MaxSaleQuantity",
        Type: "number",
        Caption: "Bán tối đa",
        DataSourceMember: "MaxSaleQuantity",
        Width: 100,
        Min: 0,
    },
    {
        Name: "WebMinStockQuantity",
        Type: "number",
        Caption: "TK tối thiểu Web",
        DataSourceMember: "WebMinStockQuantity",
        Width: 100,
        Min: 0,
    }
];

export const GridMLObjectDefinition = [
    {
        Name: "CompanyID",
        DefaultValue: "",
        BindControlName: "txtCompanyID",
        DataSourceMember: "CompanyID"
    },
    {
        Name: "CompanyName",
        DefaultValue: "",
        BindControlName: "txtCompanyName",
        DataSourceMember: "CompanyName"
    },
    {
        Name: "MinStockQuantity",
        DefaultValue: "",
        BindControlName: "txtMinStockQuantity",
        DataSourceMember: "MinStockQuantity"
    },
    {
        Name: "MaxStockQuantity",
        DefaultValue: "",
        BindControlName: "txtMaxStockQuantity",
        DataSourceMember: "MaxStockQuantity"
    },
    {
        Name: "MinOrderQuantity",
        DefaultValue: "",
        BindControlName: "txtMinOrderQuantity",
        DataSourceMember: "MinOrderQuantity"
    },
    {
        Name: "MaxOrderQuantity",
        DefaultValue: "",
        BindControlName: "txtMaxOrderQuantity",
        DataSourceMember: "MaxOrderQuantity"
    },
    {
        Name: "MinSaleQuantity",
        DefaultValue: "",
        BindControlName: "txtMinSaleQuantity",
        DataSourceMember: "MinSaleQuantity"
    },
    {
        Name: "MaxSaleQuantity",
        DefaultValue: "",
        BindControlName: "txtMaxSaleQuantity",
        DataSourceMember: "MaxSaleQuantity"
    },
    {
        Name: "WebMinStockQuantity",
        DefaultValue: "",
        BindControlName: "txtWebMinStockQuantity",
        DataSourceMember: "WebMinStockQuantity"
    }
];

export const ColumnListNumber = [
    {
        Name: "CompanyName",
        // Type: "text",
        // Caption: "Công ty",
        // DataSourceMember: "CompanyName",
        // Width: 250
    },
    {
        Name: "MinStockQuantity",
        // Type: "number",
        // Caption: "TK tối thiểu",
        // DataSourceMember: "MinStockQuantity",
        // Width: 100
    },
    {
        Name: "MaxStockQuantity",
        // Type: "number",
        // Caption: "TK tối đa",
        // DataSourceMember: "MaxStockQuantity",
        // Width: 100
    },
    {
        Name: "MinOrderQuantity",
        // Type: "number",
        // Caption: "Đặt hàng tối thiểu",
        // DataSourceMember: "MinOrderQuantity",
        // Width: 100
    },
    {
        Name: "MaxOrderQuantity",
        // Type: "number",
        // Caption: "Đặt hàng tối đa",
        // DataSourceMember: "MaxOrderQuantity",
        // Width: 100
    },
    {
        Name: "MinSaleQuantity",
        // Type: "number",
        // Caption: "Bán tối thiểu",
        // DataSourceMember: "MinSaleQuantity",
        // Width: 100
    },
    {
        Name: "MaxSaleQuantity",
        // Type: "number",
        // Caption: "Bán tối đa",
        // DataSourceMember: "MaxSaleQuantity",
        // Width: 100
    },
    {
        Name: "WebMinStockQuantity",
        // Type: "number",
        // Caption: "TK tối thiểu Web",
        // DataSourceMember: "WebMinStockQuantity",
        // Width: 100
    }
];