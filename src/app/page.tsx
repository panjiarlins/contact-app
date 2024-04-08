import ContactCard from '@/components/contact-card'

export default function RootPage() {
  const contacts = []

  return (
    <main>
      <section className="grid  grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {contacts.length === 0 ? (
          <div className="col-span-full m-10 text-center">
            <h1 className="text-9xl font-black text-gray-200">🖋</h1>
            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Uh-oh!
            </p>
            <p className="mt-4 text-gray-500">No contacts found</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div key={contact.email} className="[&>*]:w-full">
              <ContactCard {...contact} />
            </div>
          ))
        )}
      </section>
    </main>
  )
}
