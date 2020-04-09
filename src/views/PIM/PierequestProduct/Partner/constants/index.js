export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PieRequest_Product_Partner/Search";
export const SearchAPIPathPartner = "api/Partner/Search";

export const LoadAPIPath = "api/PieRequest_Product_Partner/Load";
export const AddAPIPath = "api/PieRequest_Product_Partner/Add";
export const UpdateAPIPath = "api/PieRequest_Product_Partner/Update";
export const DeleteAPIPath = "api/PieRequest_Product_Partner/Delete";
export const UpdateOrderAPIPath = "api/PieRequest_Product_Partner/UpdateOrder";

export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "CustomerID";
export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}];

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/PieRequest", Title: "Yêu cầu chỉnh sửa thông tin sản phẩm" },
    { Link: "", Title: "Chỉnh sửa Đối tác của sản phẩm" }
];

export const GridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "CustomerID,PartnerProductMapTypeID,PartnerProductCode",
        Width: 150
    },
    {
        Name: "CustomerName",
        Type: "text",
        Caption: "Đối tác",
        DataSourceMember: "CustomerName",
        Width: 150
    },
    {
        Name: "PartnerProductMapTypeID",
        Type: "text",
        Caption: "Loại sản phẩm của đối tác",
        DataSourceMember: "PartnerProductMapTypeName",
        Width: 200
    },
    {
        Name: "PartnerProductCode",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "PartnerProductCode",
        Width: 200
    },
    {
        Name: "PartnerProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "PartnerProductName",
        Width: 200
    },
    {
        Name: "PartnerQuantityUnitName",
        Type: "text",
        Caption: "Đơn vị tính",
        DataSourceMember: "PartnerQuantityUnitName",
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
        Name: "IsSystem",
        Type: "checkicon",
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Width: 150
    },
    {
        Name: "Action",
        Type: "buttonEdit",
        Caption: "Tác vụ",
        DataSourceMember: "CustomerID,PartnerProductMapTypeID,PartnerProductCode",
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
        Name: "CustomerID",
        DefaultValue: "",
        BindControlName: "CustomerID",
        DataSourceMember: "CustomerID"
    },
    {
        Name: "CustomerName",
        DefaultValue: "",
        BindControlName: "CustomerName",
        DataSourceMember: "CustomerName"
    },
    {
        Name: "PartnerProductMapTypeID",
        DefaultValue: "",
        BindControlName: "PartnerProductMapTypeID",
        DataSourceMember: "PartnerProductMapTypeID"
    },
    {
        Name: "PartnerProductMapTypeName",
        DefaultValue: "",
        BindControlName: "PartnerProductMapTypeName",
        DataSourceMember: "PartnerProductMapTypeName"
    },
    {
        Name: "PartnerProductCode",
        DefaultValue: "",
        BindControlName: "PartnerProductCode",
        DataSourceMember: "PartnerProductCode"
    },
    {
        Name: "PartnerProductName",
        DefaultValue: "",
        BindControlName: "PartnerProductName",
        DataSourceMember: "PartnerProductName"
    },
    {
        Name: "PartnerQuantityUnitName",
        DefaultValue: "",
        BindControlName: "PartnerQuantityUnitName",
        DataSourceMember: "PartnerQuantityUnitName"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
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
        Name: "CustomerID",
        DefaultValue: "",
        BindControlName: "CustomerID",
        DataSourceMember: "CustomerID"
    },
    {
        Name: "PartnerProductMapTypeID",
        DefaultValue: "",
        BindControlName: "PartnerProductMapTypeID",
        DataSourceMember: "PartnerProductMapTypeID"
    },
    {
        Name: "PartnerProductCode",
        DefaultValue: "",
        BindControlName: "PartnerProductCode",
        DataSourceMember: "PartnerProductCode"
    },
    {
        Name: "PartnerProductName",
        DefaultValue: "",
        BindControlName: "PartnerProductName",
        DataSourceMember: "PartnerProductName"
    },
    {
        Name: "PartnerQuantityUnitName",
        DefaultValue: "",
        BindControlName: "PartnerQuantityUnitName",
        DataSourceMember: "PartnerQuantityUnitName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    }
];

export const AddModalColumnList = [
    {
        Name: "CustomerID",
        type: "select",
        label: "Mã Đối tác",
        placeholder: "Chọn đối tác",
        DataSourceMember: "CustomerID",
        readonly: false,
        value: "",
        validatonList: ["required"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CUSTOMER",
        ValueMember: "CustomerID",
        NameMember: "CustomerName"
    },
    {
        Name: "PartnerProductMapTypeID",
        type: "select",
        label: "Loại sản phẩm của đối tác",
        DataSourceMember: "PartnerProductMapTypeID",
        readonly: false,
        value: "",
        validatonList: ["required"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIM_PARTNERPRODUCTMAPTYPE",
        ValueMember: "PartnerProductMapTypeID",
        NameMember: "PartnerProductMapTypeName"
    },
    {
        Name: "PartnerProductCode",
        type: "text",
        label: "Mã sản phẩm",
        DataSourceMember: "PartnerProductCode",
        readonly: false,
        value: "",
        validatonList: ["required"]
    },
    {
        Name: "PartnerProductName",
        type: "text",
        label: "Tên sản phẩm",
        DataSourceMember: "PartnerProductName",
        readonly: false,
        value: "",
        validatonList: []
    },
    {
        Name: "PartnerQuantityUnitName",
        type: "text",
        label: "Đơn vị tính",
        DataSourceMember: "PartnerQuantityUnitName",
        readonly: false,
        value: "",
        validatonList: []
    },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        rows: "6",
        DataSourceMember: "Description",
        readonly: false,
        value: "",
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        value: "true",
        validatonList: []
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: []
    }
];

export const ModifyModalColumnList = [
    {
        Name: "CustomerID",
        type: "select",
        label: "Mã Đối tác",
        placeholder: "Chọn nhà cung cấp",
        DataSourceMember: "CustomerID",
        readonly: true,
        disabled: true,
        value: "",
        validatonList: ["required"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.CUSTOMER",
        ValueMember: "CustomerID",
        NameMember: "CustomerName"
    },
    {
        Name: "PartnerProductMapTypeID",
        type: "select",
        label: "Loại sản phẩm của đối tác",
        DataSourceMember: "PartnerProductMapTypeID",
        readonly: true,
        disabled: true,
        value: "",
        validatonList: ["required"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIM_PARTNERPRODUCTMAPTYPE",
        ValueMember: "PartnerProductMapTypeID",
        NameMember: "PartnerProductMapTypeName"
    },
    {
        Name: "PartnerProductCode",
        type: "text",
        label: "Mã sản phẩm",
        DataSourceMember: "PartnerProductCode",
        readonly: true,
        // disabled: true,
        value: "",
        validatonList: ["required"]
    },
    {
        Name: "PartnerProductName",
        type: "text",
        label: "Tên sản phẩm",
        DataSourceMember: "PartnerProductName",
        readonly: false,
        value: "",
        validatonList: []
    },
    {
        Name: "PartnerQuantityUnitName",
        type: "text",
        label: "Đơn vị tính",
        DataSourceMember: "PartnerQuantityUnitName",
        readonly: false,
        value: "",
        validatonList: []
    },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        DataSourceMember: "Description",
        readonly: false,
        value: "",
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        value: "true",
        validatonList: []
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        value: "false",
        validatonList: []
    }
];