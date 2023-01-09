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
					<div className='table__pagination-wrapper'>
						<span className='table__clients-count'>
							Showing {page.length} of {clients.length} clients
						</span>
						<div className='pagination'>
							<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
								{'<<'}
							</button>{' '}
							<button
								onClick={() => previousPage()}
								disabled={!canPreviousPage}
							>
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
			)}
		</>
	);
};
export default ClientsTable;
