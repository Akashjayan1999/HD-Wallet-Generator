
import { Copy } from "lucide-react"
const MainAccount = () => {
  return (
    <div className="p-3 flex flex-col items-center">
      <div className="border rounded-4xl flex w-60 items-center">
         <div className="border-r p-2">image</div>
         <div className="border-r p-2 flex flex-col items-center">
            <p className="font-semibold">Wallet 1</p>
            <p>0x1234...abcd</p>
         </div>
         <div className="p-2 m-auto">
            <Copy size={16} />
         </div>
      </div>
      <div className="p-6 pb-4">
      <MainAccounttoken />
      </div>
    </div>
  )
}

export default MainAccount

const MainAccounttoken = () => {
    return (
        <div className="flex flex-col items-center">
        <div className="text-4xl font-extrabold">
            $0.00

        </div>
        <div className="pt-1 font-semibold text-gray-600">
            $0.00 0%
        </div>
        </div>
    )
};
