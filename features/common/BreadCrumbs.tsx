import Link from "next/link";
import { Breadcrumb } from "react-bootstrap";
import { Navigation } from "../types";

type BCProps = {
  navigation: Navigation[];
};

export default function Breadcrumbs({ navigation }: BCProps) {
  return (
    <Breadcrumb>
      {navigation.map((n) => (
        <Link key={n.name} href={n.href} passHref>
          <Breadcrumb.Item active={n.current}>{n.name}</Breadcrumb.Item>
        </Link>
      ))}
    </Breadcrumb>
  );
}
