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
            link: "/checklist",
            label: "Görev Kontrol Listesi",
          },
        ]}
      />
      <main>{children}</main>
      {/* <Footer /> */}
    </Container>
  );
}
