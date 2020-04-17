export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PieRequest_Product_Images/Search";
export const LoadAPIPath = "api/PieRequest_Product_Images/Load";
export const GetAlbumAPI = "api/PieRequest_Product_Images/LoadAlbum";
export const AddAPIPath = "api/PieRequest_Product_Images/Add";
export const UpdateAPIPath = "api/PieRequest_Product_Images/Update";
export const DeleteAPIPath = "api/PieRequest_Product_Images/Delete";


export const BackLink = "/PartnerProductMapType";
export const AddLink = "/PartnerProductMapType/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ImagesID";
export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}
];

export const PagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "", Title: "Cập nhật hình ảnh sản phẩm" }
];

export const EditPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật hình ảnh sản phẩm" },
{ Link: "/PieRequestProduct/Image", Title: "Yêu cầu cập nhật hình ảnh sản phẩm" }
];

export const AddPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật hình ảnh sản phẩm" },
{ Link: "/PieRequestProduct/Image", Title: "Yêu cầu cập nhật hình ảnh sản phẩm" }
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
        label: "Mã loại bảng mã sản phẩm của đối tác",
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
        label: "Tên loại bảng mã sản phẩm của đối tác",
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
        label: "Mô tả",
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
        label: "Kích hoạt",
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
        label: "Hệ thống",
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

export const GridMLObjectProductImageDefinition = [
    {
        Name: "AlbumID",
        DefaultValue: "",
        BindControlName: "AlbumID",
        DataSourceMember: "AlbumID"
    },
    {
        Name: "ImageName",
        DefaultValue: "",
        BindControlName: "ImageName",
        DataSourceMember: "ImageName"
    },
    {
        Name: "ProductImageTypeID",
        DefaultValue: "",
        BindControlName: "ProductImageTypeID",
        DataSourceMember: "ProductImageTypeID"
    },
    {
        Name: "ImageFileURL",
        DefaultValue: "",
        BindControlName: "ImageFileURL",
        DataSourceMember: "ImageFileURL"
    },
    {
        Name: "IsDefault",
        DefaultValue: "",
        BindControlName: "IsDefault",
        DataSourceMember: "IsDefault"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    }
];

export const GridProductImageColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "ImagesID",
        Width: 50
    },
    {
        Name: "AlbumID",
        Type: "text",
        Caption: "Album",
        DataSourceMember: "AlbumID",
        Width: 100
    },
    {
        Name: "ImageName",
        Type: "text",
        Caption: "Tên hình ảnh",
        DataSourceMember: "ImageName",
        Width: 120
    },
    {
        Name: "ProductImageTypeID",
        Type: "text",
        Caption: "Loại hình ảnh",
        DataSourceMember: "ProductImageTypeID",
        Width: 150
    },
    {
        Name: "ImageFileURL",
        Type: "text",
        Caption: "Đường dẫn",
        DataSourceMember: "ImageFileURL",
        Width: 150
    },
    {
        Name: "IsDefault",
        Type: "checkicon",
        Caption: "Mặc định",
        DataSourceMember: "IsDefault",
        Width: 100
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100
    },
    {
        Name: "Action",
        Type: "edit",
        Caption: "Tác vụ",
        DataSourceMember: "ImagesID",
        Width: 100,
        Link: "",
        LinkText: "Chỉnh sửa"
    }
];