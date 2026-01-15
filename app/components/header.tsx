import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";

const Header = () => {
  return (
    <header>
          <nav>
            <div className="flex justify-between width-container font-quicksand border-b-2 border-gray-300 dark:border-gray-700">
              <div className=" text-xl font-bold flex items-center gap-2">
                   <Image
                        className="dark:invert"
                        src="/wallet.png"
                        alt="Next.js logo"
                        width={25}
                        height={10}
                        priority
                      /><div>HD Wallets Generator</div>
                      <div className="rounded-full  text-sm font-semibold bg-gray-400 dark:bg-white text-white dark:text-black p-0.5 border-black dark:border-gray border border-opacity-50">
                        v1.0.0
                      </div>
                       </div>
              <div className="py-4 italic text-sm text-muted-foreground">
                <ModeToggle/>
              </div>
            </div>
          </nav>
        </header>
  )
}

export default Header
