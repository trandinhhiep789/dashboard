export const APIHostName = "TMSAPI";

export const APIDAStoreGoodsGroupLoadList = "api/DAStore_GoodsGroup/LoadList";
export const APIDAStoreGoodsGroupDelete = "api/DAStore_GoodsGroup/Delete";

export const listColumnDAStoreGoodsGroup = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "DeliveryAbilityStoreID,DeliveryGoodsGroupID",
        Width: 60
    },
    {
        Name: "DeliveryAbilityStoreIDName",
        Type: "text",
        Caption: "Kho lấy tải",
        DataSourceMember: "DeliveryAbilityStoreIDName"
    },
    {
        Name: "DeliveryGoodsGroupIDName",
        Type: "text",
        Caption: "Sản phẩm lấy tải",
        DataSourceMember: "DeliveryGoodsGroupIDName"
    },
    {
        Name: "ApportionFactor",
        Type: "text",
        Caption: "Tỷ lệ phân bổ (theo phần trăm)",
        DataSourceMember: "ApportionFactor"
    },
    {
        Name: "Note",
        Type: "text",
        Caption: "Ghi chú",
        DataSourceMember: "Note"
    },
    {
        Name: "UpdatedUserIDName",
        Type: "text",
        Caption: "Người cập nhập",
        DataSourceMember: "UpdatedUserIDName"
    },
    {
        Name: "UpdatedDate",
        Type: "date",
        Caption: "Ngày cập nhập",
        DataSourceMember: "UpdatedDate"
    },
]

export const MLObjectDefinitionModal = [
    {
        Name: "DeliveryAbilityStoreID",
        DefaultValue: "",
        BindControlName: "DeliveryAbilityStoreID",
        DataSourceMember: "DeliveryAbilityStoreID"
    },
    {
        Name: "DeliveryGoodsGroupID",
        DefaultValue: "",
        BindControlName: "DeliveryGoodsGroupID",
        DataSourceMember: "DeliveryGoodsGroupID"
    },
    {
        Name: "ApportionFactor",
        DefaultValue: "",
        BindControlName: "ApportionFactor",
        DataSourceMember: "ApportionFactor"
    },
    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "Note",
        DataSourceMember: "Note"
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
]