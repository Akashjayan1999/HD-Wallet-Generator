
'use client'
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {supportedChains} from "@/lib/utils";

const Header = () => {
  return (
    <header className=" px-2 py-3 shadow-sm">
      <div className="flex justify-between" >
        <Image
          className="dark:invert"
          src="/wallet.png"
          alt="Next.js logo"
          width={25}
          height={10}
          priority
        />
        <><Select>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a chain" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Supported Chain</SelectLabel>
          {supportedChains.map((chain) => (
            <SelectItem value={chain.name}>{chain.name}</SelectItem>
          ))}
       </SelectGroup>
      </SelectContent>
    </Select></>
      </div>
    </header>
  );
};

export default Header;
