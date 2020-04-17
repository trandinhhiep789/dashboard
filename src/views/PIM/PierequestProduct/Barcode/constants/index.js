export const APIHostName = "PIMAPI";
export const SearchByPieRequestListIdAPIPath = "api/PieRequest_Product_BarCode/SearchByPieRequestListID";
export const LoadAPIPath = "api/PieRequest_Product_BarCode/Load";
export const AddAPIPath = "api/PieRequest_Product_BarCode/Add";
export const UpdateAPIPath = "api/PieRequest_Product_BarCode/Update";
export const DeleteAPIPath = "api/PieRequest_Product_BarCode/Delete";
export const UpdateOrderAPIPath = "api/PieRequest_Product_BarCode/UpdateOrder";

export const BackLink = "/PartnerProductMapType";
export const AddLink = "/PartnerProductMapType/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "BarCode";
export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}
];
export const PagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "", Title: "Cập nhật barcode sản phẩm" }
];

export const EditPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩm" },
{ Link: "/PieRequestProduct/Barcode", Title: "Cập nhật barcode sản phẩm" }
];

export const AddPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu cập nhật thông tin sản phẩmc" },
{ Link: "/PieRequestProduct/Barcode", Title: "Thêm barcode sản phẩm" }

]

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}

    }
];
export const InitPieRequestProductBarCode = {
    BarCode: "",
    BarCodeDescription: "",
    IsActived: true,
    IsSystem: false,
    PieRequestListID: "",
    LoginLogID: "",
    RequestDate: "",
    UpDatedUser: "",
    IsOldValue: ""
};

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

    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtPartnerProductMapTypeID",
        label: "Mã loại bảng mã sản phẩm của đối tác",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: true,
        DataSourceMember: "PartnerProductMapTypeID",
        validatonList: []

    },
    {
        type: "text",
        name: "txtPartnerProductMapTypeName",
        label: "Tên loại bảng mã sản phẩm của đối tác",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "PartnerProductMapTypeName",
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
        readonly: false,
        DataSourceMember: "Description",
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
        DataSourceMember: "IsActived",
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
        DataSourceMember: "IsSystem",
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

export const GridMLObjectProductBarCodeDefinition = [
    {
        Name: "PieRequestListId",
        DefaultValue: "",
        BindControlName: "txtPieRequestListId",
        DataSourceMember: "PieRequestListId"
    },
    {
        Name: "IsOldValue",
        DefaultValue: "",
        BindControlName: "txtIsOldValue",
        DataSourceMember: "IsOldValue"
    },
    {
        Name: "BarCode",
        DefaultValue: "",
        BindControlName: "txtBarCode",
        DataSourceMember: "BarCode"
    },
    {
        Name: "RequestDate",
        DefaultValue: "",
        BindControlName: "txtRequestDate",
        DataSourceMember: "RequestDate"
    },
    {
        Name: "BarCodeDescription",
        DefaultValue: "",
        BindControlName: "txtBarCodeDescription",
        DataSourceMember: "BarCodeDescription"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    }


];

export const InputProductBarCodeColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "BarCode",
        Width: 70
    },
    {
        Name: "BarCode",
        Type: "text",
        Caption: "Barcode",
        DataSourceMember: "BarCode",
        Width: 200
    },
    {
        Name: "BarCodeDescription",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "BarCodeDescription",
        Width: 600
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 60
    },
    {
        Name: "Action",
        Type: "edit",
        Caption: "Tác vụ",
        DataSourceMember: "BarCode",
        Width: 70,
        Link: "",
        LinkText: "Chỉnh sửa"
    }
];