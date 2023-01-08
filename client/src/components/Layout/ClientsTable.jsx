import { usePagination, useTable } from 'react-table';

const ClientsTable = ({ columns, data }) => {
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
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 6 },
		},
		usePagination
	);

	return (
		<>
			{!data.length ? (
				<div className='clients__message'>
					<p>No clients found</p>
				</div>
			) : (
				<>
					<table {...getTableProps()}>
						<thead>
							{headerGroups.map((headerGroup, idx) => (
								<tr key={idx} {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column, idx) => (
										<th key={idx} {...column.getHeaderProps()}>
											{column.render('Header')}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{page.map((row, idx) => {
								prepareRow(row);
								return (
									<tr key={idx} {...row.getRowProps()}>
										{row.cells.map((cell, idx) => {
											return (
												<td key={idx} {...cell.getCellProps()}>
													{cell.render('Cell')}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
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
						{/* <select
							value={pageSize}
							onChange={e => {
								setPageSize(Number(e.target.value));
							}}
						>
							{[2, 20, 30, 40, 50].map(pageSize => (
								<option key={pageSize} value={pageSize}>
									Show {pageSize}
								</option>
							))}
						</select> */}
					</div>
				</>
			)}
		</>
	);
};
export default ClientsTable;
