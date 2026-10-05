import { BOOK_STATUSES, type Book } from '../content/bookshelf';

/** Books grouped by status: reading now, read, and want to read. */
export function Bookshelf({ books }: { books: Book[] }) {
  return (
    <div className="space-y-12">
      {(Object.keys(BOOK_STATUSES) as Book['status'][]).map((status) => {
        const shelf = books.filter((book) => book.status === status);
        if (shelf.length === 0) return null;
        return (
          <section key={status} aria-labelledby={`shelf-${status}`}>
            <h2 id={`shelf-${status}`} className="font-display text-2xl font-semibold">
              {BOOK_STATUSES[status]}
            </h2>
            <ul className="divide-line mt-4 divide-y">
              {shelf.map((book) => (
                <li key={`${book.title}-${book.author}`} className="py-4">
                  <p className="font-medium">
                    <cite className="not-italic">{book.title}</cite>
                    <span className="text-ink-muted"> by {book.author}</span>
                  </p>
                  {book.note ? <p className="text-ink-muted mt-1">{book.note}</p> : null}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
