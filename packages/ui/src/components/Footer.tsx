import { Container } from './Container'

const footerLinks = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'API', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Security'],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-lg font-bold text-gray-100">Nexus Links</span>
            <p className="mt-2 text-sm text-gray-500">
              Fast, reliable link shortening for modern teams.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-3 text-sm font-semibold text-gray-400">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 transition-colors hover:text-gray-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Nexus Links. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
