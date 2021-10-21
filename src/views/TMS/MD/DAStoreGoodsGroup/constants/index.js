export const APIHostName = "TMSAPI";

export const APIDAStoreGoodsGroupLoadList = "api/DAStore_GoodsGroup/LoadList";
export const APIDAStoreGoodsGroupDelete = "api/DAStore_GoodsGroup/Delete";



export const MLObjectDefinitionModal = [
    {
        Name: "DeliveryAbilityStoreID",
        DefaultValue: "",
        BindControlName: "DeliveryAbilityStoreID",
        DataSourceMember: "DeliveryAbilityStoreID"
    },
    {
        Name: "DeliveryAbilityStoreName",
        DefaultValue: "",
        BindControlName: "DeliveryAbilityStoreName",
        DataSourceMember: "DeliveryAbilityStoreName"
    },
    {
        Name: "DeliveryGoodsGroupID",
        DefaultValue: "",
        BindControlName: "DeliveryGoodsGroupID",
        DataSourceMember: "DeliveryGoodsGroupID"
    },
    {
        Name: "DeliveryGoodsGroupName",
        DefaultValue: "",
        BindControlName: "DeliveryGoodsGroupName",
        DataSourceMember: "DeliveryGoodsGroupName"
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


export const InputDAStoreGoodsGroupColumnList = [
    {
        Name: "DeliveryAbilityStoreName",
        Type: "text",
        Caption: "Kho lấy tải",
        DataSourceMember: "DeliveryAbilityStoreName",
        Width: 150
    },
    {
        Name: "DeliveryGoodsGroupName",
        Type: "text",
        Caption: "Sản phẩm lấy tải",
        DataSourceMember: "DeliveryGoodsGroupName",
        Width: 100
    },
    {
        Name: "ApportionFactor",
        Type: "textbox",
        Caption: "Tỷ lệ phân bổ (theo phần trăm)",
        DataSourceMember: "ApportionFactor",
        Width: 100
    },
    {
        Name: "Note",
        Type: "textbox",
        Caption: "Ghi chú",
        DataSourceMember: "Note",
        Width: 100
    },
    {
        Name: "IsActived",
        Type: "checkbox",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 60
    },
    // {
    //     Name: "Quantity",
    //     Type: "textbox",
    //     // validatonList: [ "number"],
    //     Caption: "Số lượng hủy",
    //     DataSourceMember: "Quantity",
    //     IsNoneZero: false,
    //     labelError: 'số lượng hủy',
    //     Value: '',
    //     Width: 100,
    // },

];