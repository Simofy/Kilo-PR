import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import uuid from "react-uuid";
import { useAppSelector } from "../../hooks";
import { ActionTypes } from "../../state/action-types";
import { ICovidData } from "../../types/covidTypes";

const nf = Intl.NumberFormat();

export const Table = (): JSX.Element => {
  const { covidData }: { covidData: ICovidData[] } = useAppSelector(
    (state) => state.chartData
  );
  const [filterInput, setFilterInput] = useState("");

  // Update the state when input changes
  const handleFilterChange = useCallback((e: any) => {
    const value = e.target.value || undefined;
    setFilter("country", value);
    setFilterInput(value);
  }, []);

  const data = useMemo(
    () =>
      covidData.map(
        ({ country, cases, recovered, deaths, tests, population }) => {
          return {
            country,
            cases: nf.format(cases),
            recovered: nf.format(recovered),
            deaths: nf.format(deaths),
            tests: nf.format(tests),
            population: nf.format(population),
          };
        }
      ),
    []
  );

  const default_columns = [
    {
      Header: "Country",
      accessor: "country",
    },
    {
      Header: "Cases",
      accessor: "cases",
    },
    {
      Header: "Recovered",
      accessor: "recovered",
    },
    {
      Header: "Deaths",
      accessor: "deaths",
    },
    {
      Header: "Tests",
      accessor: "tests",
    },
    {
      Header: "Population",
      accessor: "population",
    },
  ];

  const columns: any = useMemo(() => default_columns, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy,
    usePagination // Adding the useFilters Hook to the table
    // You can add as many Hooks as you want. Check the documentation for details. You can even add custom Hooks for react-table here
  );

  const { pageIndex } = state;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ActionTypes.GET_COVID_DATA });
  }, []);
  return (
    <>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search name"}
      />{" "}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={uuid()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={uuid()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={uuid()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} key={uuid()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </>
  );
};
