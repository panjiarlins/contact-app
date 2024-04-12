import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

export default function ContactCardPagination({
  page,
  perPage,
  totalPages,
  total,
  start,
  end,
}: {
  page: number
  perPage: number
  totalPages: number
  total: number
  start: number
  end: number
}) {
  const prevLink =
    '?' +
    new URLSearchParams({
      page: `${page - 1}`,
      perPage: `${perPage}`,
    }).toString()

  const nextLink =
    '?' +
    new URLSearchParams({
      page: `${page + 1}`,
      perPage: `${perPage}`,
    }).toString()

  return (
    <section className="flex flex-col justify-between gap-4 px-4 pb-8 pt-6 sm:flex-row">
      <div className="order-last sm:order-first">
        <span>Showing </span>
        <span className="font-bold">{`${start}-${end}`}</span>
        <span> of </span>
        <span className="font-bold">{total}</span>
        <span> data</span>
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            {page !== 1 && (
              <PaginationItem>
                <PaginationPrevious href={prevLink} />
              </PaginationItem>
            )}
            {page - 2 >= 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {page - 1 >= 1 && (
              <PaginationItem>
                <PaginationLink href={prevLink}>{page - 1}</PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {page}
              </PaginationLink>
            </PaginationItem>
            {page + 1 <= totalPages && (
              <PaginationItem>
                <PaginationLink href={nextLink}>{page + 1}</PaginationLink>
              </PaginationItem>
            )}
            {page + 2 <= totalPages && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {page !== totalPages && (
              <PaginationItem>
                <PaginationNext href={nextLink} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  )
}
