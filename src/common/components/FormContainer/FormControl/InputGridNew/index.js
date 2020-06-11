import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { showModal } from '../../../../../actions/modal';
import ModelContainer from "../../../../components/Modal/ModelContainer";
import { connect } from 'react-redux';
import { MessageModal } from "../../../Modal";
import InputGridCell from "./InputGridCell";
import { GetMLObjectData, GetMLObjectDataList } from "../../../../library/form/FormLib";
import { callGetCache } from "../../../../../actions/cacheAction";
import { DEFAULT_ROW_PER_PAGE } from "../../../../../constants/systemVars.js";
import InputGridPage from "./InputGridPage";
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../../../constants/functionLists";
import { ValidationField } from "../../../../library/validation.js";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { MODAL_TYPE_CONFIRMATIONNEW, MODAL_TYPE_CONFICOMPONET } from '../../../../../constants/actionTypes';

class InputGridNewCom extends Component {
	static defaultProps = {
		componenttype: 'InputControl'
	}
	constructor(props) {
		super(props);
		this.handleInsertClick = this.handleInsertClick.bind(this);
		this.renderInputGrid = this.renderInputGrid.bind(this);
		this.handleInsertClickEdit = this.handleInsertClickEdit.bind(this);
		this.handleonClickDelete = this.handleonClickDelete.bind(this);
		this.onChangePageHandle = this.onChangePageHandle.bind(this);

		this.state = {
			GridData: {},
			dataSource: [],
			PageNumber: 1
		};
	}

