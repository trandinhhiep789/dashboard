export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/ShipmentOrderType_WF_Img/Add";
export const UpdateAPIPath = "api/ShipmentOrderType_WF_Img/Update";
export const DeleteAPIPath = "api/ShipmentOrderType_WF_Img/Delete";
export const LoadAPIPath = "api/ShipmentOrderType_WF_Img/Load";
export const SearchAPIPath="api/ShipmentOrderType_WF_Img/GetAllByID";
export const BackLink = "/DestroyRequestType";
import { CDN_LOGO_IMAGE } from '../../../../../../constants/systemVars';

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DestroyRequestType", Title: "Loại yêu cầu hủy vật tư" },
    //{ Link: "/InventoryRequestType/ReviewLevelDetail", Title: "Mức duyệt" },
    { Link: "", Title: "Mức duyệt" }
];


export const ModalColumnList_Insert = [
    {
        Name: "SampleImageName",
        type: "text",
        label: "Tên hình mẫu",
        maxSize: "200",
        DataSourceMember: "SampleImageName",
        readonly: false,
        validatonList: []
    },
    {
        type: "multiselect",
        Name: "SubGroupID",
        label: "Nhóm hàng áp dụng",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        type: "singleFileUpload",
        Name: "SampleImageFileURL",
        NameMember: "SampleImageFileURL",
        label: "Đường dẫn hình mẫu",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "SampleImageFileURL",
        readonly: false,
        validatonList: []
    },
    {
        Name: "OrderIndex",
        type: "text",
        label: "thứ tự hiển thị",
        maxSize: "9",
        value: 0,
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "InstructionNote",
        type: "textarea",
        label: "Hướng dẫn chụp hình",
        maxSize: "3000",
        DataSourceMember: "InstructionNote",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        maxSize: "2000",
        DataSourceMember: "Description",
        rows: "6",
        readonly: false,
        validatonList: []
    }
];

export const ModalColumnList_Edit = [
    {
        Name: "SampleImageName",
        type: "text",
        label: "Tên hình mẫu",
        maxSize: "200",
        DataSourceMember: "SampleImageName",
        readonly: false,
        validatonList: []
    },
    {
        type: "multiselect",
        Name: "SubGroupID",
        label: "Nhóm hàng áp dụng",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        type: "singleFileUpload",
        Name: "SampleImageFileURL",
        NameMember: "SampleImageFileURL",
        label: "Đường dẫn hình mẫu",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "SampleImageFileURL",
        readonly: false,
        validatonList: []
    },
    {
        Name: "OrderIndex",
        type: "text",
        label: "thứ tự hiển thị",
        maxSize: "9",
        value: 0,
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "InstructionNote",
        type: "textarea",
        label: "Hướng dẫn chụp hình",
        maxSize: "2000",
        DataSourceMember: "InstructionNote",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        maxSize: "2000",
        DataSourceMember: "Description",
        rows: "6",
        readonly: false,
        validatonList: []
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelectSampleImageID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "SampleImageID",
        Width: 60
    },
    {
        Name: "SampleImageName",
        Type: "text",
        Caption: "Tên hình mẫu",
        DataSourceMember: "SampleImageName",
        Width: 200
    },
    {
        Name: "SubGroupName",
        Type: "text",
        Caption: "Nhóm hàng",
        DataSourceMember: "SubGroupName",
        Width: 200
    },
    {
        Name: "SampleImageFileURL",
        Type: "text",
        Caption: "Đường dẫn hình mẫu",
        DataSourceMember: "SampleImageFileURL",
        //Width: 150
    },
    // {
    //     Name: "ReviewLevelName",
    //     Type: "texttolink",
    //     Link: "/DestroyRequestType/ReviewLevelDetail/",
    //     Caption: "Tên mức duyệt",
    //     DataSourceMember: "ReviewLevelName",
    //     Width: 300
    // },
    // {
    //     Name: "InstructionNote",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "InstructionNote",
    //     Width: 300
    // },
    // {
    //     Name: "IsActived",
    //     Type: "checkicon",
    //     Caption: "Kích hoạt",
    //     DataSourceMember: "IsActived",
    //     Width: 150
    // },
    {
        Name: "EditSampleImageID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "SampleImageID",
        Width: 100
    }

];

export const MLObjectDefinition = [
    {
        Name: "SampleImageID",
        DefaultValue: "",
        BindControlName: "SampleImageID",
        DataSourceMember: "SampleImageID"
    },
    {
        Name: "SampleImageName",
        DefaultValue: "",
        BindControlName: "SampleImageName",
        DataSourceMember: "SampleImageName"
    },
    {
        Name: "ShipmentOrderTypeID",
        DefaultValue: "",
        BindControlName: "ShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID"
    },
    {
        Name: "ShipmentOrderStepID",
        DefaultValue: "",
        BindControlName: "ShipmentOrderStepID",
        DataSourceMember: "ShipmentOrderStepID"
    },
    {
        Name: "SubGroupID",
        DefaultValue: "",
        BindControlName: "SubGroupID",
        DataSourceMember: "SubGroupID"
    },
    {
        Name: "SubGroupName",
        DefaultValue: "",
        BindControlName: "SubGroupName",
        DataSourceMember: "SubGroupName"
    },
    {
        Name: "SampleImageFileURL",
        DefaultValue: "",
        BindControlName: "SampleImageFileURL",
        DataSourceMember: "SampleImageFileURL"
    },
    {
        Name: "InstructionNote",
        DefaultValue: "",
        BindControlName: "InstructionNote",
        DataSourceMember: "InstructionNote"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "OrderIndex",
        DataSourceMember: "OrderIndex"
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