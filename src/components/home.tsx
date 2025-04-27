import "@mantine/core/styles.css";
import {
  Card,
  Group,
  Input,
  Select,
  Image,
  Grid,
  ActionIcon,
} from "@mantine/core";
import { COUNTRIES, LANGUAGES } from "@constants/countries";
import { IconMovie, IconSearch } from "@tabler/icons-react";
import classes from "@styles/searcher.module.css";
import cardClasses from "@styles/card.module.css";
import { useContext } from "react";
import { BaseContext } from "@context/shared";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "@mantine/hooks";
import { ThemeToggle } from "./themeToggle";

export function Home() {
  const {
    title,
    country,
    language,
    movies,
    fetchMovies,
    setTitle,
    setLanguage,
    setCountry,
    setSelected,
  } = useContext(BaseContext);
  const navigate = useNavigate();
  useHotkeys([["enter", () => fetchMovies()]], [], true);

  return (
    <>
      <ThemeToggle></ThemeToggle>
      <Grid
        justify="center"
        grow
        py={100}
        px={"15%"}
        gutter="xs"
        breakpoints={{
          xs: "200px",
          sm: "500px",
          md: "700px",
          lg: "900px",
          xl: "1200px",
        }}
        className={classes.banner}
      >
        <Grid.Col span={{ xs: 12, sm: 12, md: 12, lg: 5.5, xl: 6.5 }}>
          <Input
            placeholder="Search"
            leftSection={<IconMovie size={16} />}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, sm: 8, md: 8, lg: 4, xl: 3.5 }}>
          <Select
            placeholder="Country to search for offers"
            data={Object.entries(COUNTRIES).map(([key, value]) => ({
              value: key,
              label: value,
            }))}
            value={country}
            onChange={(e) => setCountry(e!)}
            searchable
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, sm: 4, md: 4, lg: 2.5, xl: 2 }}>
          <div className={classes.languageContainer}>
            <Select
              placeholder="Language"
              data={Object.entries(LANGUAGES).map(([key, value]) => ({
                value: key,
                label: value,
              }))}
              value={language}
              onChange={(e) => setLanguage(e!)}
              searchable
              className={classes.language}
            />
            <ActionIcon
              variant="default"
              size="lg"
              className={classes.actionIcon}
              onClick={() => fetchMovies()}
            >
              <IconSearch className={classes.icon} stroke={1.5} />
            </ActionIcon>
          </div>
        </Grid.Col>
      </Grid>

      <Group justify="center" py="60">
        {movies?.map((movie) => (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            key={movie.id}
            w={200}
            className={cardClasses.card}
            onClick={() => {
              setSelected(movie.id);
              navigate("/movie");
            }}
          >
            <Card.Section>
              <Image src={movie.poster} height={300} alt={movie.title} />
            </Card.Section>
          </Card>
        ))}
      </Group>
    </>
  );
}
