import React from "react";



import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";


export type Row = Record<string, any>;
export interface DataCellProps<T> {
	item_id: string,
	item_column: string,
	item: T,
}

export const DataCell = <T,>(props : DataCellProps<T>) => {
	const item_column = props.item_column;

	return <TableCell
		data-column={item_column}
	>{
		(props.item as any)[item_column]
	}</TableCell>;
};



export interface ColumnsProp {
	columns: string[]|Record<string,string>,
}
export interface DataHeaderProps extends ColumnsProp {
	label: string,
}

export const DataHeader = (props: DataHeaderProps) => {
	const Row = [];
	const columns = props.columns;


	if (Array.isArray(columns)) {
		let item_column = 0;
		for (const value of columns) {
			Row.push(
				<TableCell
					data-column={item_column}
					key={`column_${item_column}`
				}>{
					value
				}</TableCell>
			);

			item_column++;
		}
	} else {
		let value;
		for (const item_column in columns) {
			value = columns[item_column];

			Row.push(
				<TableCell
					data-column={item_column}
					key={`column_${item_column}`}
				>{
					value
				}</TableCell>
			);
		}
	}

	return <TableHead>
		<TableRow>{
			Row
		}</TableRow>
	</TableHead>;
};



export interface DataFooterProps extends ColumnsProp {
	label: string,
}
/**
 * Dummy component to not render a footer.
 */
// eslint-disable-next-line no-unused-vars
export const DataFooter = (props: DataFooterProps) => {
	return null;
};



export interface DataPaginationProps extends ColumnsProp {
	label: string,
}
/**
 * Dummy component to not render pagination.
 */
// eslint-disable-next-line no-unused-vars
export const DataPagination = (props : DataPaginationProps) => {
	return null;
};



export interface DataRowProps<T> extends ColumnsProp {
	item_id: number|string,
	item: T,
	CellComponent: React.ComponentType<DataCellProps<T>>,
	CellProps: Record<string, any>,
}
export const DataRow = <T,>(props : DataRowProps<T>) => {
	const Row = [];

	const columns = props.columns;
	const item_id = props.item_id;
	const item = props.item;
	const CellComponent = props.CellComponent;

	if (Array.isArray(columns)) {
		for (const item_column of columns) {
			Row.push(
				<CellComponent
					item_column={item_column}
					item_id={item_id as string}
					key={`${item_id}_${item_column}`}
					item={item}
					{... props.CellProps}
				/>
			);
		}
	} else {
		for (const item_column in columns) {
			Row.push(
				<CellComponent
					item_column={item_column}
					item_id={item_id as string}
					key={`${item_id}_${item_column}`}
					item={item}
					{... props.CellProps}
				/>
			);
		}
	}

	return <TableRow>{
		Row
	}</TableRow>;
};



interface DataTableProps<T> extends ColumnsProp {
	label: string,
	data: T[]|Record<string,T>,
	CellComponent?: React.ComponentType<DataCellProps<T>>,
	CellProps?: Record<string, any>,
	HeadComponent?: React.ComponentType<DataHeaderProps>,
	HeadProps?: Record<string, any>,
	FooterComponent?: React.ComponentType<DataFooterProps>,
	FooterProps?: Record<string, any>,
	PaginationComponent?: React.ComponentType<DataPaginationProps>,
	PaginationProps?: Record<string, any>,
	RowComponent?: React.ComponentType<DataRowProps<T>>,
	RowProps?: Record<string, any>,
}
const DataTable = <T,>(props: DataTableProps<T>) => {
	if (props.data === null) {
		return null;
	}

	const columns = props.columns;
	const data = props.data;
	const label = props.label;

	const Rows = [];

	let RowComponent : React.ComponentType<DataRowProps<T>>;
	if (props.RowComponent !== undefined) {
		RowComponent = props.RowComponent;
	} else {
		RowComponent = DataRow;
	}
	let CellComponent : React.ComponentType<DataCellProps<T>>;
	if (props.CellComponent !== undefined) {
		CellComponent = props.CellComponent;
	} else {
		CellComponent = DataCell;
	}
	
	const RowProps = props.RowProps || {};
	const CellProps = props.CellProps || {};
	if (Array.isArray(data)) {
		let item_key = 0;
		for (const value of data) {
			Rows.push(
				<RowComponent
					columns={columns}
					item_id={item_key}
					key={item_key}
					item={value}
					CellComponent={CellComponent}
					CellProps={CellProps}
					{... RowProps}
				/>
			);

			item_key++;
		}
	} else {
		let value;
		for (const item_key in data) {
			value = data[item_key];

			Rows.push(
				<RowComponent
					columns={columns}
					item_id={item_key}
					key={item_key}
					item={value}
					CellComponent={CellComponent}
					CellProps={CellProps}
					{... RowProps}
				/>
			);
		}
	}

	let HeadComponent : React.ComponentType<DataHeaderProps>;
	if (props.HeadComponent !== undefined) {
		HeadComponent = props.HeadComponent;
	} else {
		HeadComponent = DataHeader;
	}
	const HeadProps = props.HeadProps || {};

	let FooterComponent : React.ComponentType<DataFooterProps>;
	if (props.FooterComponent !== undefined) {
		FooterComponent = props.FooterComponent;
	} else {
		FooterComponent = DataFooter;
	}
	const FooterProps = props.FooterProps || {};

	let PaginationComponent : React.ComponentType<DataPaginationProps>;
	if (props.PaginationComponent !== undefined) {
		PaginationComponent = props.PaginationComponent;
	} else {
		PaginationComponent = DataPagination;
	}
	const PaginationProps = props.PaginationProps || {};

	return <TableContainer
		component={Paper}
	>{[
		<Table
			aria-label={label}
			stickyHeader
			key={`table_${label}`}
		>{[
			<HeadComponent
				columns={columns}
				label={label}
				key={`header_table_${label}`}
				{... HeadProps}
			/>,

			<TableBody key={`body_table_${label}`}>{
				Rows
			}</TableBody>,

			<FooterComponent
				columns={columns}
				label={label}
				key={`footer_table_${label}`}
				{... FooterProps}
			/>
		]}</Table>,

		<PaginationComponent
			columns={columns}
			label={label}
			key={`pagination_table_${label}`}
			{... PaginationProps}
		/>
	]}</TableContainer>;
};

export default DataTable;