export const LIST_COMPANY_CACHE = "PIMCACHE.MD_COMPANY";
export const LIST_STATUS_PRODUCT_CACHE = "PIMCACHE.PIM_PRODUCTSTATUS";
export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PieRequest_Product_Status/Search";
export const LoadAPIPath = "api/PieRequest_Product_Status/Load";
export const AddAPIPath = "api/PieRequest_Product_Status/Add";
export const UpdateAPIPath = "api/PieRequest_Product_Status/Update";
export const DeleteAPIPath = "api/PieRequest_Product_Status/Delete";
export const UpdateOrderAPIPath = "api/PieRequest_Product_Status/UpdateOrder";
export const BackLink = "/PieRequestProduct/Add/Status";
export const AddLink = "/PieRequestProduct/Add/Status";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PieRequestListID";



export const PagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "", Title: "Cập nhật trạng thái sản phẩm" }
];

export const EditPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/Status", Title: "Cập nhật trạng thái sản phẩm" }
];

export const AddPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/Status", Title: "Cập nhật trạng thái sản phẩm" }
];

export const MLObjectDefinition = [
    {
        Name: "PieRequestListID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "PieRequestListID"
    },
    {
        Name: "IsOldValue",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "IsOldValue"
    },
    {
        Name: "RequestDate",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "RequestDate"
    },
    {
        Name: "CompanyID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "CompanyID"
    },
    {
        Name: "ProductStatusID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "ProductStatusID"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "CreatedUser"
    },
    {
        Name: "UpdatedUser",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "UpdatedUser"
    },
    {
        Name: "LoginLogID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: ""
    },
];

export const InputProductStatusColumnList = [
    // {
    //     Name: "txtCompanyID",
    //     Type: "text",
    //     Caption: "Mã công ty",
    //     DataSourceMember: "CompanyID",
    //     Width: 100
    // },
    {
        Name: "txtCompanyName",
        Type: "text",
        Caption: "công ty",
        DataSourceMember: "CompanyName",
        Width: 350
    },
    {
        Name: "cbProductStatusID",
        Type: "combobox",
        Caption: "Trang thái sản phẩm",
        DataSourceMember: "ProductStatusID",
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIM_PRODUCTSTATUS",
        ValueMember: "ProductStatusID",
        NameMember: "ProductStatusName",
        Width: 450
    }
];

