export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PieRequest_Product_Album/Search";
export const LoadAPIPath = "api/PieRequest_Product_Album/Load";
export const AddAPIPath = "api/PieRequest_Product_Album/Add";
export const UpdateAPIPath = "api/PieRequest_Product_Album/Update";
export const DeleteAPIPath = "api/PieRequest_Product_Album/Delete";
export const UpdateOrderAPIPath = "api/PieRequest_Product_Album/UpdateOrder";
export const BackLink = "/PieRequest_Product_Album";
export const AddLink = "/PieRequest_Product_Album/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ProductID";
export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}
];

export const PagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "", Title: "Cập nhật Album sản phẩm" }
];

export const EditPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/Album", Title: "Cập nhật Album sản phẩm" }
];

export const AddPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/Album", Title: "Thêm Album sản phẩm" }

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
        Name: "LstPieRequest_Product_Album",
        DefaultValue: {},
        BindControlName: "LstPieRequest_Product_Album",
        DataSourceMember: "LstPieRequest_Product_Album"
    }
]
export const GridMLObjectAlbumDefinition = [
    {
        Name: "AlbumID",
        DefaultValue: "",
        BindControlName: "txtAlbumID",
        DataSourceMember: "AlbumID"
    },
    {
        Name: "AlbumName",
        DefaultValue: "",
        BindControlName: "txtAlbumName",
        DataSourceMember: "AlbumName"
    },
    {
        Name: "icOnFileURL",
        DefaultValue: "",
        BindControlName: "txticOnFileURL",
        DataSourceMember: "icOnFileURL"
    },
    {
        Name: "IsDefault",
        DefaultValue: "",
        BindControlName: "chkIsDefault",
        DataSourceMember: "IsDefault"
    }
];
export const InputProductAlbumColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "AlbumID",
        Width: 100
    },
    {
        Name: "txtAlbumID",
        Type: "text",
        Caption: "Mã album",
        DataSourceMember: "AlbumID",
        Width: 250
    },
    {
        Name: "txtAlbumName",
        Type: "text",
        Caption: "Tên album",
        DataSourceMember: "AlbumName",
        Width: 250
    },
    {
        Name: "txticOnFileURL",
        Type: "text",
        Caption: "Đường dẫn hình ảnh",
        DataSourceMember: "icOnFileURL",
        Width: 300
    },
    {
        Name: "chkIsDefault",
        Type: "checkicon",
        Caption: "Mặc định",
        DataSourceMember: "IsDefault",
        Width: 70
    },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "AlbumID",
        Width: 100,
        Link: "",
        LinkText: "Chỉnh sửa"
    }
];