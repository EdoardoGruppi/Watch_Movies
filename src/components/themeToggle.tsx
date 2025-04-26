import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import {
  ActionIcon,
  Group,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import classes from "@styles/themeToggle.module.css";

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Group
      justify="center"
      style={{ position: "absolute", top: 10, right: 10 }}
    >
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="default"
        size="lg"
        radius="sm"
        aria-label="Toggle color scheme"
      >
        <IconSun
          className={cx(classes.icon, classes.light)}
          stroke={1.5}
          color="yellow"
        />
        <IconMoon
          className={cx(classes.icon, classes.dark)}
          stroke={1.5}
          color="blue"
        />
      </ActionIcon>
    </Group>
  );
}
