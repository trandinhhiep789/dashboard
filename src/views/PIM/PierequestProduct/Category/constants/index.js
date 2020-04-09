export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PieRequest_Product_Cat/Search";
export const LoadAPIPath = "api/PieRequest_Product_Cat/Load";
export const AddAPIPath = "api/PieRequest_Product_Cat/Add";
export const UpdateAPIPath = "api/PieRequest_Product_Cat/Update";
export const DeleteAPIPath = "api/PieRequest_Product_Cat/Delete";
export const BackLink = "home/PierequestProduct/Add";
export const AddLink = "/PieRequestProduct/Add/Category";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "CategoryID";
export const LIST_CATEGORY_CACHE = "PIMCACHE.CATEGORY";

export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}
];
export const PagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/Category", Title: "Cập nhật danh mục sản phẩm" }
];

export const EditPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/Category", Title: "Cập nhật danh mục sản phẩm" }

];

export const AddPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/Category", Title: "Thêm danh mục sản phẩm" }
];

export const AddElementList = [
];

export const MLObjectDefinition = [
    {
        Name: "LstCategory_member",
        DefaultValue: {},
        BindControlName: "LstCategory_member",
        DataSourceMember: "LstCategory_member"
    }
]

export const GridMLObjectCategoryTypeDefinition = [
    {
        Name: "CategoryTypeNameID",
        DefaultValue: "",
        BindControlName: "txtCategoryTypeNameID",
        DataSourceMember: "CategoryTypeNameID"
    },
    {
        Name: "CategoryTypeNameID",
        DefaultValue: "",
        BindControlName: "cbCategoryID",
        DataSourceMember: "CategoryTypeNameID"
    }
];

export const InputCategoryTypeColumnList = [
    {
        Name: "txtCategoryTypeNameID",
        Type: "text",
        Caption: "Loại danh mục",
        DataSourceMember: "CategoryTypeName",
        Width: 250
    },
    {
        Name: "cbCategoryID",
        Type: "combobox",
        Caption: "Danh mục",
        DataSourceMember: "CategoryID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CATEGORY",
        ValueMember: "CategoryID",
        NameMember: "CategoryName",
        Width: 450
    }
];