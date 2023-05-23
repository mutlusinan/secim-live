import { createStyles, Container,  rem } from "@mantine/core";


const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },
}));

export function LayoutFooter() {
  const { classes } = useStyles();
  const thisYear = new Date().getFullYear();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <span>{"secim.live © " + thisYear}</span>
      </Container>
    </div>
  );
}
