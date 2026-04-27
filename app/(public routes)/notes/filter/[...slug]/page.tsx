import { fetchNotes } from "../../../../../lib/api";
import NoteList from "@/components/NoteList/NoteList";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const tag = slug[0];
  const res =
    tag === "all"
      ? await fetchNotes(1, 12, "")
      : await fetchNotes(1, 12, "", tag);

  return res.notes?.length > 0 && <NoteList notes={res.notes} />;
}
