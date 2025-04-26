import { GENRES } from "@constants/genres";
import { BaseContext } from "@context/shared";
import {
  Badge,
  Card,
  Group,
  Image,
  Progress,
  Rating,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { format } from "date-fns";
import { useContext, useMemo, useState } from "react";
import imdbLogo from "@assets/imdb.svg";
import tmdbLogo from "@assets/tmdb.svg";
import rottenLogo from "@assets/rottentomato.svg";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export function Movie() {
  const { movies, selected: id, offers } = useContext(BaseContext);
  const movie = useMemo(() => movies!.find((i) => i.id === id), [id, movies]);

  //   const [rowData, setRowData] = useState([
  //     { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  //     { make: "Ford", model: "F-Series", price: 33850, electric: false },
  //     { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  //   ]);
  //   const [colDefs, setColDefs] = useState<
  //     ColDef<{ make: string; model: string; price: number; electric: boolean }>[]
  //   >([
  //     { field: "make" },
  //     { field: "model" },
  //     { field: "price" },
  //     { field: "electric" },
  //   ]);

  return (
    <>
      {movie && (
        <>
          <Group p={50} justify="space-between">
            <div>
              <Image
                src={movie.poster}
                height={400}
                alt="Poster"
                style={{ borderRadius: 8 }}
              />
            </div>
            <div
              style={{
                width: "60%",
                height: 400,
                position: "relative",
              }}
            >
              <Title mb="md">{movie.title}</Title>
              <Text fs="italic">{movie.shortDescription}</Text>
              <div style={{ bottom: 0, position: "absolute" }}>
                <Group mb="md" gap={5}>
                  {movie.genres.map((genre) => (
                    <Badge color={GENRES[genre].color} radius="xs" key={genre}>
                      {GENRES[genre].label}
                    </Badge>
                  ))}
                </Group>
                <Text>
                  <strong>Runtime:</strong>{" "}
                  {Math.round(movie.runtimeMinutes / 60)} hr{" "}
                  {movie.runtimeMinutes % 60} min
                </Text>
                <Text>
                  <strong>Release Date:</strong>{" "}
                  {format(movie.releaseDate, "PPP")}
                </Text>
              </div>
            </div>{" "}
            <Card
              style={{
                width: 280,
                height: 400,
                position: "relative",
                padding: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  borderRadius: 8,
                  backgroundColor: "rgba(246, 199, 0, 0.4)",
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: "rgba(246, 199, 0, 1)",
                    borderRadius: 8,
                  }}
                >
                  <img src={imdbLogo} width={80} />
                </div>
                <div
                  style={{
                    width: 120,
                    height: 80,
                    paddingLeft: 20,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Rating
                    value={(movie.scoring?.imdbScore ?? 0) / 2}
                    fractions={5}
                    readOnly
                  />
                  <Text mt={5}>
                    <strong>{movie.scoring?.imdbVotes ?? 0}</strong> votes
                  </Text>
                </div>
              </div>
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  borderRadius: 8,
                  backgroundColor: "rgba(44, 58, 60, 0.4)",
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: "rgba(44, 58, 60, 1)",
                    borderRadius: 8,
                  }}
                >
                  <img src={tmdbLogo} width={80} style={{ padding: 8 }} />
                </div>
                <div
                  style={{
                    width: 120,
                    height: 80,
                    paddingLeft: 20,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Rating
                    value={(movie.scoring?.tmdbScore ?? 0) / 2}
                    fractions={5}
                    readOnly
                  />
                  <Progress
                    mt="sm"
                    size="lg"
                    value={movie.scoring?.tmdbPopularity ?? 0}
                    striped
                    animated
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  borderRadius: 8,
                  backgroundColor: "rgba(178, 10, 4, 0.4)",
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 50,
                    backgroundColor: "rgba(178, 10, 4, 1)",
                    borderRadius: 8,
                  }}
                >
                  <img
                    src={rottenLogo}
                    width={50}
                    style={{ paddingLeft: 11, paddingTop: 4 }}
                  />
                </div>
                <div
                  style={{
                    width: 120,
                    height: 50,
                    paddingLeft: 20,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Rating
                    value={(movie.scoring?.tomatoMeter ?? 0) / 20}
                    fractions={5}
                    readOnly
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: 10,
                  borderRadius: 8,
                  backgroundColor: "rgba(67, 156, 234, 0.6)",
                  minHeight: 160,
                }}
              >
                <div style={{ display: "flex", padding: 17 }}>
                  <div>
                    <Text fz={15}>
                      <strong>Rank:</strong> {movie.streamingCharts?.rank}°
                    </Text>
                    <Text
                      fz={15}
                      c={
                        movie.streamingCharts?.trend === "UP" ? "green" : "red"
                      }
                    >
                      <strong style={{ color: "black" }}>Trend:</strong>{" "}
                      <strong>{movie.streamingCharts?.trendDifference}</strong>
                    </Text>
                    <Text fz={15}>
                      <strong>Best:</strong> {movie.streamingCharts?.topRank}°
                    </Text>
                  </div>
                  <div style={{ paddingLeft: 60 }}>
                    <Table
                      striped
                      withTableBorder
                      verticalSpacing={1}
                      withColumnBorders
                    >
                      <Table.Tr>
                        <Table.Th>Top</Table.Th>
                        <Table.Th>Days</Table.Th>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td>{3}</Table.Td>
                        <Table.Td>{movie.streamingCharts?.daysInTop3}</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td>{10}</Table.Td>
                        <Table.Td>
                          {movie.streamingCharts?.daysInTop10}
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td>{100}</Table.Td>
                        <Table.Td>
                          {movie.streamingCharts?.daysInTop100}
                        </Table.Td>
                      </Table.Tr>
                    </Table>
                  </div>
                </div>
              </div>
            </Card>
          </Group>
          {/* <div
            className="ag-theme-quartz"
            style={{
              height: 500,
              width: "100%",
              paddingLeft: 50,
              paddingRight: 50,
              paddingBottom: 20,
            }}
          >
            <AgGridReact
              autoSizeStrategy={{ type: "fitGridWidth" }}
              colResizeDefault="shift"
              defaultColDef={{ flex: 1 }}
              rowData={rowData}
              columnDefs={colDefs}
            />
          </div> */}
        </>
      )}
    </>
  );
}
