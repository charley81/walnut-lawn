import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource, ImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: import.meta.env.SANITY_API_TOKEN,
  apiVersion: '2026-06-29',
})

const builder = createImageUrlBuilder(client)

/**
 * Get a Sanity image URL builder that proxies images through our domain
 * to avoid third-party cookies from Sanity's image CDN.
 *
 * Usage: urlFor(source).width(800).format('webp').url()
 */
export function urlFor(source: SanityImageSource) {
  const imageBuilder = builder.image(source) as Record<string, unknown>

  const handler: ProxyHandler = {
    get(target, prop) {
      const value = target[prop]
      if (typeof value === 'function') {
        return (...args: unknown[]) => {
          const result = (value as Function).apply(target, args)
          // When .url() is called, replace the CDN origin with our proxied path
          if (prop === 'url') {
            return (result as string).replace(
              'https://cdn.sanity.io/images/',
              '/sanity-images/',
            )
          }
          // For chaining methods, wrap the returned builder with the same proxy
          if (typeof result === 'object' && result !== null) {
            return new Proxy(result as Record<string, unknown>, handler)
          }
          return result
        }
      }
      return value
    },
  }

  return new Proxy(imageBuilder, handler) as unknown as ImageUrlBuilder
}

type ProxyHandler = {
  get(target: Record<string, unknown>, prop: string | symbol): unknown
}
