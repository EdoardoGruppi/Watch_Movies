import { GENRES } from "@constants/genres";
import { BaseContext } from "@context/shared";
import {
  ActionIcon,
  Badge,
  Grid,
  Group,
  Image,
  Paper,
  Progress,
  Rating,
  SimpleGrid,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { format } from "date-fns";
import { useContext, useEffect, useMemo } from "react";
import imdbLogo from "@assets/imdb.svg";
import tmdbLogo from "@assets/tmdb.svg";
import rottenLogo from "@assets/rottentomato.svg";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  ICellRendererParams,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Cell, Row } from "@interfaces/table";
import { SERVICES } from "@constants/services";
import { COUNTRIES } from "@constants/countries";
import { CURRENCY_SYMBOLS } from "@constants/currencies";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import classes from "@styles/movie.module.css";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export function Movie() {
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme();
  const { movies, selected: id, offers } = useContext(BaseContext);
  const movie = useMemo(() => movies!.find((i) => i.id === id), [id, movies]);
  const rowData = useMemo(
    () =>
      Object.entries(offers).map(([key, val]) => {
        const row = { country: COUNTRIES[key] } as Row;
        val.forEach((offer) => {
          let service = offer.package.name;
          if (service.startsWith("Apple TV")) service = "Apple TV";
          if (SERVICES.has(service)) {
            if (
              (row[service] === undefined ||
                offer.priceValue === null ||
                (row[service] as Cell).price === undefined ||
                (row[service] as Cell).price) ??
              0 > offer.priceValue
            ) {
              row[service] = {
                price: offer.priceValue,
                currency: offer.priceCurrency,
                languages: offer.audioLanguages,
                subtitles: offer.subtitleLanguages,
                url: offer.url,
              };
            }
          }
        });
        return row;
      }),
    [offers]
  );
  const columnDefs: ColDef[] = [
    {
      field: "country",
      headerName: "Country",
      pinned: "left",
      filter: true,
      comparator: (a: string, b: string) => {
        const cleanA = a.slice(5).trim();
        const cleanB = b.slice(5).trim();
        return cleanA.localeCompare(cleanB);
      },
    },
    ...Array.from(SERVICES).map((serviceName) => ({
      field: serviceName,
      headerName: serviceName,
      autoHeight: true,
      wrapText: true,
      cellRenderer: (params: ICellRendererParams) => {
        const data = params.value;
        if (!data) return "";
        const priceDisplay =
          data.price == null || data.currency == null
            ? "Free"
            : `${data.price} ${
                CURRENCY_SYMBOLS[data.currency]
                  ? CURRENCY_SYMBOLS[data.currency]
                  : data.currency
              }`;
        if (data.url)
          return (
            <a
              href={params.value.url}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {priceDisplay}
            </a>
          );
        return priceDisplay;
      },
    })),
  ];

  useEffect(() => {
    document.body.dataset.agThemeMode = colorScheme;
  }, [colorScheme]);

  return (
    <>
      {movie && (
        <>
          <ActionIcon
            color="orange"
            variant="light"
            size="lg"
            radius="sm"
            className={classes.backButton}
            onClick={() => navigate("/")}
          >
            <IconArrowLeft size={22} stroke={1.5} />
          </ActionIcon>
          <Grid
            p={50}
            gutter={30}
            breakpoints={{
              xs: "600px",
              sm: "1000px",
              md: "1200px",
              lg: "1500px",
              xl: "1800px",
            }}
          >
            <Grid.Col
              span={{ xs: 6, sm: 3.5, md: 3, lg: 2.5, xl: 2 }}
              order={{ base: 1, sm: 1 }}
            >
              <Image
                src={movie.poster}
                height={400}
                alt="Poster"
                className={classes.poster}
              />
            </Grid.Col>
            <Grid.Col
              span={{ xs: 12, sm: 5, md: 6, lg: 7, xl: 7.8 }}
              order={{ base: 3, sm: 2 }}
              className={classes.descriptionWrapper}
            >
              <Title mb="md">{movie.title}</Title>
              <Text fs="italic">{movie.shortDescription}</Text>
              <div className={classes.genres}>
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
            </Grid.Col>
            <Grid.Col
              span={{ xs: 6, sm: 3.5, md: 3, lg: 2.5, xl: 2.2 }}
              order={{ base: 2, sm: 3 }}
            >
              <div className={classes.imdbContainer}>
                <img src={imdbLogo} width={80} className={classes.imdbImage} />
                <div className={classes.imdbStats}>
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
              <div className={classes.tmdbContainer}>
                <img src={tmdbLogo} width={80} className={classes.tmdbImage} />
                <div className={classes.tmdbStats}>
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
              <div className={classes.rottenContainer}>
                <img
                  src={rottenLogo}
                  width={50}
                  className={classes.rottenImage}
                />
                <div className={classes.rottenStats}>
                  <Rating
                    value={(movie.scoring?.tomatoMeter ?? 0) / 20}
                    fractions={5}
                    readOnly
                  />
                </div>
              </div>
              <div className={classes.scoreContainer}>
                <div>
                  <SimpleGrid cols={3} spacing={"xs"}>
                    <Paper
                      radius="md"
                      shadow="md"
                      p="xs"
                      style={{ minWidth: 80 }}
                    >
                      <Title fz={28}>{movie.streamingCharts?.rank ?? 0}</Title>
                      <Text className={classes.label}>Rank</Text>
                    </Paper>
                    <Paper
                      radius="md"
                      shadow="md"
                      p="xs"
                      style={{ minWidth: 80 }}
                    >
                      <Title
                        fz={28}
                        style={{
                          color:
                            movie.streamingCharts?.trend === "UP"
                              ? "green"
                              : "red",
                        }}
                      >
                        {movie.streamingCharts?.trendDifference ?? 0}
                      </Title>
                      <Text className={classes.label}>Trend</Text>
                    </Paper>
                    <Paper
                      radius="md"
                      shadow="md"
                      p="xs"
                      style={{ minWidth: 80 }}
                    >
                      <Title fz={28}>
                        {movie.streamingCharts?.topRank ?? 0}
                      </Title>
                      <Text className={classes.label}>Best</Text>
                    </Paper>
                  </SimpleGrid>
                </div>
              </div>
            </Grid.Col>
          </Grid>

          <div className={classes.gridContainer}>
            <AgGridReact
              theme={themeQuartz}
              autoSizeStrategy={{ type: "fitGridWidth" }}
              colResizeDefault="shift"
              defaultColDef={{ flex: 1 }}
              rowData={rowData}
              columnDefs={columnDefs}
            />
          </div>
        </>
      )}
    </>
  );
}
