import { ERPCOMMONCACHE_FUNCTION } from '../../../../../constants/keyCache';

export const APIHostName = "TMSMDMAPI";
export const AddAPIPath = "api/VehicleRentalRequestType/Add";
export const AddAPIPath_RentalRequestType_WF = "api/RentalRequestType_WF/Add";
export const DelAPIPath_RentalRequestType_WF = "api/RentalRequestType_WF/Delete";
export const UptAPIPath_RentalRequestType_WF = "api/RentalRequestType_WF/Update";
export const DelAPIPath_RentalRequestType_WF_Next = "api/RentalRequestType_WF_Next/Load";
export const DeleteAPIPath = "api/VehicleRentalRequestType/Delete";
export const EditAPIPath = "api/VehicleRentalRequestType/Edit";
export const LoadAPIPath = "api/VehicleRentalRequestType/Load";
export const SearchAPIPath = "api/VehicleRentalRequestType/Search";

export const AddLink = "/VehicleRentalRequestType/Add";
export const BackLink = "/VehicleRentalRequestType";

export const IDSelectColumnName = "chkSelect";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Loại yêu cầu thuê phương tiện" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleRentalRequestType", Title: "Loại yêu cầu thuê phương tiện" },
    { Link: "", Title: "Thêm loại yêu cầu thuê phương tiện" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleRentalRequestType", Title: "Loại yêu cầu thuê phương tiện" },
    { Link: "", Title: "Chỉnh sửa loại yêu cầu thuê phương tiện" }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const EditMLObjectDefinition = [
    {
        Name: "VehicleRentalRequestType",
        DefaultValue: "",
        BindControlName: "VehicleRentalRequestType",
        DataSourceMember: "VehicleRentalRequestType"
    },
    {
        Name: "RentalRequestType_WF",
        DefaultValue: "",
        BindControlName: "RentalRequestType_WF",
        DataSourceMember: "RentalRequestType_WF"
    }
]

export const listColumnVehicleRentalRequestType = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "VehicleRentalRequestTypeID",
        Width: 60
    },
    {
        Name: "VehicleRentalRequestTypeID",
        Type: "text",
        Caption: "Mã loại thuê phương tiện",
        DataSourceMember: "VehicleRentalRequestTypeID",
    },
    {
        Name: "VehicleRentalRequestTypeName",
        Type: "text",
        Caption: "Tên loại thuê phương tiện",
        DataSourceMember: "VehicleRentalRequestTypeName",
    },
    // {
    //     Name: "AddFunctionID",
    //     Type: "text",
    //     Caption: "Quyền thêm",
    //     DataSourceMember: "AddFunctionID",
    // },
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    // },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
    },
    {
        Name: "UpdatedDate",
        Type: "datetime",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
    },
    {
        Name: "UpdatedUserIDName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserIDName",
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "VehicleRentalRequestTypeID",
        Width: 80,
        Link: "/VehicleRentalRequestType/Edit/",
        LinkText: "Chỉnh sửa"
    },
]

export const listColumnRentalRequestType_WF = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "VehicleRentalRequestStepID",
        Width: 60
    },
    {
        Name: "VehicleRentalRequestStepID",
        Type: "text",
        Caption: "Mã bước thuê phương tiện",
        DataSourceMember: "VehicleRentalRequestStepID",
    },
    {
        Name: "VehicleRentalRequestStepName",
        Type: "text",
        Caption: "Tên bước thuê phương tiện",
        DataSourceMember: "VehicleRentalRequestStepName",
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
        Caption: "Là bước kết thúc",
        DataSourceMember: "IsFinishStep",
    },
    // {
    //     Name: "IsFinishStep",
    //     Type: "checkicon",
    //     Caption: "Là bước kết thúc",
    //     DataSourceMember: "IsFinishStep",
    // },
    {
        Name: "IsAddWorkingPlan",
        Type: "checkicon",
        Caption: "Tự động thêm vào lịch làm việc",
        DataSourceMember: "IsAddWorkingPlan",
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "VehicleRentalRequestStepID",
        Width: 80,
        Link: "/RentalRequestType_WF/Edit/",
        LinkText: "Chỉnh sửa"
    },
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

export const AddElementList = [
    {
        type: "text",
        name: "VehicleRentalRequestTypeName",
        label: "tên loại bước xử lý của yêu cầu thuê phương tiện",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleRentalRequestTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        name: "AddFunctionID",
        type: "multiselect",
        label: "quyền thêm",
        DataSourceMember: "AddFunctionID",
        readonly: false,
        value: -1,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_FUNCTION,
        ValueMember: "FunctionID",
        NameMember: "FunctionName",
        KeyFilter: "FunctionCategoryID",
        ValueFilter: "1,2"
    },
    {
        type: "text",
        name: "OrderIndex",
        label: "thứ tự hiển thị",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "textarea",
        name: "Description",
        label: "mô tả",
        value: "",
        maxSize: "300",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "IsActived",
        label: "kích hoạt",
        value: 1,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "IsSystem",
        label: "hệ thống",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    }
]