	componentWillReceiveProps(nextProps) {
		if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
			this.setState({
				dataSource: nextProps.dataSource
			})
		}
	}

	handleCloseMessage() {
	}
	showMessage(message) {
		ModalManager.open(<MessageModal title="Thông báo"
			message={message} onRequestClose={() => true}
			onCloseModal={this.handleCloseMessage}
		/>);
	}
	onChangePageHandle(pageNum) {
		this.setState({ PageNumber: pageNum });
	}

	//#endregion bind Data

	//#region Delete
	handleonClickDelete(lstdelete) {
		let confir = 1;
		if ((typeof this.props.isUseConfirmMessage === "undefined") ||
			(typeof this.props.isUseConfirmMessage !== "undefined" && this.props.isUseConfirmMessage == true)) {
			confir = confirm("Bạn có chắc rằng muốn xóa ?");
		}
		if (confir == 1) {
			const { Delete, APIHostName, ID } = this.props
			let CreatedUser = this.props.AppInfo.LoginInfo.Username;
			let formData = {};
			let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
			formData.ProductID = ID;
			formData.CreatedUser = CreatedUser;
			formData.DeletedUser = CreatedUser;
			formData.LoginLogID = LoginLogID;
			formData = Object.assign({}, formData, lstdelete);
			this.props.callFetchAPI(APIHostName, Delete, formData).then(apiResult => {
				if (!apiResult.IsError) {
					this.setState({
						dataSource: apiResult.ResultObject
					});
				}
				else {
					this.showMessage(apiResult.Message);
				}
			});
		}

	}
	//#endregion Delete

	handleInsertClick() {


		if (this.props.onInsertClick != null) {
			this.props.onInsertClick();
		}
		else {
			let listColumnNew = this.props.listColumn.filter((person, index) => {
				if (this.props.listColumn[index].iputpop == true || this.props.listColumn[index].iputpop === undefined) { return person; }
			});
			this.props.showModal(MODAL_TYPE_CONFIRMATIONNEW, {
				title: 'Cập nhật ' + this.props.title,
				onConfirm: (isConfirmed, formData) => {
					let dataSource = this.props.dataSource;
					this.onInsertdb(formData);
				},
				modalElementList: listColumnNew,
				modalElementOl: this.props.MLObjectDefinition
			});
		}

	}
	onInsertdb(formData) {

		const { edit, APIHostName, ID } = this.props
		let CreatedUser = this.props.AppInfo.LoginInfo.Username;
		let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
		formData.ProductID = ID;
		formData.CreatedUser = CreatedUser
		formData.UpDatedUser = CreatedUser
		formData.LoginLogID = LoginLogID

		this.props.callFetchAPI(APIHostName, edit, formData).then(apiResult => {
			if (!apiResult.IsError) {
				this.setState({
					dataSource: apiResult.ResultObject, IsCheckAll: false
				});
			}
		});
	}
	handleInsertClickEdit(index) {
		if (this.props.onInsertClickEdit != null) {
			let dataSourcenewư = this.state.dataSource[index];
			this.props.onInsertClickEdit(dataSourcenewư);
		}
		else {
			let listColumnNew = this.props.listColumn.filter((person, index) => {
				if (this.props.listColumn[index].iputpop == true || this.props.listColumn[index].iputpop === undefined) { return person; }
			});
			let dataSourcenew = this.state.dataSource[index];
			if (this.props.value != null) {
				dataSourcenew = this.props.value[index];
			}

			this.props.showModal(MODAL_TYPE_CONFIRMATIONNEW, {
				title: 'Chỉnh sửa ' + this.props.title,
				onConfirm: (isConfirmed, formData) => {
					this.onInsertdb(formData);
				},
				modalElementList: listColumnNew,
				modalElementOl: this.props.MLObjectDefinition,
				dataSource: dataSourcenew
			});
		}

	}

	getPageCount(dataSource) {

		if (dataSource == null)
			return 1;
		let rowsPerPage = DEFAULT_ROW_PER_PAGE;
		if (this.props.RowsPerPage != null)
			rowsPerPage = this.props.RowsPerPage;
		let pageCount = parseInt(Math.ceil(dataSource.length / rowsPerPage));
		if (pageCount < 1)
			pageCount = 1;
		return pageCount;
	}
	getDisplayData(dataSource) {
		if (!this.props.IsAutoPaging)
			return dataSource;
		let resultData = [];
		if (dataSource == null)
			return resultData;
		let rowsPerPage = DEFAULT_ROW_PER_PAGE;
		if (this.props.RowsPerPage != null)
			rowsPerPage = this.props.RowsPerPage;

		let startRowIndex = (this.state.PageNumber - 1) * rowsPerPage;
		let endRowIndex = startRowIndex + rowsPerPage;
		if (endRowIndex > dataSource.length)
			endRowIndex = dataSource.length;
		for (let i = startRowIndex; i < endRowIndex; i++) {
			resultData.push(dataSource[i]);
		}
		return resultData;
	}

	renderInputGrid() {
		const listColumn = this.props.listColumn;
		let listColumnNew = listColumn.filter((person, index) => {
			if (listColumn[index].hideInput == true || listColumn[index].hideInput === undefined) { return person; }
		});
		let dataSource = this.state.dataSource;
		//   console.log("renderInputGrid=>dataSource",this.state.dataSource);
		if (this.props.IsAutoPaging) {
			dataSource = this.getDisplayData(dataSource);
		}
		const idSelectColumnName = this.props.IDSelectColumnName;
		return (
			<table className="table table-bordered">
				<thead>
					<tr className="jsgrid-header-row">
						{
							listColumnNew.map((elementItem, index) => {
								let cellStyle = {
									width: elementItem.Width
								};
								let columHeader = elementItem.Caption;
								if (elementItem.Type == "checkbox" && elementItem.Caption == "") {
									const className = "form-control form-control-sm";
									columHeader = <input type="checkbox" className={className} onChange={this.checkAll} checked={this.state.IsCheckAll} />
								}
								else if (elementItem.Type == "checkboxAll" && elementItem.Caption == "") {
									const className = "form-control form-control-sm";
									if (this.props.IsPermisionDelete == true || this.props.IsPermisionDelete == undefined) {
										columHeader = <input type="checkbox" className={className} onChange={this.checkAll} checked={this.state.IsCheckAll} />
									}
									else {
										columHeader = <input type="checkbox" disabled={true} className={className} />

									}
								}
								if (elementItem.Type == "checkbox") {
									cellStyle = {
										width: elementItem.Width,
										textAlign: "center"
									};
								}
								return (
									<th key={elementItem.Name} className="jsgrid-header-cell" style={cellStyle}>{columHeader}</th>
								);
							})
						}
					</tr>
				</thead>
				<tbody>
					{dataSource != null &&
						dataSource.map((rowItem, rowIndex) => {
							let rowClass = "jsgrid-row";
							if (index % 2 != 0) {
								rowClass = "jsgrid-alt-row";
							}
							let isChecked = false;
							const checkList = this.state.GridData[idSelectColumnName];
							if (checkList != null) {
								if (checkList[rowIndex] != null) {
									isChecked = checkList[rowIndex].IsChecked;
								}
							}
							return (<tr key={rowIndex}>
								{
									listColumnNew.map((columnItem, index) => {
										const cellStyle = {
											width: columnItem.Width,
											verticalAlign: "middle"
										};
										let isChecked = false;
										const checkList = this.state.GridData[idSelectColumnName];
										//  console.log("dataSource checkList :", checkList,columnItem.Name,idSelectColumnName);
										if (checkList != null) {
											if (checkList[rowIndex] != null && columnItem.Name == idSelectColumnName) {
												//console.log("dataSource checkList[rowIndex].IsChecked :", checkList[rowIndex].IsChecked,);
												isChecked = checkList[rowIndex].IsChecked;
											}
										}
										if (columnItem.Type == "checkbox" && columnItem.Name != idSelectColumnName) {
											isChecked = rowItem[columnItem.DataSourceMember];

										}
										// console.log("rowItem[columnItem.DataSourceMember]:",rowItem[columnItem.DataSourceMember]);
										if (columnItem.Type == "checkboxAll" && columnItem.Name != idSelectColumnName) {
											//	console.log("this.state.lstobjDelete",this.state.lstobjDelete);
											if (this.state.lstobjDelete[rowIndex])
												isChecked = this.state.lstobjDelete[rowIndex].IsChecked;

										}

										let DataSourceMember = columnItem.DataSourceMember;
										if (columnItem.Type === "combobox" && this.props.Ispopup === true) {
											DataSourceMember = columnItem.ID;
										}
										let ovjvalue = rowItem[DataSourceMember] === undefined ? "" : rowItem[DataSourceMember];
										let lstdelete = {};
										if (columnItem.Type === "editnew" && typeof columnItem.DataSourceMember === "object") {
											//if (columnItem.Type === "editnew" )  {
											//console.log("editnew",typeof  columnItem.DataSourceMember,columnItem.DataSourceMember.length)
											columnItem.DataSourceMember.forEach(element =>
												lstdelete = Object.assign({}, lstdelete, { [element]: rowItem[element] })
											);
										}
										else {
											lstdelete = { [columnItem.DataSourceMember]: rowItem[columnItem.DataSourceMember] }
										}
										//console.log("{rowItem[columnItem.DataSourceMember]}", columnItem.Type, columnItem.DataSourceMember, columnItem);
										const cellData = <InputGridCell type={columnItem.Type}
											text={ovjvalue}
											value={ovjvalue}
											to={columnItem.Link}
											linkText={columnItem.LinkText}
											name={columnItem.Name}
											listoption={columnItem.listoption}
											IsAutoLoadItemFromCache={columnItem.IsAutoLoadItemFromCache}
											LoadItemCacheKeyID={columnItem.LoadItemCacheKeyID}
											ValueMember={columnItem.ValueMember}
											NameMember={columnItem.NameMember}
											onInsertClickEdit={this.handleInsertClickEdit}
											onValueChange={this.onValueChange}
											index={rowIndex}
											isChecked={isChecked}
											IsFilterData={columnItem.IsFilterData}
											KeyFilter={columnItem.KeyFilter}
											ValueFilter={rowItem[columnItem.KeyFilter]}
											onHandleEditClick={this.handleEditClick}
											onhandleonClickDelete={this.handleonClickDelete}
											onValueChangeALL={this.handleClick}
											validationErrorMessage={{}}
											label={columnItem.label}
											cation={columnItem.Caption}
											validatonList={columnItem.validatonList}
											isDisabled={this.props.isDisabled}
											isCategory={columnItem.isCategory}
											CategoryTypeID={rowItem[columnItem.rowCategoryType]}
											IsPermisionAdd={this.props.IsPermisionAdd}
											IsPermisionEdit={this.props.IsPermisionEdit}
											IsPermisionDelete={this.props.IsPermisionDelete}
											Ispopup={this.props.Ispopup === undefined ? false : this.props.Ispopup}
											lstdelete={lstdelete}
										/>;
										return (
											<td key={columnItem.Name} style={cellStyle}  >{cellData}</td>
										);
									}
									)
								}
							</tr>);
						}
						)
					}
				</tbody>
			</table>
		);
	}
	//#endregion get Page

	render() {
		let dataSource = this.state.dataSource;
		if (this.props.value != null) {
			dataSource = this.props.value;
		}
		const pageCount = this.getPageCount(this.state.dataSource);
		let hasHeaderToolbar = true;
		if (this.props.isHideHeaderToolbar)
			hasHeaderToolbar = false;
		return (
			<div className="card">
				<div className="card-body">
					{hasHeaderToolbar &&
						<div className="flexbox mb-10 ">
							<span >{this.props.title} </span>
							<div className="btn-toolbar">
								<div className="btn-group btn-group-sm">

									{(this.props.IsPermisionAdd == true || this.props.IsPermisionAdd == undefined) ?
										(
											<button type="button" className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm" onClick={this.handleInsertClick}>
												<span className="fa fa-plus ff"> Thêm </span>
											</button>
										)
										: (
											<button type="button" className="btn btn-info" disabled title="Bạn Không có quyền xử lý!" data-provide="tooltip" data-original-title="Thêm">
												<span className="fa fa-plus ff"> Thêm </span>
											</button>
										)
									}
								</div>
							</div>
						</div>
					}
					{(dataSource.length < 1) ? "" : this.renderInputGrid()
					}
					{(this.props.IsAutoPaging && pageCount > 1) &&
						<InputGridPage numPage={pageCount} currentPage={this.state.PageNumber} onChangePage={this.onChangePageHandle} />
					}
				</div>
			</div>
		);
	}
}
//#region Map
const mapStateToProps = state => {
	return {
		AppInfo: state,
		FetchAPIInfo: state.FetchAPIInfo
	}
}

const mapDispatchToProps = dispatch => {
	return {
		showModal: (type, props) => {
			dispatch(showModal(type, props));
		},
		callGetCache: (cacheKeyID) => {
			return dispatch(callGetCache(cacheKeyID));
		}
		,
		callFetchAPI: (hostname, hostURL, postData) => {
			return dispatch(callFetchAPI(hostname, hostURL, postData));
		}
	}
}
//#endregion End Map

const InputGridNew = connect(mapStateToProps, mapDispatchToProps)(InputGridNewCom);
export default InputGridNew;