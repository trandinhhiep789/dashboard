export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PieRequest_Product_Video/Search";
export const SearchAPIPathVideo = "api/Video/Search";

export const LoadAPIPath = "api/PieRequest_Product_Video/Load";
export const AddAPIPath = "api/PieRequest_Product_Video/Add";
export const UpdateAPIPath = "api/PieRequest_Product_Video/Update";
export const DeleteAPIPath = "api/PieRequest_Product_Video/Delete";
export const UpdateOrderAPIPath = "api/PieRequest_Product_Video/UpdateOrder";

export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "VideoID";
export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}];

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/PieRequest", Title: "Yêu cầu chỉnh sửa thông tin sản phẩm" },
    { Link: "", Title: "Chỉnh sửa video về sản phẩm" }
];

export const GridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "VideoID",
        Width: 150
    },
    {
        Name: "VideoName",
        Type: "text",
        Caption: "Tên Video",
        DataSourceMember: "VideoName",
        Width: 150
    },
    {
        Name: "VideoFileUrl",
        Type: "video",
        Caption: "Đường dẫn video",
        DataSourceMember: "VideoFileUrl",
        Width: 200,
        filePath: "FilePathVideo"
    },
    {
        Name: "ImageVideoFileUrl",
        Type: "image",
        Caption: "Ảnh đại diện video",
        DataSourceMember: "ImageVideoFileUrl",
        Width: 200,
        filePath: "FilePathImageVideo"
    },
    {
        Name: "IsDefault",
        Type: "checkicon",
        Caption: "Mặc định",
        DataSourceMember: "IsDefault",
        Width: 150
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 150
    },
    {
        Name: "Action",
        Type: "buttonEdit",
        Caption: "Tác vụ",
        DataSourceMember: "VideoValueID",
        Width: 100,
        Link: "",
        LinkText: "Chỉnh sửa"
    }
];

export const GridMLObjectDefinition = [
    {
        Name: "PieRequestListID",
        DefaultValue: "",
        BindControlName: "PieRequestListID",
        DataSourceMember: "PieRequestListID"
    },
    {
        Name: "VideoID",
        DefaultValue: "",
        BindControlName: "VideoID",
        DataSourceMember: "VideoID"
    },
    {
        Name: "VideoName",
        DefaultValue: "",
        BindControlName: "VideoName",
        DataSourceMember: "VideoName"
    },
    {
        Name: "VideoFileUrl",
        DefaultValue: "",
        BindControlName: "VideoFileUrl",
        DataSourceMember: "VideoFileUrl"
    },
    {
        Name: "ImageVideoFileUrl",
        DefaultValue: "",
        BindControlName: "ImageVideoFileUrl",
        DataSourceMember: "ImageVideoFileUrl"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
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

export const ModalMLObjectDefinition = [
    {
        Name: "PieRequestListID",
        DefaultValue: "",
        BindControlName: "PieRequestListID",
        DataSourceMember: "PieRequestListID"
    },
    {
        Name: "VideoID",
        DefaultValue: "",
        BindControlName: "VideoID",
        DataSourceMember: "VideoID"
    },
    {
        Name: "VideoName",
        DefaultValue: "",
        BindControlName: "VideoName",
        DataSourceMember: "VideoName"
    },
    {
        Name: "VideoFileUrl",
        DefaultValue: "",
        BindControlName: "VideoFileUrl",
        DataSourceMember: "VideoFileUrl"
    },
    {
        Name: "ImageVideoFileUrl",
        DefaultValue: "",
        BindControlName: "ImageVideoFileUrl",
        DataSourceMember: "ImageVideoFileUrl"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "RequestDate",
        DefaultValue: "",
        BindControlName: "RequestDate",
        DataSourceMember: "RequestDate"
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

export const AddModalColumnList = [
    {
        Name: "VideoName",
        type: "text",
        label: "Tên Video",
        NameMember: "VideoName",
        readonly: false,
        value: "",
        validatonList: ["required"]
    },
    {
        Name: "VideoFileUrl",
        type: "browser",
        label: "Đường dẫn video",
        NameMember: "VideoFileUrl",
        readonly: false,
        value: "",
        AcceptType: "video/*",
        validatonList: []
    },
    {
        Name: "ImageVideoFileUrl",
        type: "browser",
        label: "Ảnh đại diện video",
        NameMember: "ImageVideoFileUrl",
        readonly: false,
        value: "",
        AcceptType: "image/*",
        validatonList: []
    },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        rows: "6",
        NameMember: "Description",
        readonly: false,
        value: "",
        validatonList: []
    },
    {
        Name: "IsDefault",
        type: "checkbox",
        label: "Mặc định",
        NameMember: "IsDefault",
        readonly: false,
        value: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        NameMember: "IsActived",
        readonly: false,
        value: "true",
        validatonList: []
    }
];

export const ModifyModalColumnList = [
    {
        Name: "VideoID",
        type: "text",
        label: "Mã Video",
        NameMember: "VideoID",
        readonly: true,
        disabled: true,
        value: "",
        validatonList: ["required"]
    },
    {
        Name: "VideoName",
        type: "text",
        label: "Tên Video",
        NameMember: "VideoName",
        readonly: false,
        value: "",
        validatonList: ["required"]
    },
    {
        Name: "VideoFileUrl",
        type: "browser",
        label: "Đường dẫn file",
        NameMember: "VideoFileUrl",
        readonly: false,
        value: "",
        acceptType: "video/*",
        validatonList: []
    },
    {
        Name: "ImageVideoFileUrl",
        type: "browser",
        label: "Đường dẫn hình ảnh đại diện",
        NameMember: "ImageVideoFileUrl",
        readonly: false,
        value: "",
        AcceptType: "image/*",
        validatonList: []
    },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        NameMember: "Description",
        readonly: false,
        value: "",
        validatonList: []
    },
    {
        Name: "IsDefault",
        type: "checkbox",
        label: "Mặc định",
        NameMember: "IsDefault",
        readonly: false,
        value: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        NameMember: "IsActived",
        readonly: false,
        value: "true",
        validatonList: []
    }
];