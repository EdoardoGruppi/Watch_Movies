import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import classes from "@styles/themeToggle.module.css";

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme("light");

  return (
    <ActionIcon
      onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
      variant="default"
      size="lg"
      radius="sm"
      aria-label="Toggle color scheme"
      className={classes.actionIcon}
    >
      <IconSun
        className={cx(classes.icon, classes.light)}
        stroke={1.5}
        color="yellow"
      />
      <IconMoon
        className={cx(classes.icon, classes.dark)}
        stroke={1.5}
        color="#228be6"
      />
    </ActionIcon>
  );
}
