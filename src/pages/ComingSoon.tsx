interface ComingSoonProps {
  title: string
}

export function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">{title}</h1>
      <p className="text-gray-600">{title} page coming soon...</p>
    </div>
  )
}
