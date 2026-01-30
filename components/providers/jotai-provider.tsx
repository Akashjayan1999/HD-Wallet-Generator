"use client"

import * as React from "react"
import { Provider } from "jotai"

export function JotaiProvider({
  children,
  ...props
}: React.ComponentProps<typeof Provider>) {
  return <Provider {...props}>{children}</Provider>
}