export const AddMLObjectDefinition = [
    {
        Name: "VehicleRentalRequestTypeID",
        DefaultValue: "",
        BindControlName: "VehicleRentalRequestTypeID",
        DataSourceMember: "VehicleRentalRequestTypeID",
    },
    {
        Name: "VehicleRentalRequestTypeName",
        DefaultValue: "",
        BindControlName: "VehicleRentalRequestTypeName",
        DataSourceMember: "VehicleRentalRequestTypeName",
    },
    {
        Name: "AddFunctionID",
        DefaultValue: "",
        BindControlName: "AddFunctionID",
        DataSourceMember: "AddFunctionID",
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        Label: "Thứ Tự Hiển Thị",
        BindControlName: "OrderIndex",
        DataSourceMember: "OrderIndex",
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
]

export const EditElementList = [
    {
        type: "text",
        name: "txtVehicleRentalRequestTypeID",
        label: "Mã loại yêu cầu thuê phương tiện",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleRentalRequestTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtVehicleRentalRequestTypeName",
        label: "Tên loại yêu cầu thuê phương tiện",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleRentalRequestTypeName",
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
        validatonList: ["required"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.FUNCTION",
        ValueMember: "FunctionID",
        NameMember: "FunctionName",
        KeyFilter: "FunctionCategoryID",
        ValueFilter: "1,2"
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "300",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
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

export const MLObjectDefinitionVehicleRentalRequestType = [
    {
        Name: "VehicleRentalRequestTypeID",
        DefaultValue: "",
        BindControlName: "VehicleRentalRequestTypeID",
        DataSourceMember: "VehicleRentalRequestTypeID",
        ValidationList: ["required"]
    },
    {
        Name: "VehicleRentalRequestTypeName",
        DefaultValue: "",
        BindControlName: "VehicleRentalRequestTypeName",
        DataSourceMember: "VehicleRentalRequestTypeName",
        ValidationList: ["required"],
        Label: "mã loại yêu cầu thuê phương tiện",
    },
    {
        Name: "AddFunctionID",
        DefaultValue: "",
        BindControlName: "AddFunctionID",
        DataSourceMember: "AddFunctionID",
        ValidationList: ["required"],
        Label: "quyền thêm"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        Label: "Thứ Tự Hiển Thị",
        BindControlName: "OrderIndex",
        DataSourceMember: "OrderIndex",
        ValidationList: ["number"]
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

export const MLObjectDefinitionFormContainerVehicleRentalRequestType_WF = [
    {
        Name: "RentalRequestType_WF",
        DefaultValue: "",
        BindControlName: "RentalRequestType_WF",
        DataSourceMember: "RentalRequestType_WF"
    },
    {
        Name: "RentalRequestType_WF_Next",
        DefaultValue: "",
        BindControlName: "RentalRequestType_WF_Next",
        DataSourceMember: "RentalRequestType_WF_Next"
    }
]

export const MLObjectDefinitionVehicleRentalRequestType_WF = [
    {
        BindControlName: "VehicleRentalRequestStepID",
        DataSourceMember: "VehicleRentalRequestStepID",
        DefaultValue: "",
        Label: "mã bước thuê phương tiện",
        Name: "VehicleRentalRequestStepID",
        ValidationList: ["Comborequired"]
    },
    {
        BindControlName: "AutoChangetoStatusID",
        DataSourceMember: "AutoChangetoStatusID",
        DefaultValue: "",
        Label: "tự động chuyển sang trạng thái",
        Name: "AutoChangetoStatusID",
        ValidationList: ["Comborequired"]
    },
    {
        BindControlName: "AutoChangetoStepID",
        DataSourceMember: "AutoChangetoStepID",
        DefaultValue: "",
        Label: "tự động chuyển sang bước",
        Name: "AutoChangetoStepID",
        ValidationList: ["Comborequired"]
    },
    {
        BindControlName: "AutoChangeStepType",
        DataSourceMember: "AutoChangeStepType",
        DefaultValue: "",
        Label: "loại tự động chuyển bước",
        Name: "AutoChangeStepType",
        ValidationList: ["Comborequired"]
    },
    {
        BindControlName: "IsInitStep",
        DataSourceMember: "IsInitStep",
        DefaultValue: "",
        Label: "loại bước khởi tạo",
        Name: "IsInitStep"
    },
    {
        BindControlName: "IsFinishStep",
        DataSourceMember: "IsFinishStep",
        DefaultValue: "",
        Label: "loại bước kết thúc",
        Name: "IsFinishStep"
    },
    {
        BindControlName: "Description",
        DataSourceMember: "Description",
        DefaultValue: "",
        Label: "mô tả",
        Name: "Description"
    },
    {
        BindControlName: "IsAddToWorkingPlan",
        DataSourceMember: "IsAddToWorkingPlan",
        DefaultValue: "",
        Label: "tự động thêm dữ liệu vào lịch làm việc",
        Name: "IsAddToWorkingPlan"
    },
    {
        BindControlName: "IsActived",
        DataSourceMember: "IsActived",
        DefaultValue: "",
        Label: "Kích hoạt",
        Name: "IsActived"
    },
    {
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem",
        DefaultValue: "",
        Label: "Hệ thống",
        Name: "IsSystem"
    }
]

export const RentalRequestType_WFListColumn = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "VehicleRentalRequestStepID",
        Width: 60
    },
    {
        Name: "VehicleRentalRequestStepIDName",
        Type: "text",
        Caption: "Bước xử lý",
        DataSourceMember: "VehicleRentalRequestStepIDName",
    },
    {
        Name: "AutoChangetoStatusIDName",
        Type: "text",
        Caption: "Tự động chuyển trạng thái",
        DataSourceMember: "AutoChangetoStatusIDName",
    },
    {
        Name: "AutoChangetoStepIDName",
        Type: "text",
        Caption: "Bước tự động chuyển",
        DataSourceMember: "AutoChangetoStepIDName",
    },
    {
        Name: "AutoChangeStepTypeName",
        Type: "text",
        Caption: "Loại tự động chuyển bước",
        DataSourceMember: "AutoChangeStepTypeName",
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
        Caption: "Là bước hoàn tất",
        DataSourceMember: "IsFinishStep",
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
    },
    {
        Name: "IsAddToWorkingPlan",
        Type: "checkicon",
        Caption: "Tự động thêm dữ liệu vào lịch làm việc",
        DataSourceMember: "IsAddToWorkingPlan",
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
    },
    {
        Name: "IsSystem",
        Type: "checkicon",
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
    },
    {
        Name: "VehicleRentalRequestStepID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "VehicleRentalRequestStepID",
    }
]

export const RentalRequestType_WFMLObjectDefinition = [
    {
        Name: "VehicleRequestStepID",
        DefaultValue: "",
        BindControlName: "VehicleRequestStepID",
        DataSourceMember: "VehicleRequestStepID"
    },
    {
        Name: "AutoChangetoStatusID",
        DefaultValue: "",
        BindControlName: "AutoChangetoStatusID",
        DataSourceMember: "AutoChangetoStatusID"
    },
    {
        Name: "AutoChangetoStepID",
        DefaultValue: "",
        BindControlName: "AutoChangetoStepID",
        DataSourceMember: "AutoChangetoStepID"
    },
    {
        Name: "AutoChangeStepType",
        DefaultValue: "",
        BindControlName: "AutoChangeStepType",
        DataSourceMember: "AutoChangeStepType"
    },
    {
        Name: "IsInitStep",
        DefaultValue: "",
        BindControlName: "IsInitStep",
        DataSourceMember: "IsInitStep"
    },
    {
        Name: "IsFinishStep",
        DefaultValue: "",
        BindControlName: "IsFinishStep",
        DataSourceMember: "IsFinishStep"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "IsAddToWorkingPlan",
        DefaultValue: "",
        BindControlName: "IsAddToWorkingPlan",
        DataSourceMember: "IsAddToWorkingPlan"
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
    },
    {
        Name: "VehicleRentalRequestStepID",
        DefaultValue: "",
        BindControlName: "VehicleRentalRequestStepID",
        DataSourceMember: "VehicleRentalRequestStepID"
    },
];

export const RentalRequestType_WF_NextListColumn = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "NextVehicleRentalRequestTypeStep",
        Width: 60
    },
    {
        Name: "NextVehicleRentalRequestTypeStep",
        Type: "text",
        Caption: "Mã bước kế tiếp",
        DataSourceMember: "NextVehicleRentalRequestTypeStep",
    },
    {
        Name: "NextVehicleRentalRequestTypeStepName",
        Type: "text",
        Caption: "Tên bước kế tiếp",
        DataSourceMember: "NextVehicleRentalRequestTypeStepName",
    },
    {
        Name: "ChooseFuntionName",
        Type: "text",
        Caption: "Quyền thêm",
        DataSourceMember: "ChooseFuntionName",
    },
]

export const RentalRequestType_WF_NextMLObjectDefinition = [
    {
        Name: "VehicleRequestStepID",
        DefaultValue: "",
        BindControlName: "VehicleRequestStepID",
        DataSourceMember: "VehicleRequestStepID"
    },
    {
        Name: "ChooseFuntionID",
        DefaultValue: "",
        BindControlName: "ChooseFuntionID",
        DataSourceMember: "ChooseFuntionID"
    },
]