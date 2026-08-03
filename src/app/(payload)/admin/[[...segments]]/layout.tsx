import React from 'react'

type Args = {
  children: React.ReactNode
}

export default async function Layout({ children }: Args) {
  return <>{children}</>
}
