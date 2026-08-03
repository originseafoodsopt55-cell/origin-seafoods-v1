import config from '@/payload.config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'
import { Metadata } from 'next'

type Args = {
  params: Promise<{
    segments?: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return generatePageMetadata({ config, params, searchParams: searchParams as any })
}

export default async function Page({ params, searchParams }: Args) {
  return (
    <RootPage
      config={config}
      importMap={importMap}
      params={params as unknown as Promise<{ segments: string[] }>}
      searchParams={searchParams}
    />
  )
}
