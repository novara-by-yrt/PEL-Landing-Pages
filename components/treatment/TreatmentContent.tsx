export function TreatmentContent({ content }: { content: string }) {
  return (
    <article className="container prose-container" style={{ padding: "4rem 1.5rem 3rem" }}>
      <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
