export const APIHostName = "TMSAPI";
export const LoadAPIPath = "api/StaffTransferType/Load";
export const UpdateAPIPath = "api/StaffTransferType/Update";

export const BackLink = "/StaffTransferType";

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/StaffTransferType", Title: "Loại hình thuyên chuyển nhân viên" },
    { Link: "", Title: "Sửa" }
];

export const MLObjectDefinition = [
    {
        Name: "StaffTransferTypeID",
        DefaultValue: "",
        BindControlName: "txtStaffTransferTypeID",
        DataSourceMember: "StaffTransferTypeID"
    },
    {
        Name: "StaffTransferTypeName",
        DefaultValue: "",
        BindControlName: "txtStaffTransferTypeName",
        DataSourceMember: "StaffTransferTypeName"
    },
    {
        Name: "AddFunctionID",
        DefaultValue: "",
        BindControlName: "AddFunctionID",
        DataSourceMember: "AddFunctionID"
    },
    {
        Name: "IsAutoReview",
        DefaultValue: "",
        BindControlName: "IsAutoReview",
        DataSourceMember: "IsAutoReview"
    },
    {
        Name: "IsAutoTransfer",
        DefaultValue: "",
        BindControlName: "IsAutoTransfer",
        DataSourceMember: "IsAutoTransfer"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "txtOrderIndex",
        DataSourceMember: "OrderIndex"
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

export const EditElementList = [
    {
        type: "text",
        name: "txtStaffTransferTypeID",
        label: "mã loại hình thuyên chuyển nhân viên",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "StaffTransferTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtStaffTransferTypeName",
        label: "tên loại hình thuyên chuyển nhân viên",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "StaffTransferTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        name: "AddFunctionID",
        type: "multiselect",
        label: "Quyền thêm",
        DataSourceMember: "AddFunctionID",
        readonly: false,
        value: -1,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.FUNCTION",
        ValueMember: "FunctionID",
        NameMember: "FunctionName",
        KeyFilter: "FunctionCategoryID",
        ValueFilter: "1,2"
    },
    {
        type: "checkbox",
        name: "IsAutoReview",
        label: "Có tự động duyệt",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "IsAutoTransfer",
        label: "Có tự động thuyên chuyển",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
        value: "0",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: 1,
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
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    }
];