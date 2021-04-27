import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import uuid from "react-uuid";
import { useAppSelector } from "../../hooks";
import { ActionTypes } from "../../state/action-types";
import { ICovidData } from "../../types/covidTypes";
import { Input } from "../inputs/Input";
import { Box } from "../wrappers/Box";
import { ButtonGroup } from "../buttons/ButtonGroup";
import { Button } from "../buttons/Button";
import { SimpleButton } from "../buttons/SimpleButton";

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

const nf = Intl.NumberFormat();

export const Table = (): JSX.Element => {
  const { covidData }: { covidData: ICovidData[] } = useAppSelector(
    (state) => state.chartData
  );

  const [filterInput, setFilterInput] = useState("");

  // Update the state when input changes
  const handleFilterChange = useCallback((e) => {
    const value = e.target.value || undefined;
    setFilter("country", value);
    setFilterInput(value);
  }, []);

  const data = useMemo(() => {
    return covidData.map(
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
    );
  }, [covidData]);

  const columns: { Header: string; accessor: string }[] | any = useMemo(
    () => default_columns,
    []
  );

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
      <Box width="300px" mb="1rem">
        <Input
          type="text"
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={"Search by country"}
        />{" "}
      </Box>
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
        <Box mt="0.5rem">
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <span>
            <input
              style={{ width: "50px", marginLeft: "10px" }}
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNum = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(pageNum);
              }}
            />
          </span>
        </Box>
        <Box mt="0.5rem">
          <ButtonGroup>
            <SimpleButton
              color="#fff"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </SimpleButton>
            <Button onClick={previousPage} disabled={!canPreviousPage}>
              Previous
            </Button>
            <Button onClick={nextPage} disabled={!canNextPage}>
              Next
            </Button>
            <SimpleButton
              color="#fff"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </SimpleButton>
          </ButtonGroup>
        </Box>
      </div>
    </>
  );
};
