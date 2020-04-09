export const APIHostName = "PIMAPI";
export const SearchByPieRequestListIDAPIPath = "api/PieRequest_Product_Attr/SearchByPieRequestListID";
export const SearchAPIPathAttr = "api/Attribute/Search";
export const LoadAPIPath = "api/PieRequest_Product_Attr/Load";
export const AddAPIPath = "api/PieRequest_Product_Attr/Add";
export const UpdateAPIPath = "api/PieRequest_Product_Attr/Update";
export const DeleteAPIPath = "api/PieRequest_Product_Attr/Delete";
export const UpdateOrderAPIPath = "api/PieRequest_Product_Attr/UpdateOrder";

export const BackLink = "/PieRequestProduct/Add/Attribute";
export const AddLink = "/PieRequest_Product_Attr/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AttributeValueID";
export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}];

export const InitSearchParamsAttr = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}];

export const PagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "", Title: "Cập nhật thuộc tính sản phẩm" }
];

export const EditPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/Attribute", Title: "Cập nhật thuộc tính sản phẩm" }
];

export const AddPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/Attribute", Title: "Thêm thuộc tính sản phẩm" }
]



export const InputProductAttrColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "AttributeID",
        Width: 50
    },
    {
        Name: "AttributeID",
        Type: "text",
        Caption: "Mã thuộc tính",
        DataSourceMember: "AttributeID",
        Width: 150
    },
    {
        Name: "AttributeName",
        Type: "text",
        Caption: "Tên thuộc tính",
        DataSourceMember: "AttributeName",
        Width: 200
    },
    {
        Name: "AttributeValue",
        Type: "text",
        Caption: "Giá trị",
        DataSourceMember: "AttributeValue",
        Width: 200
    },
    {
        Name: "AttributeCategoryName",
        Type: "text",
        Caption: "Danh mục thuộc tính",
        DataSourceMember: "AttributeCategoryName",
        Width: 200
    },
    {
        Name: "IsVariantAttribute",
        Type: "checkicon",
        Caption: "Là thuộc tính variant",
        DataSourceMember: "IsVariantAttribute",
        Width: 150
    },
    {
        Name: "Action",
        Type: "edit",
        Caption: "Tác vụ",
        DataSourceMember: "AttributeValueID",
        Width: 100,
        Link: "",
        LinkText: "Chỉnh sửa"
    }
];


export const GridMLObjectProductAttrDefinition = [
    {
        Name: "AttributeID",
        DefaultValue: "",
        BindControlName: "txtAttributeID",
        DataSourceMember: "AttributeID"
    },
    {
        Name: "AttributeName",
        DefaultValue: "",
        BindControlName: "txtAttributeName",
        DataSourceMember: "AttributeName"
    },
    {
        Name: "AttributeValueName",
        DefaultValue: true,
        BindControlName: "txtAttributeValueName",
        DataSourceMember: "AttributeValueName"
    },
    {
        Name: "AttributeCategoryName",
        DefaultValue: "",
        BindControlName: "txtAttributeCategoryName",
        DataSourceMember: "AttributeCategoryName"
    },
    {
        Name: "`IsVariantAttribute`",
        DefaultValue: "",
        BindControlName: "txtIsVariantAttribute",
        DataSourceMember: "IsVariantAttribute"
    }
];

export const MLObjectDefinition = [
    {
        Name: "AttributeID",
        DefaultValue: "",
        BindControlName: "txtAttributeID",
        DataSourceMember: "AttributeID"
    },
    {
        Name: "AttributeName",
        DefaultValue: "",
        BindControlName: "txtAttributeName",
        DataSourceMember: "AttributeName"
    },
    {
        Name: "AttributeValueName",
        DefaultValue: "",
        BindControlName: "txtAttributeValueName",
        DataSourceMember: "AttributeValueName"
    },
    {
        Name: "AttributeCategoryName",
        DefaultValue: "",
        BindControlName: "txtAttributeCategoryName",
        DataSourceMember: "AttributeCategoryName"
    },
    {
        Name: "IsVariantAttribute",
        DefaultValue: false,
        BindControlName: "chkIsVariantAttribute",
        DataSourceMember: "IsVariantAttribute"
    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtAttributeID",
        label: "Mã loại bảng mã sản phẩm của đối tác:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeID",
        readonly: false,
        validatonList: []

    },
    {
        type: "text",
        name: "txtAttributeName",
        label: "Tên loại bảng mã sản phẩm của đối tác:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeName",
        readonly: false,
        validatonList: []

    },
    {
        type: "text",
        name: "txtAttributeValueName",
        label: "Mô tả:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeValueName",
        readonly: false,
        validatonList: []


    },
    {
        type: "text",
        name: "txtAttributeCategoryName",
        label: "Kích hoạt:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeCategoryName",
        readonly: false,
        validatonList: []

    },
    {
        type: "checkbox",
        name: "chkIsVariantAttribute",
        label: "Hệ thống:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []

    }
];