import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  useTable,
  useFilters,
  useGroupBy,
  useSortBy,
  useExpanded,
  usePagination,
} from "react-table";
import uuid from "react-uuid";
import { useAppSelector } from "../../hooks";
import { ActionTypes } from "../../state/action-types";

export const Table = (): JSX.Element => {
  const { covidData }: any = useAppSelector((state) => state.chartData);

  const data = useMemo(
    () =>
      covidData.map(
        ({ country, cases, recovered, deaths, tests, population }: any) => {
          return {
            country,
            cases,
            recovered,
            deaths,
            tests,
            population,
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

  const tableInstance = useTable(
    { columns, data },
    useFilters,
    useGroupBy,
    useExpanded,
    usePagination,
    useSortBy
  );
  const {
    getTableProps,
    getTableBodyProps,
    footerGroups,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ActionTypes.GET_COVID_DATA });
  }, []);
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={uuid()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={uuid()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
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
      <tfoot>
        {footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()} key={uuid()}>
            {footerGroup.headers.map((column) => (
              <td {...column.getFooterProps} key={uuid()}>
                {column.render("Footer")}
              </td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};
