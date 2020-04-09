export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PieRequest_Product_Article/Search";
export const LoadAPIPath = "api/PieRequest_Product_Article/Load";
export const AddAPIPath = "api/PieRequest_Product_Article/Add";
export const UpdateAPIPath = "api/PieRequest_Product_Article/Update";
export const DeleteAPIPath = "api/PieRequest_Product_Article/Delete";
export const UpdateOrderAPIPath = "api/PieRequest_Product_Article/UpdateOrder";
export const BackLink = "/PieRequest_Product_Article";
export const AddLink = "/PieRequest_Product_Article/Add";
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
{ Link: "/PieRequestProduct/Article", Title: "Cập nhật bài viết sản phẩm" }
];

export const AddPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/Article", Title: "Thêm bài viết sản phẩm" }

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
        Name: "VAT",
        DefaultValue: "0",
        BindControlName: "cboVAT",
        DataSourceMember: "VAT"
    },
    {
        Name: "POVAT",
        DefaultValue: "0",
        BindControlName: "cboPOVAT",
        DataSourceMember: "POVAT"
    },

    {
        Name: "IsNoVAT",
        DefaultValue: true,
        BindControlName: "chkIsNoVAT",
        DataSourceMember: "IsNoVAT"
    },
    {
        Name: "IsNoPOVAT",
        DefaultValue: false,
        BindControlName: "chkIsNoPOVAT",
        DataSourceMember: "IsNoPOVAT"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUser"
    }
];

export const GridMLObjectArticleDefinition = [
    {
        Name: "ArticleID",
        DefaultValue: "",
        BindControlName: "txtArticleID",
        DataSourceMember: "ArticleID"
    },
    {
        Name: "Title",
        DefaultValue: "",
        BindControlName: "txtTitle",
        DataSourceMember: "Title"
    },
    {
        Name: "Content",
        DefaultValue: "",
        BindControlName: "txtContent",
        DataSourceMember: "Content"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    }
];
export const InputProductArticleColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "ArticleID",
        Width: 50
    },
    {
        Name: "txtArticleID",
        Type: "text",
        Caption: "Mã bài viết",
        DataSourceMember: "ArticleID",
        Width: 200
    },
    {
        Name: "txtTitle",
        Type: "text",
        Caption: "Tiêu đề",
        DataSourceMember: "Title",
        Width: 600
    },
    {
        Name: "chkIsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 70
    },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "ArticleID",
        Width: 80,
        Link: "",
        LinkText: "Chỉnh sửa"
    }
];