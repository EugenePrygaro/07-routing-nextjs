import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const tag = slug[0];
  const isAll = tag === "all";
  const queryKey = isAll ? ["notes", 1, ""] : ["notes", 1, "", tag];
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => fetchNotes(1, 12, "", isAll ? undefined : tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
