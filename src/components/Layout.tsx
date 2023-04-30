import { Container } from "@mantine/core";
import { LayoutHeader } from "./Header";

interface LayoutProps {
  children: any;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <LayoutHeader
        links={[
          {
            link: "/first",
            label: "First",
          },
          { link: "/second", label: "Second" },
          { link: "/third", label: "Third" },
        ]}
      />
      <main>{children}</main>
      {/* <Footer /> */}
    </Container>
  );
}
