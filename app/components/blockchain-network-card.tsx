import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
 

const BlockchainNetworkCard = () => {
    const networks = ['Ethereum', 'Solana']
  return (
    <>
      {networks.map((network) => (
        <div key={network} className="">
            <Link href={`/browser/${network}`}>
          {card(network)}
            </Link>
        </div>
      ))}
     </>
  )
}

export default BlockchainNetworkCard


const card = (name: string) => {
  return (
    <Card className="py-2.5 mb-2 min-w-fit cursor-pointer hover:shadow-lg hover:dark:shadow-[#666]">
      
      <CardContent>
        <CardTitle className="text-base ">{name}</CardTitle>
      </CardContent>
      
    </Card>
  )
}
