import { Button, Col, DatePicker, Input, Row, Select, Space, Typography } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";

class SearchFormShipmentRouteAuto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ListOptionLoaiYeuCauVanChuyen: [],
      ListOptionTinh: [],
      ListOptionHuyen: [],
      ListOptionXa: [],
      ListOptionKhoGui: [],
      ListOptionKhoDieuPhoi: [],
      ListOptionTrangThai: [],
      SearchData: {
        Keyword: "",
        ShipmentOrderTypeID: "",
        CreatedOrderTimeFo: new Date(),
        CreatedOrderTimeTo: new Date(),
        ReceiverProvinceID: -1,
        ReceiverDistrictID: -1,
        ReceiverWardID: -1,
        SenderStoreID: -1,
        CoordinatorStoreID: -1,
        ShipmentOrderStatusGroupID: "1,2,3",
        IsCoordinator: -1,
        CarrierTypeID: -1,
        Typename: -1,
      },
    };

    this.Select1 = [
      { value: -1, label: "Vui lòng chọn" },
      { value: 1, label: "SĐT người nhận hàng" },
      { value: 2, label: "Mã NV giao hàng" },
      { value: 3, label: "Mã ycx của đối tác" },
      { value: 4, label: "Mã vận đơn" },
      { value: 5, label: "Tên sản phảm" },
      { value: 6, label: "Mã NV điều phối" },
    ];

    this.Select2 = [
      { value: -1, label: "Trạng thái điều phối" },
      { value: 1, label: "Đã điều phối" },
      { value: 2, label: "Chưa điều phối" },
    ];

    this.Select3 = [
      { value: -1, label: "Phương tiện" },
      { value: 1, label: "Xe máy" },
      { value: 2, label: "Xe tải" },
    ];

    this.handleGetDataCacheLoaiYeuCauVanChuyen = this.handleGetDataCacheLoaiYeuCauVanChuyen.bind(this);
    this.handleGetDataCacheTinh = this.handleGetDataCacheTinh.bind(this);
    this.handleGetDataCacheHuyen = this.handleGetDataCacheHuyen.bind(this);
    this.handleGetDataCacheTrangThai = this.handleGetDataCacheTrangThai.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleInputTuKhoaChange = this.handleInputTuKhoaChange.bind(this);
    this.handleSelectTuKhoaChange = this.handleSelectTuKhoaChange.bind(this);
    this.handleSelectLoaiYeuCauVanChuyenChange = this.handleSelectLoaiYeuCauVanChuyenChange.bind(this);
    this.handleSelectTinhChange = this.handleSelectTinhChange.bind(this);
    this.handleSelectHuyenChange = this.handleSelectHuyenChange.bind(this);
    this.handleSelectKhoGuiChange = this.handleSelectKhoGuiChange.bind(this);
    this.handleSelectKhoDieuPhoiChange = this.handleSelectKhoDieuPhoiChange.bind(this);
  }

  componentDidMount() {
    this.handleGetDataCacheLoaiYeuCauVanChuyen();
    this.handleGetDataCacheTinh();
    this.handleGetDataCacheTrangThai();
    this.handleGetDataCacheKhoDieuPhoi();
  }

  callSearchData(KeyWord) {
    let listMLObject = {
      QueryParamList: [
        {
          QueryKey: "",
          QueryValue: "",
          QueryType: 18,
          IsNotQuery: false,
          SubQueryParamList: [
            {
              QueryKey: "sTOREID",
              QueryValue: /^[0-9][0-9]*$/.test(KeyWord) == true ? KeyWord : "",
              QueryType: 3,
              IsNotQuery: false,
            },
            {
              QueryKey: "sTORENAME",
              QueryValue: KeyWord,
              QueryType: 2,
              IsNotQuery: false,
            },
          ],
        },
        {
          QueryKey: "cOMPANYID",
          QueryValue: "1",
          QueryType: 1,
          IsNotQuery: false,
        },
      ],
      Top: 10,
      IndexName: "store",
      TypeName: "store",
      IsCompressResultData: false,
    };

    this.props.callFetchAPI("ERPAPI", "api/CommonSearch/Search", listMLObject).then((apiResult) => {
      const objStore = JSON.parse(apiResult.ResultObject).hits.hits;
      let listOptionNew1 = [];
      for (let i = 0; i < objStore.length; i++) {
        listOptionNew1.push({
          value: objStore[i]._source.sTOREID,
          name: objStore[i]._source.sTORENAME,
          StoreFax: objStore[i]._source.sTOREPHONENUM,
          StoreAddress: objStore[i]._source.sTOREADDRESS,
        });
      }
      this.setState({
        ListOption: listOptionNew1,
      });
    });
  }

  handleGetDataCacheLoaiYeuCauVanChuyen() {
    this.props.callGetCache("ERPCOMMONCACHE.SHIPMENTORDERTYPE").then((result) => {
      let listOptionNew = [];
      if (!result.IsError && result.ResultObject.CacheData != null) {
        result.ResultObject.CacheData.map((cacheItem) => {
          listOptionNew.push({ value: cacheItem["ShipmentOrderTypeID"], key: cacheItem["ShipmentOrderTypeID"], label: cacheItem["ShipmentOrderTypeID"] + " - " + cacheItem["ShipmentOrderTypeName"] });
        });

        let changeState = this.state;
        changeState = { ...changeState, ListOptionLoaiYeuCauVanChuyen: listOptionNew };

        this.setState(changeState);
      } else {
        let changeState = this.state;
        changeState = { ...changeState, ListOptionLoaiYeuCauVanChuyen: listOptionNew };

        this.setState(changeState);
      }
    });
  }

  handleGetDataCacheTinh() {
    this.props.callGetCache("ERPCOMMONCACHE.PROVINCE").then((result) => {
      let listOptionNew = [];
      if (!result.IsError && result.ResultObject.CacheData != null) {
        result.ResultObject.CacheData.map((cacheItem) => {
          listOptionNew.push({ value: cacheItem["ProvinceID"], key: cacheItem["ProvinceID"], label: cacheItem["ProvinceID"] + " - " + cacheItem["ProvinceName"] });
        });

        let changeState = this.state;
        changeState = { ...changeState, ListOptionTinh: listOptionNew };

        this.setState(changeState);
      } else {
        let changeState = this.state;
        changeState = { ...changeState, ListOptionTinh: listOptionNew };

        this.setState(changeState);
      }
    });
  }

  handleGetDataCacheHuyen(provinceID) {
    this.props.callGetCache("ERPCOMMONCACHE.DISTRICT").then((result) => {
      let listOptionNew = [];
      if (!result.IsError && result.ResultObject.CacheData != null) {
        result.ResultObject.CacheData.map((cacheItem) => {
          if (cacheItem.ProvinceID === provinceID) {
            listOptionNew.push({ value: cacheItem["DistrictID"], key: cacheItem["DistrictID"], label: cacheItem["DistrictID"] + " - " + cacheItem["DistrictName"] });
          }
        });

        let changeState = this.state;
        changeState = { ...changeState, ListOptionHuyen: listOptionNew };

        this.setState(changeState);
      } else {
        let changeState = this.state;
        changeState = { ...changeState, ListOptionHuyen: listOptionNew };

        this.setState(changeState);
      }
    });
  }

  handleGetDataCacheXa(districtID) {
    this.props.callGetCache("ERPCOMMONCACHE.WARD").then((result) => {
      let listOptionNew = [];
      if (!result.IsError && result.ResultObject.CacheData != null) {
        result.ResultObject.CacheData.map((cacheItem) => {
          if (cacheItem.DistrictID === districtID) {
            listOptionNew.push({ value: cacheItem["WardID"], key: cacheItem["WardID"], label: cacheItem["WardID"] + " - " + cacheItem["WardName"] });
          }
        });

        let changeState = this.state;
        changeState = { ...changeState, ListOptionXa: listOptionNew };

        this.setState(changeState);
      } else {
        let changeState = this.state;
        changeState = { ...changeState, ListOptionXa: listOptionNew };

        this.setState(changeState);
      }
    });
  }

  handleGetDataCacheKhoGui(districtID) {
    // let listMLObject = {
    //   QueryParamList: [
    //     {
    //       QueryKey: "",
    //       QueryValue: "",
    //       QueryType: 18,
    //       IsNotQuery: false,
    //       SubQueryParamList: [
    //         {
    //           QueryKey: "sTOREID",
    //           QueryValue: /^[0-9][0-9]*$/.test(KeyWord) == true ? KeyWord : "",
    //           QueryType: 3,
    //           IsNotQuery: false,
    //         },
    //         {
    //           QueryKey: "sTORENAME",
    //           QueryValue: KeyWord,
    //           QueryType: 2,
    //           IsNotQuery: false,
    //         },
    //       ],
    //     },
    //     {
    //       QueryKey: "cOMPANYID",
    //       QueryValue: "1",
    //       QueryType: 1,
    //       IsNotQuery: false,
    //     },
    //   ],
    //   Top: 10,
    //   IndexName: "store",
    //   TypeName: "store",
    //   IsCompressResultData: false,
    // };

    // this.props.callFetchAPI("ERPAPI", "api/CommonSearch/Search", listMLObject).then((apiResult) => {
    //   const objStore = JSON.parse(apiResult.ResultObject).hits.hits;

    //   let listOptionNew = [];

    //   for (let i = 0; i < objStore.length; i++) {
    //     listOptionNew.push({
    //       value: objStore[i]._source.sTOREID,
    //       name: objStore[i]._source.sTORENAME,
    //       StoreFax: objStore[i]._source.sTOREPHONENUM,
    //       StoreAddress: objStore[i]._source.sTOREADDRESS,
    //     });
    //   }

    //   let changeState = this.state;
    //   changeState = { ...changeState, ListOptionKhoGui: listOptionNew };

    //   this.setState(changeState);
    // });

    this.props.callGetCache("ERPCOMMONCACHE.STORE").then((result) => {
      let listOptionNew = [];
      if (!result.IsError && result.ResultObject.CacheData != null) {
        result.ResultObject.CacheData.map((cacheItem) => {
          if (cacheItem.DistrictID === districtID) {
            listOptionNew.push({ value: cacheItem["StoreID"], key: cacheItem["StoreID"], label: cacheItem["StoreID"] + " - " + cacheItem["StoreName"] });
          }
        });

        let changeState = this.state;
        changeState = { ...changeState, ListOptionKhoGui: listOptionNew };

        this.setState(changeState);
      } else {
        let changeState = this.state;
        changeState = { ...changeState, ListOptionKhoGui: listOptionNew };

        this.setState(changeState);
      }
    });
  }

  handleGetDataCacheKhoDieuPhoi() {
    this.props.callGetCache("ERPCOMMONCACHE.USER_COOSTORE_BYUSER").then((result) => {
      let listOptionNew = [];
      if (!result.IsError && result.ResultObject.CacheData != null) {
        result.ResultObject.CacheData.map((cacheItem) => {
          listOptionNew.push({ value: cacheItem["StoreID"], key: cacheItem["StoreID"], label: cacheItem["StoreID"] + " - " + cacheItem["StoreName"] });
        });

        let changeState = this.state;
        changeState = { ...changeState, ListOptionKhoDieuPhoi: listOptionNew };

        this.setState(changeState);
      } else {
        let changeState = this.state;
        changeState = { ...changeState, ListOptionKhoDieuPhoi: listOptionNew };

        this.setState(changeState);
      }
    });
  }

  handleGetDataCacheTrangThai() {
    this.props.callGetCache("ERPCOMMONCACHE.SHIPMENTORDERSTATUSGR").then((result) => {
      let listOptionNew = [];
      if (!result.IsError && result.ResultObject.CacheData != null) {
        result.ResultObject.CacheData.map((cacheItem) => {
          listOptionNew.push({
            value: cacheItem["ShipmentOrderStatusGroupID"],
            key: cacheItem["ShipmentOrderStatusGroupID"],
            label: cacheItem["ShipmentOrderStatusGroupID"] + " - " + cacheItem["ShipmentOrderStatusGroupName"],
          });
        });

        let changeState = this.state;
        changeState = { ...changeState, ListOptionTrangThai: listOptionNew };

        this.setState(changeState);
      } else {
        let changeState = this.state;
        changeState = { ...changeState, ListOptionTrangThai: listOptionNew };

        this.setState(changeState);
      }
    });
  }

  handleInputTuKhoaChange(event) {
    let stateChange = this.state;
    let objSearchData = stateChange.SearchData;

    objSearchData = { ...objSearchData, Keyword: event.currentTarget.value };
    stateChange = { ...stateChange, SearchData: objSearchData };

    this.setState(stateChange);
  }

  handleSelectTuKhoaChange(value) {
    let stateChange = this.state;
    let objSearchData = stateChange.SearchData;

    objSearchData = { ...objSearchData, Typename: value };
    stateChange = { ...stateChange, SearchData: objSearchData };

    this.setState(stateChange);
  }

  handleSelectLoaiYeuCauVanChuyenChange(value) {
    let stateChange = this.state;
    let objSearchData = stateChange.SearchData;

    objSearchData = { ...objSearchData, ShipmentOrderTypeID: value.toString() };
    stateChange = { ...stateChange, SearchData: objSearchData };

    this.setState(stateChange);
  }

  handleSelectKhoangThoiGian(value) {
    let stateChange = this.state;
    let objSearchData = stateChange.SearchData;

    objSearchData = { ...objSearchData, CreatedOrderTimeFo: value[0], CreatedOrderTimeTo: value[1] };
    stateChange = { ...stateChange, SearchData: objSearchData };

    this.setState(stateChange);
  }

  handleSelectTinhChange(value) {
    let stateChange = this.state;
    let objSearchData = stateChange.SearchData;

    objSearchData = { ...objSearchData, ReceiverProvinceID: value };
    stateChange = { ...stateChange, SearchData: objSearchData };

    this.handleGetDataCacheHuyen(value);
    this.setState(stateChange);
  }

  handleSelectHuyenChange(value) {
    let stateChange = this.state;
    let objSearchData = stateChange.SearchData;

    objSearchData = { ...objSearchData, ReceiverDistrictID: value };
    stateChange = { ...stateChange, SearchData: objSearchData };

    this.handleGetDataCacheXa(value);
    this.handleGetDataCacheKhoGui(value);
    this.setState(stateChange);
  }

  handleSelectXaChange(value) {
    let stateChange = this.state;
    let objSearchData = stateChange.SearchData;

    objSearchData = { ...objSearchData, ReceiverWardID: value };
    stateChange = { ...stateChange, SearchData: objSearchData };

    this.setState(stateChange);
  }

  handleSelectTrangThaiDieuPhoiChange(value) {
    let stateChange = this.state;
    let objSearchData = stateChange.SearchData;

    objSearchData = { ...objSearchData, IsCoordinator: value };
    stateChange = { ...stateChange, SearchData: objSearchData };

    this.setState(stateChange);
  }

  handleSelectTrangThaiChange(value) {
    let stateChange = this.state;
    let objSearchData = stateChange.SearchData;

    objSearchData = { ...objSearchData, ShipmentOrderStatusGroupID: value.toString() };
    stateChange = { ...stateChange, SearchData: objSearchData };

    this.setState(stateChange);
  }

  handleSelectPhuongTienChange(value) {
    let stateChange = this.state;
    let objSearchData = stateChange.SearchData;

    objSearchData = { ...objSearchData, CarrierTypeID: value };
    stateChange = { ...stateChange, SearchData: objSearchData };

    this.setState(stateChange);
  }

  handleSelectKhoGuiChange(value) {
    let stateChange = this.state;
    let objSearchData = stateChange.SearchData;

    objSearchData = { ...objSearchData, SenderStoreID: value };
    stateChange = { ...stateChange, SearchData: objSearchData };

    this.setState(stateChange);
  }

  handleSelectKhoDieuPhoiChange(value) {
    let stateChange = this.state;
    let objSearchData = stateChange.SearchData;

    objSearchData = { ...objSearchData, CoordinatorStoreID: value };
    stateChange = { ...stateChange, SearchData: objSearchData };

    this.setState(stateChange);
  }

  handleSearch() {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.SearchData);
    }
  }

  render() {
    let renderSelect1 = this.Select1.map((item, index) => (
      <Select.Option key={index} value={item.value}>
        {item.label}
      </Select.Option>
    ));
    let renderSelect2 = this.Select2.map((item, index) => (
      <Select.Option key={index} value={item.value}>
        {item.label}
      </Select.Option>
    ));
    let renderSelect3 = this.Select3.map((item, index) => (
      <Select.Option key={index} value={item.value}>
        {item.label}
      </Select.Option>
    ));

    return (
      <div style={{ height: "auto", backgroundColor: "white", margin: " 0", padding: "15px" }}>
        <Row gutter={[8, 8]}>
          <Col key={1}>
            <Input
              name="Keyword"
              size="middle"
              placeholder="Từ khoá"
              addonAfter={
                <Select style={{ width: "170px" }} defaultValue={-1} onChange={(value) => this.handleSelectTuKhoaChange(value)}>
                  {renderSelect1}
                </Select>
              }
              onChange={(event) => this.handleInputTuKhoaChange(event)}
            />
          </Col>

          <Col key={2}>
            <Select
              mode="multiple"
              style={{ width: "330px" }}
              maxTagTextLength={10}
              maxTagCount={2}
              placeholder="Loại yêu cầu vận chuyển"
              defaultValue={[]}
              dropdownMatchSelectWidth={400}
              optionLabelProp="label"
              onChange={(value) => this.handleSelectLoaiYeuCauVanChuyenChange(value)}
            >
              {this.state.ListOptionLoaiYeuCauVanChuyen.map((item, index) => (
                <Select.Option key={index} value={item.value} label={item.label}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col key={3}>
            <DatePicker.RangePicker
              locale={{ lang: { locale: "vi_VN", yearFormat: "YYYY" } }}
              allowEmpty={false}
              clearIcon={false}
              format="DD/MM/YYYY"
              disabledDate={(current) => current && current < moment().add(-1, "day")}
              defaultValue={[moment(moment(), "DD/MM/YYYY"), moment(moment(), "DD/MM/YYYY")]}
              onChange={(value) => this.handleSelectKhoangThoiGian(value)}
              style={{ width: "210px" }}
              ranges={{
                "Ngày hôm nay": [moment(), moment()],
              }}
            />
          </Col>

          {/* <Col key={4}>
            <Select defaultValue={-1} style={{ width: "170px" }} onChange={(value) => this.handleSelectTinhChange(value)} dropdownMatchSelectWidth={200}>
              <Select.Option key={1} value={-1}>
                Tỉnh / Thành phố
              </Select.Option>
              {this.state.ListOptionTinh.map((item, index) => (
                <Select.Option key={index + 1} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Col> */}

          {/* <Col key={5}>
            <Select defaultValue={-1} style={{ width: "200px" }} onChange={(value) => this.handleSelectHuyenChange(value)} dropdownMatchSelectWidth={250}>
              <Select.Option key={1} value={-1}>
                Quận / Huyện
              </Select.Option>
              {this.state.ListOptionHuyen.map((item, index) => (
                <Select.Option key={index + 1} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Col> */}

          {/* <Col key={6}>
            <Select defaultValue={-1} style={{ width: "200px" }} onChange={(value) => this.handleSelectXaChange(value)}>
              <Select.Option key={1} value={-1}>
                Phường / Xã
              </Select.Option>
              {this.state.ListOptionXa.map((item, index) => (
                <Select.Option key={index + 1} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Col> */}

          {/* <Col key={7}>
            <Select defaultValue={-1} style={{ width: "200px" }} dropdownMatchSelectWidth={400} onChange={(value) => this.handleSelectKhoGuiChange(value)}>
              <Select.Option key={1} value={-1}>
                Kho gửi
              </Select.Option>
              {this.state.ListOptionKhoGui.map((item, index) => (
                <Select.Option key={index + 1} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Col> */}

          <Col key={8}>
            <Select defaultValue={-1} style={{ width: "200px" }} dropdownMatchSelectWidth={400} onChange={(value) => this.handleSelectKhoDieuPhoiChange(value)}>
              <Select.Option key={1} value={-1}>
                Kho điều phối
              </Select.Option>
              {this.state.ListOptionKhoDieuPhoi.map((item, index) => (
                <Select.Option key={index + 1} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Col>

          {/* <Col key={9}>
            <Select
              mode="multiple"
              style={{ width: "200px" }}
              maxTagTextLength={10}
              maxTagCount={1}
              placeholder="Trạng thái"
              defaultValue={[1, 2, 3]}
              optionLabelProp="label"
              onChange={(value) => this.handleSelectTrangThaiChange(value)}
            >
              {this.state.ListOptionTrangThai.map((item, index) => (
                <Select.Option key={index + 1} key={index} value={item.value} label={item.label}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Col> */}

          {/* <Col key={10}>
            <Select defaultValue={-1} style={{ width: "180px" }} onChange={(value) => this.handleSelectTrangThaiDieuPhoiChange(value)}>
              {renderSelect2}
            </Select>
          </Col> */}

          <Col key={11}>
            <Select value={this.state.SearchData.CarrierTypeID} style={{ width: "160px" }} onChange={(value) => this.handleSelectPhuongTienChange(value)}>
              {renderSelect3}
            </Select>
          </Col>

          <Col key={12}>
            <Button size="middle" type="primary" onClick={this.handleSearch}>
              <Space>
                <i className="fa fa-search"></i>Tìm kiếm
              </Space>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AppInfo: state,
    FetchAPIInfo: state.FetchAPIInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callGetCache: (cacheKeyID) => {
      return dispatch(callGetCache(cacheKeyID));
    },
    callFetchAPI: (hostname, hostURL, postData) => {
      return dispatch(callFetchAPI(hostname, hostURL, postData));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchFormShipmentRouteAuto);
