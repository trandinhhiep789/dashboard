import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { DEFAULT_ROW_PER_PAGE } from "../../../../constants/systemVars";
import { callGetUserCache } from "./../../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST } from "./../../../../constants/functionLists";
import { hideModal } from "../../../../actions/modal";
import { ModalManager } from "react-dynamic-modal";
import { MessageModal } from "./../../../../common/components/Modal/index";
import { Button, Card, Space, Table, Modal } from "antd";
import { APIHostName } from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";

class DataGridNewUICom extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.onChangePageHandle = this.onChangePageHandle.bind(this);
    this.handleCloseModel = this.handleCloseModel.bind(this);

    this._genCommentTime = this._genCommentTime.bind(this);
    this.callLoadData = this.callLoadData.bind(this);
    this.handleSelectRow = this.handleSelectRow.bind(this);

    const pkColumnName = this.props.PKColumnName.split(",");
    const listPKColumnName = pkColumnName.map((item) => {
      return { key: item };
    });

    this.state = {
      GridData: {},
      DataSource: this.props.dataSource,
      IsCheckAll: false,
      PageNumber: this.props.PageNumber,
      ListPKColumnName: listPKColumnName,
      ListColumnTable: [{}],
      DataSourceTable: [{}],
      DataSourceExpands: {},
      DataSourceTableRowSelect: [],
      openModal: false,
      expandedRowKeys: []
    };
  }

  componentDidMount() {
    if (this.props.dataSource) {
      const dataSource = this.props.dataSource.map((item_1, index_1) => {
        let objItem = { key: index_1 };
        this.props.listColumn.forEach((item_2, index_2) => {
          if (item_2.Type === "datetime") {
            item_1[item_2.DataSourceMember] = this._genCommentTime(item_1[item_2.DataSourceMember]);
          }

          objItem = Object.assign(objItem, { [item_2.DataSourceMember]: item_1[item_2.DataSourceMember] });
        });
        return { ...objItem };
      });
      this.setState({ DataSourceTable: dataSource });
    }

    if (this.props.listColumn) {
      console.log("this.props.listColumn: ", this.props.listColumn)
      const listColumn = this.props.listColumn.map((item, index) => {
        return { title: <span style={{ fontWeight: "bold" }}>{item.Caption}</span>, dataIndex: item.DataSourceMember, key: item.ShipmentRouteID, width: item.Width + "px", render: item.Name == "ShipmentRouteID" && (text => <p style={{color:"#33cabb", fontWeight: "700"}}>{text}</p>) };
      });
      this.setState({ ListColumnTable: listColumn });
    }

    let permissionKey = this.props.RequirePermission;
    if (!permissionKey) {
      this.setState({ IsPermision: true });
      return;
    }

    this.checkPermission(permissionKey).then((result) => {
      this.setState({ IsPermision: result });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
      // Check if it's a new user, you can also use some unique property, like the ID
      const dataSource = nextProps.dataSource.map((item_1, index) => {
        let objItem = { key: index };
        this.props.listColumn.forEach((item_2, index) => {
          if (item_2.Type === "datetime") {
            item_1[item_2.DataSourceMember] = this._genCommentTime(item_1[item_2.DataSourceMember]);
          }

          objItem = Object.assign(objItem, { [item_2.DataSourceMember]: item_1[item_2.DataSourceMember] });
        });
        return { ...objItem };
      });

      this.setState({
        DataSourceTable: dataSource,
        DataSource: nextProps.dataSource,
        PageNumber: nextProps.PageNumber,
      });
    }
  }

  showMessage(message) {
    ModalManager.open(<MessageModal title="Thông báo" message={message} onRequestClose={() => true} onCloseModal={this.handleCloseMessage} />);
  }

  callLoadData(shipmentRouteID) {
    this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/Load_1", shipmentRouteID).then((apiResult) => {
      if (apiResult.IsError) {
        this.showMessage(apiResult.Message);
      } else {
        let objDataSourceExpands = this.state.DataSourceExpands;
        objDataSourceExpands = { ...objDataSourceExpands, [shipmentRouteID]: apiResult.ResultObject };
        this.setState({ DataSourceExpands: objDataSourceExpands });
      }
    });
  }

  onChangePageHandle(pageNum) {
    this.setState({ PageNumber: pageNum });
    if (this.props.onChangePage != null) this.props.onChangePage(pageNum);
  }

  handleDeleteClick() {
    var doDelete = () => {
      if (this.state.DataSourceTableRowSelect.length == 0) {
        this.showMessage("Vui lòng chọn ít nhất một dòng cần xóa!");
        return;
      }
      const confir = confirm("Bạn có chắc rằng muốn xóa ?");
      if (confir == 1) {
        let dataSourceTableRowSelect = this.state.DataSourceTableRowSelect;
        let dataExport = dataSourceTableRowSelect.reduce((a, v) => {
          return [...a, { [this.props.PKColumnName]: v }];
        }, []);
        this.props.onDeleteClick(dataExport);
      }
    };

    if (this.props.DeletePermission) {
      this.checkPermission(this.props.DeletePermission).then((result) => {
        if (result == true) {
          doDelete();
        } else if (result == "error") {
          this.showMessage("Lỗi khi kiểm tra quyền");
        } else {
          this.showMessage("Bạn không có quyền xóa!");
        }
      });
    } else {
      doDelete();
    }
  }

  handleInsertCustomClick() {
    if (this.state.DataSourceTableRowSelect.length == 0) {
      this.showMessage("Vui lòng chọn ít nhất một dòng cần tính khoản cách!");
      return;
    }
    const confir = confirm("Bạn có chắc rằng muốn tính khoản cách ?");
    if (confir == 1) {
      let dataSourceTableRowSelect = this.state.DataSourceTableRowSelect;
      let dataExport = dataSourceTableRowSelect.reduce((a, v) => {
        return [...a, { [this.props.PKColumnName]: v }];
      }, []);

      if (this.props.onInsertCustom != null) this.props.onInsertCustom(dataExport);
    }
  }

  getPageCount(dataRows) {
    if (dataRows == null) return 1;
    let rowsPerPage = DEFAULT_ROW_PER_PAGE;
    if (this.props.RowsPerPage != null) rowsPerPage = this.props.RowsPerPage;
    let pageCount = parseInt(Math.ceil(dataRows.TotaLRows / rowsPerPage));
    if (pageCount < 1) pageCount = 1;
    return pageCount;
  }

  getDisplayData(dataSource) {
    if (!this.props.IsAutoPaging) return dataSource;
    let resultData = [];
    if (dataSource == null) return resultData;
    let rowsPerPage = DEFAULT_ROW_PER_PAGE;
    if (this.props.RowsPerPage != null) rowsPerPage = this.props.RowsPerPage;
    let startRowIndex = (this.state.PageNumber - 1) * rowsPerPage;
    let endRowIndex = startRowIndex + rowsPerPage;
    if (endRowIndex > dataSource.length) endRowIndex = dataSource.length;
    for (let i = startRowIndex; i < endRowIndex; i++) {
      resultData.push(dataSource[i]);
    }
    return resultData;
  }

  _genCommentTime(dates) {
    const date = new Date(Date.parse(dates));
    let hour = date.getHours();
    let minute = date.getMinutes();
    let timeDisplay = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
    let month = date.getMonth() + 1;
    return date.getDate() + "/" + (month < 10 ? "0" + month : month) + "/" + date.getFullYear() + " " + timeDisplay;
  }

  handleSelectRow(selectedRowKeys) {
    this.setState({ DataSourceTableRowSelect: selectedRowKeys });
  }

  renderDataGrid() {
    return (
      <div>
        <Table
        id="tableChildren"
        rowKey={(item) => item.ShipmentRouteID}
        columns={this.state.ListColumnTable}
        dataSource={this.state.DataSourceTable}
        bordered
        rowSelection={{ type: "checkbox", onChange: this.handleSelectRow }}
        pagination={{ position: ["bottomCenter"], responsive: true, pageSize: this.props.RowsPerPage }}
        size="small"
        expandable={{
          expandedRowRender: (record) => {
            console.log(this.state.DataSourceExpands);
            console.log("record: " + record)

            const columnChild = [
              { title: <span style={{ fontWeight: "bold" }}>Thời gian giao</span>, dataIndex: "ExpectedDeliveryDate", width: "20%" },
              { title: <span style={{ fontWeight: "bold" }}>Địa chỉ</span>, dataIndex: "ReceiverFullAddress", width: "30%" },
              { title: <span style={{ fontWeight: "bold" }}>Mã loại yêu cầu vận chuyển</span>, dataIndex: "ShipmentOrderID", width: "20%" },
              { title: <span style={{ fontWeight: "bold" }}>Tên sản phầm / Ghi chú</span>, dataIndex: "ShipItemNameList", width: "30%" },
            ];

            const dataSourceChild =
              this.state.DataSourceExpands[record.ShipmentRouteID] &&
              this.state.DataSourceExpands[record.ShipmentRouteID].ShipmentRoute_OrderItemList.map((item, index) => {
                return {
                  key: index,
                  ExpectedDeliveryDate: this._genCommentTime(item.ShipmentOrder.ExpectedDeliveryDate),
                  ReceiverFullAddress: item.ShipmentOrder.ReceiverFullAddress,
                  ShipmentOrderID: item.ShipmentOrder.ShipmentOrderID,
                  ShipItemNameList: item.ShipmentOrder.ShipItemNameList,
                };
              });
            return (
              <Modal
                title="Thông tin phân tuyến"
                centered
                visible={this.state.openModal}
                onOk={() => this.setState({openModal:false})}
                onCancel={() => this.setState({openModal:false})}
                width={1000}
                afterClose={() => {
                  this.setState({openModal:false})
                  this.setState({expandedRowKeys: []});
                }}
              >
                <div style={{ border: "1px solid rgb(0, 120, 220)" }}>
                  <Table
                    showHeader={false}
                    columns={[
                      { title: "", dataIndex: "Title1", width: "16.6%" },
                      { title: "", dataIndex: "Content1", width: "16.6%" },
                      { title: "", dataIndex: "Title2", width: "16.6%" },
                      { title: "", dataIndex: "Content2", width: "auto" },
                    ]}
                    dataSource={[
                      {
                        Title1: <span style={{ fontWeight: "bold" }}>Tên Bảng Đơn Giá Thưởng:</span>,
                        Content1: record.ShipmentRouteID,
                        Title2: <span style={{ fontWeight: "bold" }}>Ngày Phân Tuyến:</span>,
                        Content2: record.CreatedDate,
                      },
                      {
                        Title1: <span style={{ fontWeight: "bold" }}>Thời Gian Bắt Đầu Đi:</span>,
                        Content1: record.ExpectedBeginDeliveryDate,
                        Title2: <span style={{ fontWeight: "bold" }}>Khoản Cách Thực Tế:</span>,
                        Content2: record.ActualDeliveryDistance,
                      },
                      {
                        Title1: <span style={{ fontWeight: "bold" }}>Nhân Viên Giao:</span>,
                        Content1: record.DeliverUserFullNameList,
                        Title2: <span style={{ fontWeight: "bold" }}>Tuyến Đường Giao:</span>,
                        Content2: record.RouteNote == "" ? record.RouteNote : record.RouteNote.replace(/;/g, "<br/>"),
                      },
                    ]}
                    pagination={false}
                  />
                  <Table id="tableChildrenDetail" columns={columnChild} dataSource={dataSourceChild} pagination={false} bordered size="small" />
            
                </div>
              </Modal>
            );
          },
          onExpand: (expanded, record) => {
            var keys = [];
            if (expanded) {
              this.callLoadData(record.ShipmentRouteID);
              this.setState({openModal:true})
              keys.push(record.ShipmentRouteID);
              this.setState({expandedRowKeys: keys});
            }
          },
          expandIcon: null,
          columnWidth: 0,
          expandRowByClick: true,
        }}
        expandedRowKeys={this.state.expandedRowKeys}
      />
      </div>
    );
  }


  checkPermission(permissionKey) {
    return new Promise((resolve, reject) => {
      this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
        if (!result.IsError && result.ResultObject.CacheData != null) {
          for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
            if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {
              resolve(true);
              return;
            }
          }
          resolve(false);
        } else {
          resolve("error");
        }
      });
    });
  }

  handleCloseModel() {
    this.props.hideModal();
  }

  render() {
    let searchTextbox = <div></div>;
    if (this.props.hasSearch) {
      searchTextbox = (
        <div className="lookup">
          <input className="w-200px" type="text" name="txtKeyword" placeholder="Search" onKeyPress={this.handleKeyPress} />
        </div>
      );
    }
    const pageCount = this.getPageCount(this.props.dataSource[0]);
    const datagrid = this.renderDataGrid();
    let hasHeaderToolbar = true;
    if (this.props.isHideHeaderToolbar) hasHeaderToolbar = false;
    let HideHeaderToolbarGroupTextBox = false;
    if (this.props.isHideHeaderToolbarGroupTextBox) HideHeaderToolbarGroupTextBox = true;
    let MultipleCheck = false;
    if (this.props.isMultipleCheck) MultipleCheck = true;
    if (this.state.IsPermision == undefined) {
      return <p className="col-md-12">Đang kiểm tra quyền...</p>;
    }
    if (this.state.IsPermision == false) {
      return <p className="col-md-12">Bạn không có quyền!</p>;
    }
    if (this.state.IsPermision === "error") {
      return <p className="col-md-12">Lỗi khi kiểm tra quyền, vui lòng thử lại</p>;
    }
    let classCustom;
    if (this.props.classCustom != "") {
      classCustom = "col-lg-12 SearchForm";
    } else {
      classCustom = "";
    }

    return (
      <div className={classCustom}>
        <div className="card">
          <div className="">
            {this.props.title != undefined || this.props.title != "" ? <h4 className="title">{this.props.title}</h4> : ""}

            {hasHeaderToolbar && (
              <div className="flexbox mr-10 ">
                {searchTextbox}
                <div className="btn-toolbar">
                  <div className="btn-group btn-group-sm">
                    {this.props.IsAdd == true || this.props.IsAdd == undefined ? (
                      !this.props.IsCustomAddLink == true ? (
                        <Link
                          to={{
                            pathname: this.props.AddLink,
                            state: {
                              params: this.props.params,
                            },
                          }}
                        >
                          <button type="button" className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm">
                            <span className="fa fa-plus ff"> Thêm </span>
                          </button>
                        </Link>
                      ) : (
                        <button type="button" onClick={this.handleInsertClick} className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm">
                          <span className="fa fa-plus ff"> Thêm </span>
                        </button>
                      )
                    ) : (
                      ""
                    )}
                    {this.props.IsCustomAddNew == true && this.state.DataSourceTableRowSelect.length > 0 ? (
                      <Button type="primary" size="middle" shape="round" onClick={this.handleInsertCustomClick.bind(this)}>
                        <Space>
                          <i className="fa fa-plus ff"></i> Tính lại tuyến đường
                        </Space>
                      </Button>
                    ) : (
                      ""
                    )}
                    {(this.props.IsDelete == true || this.props.IsDelete == undefined) && this.state.DataSourceTableRowSelect.length > 0 ? (
                      <Button type="default" size="middle" shape="round" className="ml-10" danger onClick={this.handleDeleteClick}>
                        <Space>
                          <i className="fa fa-remove"></i> Xoá
                        </Space>
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="card-body">
            {datagrid}

            {/* {this.props.IsAutoPaging && <GridPage numPage={pageCount} currentPage={this.state.PageNumber} onChangePage={this.onChangePageHandle} />} */}

            {HideHeaderToolbarGroupTextBox && (
              <div className="flexbox mb-20 ">
                <div></div>
                <div className="btn-toolbar">
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-w-md btn-round btn-info" onClick={this.handleOneInsertClick}>
                      Chọn
                    </button>
                    {MultipleCheck && (
                      <button className="btn btn-w-md btn-round btn-info ml-20" onClick={this.handleMultipleInsertClick}>
                        Chọn & Tiếp tục
                      </button>
                    )}
                    <button className="btn btn-w-md btn-round btn-secondary  ml-20" onClick={this.handleCloseModel}>
                      Bỏ qua
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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
    callGetUserCache: (cacheKeyID) => {
      return dispatch(callGetUserCache(cacheKeyID));
    },
    hideModal: () => {
      dispatch(hideModal());
    },
  };
};

const DataGridNewUI = connect(mapStateToProps, mapDispatchToProps)(DataGridNewUICom);
export default DataGridNewUI;
