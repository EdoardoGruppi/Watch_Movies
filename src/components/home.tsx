import "@mantine/core/styles.css";
import { Button, Card, Group, Input, Select, Image } from "@mantine/core";
import { COUNTRIES, LANGUAGES } from "@constants/countries";
import { IconMovie } from "@tabler/icons-react";
import classes from "@styles/searcher.module.css";
import cardClasses from "@styles/card.module.css";
import { useContext } from "react";
import { BaseContext } from "@context/shared";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "@mantine/hooks";

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
      <Group
        justify="center"
        grow
        preventGrowOverflow={false}
        py={80}
        px={"15%"}
        gap={"sm"}
        className={classes.banner}
      >
        <Input
          placeholder="Search"
          leftSection={<IconMovie size={16} />}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "50%", maxWidth: 500, minWidth: 200 }}
        />
        <Select
          placeholder="Country to search for offers"
          data={Object.entries(COUNTRIES).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
          value={country}
          onChange={(e) => setCountry(e!)}
          searchable
          style={{ width: "30%", maxWidth: 300, minWidth: 200 }}
        />
        <Select
          placeholder="Language"
          data={Object.entries(LANGUAGES).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
          value={language}
          onChange={(e) => setLanguage(e!)}
          searchable
          style={{ width: "15%", maxWidth: 150, minWidth: 150 }}
        />
      </Group>
      <Button
        variant="filled"
        size="md"
        radius="xl"
        style={{ width: 200 }}
        onClick={fetchMovies}
        className={classes.searchButton}
      >
        Search
      </Button>
      <Group justify="center" py="60">
        {movies?.map((movie) => (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            key={movie.id}
            style={{ width: 200 }}
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
