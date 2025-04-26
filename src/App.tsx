import { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import {
  Button,
  Card,
  Group,
  Input,
  MantineProvider,
  Select,
  Image,
} from "@mantine/core";
import {
  COUNTRIES,
  COUNTRY_LANGUAGE_MAP,
  LANGUAGES,
} from "./constants/countries";
import { IconMovie } from "@tabler/icons-react";
import classes from "@styles/searcher.module.css";
import cardClasses from "@styles/card.module.css";
import { search } from "@helpers/justwatch";
import { MediaEntry } from "@interfaces/justwatch";

function App() {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [cards, setCards] = useState<MediaEntry[]>([]);

  async function handleSearch() {
    if (title === "" || country === "" || language === "") return;
    const movies = await search(title, country, language, 20, false);
    setCards(movies);
  }

  useEffect(() => {
    if (language === "" || language === undefined) {
      setLanguage(COUNTRY_LANGUAGE_MAP[country]);
    }
  }, [country]);

  return (
    <>
      <MantineProvider>
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
          onClick={handleSearch}
          className={classes.searchButton}
        >
          Search
        </Button>

        <Group justify="center" py="60">
          {cards.map((movie) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              key={movie.id}
              style={{ width: 200 }}
              className={cardClasses.card}
            >
              <Card.Section>
                <Image src={movie.poster} height={300} alt="Poster" />
              </Card.Section>
            </Card>
          ))}
        </Group>
      </MantineProvider>
    </>
  );
}

export default App;
