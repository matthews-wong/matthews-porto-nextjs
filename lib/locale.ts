"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

export function useLocale() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const setLocale = (locale: string) => {
    startTransition(() => {
      document.cookie = `locale=${locale};path=/;max-age=31536000`
      router.refresh()
    })
  }

  return { setLocale, isPending }
}
