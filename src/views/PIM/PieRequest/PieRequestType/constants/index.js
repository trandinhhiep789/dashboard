export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PieRequestType/Search";
export const LoadAPIPath = "api/PieRequestType/Load";
export const AddAPIPath = "api/PieRequestType/Add";
export const UpdateAPIPath = "api/PieRequestType/Update";
export const DeleteAPIPath = "api/PieRequestType/Delete";
export const BackLink = "/PieRequestType";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PieRequestTypeID";

export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}];

export const PagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequestType", Title: "Loại yêu cầu chỉnh sửa thông tin sản phẩm" }
];

export const EditPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/PieRequestType", Title: "Loại yêu cầu chỉnh sửa thông tin sản phẩm" },
{ Link: "", Title: "Chỉnh sửa Loại yêu cầu chỉnh sửa thông tin sản phẩm" }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa ",
        value: "",
        placeholder: "",
        icon: "",
        listoption: []
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const AddModalColumnList = [
    {
        Name: "PieRequestTypeID",
        type: "text",
        label: "Mã loại yêu cầu",
        maxSize: "10",
        DataSourceMember: "PieRequestTypeID",
        readonly: false,
        validatonList: ["required"]
    },
    {
        Name: "PieRequestTypeName",
        type: "text",
        label: "Tên loại yêu cầu",
        maxSize: "200",
        DataSourceMember: "PieRequestTypeName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        Name: "PieTypeID",
        type: "select",
        label: "Mã loại yêu cầu",
        DataSourceMember: "PieTypeID",
        readonly: false,
        validatonList: ["required"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIETYPE",
        ValueMember: "PieTypeID",
        NameMember: "PieTypeName",
    },
    {
        Name: "AddFunctionID",
        type: "text",
        label: "Quyền thêm yêu cầu này",
        maxSize: "400",
        DataSourceMember: "AddFunctionID",
        readonly: false,
        validatonList: []
    },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        maxSize: "2000",
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        Name: "OrderIndex",
        label: "Thứ tự hiển thị:",
        value: 0,
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"],
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: "true"
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

export const MTabList = [
    {
        Name: "PieRequestType",
        DefaultValue: "",
        BindControlName: "PieRequestType",
        DataSourceMember: "PieRequestType"
    },
    {
        Name: "PieRequestTypeWorkflow",
        DefaultValue: "",
        BindControlName: "PieRequestTypeWorkflow",
        DataSourceMember: "PieRequestTypeWorkflow"
    }
];

export const MLObjectDefinition = [
    {
        Name: "PieRequestTypeID",
        DefaultValue: "",
        Label: "Mã loại yêu cầu chỉnh sửa",
        BindControlName: "PieRequestTypeID",
        DataSourceMember: "PieRequestTypeID"
    },
    {
        Name: "PieRequestTypeName",
        DefaultValue: "",
        Label: "Tên loại yêu cầu chỉnh sửa",
        BindControlName: "PieRequestTypeName",
        DataSourceMember: "PieRequestTypeName",
        ValidationList: ["required"]
    },
    {
        Name: "PieTypeID",
        DefaultValue: "",
        Label: "Mã loại chỉnh sửa",
        BindControlName: "PieTypeID",
        DataSourceMember: "PieTypeID",
        ValidationList: ["Comborequired"]
    },
    {
        Name: "AddFunctionID",
        DefaultValue: "",
        Label: "Quyền thêm yêu cầu này",
        BindControlName: "AddFunctionID",
        DataSourceMember: "AddFunctionID"
    },
    {
        Name: "PieTypeName",
        DefaultValue: "",
        BindControlName: "PieTypeName",
        DataSourceMember: "PieTypeName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        Label: "Mô tả",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "0",
        Label: "Thứ tự hiển thị",
        BindControlName: "OrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        Label: "kích hoạt",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        Label: "Hệ thống",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "CreatedUser"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PieRequestTypeID",
        Width: 50
    },
    {
        Name: "PieRequestTypeID",
        Type: "text",
        Caption: "Mã loại yêu cầu",
        DataSourceMember: "PieRequestTypeID",
        Width: 150
    },
    {
        Name: "PieRequestTypeName",
        Type: "text",
        Caption: "Tên loại yêu cầu",
        DataSourceMember: "PieRequestTypeName",
        Width: 300
    },
    {
        Name: "PieTypeID",
        Type: "text",
        Caption: "Loại chỉnh sửa",
        DataSourceMember: "PieTypeName",
        Width: 250
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 200
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 200
    },
    {
        Name: "CreatedFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedFullName",
        Width: 200
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "PieRequestTypeID",
        Width: 200,
        Link: "/PieRequestType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const WFColumnList = [
    {
        Name: "chkSelectPieRequestStepID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PieRequestStepID",
        Width: 100
    },
    {
        Name: "PieRequestStepID",
        Type: "text",
        Caption: "Mã bước xử lý",
        DataSourceMember: "PieRequestStepID",
        Width: 200
    },
    {
        Name: "PieRequestStepName",
        Type: "text",
        Caption: "Tên bước xử lý",
        DataSourceMember: "PieRequestStepName",
        Width: 200
    },
    {
        Name: "StepCompletePercent",
        Type: "text",
        Caption: "% hoàn thành",
        DataSourceMember: "StepCompletePercent",
        Width: 200
    },
    {
        Name: "MaxProcessTime",
        Type: "text",
        Caption: "Thời gian XL tối đa",
        DataSourceMember: "DisplayProcessTime",
        Width: 200
    },
    {
        Name: "IsInitStep",
        Type: "checkicon",
        Caption: "Là bước khởi tạo",
        DataSourceMember: "IsInitStep",
    },
    {
        Name: "IsFinishStep",
        Type: "checkicon",
        Caption: "Là bước hoàn thành",
        DataSourceMember: "IsFinishStep",
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived"
    },
    {
        Name: "EditPieRequestStepID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "PieRequestStepID",
    }
];

export const MLObjectPieRequestTypeWorkflow = [
    {
        Name: "PieRequestStepID",
        DefaultValue: "",
        BindControlName: "PieRequestStepID",
        DataSourceMember: "PieRequestStepID"
    },
    {
        Name: "PieRequestStepName",
        DefaultValue: "",
        BindControlName: "PieRequestStepName",
        DataSourceMember: "PieRequestStepName"
    },
    {
        Name: "StepCompletePercent",
        DefaultValue: "",
        BindControlName: "StepCompletePercent",
        DataSourceMember: "StepCompletePercent"
    },
    {
        Name: "MaxProcessTime",
        DefaultValue: "",
        BindControlName: "MaxProcessTime",
        DataSourceMember: "MaxProcessTime"
    },
    {
        Name: "IsInitStep",
        DefaultValue: "",
        BindControlName: "IsInitStep",
        DataSourceMember: "IsInitStep"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "PieRequestType_WF_Next",
        DefaultValue: "",
        BindControlName: "PieRequestType_WF_Next",
        DataSourceMember: "PieRequestType_WF_Next"
    },
    {
        Name: "PieRequestType_WF_Permis",
        DefaultValue: "",
        BindControlName: "PieRequestType_WF_Permis",
        DataSourceMember: "PieRequestType_WF_Permis"
    },
    {
        Name: "CreatedDate",
        DefaultValue: "",
        BindControlName: "CreatedDate",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "CreatedUser",
        DataSourceMember: "CreatedUser"
    }
];