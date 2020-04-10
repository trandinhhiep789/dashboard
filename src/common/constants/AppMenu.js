const AppMenu = [
    // {
    //     MenuName: 'home',
    //     MenuTitle: 'Trang chủ',
    //     LinkTo: '',
    //     MenuIcon: '',
    //     SubMenu: [

    //     ]
    // },
    {
        MenuName: 'dashboard',
        MenuTitle: 'Trang chủ',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [

        ]
    },
    // {
    //     MenuName: 'test',
    //     MenuTitle: 'Test',
    //     LinkTo: '',
    //     MenuIcon: '',
    //     SubMenu: [

    //         {
    //             MenuName: 'testcache',
    //             MenuTitle: 'Test Cache',
    //             LinkTo: '/TestCache',
    //             MenuIcon: '',
    //             SubMenu: [

    //             ]
    //         },

    //         {
    //             MenuName: 'testmodal',
    //             MenuTitle: 'Test Modal',
    //             LinkTo: '/TestModal',
    //             MenuIcon: '',
    //             SubMenu: [

    //             ]
    //         },

    //         {
    //             MenuName: 'testformcontainer',
    //             MenuTitle: 'Test FormContainer',
    //             LinkTo: '/TestFormContainer',
    //             MenuIcon: '',
    //             SubMenu: [

    //             ]
    //         },

    //         {
    //             MenuName: 'testtabs',
    //             MenuTitle: 'Test Tabs',
    //             LinkTo: '/TestTabs',
    //             MenuIcon: '',
    //             SubMenu: [

    //             ]
    //         },

    //         {
    //             MenuName: 'TestPageLayout',
    //             MenuTitle: 'Test Page Layout',
    //             LinkTo: '/TestPageLayout',
    //             MenuIcon: '',
    //             SubMenu: [

    //             ]
    //         }

    //     ]
    // },
    {
        MenuName: 'commonMD',
        MenuTitle: 'Khai báo chung',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [
            //Menu cấp 2: thuộc tính sản phẩm
            {
                MenuName: 'AttributeMD',
                MenuTitle: 'Thuộc tính sản phẩm',
                LinkTo: '',
                MenuIcon: '',
                //Menu cấp 3
                SubMenu: [
                    {
                        MenuName: 'AttributeCategoryType',
                        MenuTitle: 'Loại danh mục thuộc tính',
                        LinkTo: '/AttributeCategoryType',
                        MenuIcon: '',
                        GroupMenu: 'attribute-category-type',
                        SubMenu: []
                    },
                    {
                        MenuName: 'AttributeCategory',
                        MenuTitle: 'Danh mục thuộc tính',
                        LinkTo: '/AttributeCategory',
                        MenuIcon: '',
                        GroupMenu: 'attribute-category-type',
                        SubMenu: []
                    },
                    {
                        MenuName: 'AttributeType',
                        MenuTitle: 'Loại thuộc tính sản phẩm',
                        LinkTo: '/AttributeType',
                        MenuIcon: '',
                        GroupMenu: 'attribute-type',
                        SubMenu: []
                    },
                    {
                        MenuName: 'AttributeDataType',
                        MenuTitle: 'Loại dữ liệu thuộc tính sản phẩm',
                        LinkTo: '/AttributeDataType',
                        MenuIcon: '',
                        GroupMenu: 'attribute-type',
                        SubMenu: []
                    },
                    {
                        MenuName: 'Attribute',
                        MenuTitle: 'Thuộc tính sản phẩm',
                        LinkTo: '/Attribute',
                        MenuIcon: '',
                        GroupMenu: 'attribute',
                        SubMenu: []
                    },
                    {
                        MenuName: 'AttributeValue',
                        MenuTitle: 'Giá trị thuộc tính sản phẩm',
                        LinkTo: '/AttributeValue',
                        MenuIcon: '',
                        GroupMenu: 'attribute-value',
                        SubMenu: []
                    }
                ]
            },

            //Menu cấp   //Menu cấp 2: Sản phẩm
            {
                MenuName: 'ProductMD',
                MenuTitle: 'Sản phẩm',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [

                    // Sản phẩm
                    {
                        MenuName: 'product',
                        MenuTitle: 'Sản phẩm',
                        LinkTo: '/Product',
                        MenuIcon: '',
                        GroupMenu: 'product',
                        SubMenu: []
                    },
                    //Loại sản phẩm
                    {
                        MenuName: 'ProductType',
                        MenuTitle: 'Loại sản phẩm',
                        LinkTo: '/ProductType',
                        MenuIcon: '',
                        GroupMenu: 'produc-type',
                        SubMenu: []
                    },
                    {
                        MenuName: 'ProductassocType',
                        MenuTitle: 'Loại kết hợp sản phẩm',
                        LinkTo: '/ProductassocType',
                        MenuIcon: '',
                        GroupMenu: 'produc-type',
                        SubMenu: []
                    },
                    {
                        MenuName: 'ProductImageType',
                        MenuTitle: 'Loại ảnh sản phẩm',
                        LinkTo: '/ProductImageType',
                        MenuIcon: '',
                        GroupMenu: 'produc-type',
                        SubMenu: []
                    },
                    // Đặc điểm sản phẩm
                    {
                        MenuName: 'ProductFeatureGroup',
                        MenuTitle: 'Nhóm đặc điểm sản phẩm',
                        LinkTo: '/ProductFeatureGroup',
                        GroupMenu: 'product-group',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'ProductFeature',
                        MenuTitle: 'Đặc điểm sản phẩm',
                        LinkTo: '/ProductFeature',
                        GroupMenu: 'product-group',
                        MenuIcon: '',
                        SubMenu: []
                    },

                    // Trạng thái sản phẩm
                    {
                        MenuName: 'ProductStatus',
                        MenuTitle: 'Trạng thái sản phẩm',
                        LinkTo: '/ProductStatus',
                        GroupMenu: 'product-status',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    //Menu Model sản phẩm
                    {
                        MenuName: 'Model',
                        MenuTitle: 'Model sản phẩm',
                        LinkTo: '/Model',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []

                    }

                ]
            },
            {
                MenuName: 'CategoryMD',
                MenuTitle: 'Danh mục sản phẩm',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'CategoryType',
                        MenuTitle: 'Loại danh mục sản phẩm',
                        LinkTo: '/CategoryType',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []

                    },
                    {
                        MenuName: 'Category',
                        MenuTitle: 'Danh mục sản phẩm',
                        LinkTo: '/Category',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []
                    }
                ]

            },
            {
                MenuName: 'ManufacturerMD',
                MenuTitle: 'Nhà sản xuất',
                LinkTo: '',
                MenuIcon: '',
                //Menu cấp 3
                SubMenu: [
                    //Menu cấp 2: nhãn hiệu
                    {
                        MenuName: 'brand',
                        MenuTitle: 'Nhãn hiệu',
                        LinkTo: '/Brand',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []

                    },
                    //Menu cấp 2: nhà sản xuất
                    {
                        MenuName: 'Manufacturer',
                        MenuTitle: 'Nhà sản xuất',
                        LinkTo: '/Manufacturer',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []

                    }
                ]
            },

            {
                MenuName: 'PieRequestTypeMD',
                MenuTitle: 'Loại thông tin yêu cầu',
                LinkTo: '',
                MenuIcon: '',
                //Menu cấp 3
                SubMenu: [
                    //Menu cấp 2: Loại chỉnh sửa thông tin sản phẩm
                    {
                        MenuName: 'PieType',
                        MenuTitle: 'Loại chỉnh sửa',
                        LinkTo: '/PieType',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []

                    },
                    //Menu cấp 2:Quyền
                    {
                        MenuName: 'PiePermission',
                        MenuTitle: 'Quyền',
                        LinkTo: '/PiePermission',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []

                    },
                    //Menu cấp 2: Loại yêu cầu chỉnh sửa thông tin sản phẩm
                    {
                        MenuName: 'PieRequestType',
                        MenuTitle: 'Loại yêu cầu chỉnh sửa thông tin sản phẩm',
                        LinkTo: '/PieRequestType',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []

                    }

                ]
            },

            {
                MenuName: 'MD',
                MenuTitle: 'Khai báo khác',
                LinkTo: '',
                MenuIcon: '',
                //Menu cấp 3
                SubMenu: [

                    //Menu cấp 2: Tác vụ liên quan đến hàng hóa
                    {
                        MenuName: 'ProductOperation',
                        MenuTitle: 'Tác vụ liên quan',
                        LinkTo: '/ProductOperation',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []

                    },
                    //Menu cấp 2:loại bảng mã sản phẩm của đối tác
                    {
                        MenuName: 'PartnerProductMapType',
                        MenuTitle: 'Danh sách loại bảng mã sản phẩm của đối tác',
                        LinkTo: '/PartnerProductMapType',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []
                    },
                    //Menu cấp 2: Loại nội dung sản phẩm
                    {
                        MenuName: 'ContentType',
                        MenuTitle: 'Loại nội dung sản phẩm',
                        LinkTo: '/ContentType',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []

                    },
                    //Menu cấp 2: phương tiện vận chuyển
                    {
                        MenuName: 'ShippingMethod',
                        MenuTitle: 'Phương tiện vận chuyển',
                        LinkTo: '/ShippingMethod',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []

                    },

                    //Menu cấp 2: phương tiện vận chuyển
                    {
                        MenuName: 'QuantityUnit',
                        MenuTitle: 'Đơn vị tính',
                        LinkTo: '/QuantityUnit',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []

                    },
                    {
                        MenuName: 'UOMType',
                        MenuTitle: 'Loại đơn vị',
                        LinkTo: '/UOMType',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'UOM',
                        MenuTitle: 'Đơn vị',
                        LinkTo: '/UOM',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'InventoryStatus',
                        MenuTitle: 'Trạng thái hàng hóa tồn kho',
                        LinkTo: '/InventoryStatus',
                        MenuIcon: '',
                        GroupMenu: '',
                        SubMenu: []
                    }
                ]
            },


        ]
    },
    //Menu cấp 2: Yêu cầu chỉnh sửa thông tin sản phẩm
    {
        MenuName: 'PieRequest',
        MenuTitle: 'Yêu cầu chỉnh sửa thông tin sản phẩm',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [
            // {
            //     MenuName: '',
            //     MenuTitle: 'Thêm yêu cầu',
            //     LinkTo: '',
            //     MenuIcon: '',
            //     SubMenu: []
            // },
            {
                MenuName: 'PieRequest',
                MenuTitle: 'Danh sách yêu cầu',
                LinkTo: '/PieRequest',
                MenuIcon: '',
                SubMenu: []
            }
        ]
    },
    {
        MenuName: 'MD',
        MenuTitle: 'Khai báo thông tin chung TT',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [
            {
                MenuName: 'PartnerType',
                MenuTitle: 'Danh sách loại đối tác',
                LinkTo: '/PartnerType',
                MenuIcon: '',
                SubMenu: []
            }
        ]
    }
];

export default AppMenu;