export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PieRequest_Product_Content/Search";
export const LoadAPIPath = "api/PieRequest_Product_Content/Load";
export const AddAPIPath = "api/PieRequest_Product_Content/Add";
export const UpdateAPIPath = "api/PieRequest_Product_Content/Update";
export const DeleteAPIPath = "api/PieRequest_Product_Content/Delete";
export const UpdateOrderAPIPath = "api/PieRequest_Product_Content/UpdateOrder";
export const BackLink = "/PieRequest_Product_Content";
export const AddLink = "/PieRequest_Product_Content/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ProductID";
export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}
];

export const PagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "", Title: "Cập nhật nội dung sản phẩm" }
];

export const EditPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/Content", Title: "Cập nhật nội dung sản phẩm" }
];

export const AddPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/Content", Title: "Thêm nội dung sản phẩm" }

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
        Name: "LstPieRequest_Product_Content",
        DefaultValue: {},
        BindControlName: "LstPieRequest_Product_Content",
        DataSourceMember: "LstPieRequest_Product_Content"
    }
]

export const GridMLObjectContentDefinition = [
    {
        Name: "ProductContentID",
        DefaultValue: "",
        BindControlName: "ProductContentID",
        DataSourceMember: "ProductContentID"
    },
    {
        Name: "ContentTypeID",
        DefaultValue: "",
        BindControlName: "cbContentTypeID",
        DataSourceMember: "ContentTypeID"
    },
    {
        Name: "LanguageID",
        DefaultValue: "",
        BindControlName: "cbLanguageID",
        DataSourceMember: "LanguageID"
    },
    {
        Name: "ContentDescription",
        DefaultValue: "",
        BindControlName: "txtContentDescription",
        DataSourceMember: "ContentDescription"
    }
];
export const InputProductContentColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "ProductContentID",
        Width: 100
    },
    {
        Name: "txtContentTypeName",
        Type: "text",
        Caption: " Loại nội dung",
        DataSourceMember: "ContentTypeName",
        Width: 250
    },
    {
        Name: "txtLanguageName",
        Type: "text",
        Caption: "Ngôn ngữ",
        DataSourceMember: "LanguageName",
        Width: 250
    },
    {
        Name: "txtContentDescription",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "ContentDescription",
        Width: 250
    },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "ProductContentID",
        Width: 100,
        Link: "",
        LinkText: "Chỉnh sửa"
    }
];