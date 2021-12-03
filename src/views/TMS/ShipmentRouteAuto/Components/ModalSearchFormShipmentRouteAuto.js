import { Col, Drawer, Input, Row, Table, Select, Radio, Space, Card, Tag, Divider, Typography } from "antd";
import React, { Component } from "react";

export default class ModalSearchFormShipmentRouteAutoCom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Drawer title={<h3>Phân tuyến điều phối vận đơn</h3>} placement="right" closable={true} visible={true} maskClosable={true} width="50vw" mask={false}>
        <Row gutter={[8, 16]} style={{ marginBottom: "10px" }}>
          <Col span={6}>Đối tác :</Col>
          <Col span={9}>
            <Select defaultValue="lucy" style={{ width: "100%" }}>
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="Yiminghe">yiminghe</Select.Option>
            </Select>
          </Col>
          <Col span={9}>
            <Radio.Group buttonStyle="solid">
              <Space>
                <Radio.Button value={1}>
                  <Space>
                    <i class="fa fa-motorcycle"></i> Xe máy
                  </Space>
                </Radio.Button>
                <Radio.Button value={2}>
                  <Space>
                    <i class="fa fa-truck"></i> Xe tải
                  </Space>
                </Radio.Button>
              </Space>
            </Radio.Group>
          </Col>
        </Row>
        <Row gutter={[8, 16]} style={{ marginBottom: "10px" }}>
          <Col span={6}>Nhân viên giao :</Col>
          <Col span={18}>
            <Select defaultValue="lucy" style={{ width: "100%" }}>
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="Yiminghe">yiminghe</Select.Option>
            </Select>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: "black" }}></Divider>
        <div style={{ height: "300px", overflowX: "hidden", overflowY: "auto" }}>
          <Row gutter={24} style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Card
                size="small"
                headStyle={{ border: "1px solid #74b9ff", borderBottom: "none" }}
                bodyStyle={{ border: "1px solid #74b9ff" }}
                // bordered={true}
                title={
                  <Space>
                    <Tag color="cyan">211202000000071</Tag>
                    <Tag color="orange">
                      <Space>
                        <i class="ti ti-timer"></i> 00:11
                      </Space>
                    </Tag>
                    <Tag color="green">
                      <Space>
                        0 <i class="fa fa-dollar"></i>
                      </Space>
                    </Tag>
                  </Space>
                }
                style={{ width: "100%" }}
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Row gutter={24}>
                      <Col span={24}>
                        <Typography>
                          <Typography.Paragraph style={{ color: "#4d5259", fontSize: "13px", lineHeight: "24px" }}>
                            Kiểm tra dây nguồn đèn bảng hiệu có đi ruột gà,ruột gà có bị bể,đứt đoạn
                          </Typography.Paragraph>
                        </Typography>
                      </Col>
                    </Row>
                    <Row gutter={[8, 16]}>
                      <Col span={8}>
                        <Tag.CheckableTag checked style={{ width: "100%", borderColor: "#1890ff", textAlign: "center" }}>
                          <Space>
                            <i class="fa fa-motorcycle"></i> Xe máy
                          </Space>
                        </Tag.CheckableTag>
                      </Col>
                      <Col span={8}>
                        <Tag.CheckableTag style={{ width: "100%", borderColor: "#74b9ff", textAlign: "center" }}>
                          <Space>
                            <i class="fa fa-truck"></i> Xe tải
                          </Space>
                        </Tag.CheckableTag>
                      </Col>
                      <Col span={8}>
                        <Tag.CheckableTag checked style={{ width: "100%", backgroundColor: "#33cabb", borderColor: "#33cabb", textAlign: "center" }}>
                          <Space>
                            <i class="fa fa-edit"></i> Ghi chú
                          </Space>
                        </Tag.CheckableTag>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Divider type="vertical" style={{ height: "100%", backgroundColor: " #74b9ff" }}></Divider>
                  </Col>
                  <Col span={8}></Col>
                  <Col span={2}></Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Card
                size="small"
                headStyle={{ border: "1px solid #74b9ff", borderBottom: "none" }}
                bodyStyle={{ border: "1px solid #74b9ff" }}
                // bordered={true}
                title={
                  <Space>
                    <Tag color="cyan">211202000000071</Tag>
                    <Tag color="orange">
                      <Space>
                        <i class="ti ti-timer"></i> 00:11
                      </Space>
                    </Tag>
                    <Tag color="green">
                      <Space>
                        0 <i class="fa fa-dollar"></i>
                      </Space>
                    </Tag>
                  </Space>
                }
                style={{ width: "100%" }}
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Row gutter={24}>
                      <Col span={24}>
                        <Typography>
                          <Typography.Paragraph style={{ color: "#4d5259", fontSize: "13px", lineHeight: "24px" }}>
                            Kiểm tra dây nguồn đèn bảng hiệu có đi ruột gà,ruột gà có bị bể,đứt đoạn
                          </Typography.Paragraph>
                        </Typography>
                      </Col>
                    </Row>
                    <Row gutter={[8, 16]}>
                      <Col span={8}>
                        <Tag.CheckableTag checked style={{ width: "100%", borderColor: "#1890ff", textAlign: "center" }}>
                          <Space>
                            <i class="fa fa-motorcycle"></i> Xe máy
                          </Space>
                        </Tag.CheckableTag>
                      </Col>
                      <Col span={8}>
                        <Tag.CheckableTag style={{ width: "100%", borderColor: "#74b9ff", textAlign: "center" }}>
                          <Space>
                            <i class="fa fa-truck"></i> Xe tải
                          </Space>
                        </Tag.CheckableTag>
                      </Col>
                      <Col span={8}>
                        <Tag.CheckableTag checked style={{ width: "100%", backgroundColor: "#33cabb", borderColor: "#33cabb", textAlign: "center" }}>
                          <Space>
                            <i class="fa fa-edit"></i> Ghi chú
                          </Space>
                        </Tag.CheckableTag>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Divider type="vertical" style={{ height: "100%", backgroundColor: " #74b9ff" }}></Divider>
                  </Col>
                  <Col span={8}></Col>
                  <Col span={2}></Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Card
                size="small"
                headStyle={{ border: "1px solid #74b9ff", borderBottom: "none" }}
                bodyStyle={{ border: "1px solid #74b9ff" }}
                // bordered={true}
                title={
                  <Space>
                    <Tag color="cyan">211202000000071</Tag>
                    <Tag color="orange">
                      <Space>
                        <i class="ti ti-timer"></i> 00:11
                      </Space>
                    </Tag>
                    <Tag color="green">
                      <Space>
                        0 <i class="fa fa-dollar"></i>
                      </Space>
                    </Tag>
                  </Space>
                }
                style={{ width: "100%" }}
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Row gutter={24}>
                      <Col span={24}>
                        <Typography>
                          <Typography.Paragraph style={{ color: "#4d5259", fontSize: "13px", lineHeight: "24px" }}>
                            Kiểm tra dây nguồn đèn bảng hiệu có đi ruột gà,ruột gà có bị bể,đứt đoạn
                          </Typography.Paragraph>
                        </Typography>
                      </Col>
                    </Row>
                    <Row gutter={[8, 16]}>
                      <Col span={8}>
                        <Tag.CheckableTag checked style={{ width: "100%", borderColor: "#1890ff", textAlign: "center" }}>
                          <Space>
                            <i class="fa fa-motorcycle"></i> Xe máy
                          </Space>
                        </Tag.CheckableTag>
                      </Col>
                      <Col span={8}>
                        <Tag.CheckableTag style={{ width: "100%", borderColor: "#74b9ff", textAlign: "center" }}>
                          <Space>
                            <i class="fa fa-truck"></i> Xe tải
                          </Space>
                        </Tag.CheckableTag>
                      </Col>
                      <Col span={8}>
                        <Tag.CheckableTag checked style={{ width: "100%", backgroundColor: "#33cabb", borderColor: "#33cabb", textAlign: "center" }}>
                          <Space>
                            <i class="fa fa-edit"></i> Ghi chú
                          </Space>
                        </Tag.CheckableTag>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Divider type="vertical" style={{ height: "100%", backgroundColor: " #74b9ff" }}></Divider>
                  </Col>
                  <Col span={8}></Col>
                  <Col span={2}></Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Card
                size="small"
                headStyle={{ border: "1px solid #74b9ff", borderBottom: "none" }}
                bodyStyle={{ border: "1px solid #74b9ff" }}
                // bordered={true}
                title={
                  <Space>
                    <Tag color="cyan">211202000000071</Tag>
                    <Tag color="orange">
                      <Space>
                        <i class="ti ti-timer"></i> 00:11
                      </Space>
                    </Tag>
                    <Tag color="green">
                      <Space>
                        0 <i class="fa fa-dollar"></i>
                      </Space>
                    </Tag>
                  </Space>
                }
                style={{ width: "100%" }}
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Row gutter={24}>
                      <Col span={24}>
                        <Typography>
                          <Typography.Paragraph style={{ color: "#4d5259", fontSize: "13px", lineHeight: "24px" }}>
                            Kiểm tra dây nguồn đèn bảng hiệu có đi ruột gà,ruột gà có bị bể,đứt đoạn
                          </Typography.Paragraph>
                        </Typography>
                      </Col>
                    </Row>
                    <Row gutter={[8, 16]}>
                      <Col span={8}>
                        <Tag.CheckableTag checked style={{ width: "100%", borderColor: "#1890ff", textAlign: "center" }}>
                          <Space>
                            <i class="fa fa-motorcycle"></i> Xe máy
                          </Space>
                        </Tag.CheckableTag>
                      </Col>
                      <Col span={8}>
                        <Tag.CheckableTag style={{ width: "100%", borderColor: "#74b9ff", textAlign: "center" }}>
                          <Space>
                            <i class="fa fa-truck"></i> Xe tải
                          </Space>
                        </Tag.CheckableTag>
                      </Col>
                      <Col span={8}>
                        <Tag.CheckableTag checked style={{ width: "100%", backgroundColor: "#33cabb", borderColor: "#33cabb", textAlign: "center" }}>
                          <Space>
                            <i class="fa fa-edit"></i> Ghi chú
                          </Space>
                        </Tag.CheckableTag>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Divider type="vertical" style={{ height: "100%", backgroundColor: " #74b9ff" }}></Divider>
                  </Col>
                  <Col span={8}></Col>
                  <Col span={2}></Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </Drawer>
    );
  }
}
