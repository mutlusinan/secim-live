import { Container } from "@mantine/core";
import { LayoutHeader } from "./Header";
import { LayoutFooter } from "./Footer";
import MenuItems from "../assets/data/MenuItems.json";

interface LayoutProps {
  children: any;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <LayoutHeader links={MenuItems} />
      <main>{children}</main>
      <LayoutFooter />
    </Container>
  );
}
