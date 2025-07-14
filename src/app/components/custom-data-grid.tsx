import { Box, Typography, useTheme } from "@mui/material";
import {
  DataGrid,
  type DataGridProps,
  type GridCallbackDetails,
  type GridColumnVisibilityModel,
  type GridEventListener,
  GridOverlay,
  type GridPaginationModel,
  type GridRowParams,
  type MuiEvent,
  useGridApiRef,
} from "@mui/x-data-grid";
import { type GridInitialState } from "@mui/x-data-grid";
import React, { type FC, useEffect, useMemo, useRef, useState } from "react";

interface CustomDataGridProps extends DataGridProps {
  columns: any[];
  onRowClick?: (
    params: GridRowParams,
    event: MuiEvent<React.MouseEvent<HTMLElement>>,
    details: GridCallbackDetails
  ) => void;
  loading?: boolean;
  filterLoading?: boolean;
  totalRows?: number;
  paginationModel?: GridPaginationModel;
  onPaginationModelChange?: (model: GridPaginationModel) => void;
  serverSidePagination?: boolean;
  pageSizeOptions?: Array<number>;
  initialState?: GridInitialState;
  hideColumns?: Array<string>;
  getRowClassName?: any;
}

export const CustomDataGrid: FC<CustomDataGridProps> = ({
  columns,
  rows,
  onRowClick,
  loading,
  filterLoading,
  totalRows,
  paginationModel,
  onPaginationModelChange,
  serverSidePagination = false,
  pageSizeOptions,
  initialState,
  hideColumns,
  getRowClassName,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const apiRef = useGridApiRef();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({});

  useEffect(() => {
    if (!hideColumns || hideColumns.length < 1) return;

    const model = hideColumns.reduce((acc, field) => {
      acc[field] = false;
      return acc;
    }, {} as GridColumnVisibilityModel);

    setColumnVisibilityModel(model);
  }, [hideColumns]);

  const handleColumnVisibilityModelChange = (
    model: GridColumnVisibilityModel
  ) => {
    setColumnVisibilityModel(model);
  };

  const handleEvent: GridEventListener<"scrollPositionChange"> = (params) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = params.left;
    }
  };

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    if (apiRef.current) {
      unsubscribe = apiRef.current.subscribeEvent(
        "scrollPositionChange",
        handleEvent
      );
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [apiRef]);

  const columnsWithoutFilters = useMemo(() => [...columns], [columns]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        background: isLight ? "white" : undefined,
        position: "relative",
      }}
    >
      <DataGrid
        apiRef={apiRef}
        rows={rows}
        columns={columnsWithoutFilters}
        paginationMode={serverSidePagination ? "server" : "client"}
        rowCount={serverSidePagination ? totalRows : undefined}
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        onColumnVisibilityModelChange={handleColumnVisibilityModelChange}
        columnVisibilityModel={columnVisibilityModel}
        hideFooter={serverSidePagination ? false : true}
        disableColumnMenu
        hideFooterPagination={serverSidePagination ? false : true}
        hideFooterSelectedRowCount={serverSidePagination ? false : true}
        disableColumnFilter={serverSidePagination ? false : true}
        initialState={initialState}
        getRowClassName={getRowClassName}
        slots={{
          noRowsOverlay: () => (
            <GridOverlay>
              <Typography variant="subtitle2" color="text.secondary">
                No records found
              </Typography>
            </GridOverlay>
          ),
          loadingOverlay: () => (
            <GridOverlay>
              <img src="/assets/svgs/loader.svg" alt="loader" />
            </GridOverlay>
          ),
        }}
        loading={filterLoading || loading}
        sx={{
          width: "100%",
          "& .MuiDataGrid-columnHeader": {
            height: 56,
          },
          "@keyframes highlightFade": {
            "0%": {
              backgroundColor: "#8E33FF",
            },
            "50%": {
              backgroundColor: "#aa66ff",
            },
            "100%": {
              backgroundColor: "#8E33FF",
            },
          },
          "& .MuiDataGrid-row.highlight-inline": {
            backgroundColor: "rgba(218, 155, 252, 0.5)",
            transition: "background-color 0.5s ease-in-out",
          },
        }}
        onRowClick={onRowClick}
      />
    </Box>
  );
};
