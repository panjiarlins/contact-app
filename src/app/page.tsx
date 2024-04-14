import { getContacts } from '@/action/contact'
import ContactCard from '@/components/contact-card'
import ContactCardPagination from '@/components/contact-card-pagination'

export default async function RootPage({
  searchParams: { page, perPage, search },
}: {
  searchParams: { page?: string; perPage?: string; search?: string }
}) {
  const { data } = await getContacts({
    page: Number.isNaN(Number(page)) ? 1 : Number(page),
    perPage: Number.isNaN(Number(perPage)) ? 8 : Number(perPage),
    search,
  })

  return (
    <main className="p-4">
      <section className="grid  grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {!data || data.contacts.length === 0 ? (
          <div className="col-span-full m-10 text-center">
            <h1 className="text-9xl font-black text-gray-200">🖋</h1>
            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Uh-oh!
            </p>
            <p className="mt-4 text-gray-500">No contacts found</p>
          </div>
        ) : (
          data.contacts.map((contact) => (
            <div key={contact._id.toString()} className="[&>*]:w-full">
              <ContactCard
                name={contact.name}
                email={contact.email}
                address={contact.address}
                imageURL={contact.imageURL}
                relationship={contact.relationship}
                phone={contact.phone}
              />
            </div>
          ))
        )}
      </section>

      {data && (
        <ContactCardPagination
          page={data.page}
          perPage={data.perPage}
          totalPages={data.totalPages}
          total={data.total}
          start={data.start}
          end={data.end}
        />
      )}
    </main>
  )
}
