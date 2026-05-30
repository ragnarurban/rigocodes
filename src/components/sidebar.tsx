import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Separator } from "./ui/separator";

type Props = {};

function SideBar({}: Props) {
  return (
    <aside className="w-1/3 mt-8">
      <InputGroup className="max-w-xs mb-4">
        <InputGroupInput placeholder="Search posts..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <h1>Related Posts: </h1>
      <Separator className="my-4" />
      <h1>Latest Posts: </h1>
    </aside>
  );
}

export default SideBar;
