import { usePagination, useTable } from 'react-table';

const ClientsTable = ({ columns, data, clients }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		pageOptions,
		state: { pageIndex },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 6 },
		},
		usePagination
	);

	const tableData = (
		<>
			<table {...getTableProps()}>
				<thead key='thead'>
					{headerGroups.map((headerGroup, idx) => (
						<tr key={`${idx}-trow`} {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column, idx) => (
								<th key={`${idx}-thead`} {...column.getHeaderProps()}>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody key='tbody' {...getTableBodyProps()}>
					{page.map((row, idx) => {
						prepareRow(row);
						return (
							<tr key={`${idx}-trow`} {...row.getRowProps()}>
								{row.cells.map((cell, idx) => {
									return (
										<td key={`${idx}-tdata`} {...cell.getCellProps()}>
											{cell.render('Cell')}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className='table__pagination-wrapper'>
				<span className='table__clients-count'>
					Showing {page.length} of {clients.length} clients
				</span>
				<div className='pagination'>
					<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
						{'<<'}
					</button>{' '}
					<button onClick={() => previousPage()} disabled={!canPreviousPage}>
						{'<'}
					</button>{' '}
					<button onClick={() => nextPage()} disabled={!canNextPage}>
						{'>'}
					</button>{' '}
					<button
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
					>
						{'>>'}
					</button>{' '}
				</div>
				<span className='table__page-count'>
					Page {pageIndex + 1} of {pageOptions.length}
				</span>
			</div>
		</>
	);

	return (
		<>
			{!data.length ? (
				<div className='clients__message'>
					<p>No clients found</p>
				</div>
			) : (
				<>{tableData}</>
			)}
		</>
	);
};
export default ClientsTable;
