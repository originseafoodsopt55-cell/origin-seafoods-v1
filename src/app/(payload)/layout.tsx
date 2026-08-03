import React from 'react'
import config from '@/payload.config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={async (args) => {
        'use server'
        const { handleServerFunctions } = await import('@payloadcms/next/layouts')
        return handleServerFunctions({
          ...args,
          config,
          importMap,
        })
      }}
    >
      {children}
    </RootLayout>
  )
}
