import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import HeaderLogo from "../assets/img/header-logo.png";
import HeaderLogoXL from "../assets/img/header-logo-xl.png";
import Link from "next/link";
import ChangeTheme from "./ChangeTheme";
import { useRouter } from "next/router";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface LayoutHeaderProps {
  links: { link: string; label: string }[];
}

export function LayoutHeader({ links }: LayoutHeaderProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const router = useRouter();
  const { classes, cx } = useStyles();

  const items = links.map((link, i) => {
    return (
      <Link
        key={i}
        href={link.link}
        className={cx(classes.link, {
          [classes.linkActive]: router.pathname === link.link,
        })}
        onClick={() => {
          close();
        }}
      >
        {link.label}
      </Link>
    );
  });
  items.push(<ChangeTheme key="change-theme" />);

  return (
    <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
      <Container className={classes.header}>
        <Link
          href="/"
          onClick={() => {
            close();
          }}
        >
          <Image
            className="header-logo-xl"
            src={HeaderLogoXL}
            height={60}
            alt={"seçim live"}
          />
          <Image
            className="header-logo"
            src={HeaderLogo}
            height={60}
            alt={"seçim live"}
          />
        </Link>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
