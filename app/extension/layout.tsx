import Header from "./components/header"

export default function ExtensionLayout({
  children,
}: {
  children: React.ReactNode
}) 
{
  return <section className="w-90 h-150 overflow-x-hidden  overflow-y-scroll  border-2 border-black no-scrollbar flex flex-col">
    <Header/>
    <div className="flex-1 overflow-y-auto">
    {children}
    </div>
    </section>
}